// ***********************************************************************
// <copyright file="VirtuosoCopilotConstantsTests.cs" company="Microsoft">
//     Copyright (c) . All rights reserved. 
// </copyright>
// ***********************************************************************

namespace Copilot.Backend.Test
{
    using System.Collections.Generic;
    using Copilot.Backend.Core.Constants;

    /// <summary>
    /// The Virtuoso Copilot Constants Tests.
    /// </summary>
    public class VirtuosoCopilotConstantsTests
    {
        /// <summary>
        /// The Bot Sorry Words.
        /// </summary>
        [Fact]
        public void BotSorryWords_NotEmpty()
        {
            // Arrange
            var botSorryWords = VirtuosoCopilotConstants.BotSorryWords;

            // Act & Assert
            Assert.NotNull(botSorryWords);
            Assert.NotEmpty(botSorryWords);
        }

        /// <summary>
        /// The Bot Sorry Words Contains Expected Words.
        /// </summary>
        [Fact]
        public void BotSorryWords_ContainsExpectedWords()
        {
            // Arrange
            var expectedWords = new List<string> { "sorry", "not available", "oops", "does not exist", "not found", "not mentioned", "apologize", "afraid" };
            var botSorryWords = VirtuosoCopilotConstants.BotSorryWords;

            // Act & Assert
            Assert.Equal(expectedWords, botSorryWords);
        }

        /// <summary>
        /// The CopilotDbBotFailureResponse Not Null.
        /// </summary>
        [Fact]
        public void CopilotDbBotFailureResponse_NotNull()
        {
            // Arrange & Act
            var response = VirtuosoCopilotConstants.CopilotDbBotFailureResponse;

            // Assert
            Assert.NotNull(response);
        }

    }
}
