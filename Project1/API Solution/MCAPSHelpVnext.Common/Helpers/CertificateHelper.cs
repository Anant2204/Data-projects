// <copyright file="CertificateHelper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Helpers
{
    using System;
    using System.Diagnostics.CodeAnalysis;
    using System.Security.Cryptography.X509Certificates;
    using Validation;

    /// <summary>
    /// Certificate utility.
    /// </summary>
    public static class CertificateHelper
    {
        /// <summary>
        /// Gets the certificate by thumbprint.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="location">The location.</param>
        /// <param name="thumbPrint">The thumb print.</param>
        /// <returns>The <see cref="X509Certificate2"/> matching the thumbprint.</returns>
        /// <exception cref="System.InvalidOperationException">Certificate not installed in the store.</exception>
        [SuppressMessage("Globalization", "CA1303:Do not pass literals as localized parameters", Justification = "Log message")]
        public static X509Certificate2 GetCertificateByThumbprint(StoreName name, StoreLocation location, string thumbPrint)
        {
            Requires.NotNullOrWhiteSpace(thumbPrint, nameof(thumbPrint));
            X509Certificate2 certificate = null;
            X509Store store = new X509Store(name, location);
            try
            {
                store.Open(OpenFlags.ReadOnly);
                X509Certificate2Collection certificateCollection = store.Certificates.Find(X509FindType.FindByThumbprint, thumbPrint, false);
                if (certificateCollection == null || certificateCollection.Count == 0)
                {
                    throw new InvalidOperationException("Certificate not installed in the store");
                }

                certificate = certificateCollection[0];
            }
            finally
            {
                store.Close();
            }

            return certificate;
        }
    }
}
