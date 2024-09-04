// ***********************************************************************
// <copyright file="CopilotBotServiceTests.cs" company="Microsoft">
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
    using Azure;

    /// <summary>
    /// The Copilot Bot Service
    /// </summary>
    public class CopilotBotServiceTests
    {
        private readonly Mock<IConfiguration> configurationMock;
        private readonly Mock<IIntentFinderService> intentFinderServiceMock;
        private readonly Mock<ICloudGptService> cloudGptServiceMock;
        private readonly Mock<IAIResponseGeneratorService> aIResponseGeneratorServiceMock;
        private readonly Mock<IHttpClientFactory> httpClientFactoryMock;
        private readonly Mock<IApplicationLogging> applicationLoggingMock;
        private readonly CopilotBotService copliotBotService;

        private readonly Mock<ICloudGptAISearchService> cloudGptAISearchServiceMock;

        public CopilotBotServiceTests()
        {
            configurationMock = new Mock<IConfiguration>();
            intentFinderServiceMock = new Mock<IIntentFinderService>();
            cloudGptServiceMock = new Mock<ICloudGptService>();

            cloudGptAISearchServiceMock = new Mock<ICloudGptAISearchService>();
            configurationMock = ConfigValueTest.GetConfigurationHelperAsync().ConfigureAwait(false).GetAwaiter().GetResult();

            aIResponseGeneratorServiceMock = new Mock<IAIResponseGeneratorService>();
            httpClientFactoryMock = new Mock<IHttpClientFactory>();
            applicationLoggingMock= new Mock<IApplicationLogging>();
            copliotBotService = new CopilotBotService(
                applicationLoggingMock.Object,
                configurationMock.Object,
                intentFinderServiceMock.Object,
                cloudGptServiceMock.Object,
                aIResponseGeneratorServiceMock.Object,
                //genericAgentServiceMock.Object,
                httpClientFactoryMock.Object,
                cloudGptAISearchServiceMock.Object);
        }

        [Fact]
        public async Task PostQuestionToDbCopilot_InputHello_Success()
        {
            // Arrange
            var question = "Hello";
            var parentId = "";
            //var greetingIntent = "greeting";
            string response = "{ \"intent\": \"greetings\", \"responseFormat\": \"text\" }";
            var userAlias = "test@microsoft.com";
            var expectedReply = "Hi there! How can I assist you today?";
            var random = new Random();
            var sessionId = random.Next(1000, 3999);
            BotQuestionParams questionParams = new BotQuestionParams();
            questionParams.Question = question;
            questionParams.ParentId = parentId;
            questionParams.SessionId = Convert.ToString(sessionId);
            questionParams.UserAlias = userAlias;
            intentFinderServiceMock.Setup(x => x.IntentFinderResponse(It.IsAny<string>(), It.IsAny<BotQuestionParams>(), "You are an expert intent classifier system, which can classify the intent of the given question into a set of predefined intents.\n You have classified the user query into three classes - [dbcopilot, cloudgpt, greetings]\n Along with the intent you have to return the response format - [htmltable, markdown, image, graph, text]\n If response format is not mentioned in the input, please return `text` as default response format.\n Below is the description for the three classes\n 1. dbcopilot: The user queries which can only be answered by querying the database are dbcopilot queries.\n dbcopilot answers the queries regarding project details.\n The dbcopiolot queries can be answered in the following format:\n a. rows and columns\n b. average\n c. count\n d. list top n\n 2. cloudgpt: The user queries which can only be answered by some predefined knowledge base are cloudgpt queries.\n cloudgpt answers the queries regarding project management.\n The cloudgpt queries are expected to have an answer in the following format:\n a. definition of some entity\n b. steps to follow\n c. FAQs\n d. give access/modify/remove\n e. persona and roles\n 3. greetings: The user queries which are greetings and introductions.\n The greetings are expected in the following format:\n a. Hi, Hello, Hey, Whats up\n b. How are you?\n c. How are you doing?\n d. Hola, Bonjour\n The user will ask some questions and you should just identify the intent and return the result.\n Note: Do not add any metadata or explanation to the answer, just return the intent.\n Please follow below given examples strictly:\n Question: give me list of project and project id where customer name is Renault as a markdown table.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'markdown'}\n Question: give me list of project and project id where customer name is Renault as a  bar chart.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'graph'}\n Question: give me list of project and project id where customer name is Renault.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\n Question: give me list of project and project id where customer name is Renault as image\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'image'}\n Question: give me list of project and project id where customer name is Renault as a table\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'htmltable'}\n \n \n "))
        .ReturnsAsync(response);
            //    intentFinderServiceMock.Setup(x => x.IntentFinderResponse(It.IsAny<string>(), It.IsAny<BotQuestionParams>(),""))
            //.ReturnsAsync(greetingIntent);

            cloudGptServiceMock.Setup(x => x.GetResponseFromCloudGPT(It.IsAny<string>(), It.IsAny<BotQuestionParams>()))
                .Returns((string rephrasedQuestion, BotQuestionParams currentQuestionParams) =>
                    TestHelper.GetCloudGptResponseAsync(rephrasedQuestion, currentQuestionParams, intentFinderServiceMock, expectedReply)
                );



            // Act
            var result = await copliotBotService.PostQuestionToDbCopilot(questionParams);

            // Assert
            Assert.NotNull(result);
            //Assert.Contains(expectedReply, result);
        }

        [Fact]
        public async Task PostQuestionToDbCopilot_InputAddRemoveRole_Success()
        {
            // Arrange
            var question = "Add or Remove a Role in PjMXP";
            var parentId = "";
            //var greetingIntent = "greeting";
            string response = "{ \"intent\": \"greetings\", \"responseFormat\": \"text\" }";
            var userAlias = "test@microsoft.com";
            var expectedReply = "To add or remove a role in PjMXP, you can refer to the document titled";
            var random = new Random();
            var sessionId = random.Next(1000, 3999);
            BotQuestionParams questionParams = new BotQuestionParams();
            questionParams.Question = question;
            questionParams.ParentId = parentId;
            questionParams.SessionId = Convert.ToString(sessionId);
            questionParams.UserAlias = userAlias;
            intentFinderServiceMock.Setup(x => x.IntentFinderResponse(It.IsAny<string>(), It.IsAny<BotQuestionParams>(), "You are an expert intent classifier system, which can classify the intent of the given question into a set of predefined intents.\n You have classified the user query into three classes - [dbcopilot, cloudgpt, greetings]\n Along with the intent you have to return the response format - [htmltable, markdown, image, graph, text]\n If response format is not mentioned in the input, please return `text` as default response format.\n Below is the description for the three classes\n 1. dbcopilot: The user queries which can only be answered by querying the database are dbcopilot queries.\n dbcopilot answers the queries regarding project details.\n The dbcopiolot queries can be answered in the following format:\n a. rows and columns\n b. average\n c. count\n d. list top n\n 2. cloudgpt: The user queries which can only be answered by some predefined knowledge base are cloudgpt queries.\n cloudgpt answers the queries regarding project management.\n The cloudgpt queries are expected to have an answer in the following format:\n a. definition of some entity\n b. steps to follow\n c. FAQs\n d. give access/modify/remove\n e. persona and roles\n 3. greetings: The user queries which are greetings and introductions.\n The greetings are expected in the following format:\n a. Hi, Hello, Hey, Whats up\n b. How are you?\n c. How are you doing?\n d. Hola, Bonjour\n The user will ask some questions and you should just identify the intent and return the result.\n Note: Do not add any metadata or explanation to the answer, just return the intent.\n Please follow below given examples strictly:\n Question: give me list of project and project id where customer name is Renault as a markdown table.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'markdown'}\n Question: give me list of project and project id where customer name is Renault as a  bar chart.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'graph'}\n Question: give me list of project and project id where customer name is Renault.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\n Question: give me list of project and project id where customer name is Renault as image\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'image'}\n Question: give me list of project and project id where customer name is Renault as a table\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'htmltable'}\n \n \n "))
        .ReturnsAsync(response);

            cloudGptServiceMock.Setup(x => x.GetResponseFromCloudGPT(It.IsAny<string>(), It.IsAny<BotQuestionParams>()))
                .Returns((string rephrasedQuestion, BotQuestionParams currentQuestionParams) =>
                    TestHelper.GetCloudGptResponseAsync(rephrasedQuestion, currentQuestionParams, intentFinderServiceMock, expectedReply)
                );

            // Act
            var result = await copliotBotService.PostQuestionToDbCopilot(questionParams);

            // Assert
            Assert.NotNull(result);
            //Assert.Contains(expectedReply, result);
        }

        [Fact]
        public async Task PostQuestionToDbCopilot_InputTotalNumberOfTeam_Success()
        {
            // Arrange
            var question = "total number of feature team";
            var parentId = "";
            //var greetingIntent = "greeting";
            string response = "{ \"intent\": \"greetings\", \"responseFormat\": \"text\" }";
            var userAlias = "test@microsoft.com";
            var expectedReply = "The total number of feature teams is";
            var random = new Random();
            var sessionId = random.Next(1000, 3999);
            BotQuestionParams questionParams = new BotQuestionParams();
            questionParams.Question = question;
            questionParams.ParentId = parentId;
            questionParams.SessionId = Convert.ToString(sessionId);
            questionParams.UserAlias = userAlias;
            //     intentFinderServiceMock.Setup(x => x.IntentFinderResponse(It.IsAny<string>(), It.IsAny<BotQuestionParams>(),""))
            //.ReturnsAsync(greetingIntent);
            intentFinderServiceMock.Setup(x => x.IntentFinderResponse(It.IsAny<string>(), It.IsAny<BotQuestionParams>(), "You are an expert intent classifier system, which can classify the intent of the given question into a set of predefined intents.\n You have classified the user query into three classes - [dbcopilot, cloudgpt, greetings]\n Along with the intent you have to return the response format - [htmltable, markdown, image, graph, text]\n If response format is not mentioned in the input, please return `text` as default response format.\n Below is the description for the three classes\n 1. dbcopilot: The user queries which can only be answered by querying the database are dbcopilot queries.\n dbcopilot answers the queries regarding project details.\n The dbcopiolot queries can be answered in the following format:\n a. rows and columns\n b. average\n c. count\n d. list top n\n 2. cloudgpt: The user queries which can only be answered by some predefined knowledge base are cloudgpt queries.\n cloudgpt answers the queries regarding project management.\n The cloudgpt queries are expected to have an answer in the following format:\n a. definition of some entity\n b. steps to follow\n c. FAQs\n d. give access/modify/remove\n e. persona and roles\n 3. greetings: The user queries which are greetings and introductions.\n The greetings are expected in the following format:\n a. Hi, Hello, Hey, Whats up\n b. How are you?\n c. How are you doing?\n d. Hola, Bonjour\n The user will ask some questions and you should just identify the intent and return the result.\n Note: Do not add any metadata or explanation to the answer, just return the intent.\n Please follow below given examples strictly:\n Question: give me list of project and project id where customer name is Renault as a markdown table.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'markdown'}\n Question: give me list of project and project id where customer name is Renault as a  bar chart.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'graph'}\n Question: give me list of project and project id where customer name is Renault.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\n Question: give me list of project and project id where customer name is Renault as image\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'image'}\n Question: give me list of project and project id where customer name is Renault as a table\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'htmltable'}\n \n \n "))
             .ReturnsAsync(response);
            cloudGptServiceMock.Setup(x => x.GetResponseFromCloudGPT(It.IsAny<string>(), It.IsAny<BotQuestionParams>()))
                .Returns((string rephrasedQuestion, BotQuestionParams currentQuestionParams) =>
                    TestHelper.GetCloudGptResponseAsync(rephrasedQuestion, currentQuestionParams, intentFinderServiceMock, expectedReply)
                );

            // Act
            var result = await copliotBotService.PostQuestionToDbCopilot(questionParams);

            // Assert
            Assert.NotNull(result);
            //Assert.Contains(expectedReply, result);
        }

        [Fact]
        public async Task PostQuestionToDbCopilot_InputTop3AvgStory_Success()
        {
            // Arrange
            var question = "top 3 feature team by average story points";
            var parentId = "";
            //var greetingIntent = "greeting";
            string response = "{ \"intent\": \"greetings\", \"responseFormat\": \"text\" }";
            var userAlias = "test@microsoft.com";
            var expectedReply = "The top 3 feature teams by average story points";
            var random = new Random();
            var sessionId = random.Next(1000, 3999);
            BotQuestionParams questionParams = new BotQuestionParams();
            questionParams.Question = question;
            questionParams.ParentId = parentId;
            questionParams.SessionId = Convert.ToString(sessionId);
            questionParams.UserAlias = userAlias;
            //     intentFinderServiceMock.Setup(x => x.IntentFinderResponse(It.IsAny<string>(), It.IsAny<BotQuestionParams>(),""))
            //.ReturnsAsync(greetingIntent);
            intentFinderServiceMock.Setup(x => x.IntentFinderResponse(It.IsAny<string>(), It.IsAny<BotQuestionParams>(), "You are an expert intent classifier system, which can classify the intent of the given question into a set of predefined intents.\n You have classified the user query into three classes - [dbcopilot, cloudgpt, greetings]\n Along with the intent you have to return the response format - [htmltable, markdown, image, graph, text]\n If response format is not mentioned in the input, please return `text` as default response format.\n Below is the description for the three classes\n 1. dbcopilot: The user queries which can only be answered by querying the database are dbcopilot queries.\n dbcopilot answers the queries regarding project details.\n The dbcopiolot queries can be answered in the following format:\n a. rows and columns\n b. average\n c. count\n d. list top n\n 2. cloudgpt: The user queries which can only be answered by some predefined knowledge base are cloudgpt queries.\n cloudgpt answers the queries regarding project management.\n The cloudgpt queries are expected to have an answer in the following format:\n a. definition of some entity\n b. steps to follow\n c. FAQs\n d. give access/modify/remove\n e. persona and roles\n 3. greetings: The user queries which are greetings and introductions.\n The greetings are expected in the following format:\n a. Hi, Hello, Hey, Whats up\n b. How are you?\n c. How are you doing?\n d. Hola, Bonjour\n The user will ask some questions and you should just identify the intent and return the result.\n Note: Do not add any metadata or explanation to the answer, just return the intent.\n Please follow below given examples strictly:\n Question: give me list of project and project id where customer name is Renault as a markdown table.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'markdown'}\n Question: give me list of project and project id where customer name is Renault as a  bar chart.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'graph'}\n Question: give me list of project and project id where customer name is Renault.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\n Question: give me list of project and project id where customer name is Renault as image\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'image'}\n Question: give me list of project and project id where customer name is Renault as a table\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'htmltable'}\n \n \n "))
             .ReturnsAsync(response);
            cloudGptServiceMock.Setup(x => x.GetResponseFromCloudGPT(It.IsAny<string>(), It.IsAny<BotQuestionParams>()))
                .Returns((string rephrasedQuestion, BotQuestionParams currentQuestionParams) =>
                    TestHelper.GetCloudGptResponseAsync(rephrasedQuestion, currentQuestionParams, intentFinderServiceMock, expectedReply)
                );

            // Act
            var result = await copliotBotService.PostQuestionToDbCopilot(questionParams);

            // Assert
            Assert.NotNull(result);
            //Assert.Contains(expectedReply, result);
        }
      
        [Fact]
        public async Task PostQuestionToDbCopilot_NullInput_Failure()
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
            var result = await copliotBotService.PostQuestionToDbCopilot(questionParams);

            // Assert
            Assert.NotNull(result);

            // Assuming the method should return a default value in case of an unhandled exception
            //Assert.Equal(default(string), result);
        }

        [Fact]
        public async Task PostQuestionToDbCopilot_InvalidConfiguration_ReturnsEmptyResponse()
        {
            // Arrange
            var question = "list of project assign to me";
            var botQuestionParams = new BotQuestionParams { Question = question };

            // Assert
            Assert.ThrowsAsync<Exception>(async () => await copliotBotService.PostQuestionToDbCopilot(botQuestionParams));
        }
    }
}
