// <copyright file="IKeyVaultClient.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>


namespace MCAPSHelpVNext.Api.Services
{
    using System.Threading.Tasks;

    /// <summary>
    /// The KeyVaultClient interface.
    /// </summary>
    public interface IKeyVaultClient
    {
        /// <summary>
        /// Gets the secret value.
        /// </summary>
        /// <param name="secretName">Name of the secret.</param>
        /// <returns>The secret value as string.</returns>
        string GetSecret(string secretName);

        /// <summary>
        /// Gets the secret value.
        /// </summary>
        /// <param name="secretName">Name of the secret.</param>
        /// <returns>A <see cref="Task"/> representing the secret value.</returns>
        Task<string> GetSecretAsync(string secretName);
    }
}