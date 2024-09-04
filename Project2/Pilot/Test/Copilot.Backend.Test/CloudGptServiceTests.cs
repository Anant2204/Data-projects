// ***********************************************************************
// <copyright file="CloudGptServiceTests.cs" company="Microsoft">
//     Copyright (c) . All rights reserved. 
// </copyright>
// ***********************************************************************

namespace Copilot.Backend.Test
{
    using Microsoft.Extensions.Configuration;
    using Moq;
    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using Xunit;
    using Moq.Protected;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Core.Services;
    using Copilot.Backend.Shared.Helpers;

    /// <summary>
    /// The Cloud Gpt Service tests.
    /// </summary>
    public class CloudGptServiceTests
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
        /// The cloud Gpt service.
        /// </summary>
        private readonly CloudGptService cloudGptService;

        /// <summary>
        /// Initializes a new instance of the <see cref="CloudGptServiceTests"/> class.
        /// </summary>
        public CloudGptServiceTests()
        {
            configurationMock = ConfigValueTest.GetConfigurationHelperAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            ConfigurationHelper.Configuration = configurationMock.Object;
            applicationLoggingMock = new Mock<IApplicationLogging>();
            cloudGptService = new CloudGptService(configurationMock.Object, applicationLoggingMock.Object);
        }

        /// <summary>
        /// RephaseCloudGptResponse_ValidInput_ReturnsIntentResponse.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task RephaseCloudGptResponse_ValidInput_ReturnsIntentResponse()
        {
            // Arrange
            var question = "Hello";
            var parameters = new BotQuestionParams { ParentId = "85f68612-2c78-48f6-865a-0ee5d2909eb6", Question = "Hello" };

            var httpClientHandler = new Mock<HttpMessageHandler>();
            httpClientHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{\"reply\":\"Hello! How can I assist you today?\",\"parentId\":\"85f68612-2c78-48f6-865a-0ee5d2909eb6\",\"greeting\":true}")

                });

            var httpClient = new HttpClient(httpClientHandler.Object);


            // Act
            var result = await cloudGptService.GetResponseFromCloudGPT(question, parameters);

            // Assert
            Assert.NotNull(result);
            Assert.Contains("\"reply\":\"Hello! How can I assist you today?\"", result);
        }

        /// <summary>
        /// RephaseCloudGptResponse_NullQuestion__Failure.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task RephaseCloudGptResponse_NullQuestion__Failure()
        {
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
            var result = await cloudGptService.GetResponseFromCloudGPT(question, questionParams);

            // Assert
            Assert.Null(result);
        }

        /// <summary>
        /// RephaseCloudGptResponse_InvalidConfiguration_ReturnsEmptyResponse.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task RephaseCloudGptResponse_InvalidConfiguration_ReturnsEmptyResponse()
        {
            // Arrange
            var question = "list of project assign to me";
            var botQuestionParams = new BotQuestionParams { Question = question };
            var configuration = new ConfigurationBuilder().Build(); 
            var applicationLogging = new Mock<IApplicationLogging>().Object; 
            var service = new CloudGptService(configuration, applicationLogging);

            // Assert
            Assert.ThrowsAsync<Exception>(async () => await cloudGptService.GetResponseFromCloudGPT(question, botQuestionParams));
        }
    }
}
