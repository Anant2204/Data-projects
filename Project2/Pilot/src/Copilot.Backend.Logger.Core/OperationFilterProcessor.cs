// ***********************************************************************
// <copyright file="OperationFilterProcessor.cs" company="Microsoft">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Copilot.Backend.Logger.Core
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.RegularExpressions;
    using Microsoft.ApplicationInsights.Channel;
    using Microsoft.ApplicationInsights.DataContracts;
    using Microsoft.ApplicationInsights.Extensibility;

    /// <summary>
    /// This class implement a <seealso cref="ITelemetryProcessor"/> to remove
    /// all excessive telemetry for successful requests.
    /// </summary>
    public class OperationFilterProcessor : ITelemetryProcessor
    {
        /// <summary>
        /// The next
        /// </summary>
        private readonly ITelemetryProcessor next;

        /// <summary>
        /// The operations
        /// </summary>
        private readonly ConcurrentDictionary<string, ConcurrentQueue<ITelemetry>> operations;

        /// <summary>
        /// The disposed operations
        /// </summary>
        private readonly ConcurrentDictionary<string, DateTime> disposedOperations;

        /// <summary>
        /// Initializes a new instance of the <see cref="OperationFilterProcessor"/> class.
        /// </summary>
        /// <param name="next">The next.</param>
        public OperationFilterProcessor(ITelemetryProcessor next)
        {
            this.next = next;
            this.operations = new ConcurrentDictionary<string, ConcurrentQueue<ITelemetry>>();
            this.disposedOperations = new ConcurrentDictionary<string, DateTime>();
        }

        /// <summary>
        /// Gets or sets a value indicating whether [always log exceptions].
        /// Exceptions should be logged even if the operation itself succeeds.
        /// </summary>
        /// <value>
        ///   <c>true</c> if [always log exceptions]; otherwise, <c>false</c>.
        /// </value>
        public bool AlwaysLogExceptions { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [always log failed dependencies].
        /// Indicates whether failed dependencies
        /// should be logged even if the operation itself succeeds.
        /// </summary>
        /// <value>
        ///   <c>true</c> if [always log failed dependencies]; otherwise, <c>false</c>.
        /// </value>
        public bool AlwaysLogFailedDependencies { get; set; } = true;

        /// <summary>
        /// Gets or sets the duration of the always trace dependency with.
        /// Indicates the duration that a dependency
        /// might last before it is logged (even when the operation itself
        /// succeeds).
        /// </summary>
        /// <value>
        /// The duration of the always trace dependency with.
        /// </value>
        public TimeSpan AlwaysTraceDependencyWithDuration { get; set; } = TimeSpan.FromMilliseconds(100);

        /// <summary>
        /// Gets or sets the minimum always trace level.
        /// Traces should always be logged (even when the operation succeeds).
        /// </summary>
        /// <value>
        /// The minimum always trace level.
        /// </value>
        public SeverityLevel MinAlwaysTraceLevel { get; set; } = SeverityLevel.Error;

        /// <summary>
        /// Gets or sets a value indicating whether [include operation less telemetry]
        /// or not telemetry, that
        /// is not linked to an operation, should be logged.
        /// </summary>
        /// <value>
        ///   <c>true</c> if [include operation less telemetry]; otherwise, <c>false</c>.
        /// </value>
        public bool IncludeOperationLessTelemetry { get; set; } = true;

        /// <summary>
        /// Gets or sets a value indicating whether [debug throw on disposed operations].
        /// that throws an error if telemetry is sent for operation
        /// that have already completed. This might result in memory leaks.
        /// </summary>
        /// <value>
        ///   <c>true</c> if [debug throw on disposed operations]; otherwise, <c>false</c>.
        /// </value>
        /// <remarks>
        /// This flag should <b>NEVER</b> be set in production environments, because it
        /// will keep track of all previous operation identifiers, so it will create a
        /// memory leak on its own. It's just a helper to allow you to detect problems.
        /// </remarks>
        public bool DebugThrowOnDisposedOperations { get; set; } = false;

        /// <summary>
        /// Gets the always log operations 
        /// string that contains a semi-colon separated list of operations
        /// that should always be logged.
        /// </summary>
        /// <value>
        /// The always log operations.
        /// </value>
        /// <remarks>
        /// You can use regular expressions with the following syntax: <c>/^CMD:.*</c> to
        /// match all operations that start with "CMD:". Matching operations is not case
        /// sensitive.
        /// </remarks>
        public ICollection<string> AlwaysLogOperations { get; } = new List<string>();

        /// <summary>
        /// Process a collected telemetry item.
        /// </summary>
        /// <param name="item">
        /// A collected Telemetry item.
        /// </param>
        public void Process(ITelemetry item)
        {
            //// Check if the item should be forwarded directly
            if (this.AlwaysForwarded(item))
            {
                //// Send it directly
                this.next.Process(item);
                return;
            }

            //// Obtain the operation identifier
            var operationId = item.Context.Operation?.Id;
            if (string.IsNullOrEmpty(operationId))
            {
                //// No operation identifier
                if (this.IncludeOperationLessTelemetry)
                {
                    this.next.Process(item);
                }

                return;
            }

            //// All operations are started via a request
            if (item.GetType() == typeof(RequestTelemetry))
            {
                var request = (RequestTelemetry)item;

                //// Obtain (and remove) the telemetries for this operation
                if (this.operations.TryRemove(operationId, out var telemetries))
                {
                    //// Send all the logging for the operation if the operation failed
                    if (request.Success.HasValue)
                    {
                        if (!request.Success.Value)
                        {
                            while (telemetries.TryDequeue(out var telemetry))
                            {
                                this.next.Process(telemetry);
                            }
                        }
                        else
                        {
                            telemetries.TryDequeue(out var telemetry);
                            this.next.Process(telemetry);
                        }
                    }

                    //// Add the operation to the list of disposed operations
                    if (this.DebugThrowOnDisposedOperations)
                    {
                        this.disposedOperations.TryAdd(operationId, DateTime.UtcNow);
                    }
                }

                //// Always send the request itself
                this.next.Process(item);
            }
            else
            {
                var telemetries = this.operations.GetOrAdd(
                    operationId,
                    key =>
                    {
                        if (DebugThrowOnDisposedOperations && this.disposedOperations.TryGetValue(operationId, out var insertDate))
                        {
                            var disposedOperationExc = new InvalidOperationException($"Operation '{operationId}' was already completed at {insertDate:O} (UTC). Telemetry {item} cannot be queued.");
                            var errorTelemetry = new ExceptionTelemetry(disposedOperationExc)
                            {
                                Timestamp = item.Timestamp,
                                SeverityLevel = SeverityLevel.Error
                            };
                            this.next.Process(errorTelemetry);
                            throw disposedOperationExc;
                        }

                        return new ConcurrentQueue<ITelemetry>();
                    });
                telemetries.Enqueue(item);
            }
        }

        /// <summary>
        /// Always the forwarded.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>returns true or false</returns>
        private bool AlwaysForwarded(ITelemetry item)
        {
            //// Check if we need to log all exceptions
            if (this.AlwaysLogExceptions && item.GetType() == typeof(ExceptionTelemetry))
            {
                return true;
            }

            //// Check if we need to log failed dependencies
            var dependency = item as DependencyTelemetry;
            if (this.AlwaysLogFailedDependencies && dependency?.Success != null && !dependency.Success.Value)
            {
                return true;
            }

            //// Check if we need to log slow dependencies
            if (this.AlwaysTraceDependencyWithDuration > TimeSpan.Zero && dependency != null && dependency.Duration >= this.AlwaysTraceDependencyWithDuration)
            {
                return true;
            }

            // Check if we need to log traces (based on the severity level)
            var trace = item as TraceTelemetry;
            if (trace?.SeverityLevel != null && trace.SeverityLevel.HasValue && trace.SeverityLevel.Value >= this.MinAlwaysTraceLevel)
            {
                return true;
            }

            //// The event might be kept until later
            return false;
        }
    }
}
