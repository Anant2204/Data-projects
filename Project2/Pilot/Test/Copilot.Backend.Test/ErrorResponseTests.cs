// ***********************************************************************
// <copyright file="ErrorResponseTests.cs" company="Microsoft">
//     Copyright (c) . All rights reserved. 
// </copyright>
// ***********************************************************************

namespace Copilot.Backend.Test
{
    using Copilot.Backend.Core.DTO;

    /// <summary>
    /// The ErrorResponse Tests.
    /// </summary>
    public class ErrorResponseTests
    {
        /// <summary>
        /// Tests that the ErrorResponse properties are set correctly.
        /// </summary>
        [Fact]
        public void ErrorResponse_PropertiesSetCorrectly()
        {
            // Arrange
            var errorResponse = new ErrorResponse
            {
                TraceId = "123456",
                ErrorCode = "404",
                ErrorDetail = "Resource not found"
            };

            // Act - No action needed since we're just setting properties

            // Assert
            Assert.Equal("123456", errorResponse.TraceId);
            Assert.Equal("404", errorResponse.ErrorCode);
            Assert.Equal("Resource not found", errorResponse.ErrorDetail);
        }
    }
}
