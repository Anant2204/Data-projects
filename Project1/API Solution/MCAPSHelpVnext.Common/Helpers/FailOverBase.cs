// <copyright file="FailOverBase.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Helpers
{
    using System;
    using System.Diagnostics.Tracing;
    using System.Threading.Tasks;
    using MCAPSHelpVnext.Common.Logging;
    using Validation;

    /// <summary>
    /// This class is used for base support of failover of services during key rotation.
    /// </summary>
    /// <typeparam name="T">The underlying failover client.</typeparam>
    /// <typeparam name="TException">The type of the exception for retry.</typeparam>
    public class FailOverBase<T, TException> : IDisposable
        where T : class
        where TException : Exception
    {
        /// <summary>
        /// The default disable seconds.
        /// </summary>
        private const int DefaultDisableSeconds = 600;

        /// <summary>
        /// The disable timer in seconds.
        /// </summary>
        private readonly int disableSeconds;

        /// <summary>
        /// The enabled state.
        /// </summary>
        private readonly bool[] enabled;

        /// <summary>
        /// The client store.
        /// </summary>
        private readonly T[] storage;

        /// <summary>
        /// The offset for the enabled state.
        /// </summary>
        private readonly DateTimeOffset[] timeEnabled;

        /// <summary>
        /// The object selector.
        /// </summary>
        private int objectSelector;

        /// <summary>
        /// The disposed value.
        /// </summary>
        private bool disposedValue = false;

        /// <summary>
        /// Initializes a new instance of the <see cref="FailOverBase{T, TException}"/> class.
        /// Create a new instance of failover for key rotation.
        /// </summary>
        /// <param name="client1">Service access client utilizing key1.</param>
        /// <param name="client2">Service access client utilizing key2.</param>
        /// <param name="name">The name\description of the service for logging purposes.</param>
        /// <param name="disableSeconds">Minimum duration to wait for retrying connection.</param>
        public FailOverBase(T client1, T client2, string name, int disableSeconds)
        {
            Requires.NotNull(client1, nameof(client1));
            Requires.NotNull(client2, nameof(client2));

            this.storage = new[] { client1, client2 };
            this.timeEnabled = new[] { DateTimeOffset.UtcNow, DateTimeOffset.UtcNow };
            this.enabled = new[] { true, true };
            this.objectSelector = 0;
            this.Name = name;
            this.disableSeconds = disableSeconds <= 0 ? DefaultDisableSeconds : disableSeconds;
        }

        /// <summary>
        /// Gets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; }

        /// <summary>
        /// For services that are connection based and require a new client instance to be created.
        /// </summary>
        /// <param name="instanceIndex">Selects the instance of service access client.  Must be 0 or 1.</param>
        /// <param name="previousClient">Prior client that may need to be closed.</param>
        /// <returns>A service access client.</returns>
        public virtual async Task<T> ReconnectInstanceAsync(int instanceIndex, T previousClient)
        {
            await Task.Delay(0).ConfigureAwait(false);
            return previousClient;
        }

        /// <summary>
        /// Retrieve a service access client accounting for clients that may be disabled.
        /// </summary>
        /// <returns>A service access client.</returns>
        public async Task<T> RetrieveAsync()
        {
            int selector = this.objectSelector;

            T serviceClient = await this.ClientCheckAsync(selector, false).ConfigureAwait(false);
            if (serviceClient != null)
            {
                // alternate with other key on next RetrieveAsync
                this.objectSelector = selector == 1 ? 0 : 1;
                return serviceClient;
            }

            int failoverSelector = selector == 1 ? 0 : 1;
            serviceClient = await this.ClientCheckAsync(failoverSelector, false).ConfigureAwait(false);
            if (serviceClient != null)
            {
                this.objectSelector = failoverSelector;
                return serviceClient;
            }

            // Neither connection string is available
            // Re-enable the earliest key disabled as best attempt
            Instrument.Logger.LogMessage(EventLevel.Error, "F9D36BC4-EE6F-40DE-BF11-553ABC819EAC", $"No keys enabled for {this.Name}");
            selector = this.timeEnabled[0].CompareTo(this.timeEnabled[1]) > 0 ? 1 : 0;
            serviceClient = await this.ClientCheckAsync(selector, true).ConfigureAwait(false);
            if (serviceClient != null)
            {
                this.objectSelector = selector;
                return serviceClient;
            }

            Instrument.Logger.LogMessage(EventLevel.Error, "4017A2F2-0AB2-4E90-9469-84288AE1941B", $"Failed to force enable service client for {this.Name}");
            throw new ArgumentException($"Failed to force enable service access client {nameof(Name)}.");

        }

        /// <summary>
        /// Temporarily disable a service access client from being utilized for a duration of time.
        /// </summary>
        /// <param name="client">Service access client to disable.</param>
        public void Disable(T client)
        {
            Requires.NotNull(client, nameof(client));

            if (client.Equals(this.storage[0]))
            {
                this.timeEnabled[0] = DateTimeOffset.UtcNow.AddSeconds(this.disableSeconds);
                this.enabled[0] = false;

                Instrument.Logger.LogMessage(EventLevel.Warning, "A94B0316-DDE7-49A8-AA57-3BD32AC4F4A3", $"Disable Key1 for {this.Name}");
                return;
            }

            if (client.Equals(this.storage[1]))
            {
                this.timeEnabled[1] = DateTimeOffset.UtcNow.AddSeconds(this.disableSeconds);
                this.enabled[1] = false;

                Instrument.Logger.LogMessage(EventLevel.Warning, "0F1F1EA8-3CCF-493E-A89E-F2D2D3A31501", $"Disable Key2 for {this.Name}");
                return;
            }

            Instrument.Logger.LogMessage(EventLevel.Error, "E07CF721-0E49-4D5F-AAB2-501E2ECADBEC", $"No keys enabled for {this.Name}");
            throw new ArgumentException($"Failed to locate service access {nameof(client)} to disable {nameof(Name)}.");
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Determines whether <see cref="TException"/> is retriable exception.
        /// </summary>
        /// <param name="exception">The exception.</param>
        /// <returns><c>true</c> if [is retriable exception] [the specified exception]; otherwise, <c>false</c>.</returns>
        protected virtual bool IsRetriableException(TException exception)
        {
            return true;
        }

        /// <summary>
        /// Retrieve a specific service access client.
        /// </summary>
        /// <param name="instanceIndex">Selects the instance of service access client.  Must be 0 or 1.</param>
        /// <returns>A service access client.</returns>
        protected T Retrieve(int instanceIndex)
        {
            Requires.Range(instanceIndex == 0 || instanceIndex == 1, nameof(instanceIndex));
            return this.storage[instanceIndex];
        }

        /// <summary>
        /// Performs the specified action.
        /// </summary>
        /// <typeparam name="TRet">The type of the return value.</typeparam>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="action">The action.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation result.</returns>
        protected async Task<TRet> PerformActionAsync<TRet>(string actionName, Func<T, Task<TRet>> action)
        {
            Requires.NotNull(action, nameof(action));

            T client = await this.RetrieveAsync().ConfigureAwait(false);
            TRet retVal;
            try
            {
                retVal = await action(client).ConfigureAwait(false);
                return retVal;
            }
            catch (TException ex)
            {
                if (!this.IsRetriableException(ex))
                {
                    Instrument.Logger.LogException("DE049DF2-C119-4E53-9FEC-4912EC0EF662", $"Error {actionName} {this.Name}.", ex, new Dictionary<string, string>());
                    throw;
                }

                Instrument.Logger.LogException("11D4FD07-FAD1-4B86-95C4-4A700FF95326", $"Retriable exception on {actionName} {this.Name}.", ex, new Dictionary<string, string>());
            }

            // First connect string failed - attempt on second connect string
            this.Disable(client);

            client = await this.RetrieveAsync().ConfigureAwait(false);
            retVal = await action(client).ConfigureAwait(false);
            return retVal;
        }

        /// <summary>
        /// Performs the specified action.
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="action">The action.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        protected async Task PerformActionAsync(string actionName, Func<T, Task> action)
        {
            Requires.NotNull(action, nameof(action));

            _ = await this.PerformActionAsync(
                actionName,
                async client =>
                {
                    await action(client).ConfigureAwait(false);
                    return Task.CompletedTask;
                }).ConfigureAwait(false);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposedValue)
            {
                if (disposing)
                {
                    if (this.storage[0] is IDisposable resource1)
                    {
                        resource1.Dispose();
                    }

                    if (this.storage[0] is IDisposable resource2)
                    {
                        resource2.Dispose();
                    }
                }

                this.disposedValue = true;
            }
        }

        /// <summary>
        /// Check if an instance of a service access client can be utilized.
        /// </summary>
        /// <param name="instanceIndex">Selects the instance of service access client.  Must be 0 or 1.</param>
        /// <param name="forcedEnable">Ignore time to Enable and force enablement.</param>
        /// <returns>A service access client.</returns>
        private async Task<T> ClientCheckAsync(int instanceIndex, bool forcedEnable)
        {
            Requires.Range(instanceIndex == 0 || instanceIndex == 1, nameof(instanceIndex));
            DateTimeOffset currentTime = DateTimeOffset.UtcNow;

            // check if this service class is enabled
            if (this.enabled[instanceIndex])
            {
                return this.storage[instanceIndex];
            }

            // Check if should be enabled due to timeout on disable
            if (currentTime.CompareTo(this.timeEnabled[instanceIndex]) > 0 || forcedEnable)
            {
                T reconnectedService = await this.ReconnectInstanceAsync(instanceIndex, this.storage[instanceIndex]).ConfigureAwait(false);
                if (reconnectedService != null)
                {
                    this.enabled[instanceIndex] = true;
                    var key = instanceIndex + 1;
                    if (forcedEnable)
                    {
                        Instrument.Logger.LogMessage(EventLevel.Informational, "C8D60ACA-C26B-4968-BF9F-0445A6C518DD", $"Forced reenable Key{key} for {this.Name}");
                        this.timeEnabled[instanceIndex] = currentTime;
                    }
                    else
                    {
                        Instrument.Logger.LogMessage(EventLevel.Informational, "0048321C-618F-4587-A6AF-991C1C39306C", $"Timeout reenable Key{key} for {this.Name}");
                    }

                    return this.storage[instanceIndex];
                }
            }

            return null;
        }
    }
}