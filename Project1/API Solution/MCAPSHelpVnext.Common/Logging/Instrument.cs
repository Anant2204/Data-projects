// <copyright file="Instrument.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using Microsoft.Extensions.Options;
    using MCAPSHelpVnext.Common.Messaging;
    using Validation;

    /// <summary>
    /// The application Instrumentation wrapper.
    /// </summary>
    public static partial class Instrument
    {
        /// <summary>
        /// The source prefix for logging.
        /// </summary>
        private const string SourcePrefix = "MCAPSHelpVnext.Common.Logging";

        /// <summary>
        /// The lock object.
        /// </summary>
        private static readonly object LockObject = new object();

        /// <summary>
        /// The dummy logger.
        /// </summary>
        private static readonly ILogger DummyLogger = new NoopLogger();

        /// <summary>
        /// The logger type.
        /// </summary>
        private static LoggerType loggerType = LoggerType.None;

        /// <summary>
        /// The logger.
        /// </summary>
        private static ILogger logger;

        /// <summary>
        /// The supported Logger Types.
        /// </summary>
        private enum LoggerType
        {
            /// <summary>
            /// The dummy logger type.
            /// </summary>
            None,

            /// <summary>
            /// The in process production logger type.
            /// </summary>
            InProcessProduction,

            /// <summary>
            /// The in process consumption logger type.
            /// </summary>
            InProcessConsumption,
        }

        /// <summary>
        /// Gets the logger.
        /// </summary>
        /// <value>
        /// The logger.
        /// </value>
        public static ILogger Logger
        {
            get
            {
                if (logger == null)
                {
                    return DummyLogger;
                }

                return logger;
            }
        }

        /// <summary>
        /// Initializes the Instrumentation type.
        /// </summary>
        /// <param name="sourceName">Name of the source.</param>
        public static void Initialize(string sourceName)
        {
            Requires.NotNull(sourceName, nameof(sourceName));
            Initialize(sourceName, TraceLevel.Verbose, string.Empty);
        }

        /// <summary>
        /// Initialize ETW based log production. When this is used it is expected that an External ETW Listener is consuming the events.
        /// </summary>
        /// <param name="sourceName">Name of the source.</param>
        /// <param name="traceLevel"><see cref="TraceLevel"/> for logging.</param>
        /// <param name="appInsightsInstrumentationKey">The Application Insights InstrumentationKey.</param>
        public static void Initialize(string sourceName, TraceLevel traceLevel, string appInsightsInstrumentationKey)
        {
            Initialize(sourceName, TraceLevel.Verbose, false, appInsightsInstrumentationKey);
        }

        /// <summary>
        /// Initialize ETW based log production. When this is used it is expected that an External ETW Listener is consuming the events.
        /// </summary>
        /// <param name="sourceName">Name of the source.</param>
        /// <param name="traceLevel"><see cref="TraceLevel"/> for logging.</param>
        /// <param name="useAppInsightsConnectionString">True if connection string should be used, false, if instrumentation key to be used.</param>
        /// <param name="appInsightsKey">The Application Insights Connection String or InstrumentationKey</param>
        public static void Initialize(string sourceName, TraceLevel traceLevel, bool useAppInsightsConnectionString, string appInsightsKey)
        {
            Requires.NotNull(sourceName, nameof(sourceName));

            if (logger != null && loggerType != LoggerType.InProcessProduction)
            {
                throw new NotSupportedException("Logger type can not be changed");
            }

            if (logger == null)
            {
                lock (LockObject)
                {
                    if (logger == null)
                    {
                        var writers = new List<ILogWriter>
                        {
                            new EtwLogWriter(SourcePrefix),
                        };

                        if (!string.IsNullOrWhiteSpace(appInsightsKey))
                        {
                            writers.Add(new AppInsightsLogWriter(useAppInsightsConnectionString, appInsightsKey));
                        }

                        loggerType = LoggerType.InProcessProduction;
                        logger = new EventSourceLogger(SourcePrefix, sourceName, traceLevel, writers);
                    }
                }
            }
        }

        /// <summary>
        /// Initialize in process log production and consumption.  This mechanism expects to be configured to send data to ad event hub backed by Data Explorer.
        /// It is important to note that when using this solution Instrument.Logger.Dispose() should be called before process exit to ensure all data reaches the event hub.
        /// </summary>
        /// <param name="tracelevel"><see cref="TraceLevel"/> for logging.</param>
        /// <param name="eventhubName">The event hub name used for logging.</param>
        /// <param name="primaryConnectionString">The primary connection string.</param>
        /// <param name="secondaryConnectionString">The secondary connection string.</param>
        /// <param name="databaseName">Database name for logs.</param>
        /// <param name="enableConsoleLogs"><c>true</c> if logs should be written to console.</param>
        public static void InitializeInProcess(TraceLevel tracelevel, string eventhubName, string primaryConnectionString, string secondaryConnectionString, string databaseName, bool enableConsoleLogs)
        {
            Requires.NotNullOrEmpty(eventhubName, nameof(eventhubName));
            Requires.NotNullOrEmpty(primaryConnectionString, nameof(primaryConnectionString));
            Requires.NotNullOrEmpty(secondaryConnectionString, nameof(secondaryConnectionString));
            Requires.NotNull(databaseName, nameof(databaseName));

            if (logger != null && loggerType != LoggerType.InProcessConsumption)
            {
                throw new NotSupportedException("Logger type can not be changed");
            }

            if (logger == null)
            {
                lock (LockObject)
                {
                    if (logger == null)
                    {
                        var settings = Options.Create(new EventHubSettings { PrimaryConnectionString = primaryConnectionString, SecondaryConnectionString = secondaryConnectionString, EventHubName = eventhubName });
                        loggerType = LoggerType.InProcessConsumption;
                        List<ILogWriter> writers = new List<ILogWriter>
                        {
                            new KustoEventHubLogWriter(settings, databaseName),
                        };

                        if (enableConsoleLogs)
                        {
                            writers.Add(new ConsoleLogWriter());
                        }

                        logger = new EventSourceLogger("inprocess", "inprocesscontext", tracelevel, writers);
                    }
                }
            }
        }

        /// <summary>
        /// Flushes the counters.
        /// </summary>
        public static void FlushCounters()
        {
            Logger.FlushCounters();
        }
    }
}