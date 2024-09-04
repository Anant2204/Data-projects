// ***********************************************************************
// <copyright file="AIResponseGeneratorServiceTests.cs" company="Microsoft">
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
    /// The AI Response Generator Service Tests.
    /// </summary>
    public class AIResponseGeneratorServiceTests
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
        /// The AI Response Generator Service.
        /// </summary>
        private readonly AIResponseGeneratorService aiResponseGeneratorService;

        /// <summary>
        /// The AI Response Generator Service Constructor.
        /// </summary>
        public AIResponseGeneratorServiceTests()
        {
            configurationMock = ConfigValueTest.GetConfigurationHelperAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            applicationLoggingMock = new Mock<IApplicationLogging>();
            aiResponseGeneratorService = new AIResponseGeneratorService(configurationMock.Object, applicationLoggingMock.Object);
        }

        /// <summary>
        /// Valid input for RephraseAIResponse.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task RephraseAIResponse_ValidInput_ReturnsExpectedResponse()
        {
            // Arrange
            var question = "list of project assign to me";
            var data = "Some additional data";
            var parameters = new BotQuestionParams{ Question= question };


            // Act
            var response = await aiResponseGeneratorService.ProcessDataWithGptEngine(question, data, parameters);

            // Assert
            Assert.NotNull(response);
        }

        /// <summary>
        /// The RephraseAIResponse function with valid input and expected response.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task RephraseAIResponse_ValidInput_ReturnsResponse()
        {
            // Arrange
            var question = "Count of project by region";
            var data = "[\r\n  [\r\n    \"North America\",\r\n    5\r\n  ],\r\n  [\r\n    \"EMEA\",\r\n    1735\r\n  ],\r\n  [\r\n    \"Asia\",\r\n    668\r\n  ],\r\n  [\r\n    null,\r\n    25906\r\n  ],\r\n  [\r\n    \"Americas\",\r\n    1803\r\n  ]\r\n]";
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
            var response = await aiResponseGeneratorService.ProcessDataWithGptEngine(question, data, questionParams);

            // Assert
            Assert.NotNull(response);
        }

        /// <summary>
        /// The RephraseAIResponse function with invalid data.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task RephraseAIResponse_InvalidData_ReturnsResponse()
        {
            // Arrange
            var question = "list of all project";
            var data = "[\r\n  [\r\n    1,\r\n    \"FF-Banco Sant Rio-FY15-SCOM for Servers\",\r\n    \"BANCO SANTANDER CENTRAL HISPANO LTD ARGENTINA\",\r\n    \"Azure Cloud & AI\"\r\n  ],\r\n  [\r\n    6,\r\n    \"TM-PETROBRAS-MCS-Soporte Biztalk\",\r\n    \"PETROBRAS ENERGIA S A\",\r\n    \"Azure Cloud & AI\"\r\n  ],\r\n  [\r\n    8,\r\n    \"TM-Tenaris-Renovacion Oficina Tecnologia\",\r\n    \"Tenaris Systems S.A.\",\r\n    \"Azure Cloud & AI\"\r\n  ],\r\n  [\r\n    9,\r\n    \"TM-Ternium-MCS-Oficina Local TESSA\",\r\n    \"Ternium Engineering y Services S.A\",\r\n    \"Azure Cloud & AI\"\r\n  ],\r\n  [\r\n    10,\r\n    \"TM-BROU-030-FY14-Local Office-LOFY15 Infra\",\r\n    \"BROU BANCO DE LA REPUBLICA ORIENTAL DEL URUGUAY\",\r\n    \"Secure Infrastructure\"\r\n  ],\r\n  [\r\n    12,\r\n    \"Bradesco - Hardening Corporativo\",\r\n    \"BANCO BRADESCO SA\",\r\n    \"Azure Cloud & AI\"\r\n  ],\r\n  [\r\n    13,\r\n    \"Bradesco - Hardening Agências\",\r\n    \"BANCO BRADESCO SA\",\r\n    \"Modern Work\"\r\n  ],\r\n  [\r\n    15,\r\n    \"CH-Bradesco-OSCY14-DSC-Monitoração das ATM's\",\r\n    \"BANCO BRADESCO SA\",\r\n    \"Modern Work\"\r\n  ],\r\n  [\r\n    17,\r\n    \"TM-BR...";
            var parentId = "";
            var userAlias = "test@microsoft.com";
            var random = new Random();
            var sessionId = random.Next(1000, 3999);
            BotQuestionParams questionParams = new BotQuestionParams();
            questionParams.Question = question;
            questionParams.ParentId = parentId;
            questionParams.SessionId = Convert.ToString(sessionId);
            questionParams.UserAlias = userAlias;

            // Assert
            Assert.ThrowsAsync<Exception>(async () => await aiResponseGeneratorService.ProcessDataWithGptEngine(question, data, questionParams));
        }

        /// <summary>
        /// Invalid input for RephraseAIResponse.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task RephraseAIResponse_InvalidInput_ReturnsNull()
        {
            // Arrange
            BotQuestionParams questionParams = new BotQuestionParams();

            // Assert
            Assert.ThrowsAsync<Exception>(async () => await aiResponseGeneratorService.ProcessDataWithGptEngine(null, null, questionParams));
        }
    }
}
