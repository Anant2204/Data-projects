// <copyright file="ApplicationStateOptions.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API.Attributes
{
    /// <summary>
    /// The application state options type.
    /// </summary>
    public class ApplicationStateOptions
    {
        /// <summary>
        /// gets or sets a value indicating whether the request and response needs to be logged.
        /// </summary>
        public bool LogRequestResponse { get; set; } = false;
    }
}

