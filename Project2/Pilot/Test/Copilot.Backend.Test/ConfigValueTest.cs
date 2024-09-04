// ***********************************************************************
// <copyright file="ConfigValueTest.cs" company="Microsoft">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************


namespace Copilot.Backend.Test
{
    using Azure.Security.KeyVault.Secrets;
    using Azure;
    using Microsoft.Extensions.Configuration;
    using Moq;
    using System.Threading.Tasks;
    using Copilot.Backend.Core.Constants;
    using Azure.Identity;

    /// <summary>
    /// Config Value class  
    /// </summary>
    public static class ConfigValueTest
    {
        /// <summary>
        /// Get Configuration helper.
        /// </summary>
        /// <returns>Get Config Values.</returns>
        public static async Task<Mock<IConfiguration>> GetConfigurationHelperAsync()
        {
            var configuration = new Mock<IConfiguration>();


            var endpointKeyVault = "https://virtuoso-kv-sec-buddy.vault.azure.net/";
            var client = new SecretClient(vaultUri: new Uri(endpointKeyVault), credential: new DefaultAzureCredential());
            var copilotDbBotOpenApiSecret = await GetSecret(client, "copilotDbBotOpenApi-key-kv");
            var copilotDbCloudGptSecret = await GetSecret(client, "copilotDbCloudGpt-key-kv");

            configuration.Setup(x => x[VirtuosoCopilotConstants.OpenAiEndpoint])
                             .Returns("https://oai-virtuoso-prod-scus-01.openai.azure.com");
            configuration.Setup(x => x[VirtuosoCopilotConstants.CopilotDbBotOpenApikvr])
                            .Returns(copilotDbBotOpenApiSecret);
            configuration.Setup(x => x[VirtuosoCopilotConstants.IntentDetectionPrompt])
                           .Returns("\nYou are an expert intent classifier system, which can classify the intent of the given question into a set of predefined intents.\nYou have classified the user query into three classes - [dbcopilot, cloudgpt, greetings]\nBelow is the description for the three classes\n1. dbcopilot: The user queries which can only be answered by querying the database are dbcopilot queries.\n dbcopilot answers the queries regarding project details.\n The dbcopiolot queries can be answered in the following format:\n a. rows and columns\n b. average\n c. count\n d. list top n\n2. cloudgpt: The user queries which can only be answered by some predefined knowledge base are cloudgpt queries.\n cloudgpt answers the queries regarding project management.\n The cloudgpt queries are expected to have an answer in the following format:\n a. definition of some entity\n b. steps to follow\n c. FAQs\n d. give access/modify/remove\n e. persona and roles\n3. greetings: The user queries which are greetings and introductions.\n The greetings are expected in the following format:\n a. Hi, Hello, Hey, Whats up\n b. How are you?\n c. How are you doing?\n d. Hola, Bonjour\nThe user will ask some questions and you should just identify the intent and return the result.\nNote: Do not add any metadata or explanation to the answer, just return the intent.\nThe answer format should be : Answer: intent\n");
            configuration.Setup(x => x[VirtuosoCopilotConstants.MaxTokenValue])
                            .Returns("8000");
            configuration.Setup(x => x[VirtuosoCopilotConstants.DeploymentOrModelName])
                            .Returns("gpt-35-turbo-16k-0613");
            configuration.Setup(x => x[VirtuosoCopilotConstants.CloudGptEndpoint])
                            .Returns("https://virtuoso-app-cgpt-buddy.azurewebsites.net/api/cloud-gpt/scenario/copilotbuddy");
            configuration.Setup(x => x[VirtuosoCopilotConstants.CopilotDbCloudGptkvr])
                           .Returns(copilotDbCloudGptSecret);
            configuration.Setup(x => x[VirtuosoCopilotConstants.AIInstructions])
                           .Returns("Given a question and then answer in tabular format representing data, Please reply in List or statement using both. Try to be precise with the output and avoid any extra information like the full form of the acronyms which are not in the original input. Please make sure that you strictly follow all the rules given below: -Revenue should have a dollar symbol. -When the result is displayed in a List, column headings must have meaningful column names with no symbols. -Don't generate extra information that is not in the input. -Do not return row-by-row record count in the statement. -When the answer does not have data or only column names, return a 'no data available' message for that question");
            configuration.Setup(x => x[VirtuosoCopilotConstants.IntentAndResponseDetectionPrompt])
                           .Returns("You are an expert intent classifier system, which can classify the intent of the given question into a set of predefined intents.\n You have classified the user query into three classes - [dbcopilot, cloudgpt, greetings]\n Along with the intent you have to return the response format - [htmltable, markdown, image, graph, text]\n If response format is not mentioned in the input, please return `text` as default response format.\n Below is the description for the three classes\n 1. dbcopilot: The user queries which can only be answered by querying the database are dbcopilot queries.\n dbcopilot answers the queries regarding project details.\n The dbcopiolot queries can be answered in the following format:\n a. rows and columns\n b. average\n c. count\n d. list top n\n 2. cloudgpt: The user queries which can only be answered by some predefined knowledge base are cloudgpt queries.\n cloudgpt answers the queries regarding project management.\n The cloudgpt queries are expected to have an answer in the following format:\n a. definition of some entity\n b. steps to follow\n c. FAQs\n d. give access/modify/remove\n e. persona and roles\n 3. greetings: The user queries which are greetings and introductions.\n The greetings are expected in the following format:\n a. Hi, Hello, Hey, Whats up\n b. How are you?\n c. How are you doing?\n d. Hola, Bonjour\n The user will ask some questions and you should just identify the intent and return the result.\n Note: Do not add any metadata or explanation to the answer, just return the intent.\n Please follow below given examples strictly:\n Question: give me list of project and project id where customer name is Renault as a markdown table.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'markdown'}\n Question: give me list of project and project id where customer name is Renault as a  bar chart.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'graph'}\n Question: give me list of project and project id where customer name is Renault.\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\n Question: give me list of project and project id where customer name is Renault as image\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'image'}\n Question: give me list of project and project id where customer name is Renault as a table\n Answer: { 'intent': 'dbcopilot', 'responseFormat': 'htmltable'}\n \n \n ");

            return await Task.Run(() => configuration);
        }

        /// <summary>
        /// Get Secret from KeyVault.
        /// </summary>
        /// <param name="client">Client object.</param>
        /// <param name="KeyName">Key name.</param>
        /// <returns>return secret from Keyvault.</returns>
        private static async Task<string> GetSecret(SecretClient client,string KeyName)
        {
            KeyVaultSecret secret = await client.GetSecretAsync(KeyName);
            return secret.Value;
        }
    }
}
