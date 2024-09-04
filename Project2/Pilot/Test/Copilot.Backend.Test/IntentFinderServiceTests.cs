// ***********************************************************************
// <copyright file="IntentFinderServiceTests.cs" company="Microsoft">
//     Copyright (c) . All rights reserved. 
// </copyright>
// ***********************************************************************

namespace Copilot.Backend.Test
{
    using Microsoft.Extensions.Configuration;
    using Moq;
    using System;
    using System.Threading.Tasks;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Core.Services;

    /// <summary>
    /// The Intent Finder Service Tests.
    /// </summary>
    public class IntentFinderServiceTests
    {
        /// <summary>
        /// The configuration mock.
        /// </summary>
        private readonly Mock<IConfiguration> configurationMock;

        /// <summary>
        /// The application logging mock.
        /// </summary>
        private readonly Mock<IApplicationLogging> applicationLoggingMock;

        /// <summary>
        /// The intent finder service.
        /// </summary>
        private readonly IntentFinderService intentFinderService;

        /// <summary>
        /// Initializes a new instance of the <see cref="IntentFinderServiceTests"/> class.
        /// </summary>
        public IntentFinderServiceTests()
        {
            configurationMock = ConfigValueTest.GetConfigurationHelperAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            applicationLoggingMock = new Mock<IApplicationLogging>();
            intentFinderService = new IntentFinderService(configurationMock.Object, applicationLoggingMock.Object);
        }

        /// <summary>
        /// IntentFinderResponse_ValidInput_ReturnsIntentResponse.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task IntentFinderResponse_ValidInput_ReturnsIntentResponse()
        {
            // Arrange
            var question = "Hello";
            var parentId = "";
            var userAlias = "test@microsoft.com";
            var random = new Random();
            var sessionId = random.Next(1000, 3999);
            BotQuestionParams questionParams = new BotQuestionParams();
            questionParams.Question = question;
            questionParams.ParentId = parentId;
            questionParams.SessionId = Convert.ToString(sessionId);
            questionParams.UserAlias = userAlias;
            // Act
            var response = await intentFinderService.IntentFinderResponse(question, questionParams);

            // Assert
            Assert.NotNull(response);
            // Add more specific assertions if possible
        }

        /// <summary>
        /// IntentFinderResponse_EmptyQuestion_ReturnsEmptyResponse.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task IntentFinderResponse_EmptyQuestion_ReturnsEmptyResponse()
        {
            // Arrange
            // Arrange
            string question = null;
            string parentId = null;
            var userAlias = "";
            var random = new Random();
            var sessionId = random.Next(1000, 3999);

            BotQuestionParams questionParams = new BotQuestionParams();
            questionParams.Question = question;
            questionParams.ParentId = parentId;
            questionParams.SessionId = Convert.ToString(sessionId);
            questionParams.UserAlias = userAlias;

            // Act
            var response = await intentFinderService.IntentFinderResponse(question, questionParams);

            // Assert
            Assert.Null(response);
        }

        /// <summary>
        /// IntentFinderResponse_InvalidConfiguration_ReturnsEmptyResponse.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task IntentFinderResponse_InvalidConfiguration_ReturnsEmptyResponse()
        {
            // Arrange
            var question = "list of project assign to me";
            var botQuestionParams = new BotQuestionParams{ Question = question };
            var configuration = new ConfigurationBuilder().Build(); // Provide empty configuration
            var applicationLogging = new Mock<IApplicationLogging>().Object; // Mock IApplicationLogging
            var service = new IntentFinderService(configuration, applicationLogging);

            // Assert
            Assert.ThrowsAsync<Exception>(async () => await service.IntentFinderResponse(question, botQuestionParams));
        }
    }
}
