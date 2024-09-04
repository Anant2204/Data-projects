// ***********************************************************************
// <copyright file="ApplicationLoggingTests.cs" company="Microsoft">
//     Copyright (c) . All rights reserved. 
// </copyright>
// ***********************************************************************

namespace Copilot.Backend.Test
{
    using Newtonsoft.Json;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Services;

    /// <summary>
    /// Application Logging Tests.
    /// </summary>
    public class ApplicationLoggingTests
    {
        /// <summary>
        /// LogDetails_ReturnsCorrectMessage.
        /// </summary>
        [Fact]
        public void LogDetails_ReturnsCorrectMessage()
        {
            // Arrange
            var loggingService = new ApplicationLogging();
            var parameters = new BotQuestionParams
            {
                UserAlias = "TestUser",
                Question = "TestQuestion",
                ParentId = "TestParentId",
                SessionId = "TestSessionId",
                ConversationId = "TestConversationId"
            };
            var serviceControllerName = "TestService";
            var methodName = "TestMethod";
            var otherMessage = "TestOtherMessage";

            // Act
            var logMessage = loggingService.LogDetails(parameters, serviceControllerName, methodName, otherMessage);

            // Assert
            Assert.Contains(serviceControllerName, logMessage);
            Assert.Contains(methodName, logMessage);
            Assert.Contains(parameters.UserAlias, logMessage);
            Assert.Contains(parameters.Question, logMessage);
            Assert.Contains(parameters.ParentId, logMessage);
            Assert.Contains(parameters.SessionId, logMessage);
            Assert.Contains(parameters.ConversationId, logMessage);
            Assert.Contains(otherMessage, logMessage);
        }

        /// <summary>
        /// LogDetailsEnd_ReturnsCorrectMessage.
        /// </summary>
        [Fact]
        public void LogDetailsEnd_ReturnsCorrectMessage()
        {
            // Arrange
            var loggingService = new ApplicationLogging();
            var parameters = new BotQuestionParams
            {
                UserAlias = "TestUser",
                Question = "TestQuestion",
                ParentId = "TestParentId",
                SessionId = "TestSessionId",
                ConversationId = "TestConversationId"
            };
            var serviceControllerName = "TestService";
            var methodName = "TestMethod";
            var result = JsonConvert.SerializeObject("TestResult");

            // Act
            var logMessage = loggingService.LogDetailsEnd(parameters, result, serviceControllerName, methodName);

            // Assert
            Assert.Contains(serviceControllerName, logMessage);
            Assert.Contains(methodName, logMessage);
            Assert.Contains(parameters.UserAlias, logMessage);
            Assert.Contains(parameters.Question, logMessage);
            Assert.Contains(parameters.ParentId, logMessage);
            Assert.Contains(parameters.SessionId, logMessage);
            Assert.Contains(parameters.ConversationId, logMessage);
        }

        /// <summary>
        /// logDetailsStart_ReturnsCorrectMessage.
        /// </summary>
        [Fact]
        public void LogDetailsStart_ReturnsCorrectMessage()
        {
            // Arrange
            var loggingService = new ApplicationLogging();
            var parameters = new BotQuestionParams
            {
                UserAlias = "TestUser",
                Question = "TestQuestion",
                ParentId = "TestParentId",
                SessionId = "TestSessionId",
                ConversationId = "TestConversationId"
            };
            var serviceControllerName = "TestService";
            var methodName = "TestMethod";

            // Act
            var logMessage = loggingService.LogDetailsStart(parameters, serviceControllerName, methodName);

            // Assert
            Assert.Contains(serviceControllerName, logMessage);
            Assert.Contains(methodName, logMessage);
            Assert.Contains(parameters.UserAlias, logMessage);
            Assert.Contains(parameters.Question, logMessage);
            Assert.Contains(parameters.ParentId, logMessage);
            Assert.Contains(parameters.SessionId, logMessage);
            Assert.Contains(parameters.ConversationId, logMessage);
        }
    }
}
