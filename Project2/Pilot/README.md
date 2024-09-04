# Project Management Copilot  

[[_TOC_]]

## Overview

Project Management Copilot has been designed to be deployed for Azure WebApps and Azure App services.


## Prerequisite & Resource Creation

Project Management Copilot deployment require several components on Azure and they can be configured by following the steps below. The steps in this section only need to be configured once.

1. Tools:
   1. Visual Studion 2022 Enterprise ( latest  version)
   2. GIT 
   3. NPM 
   4. Nodejs
   5. Edge latest browser
   
2. Azure Subscription & Resource Group

    It is recommended to create a dedicated resource group, and need to have Administrator role in the resource group for create resource and managing role assignment.

3. Web App

    Web App is used to host Copilot web service to support the UX.
    1. Create an Azure Web App on [Azure Portal](https://ms.portal.azure.com/#create/Microsoft.WebSite) within the resource group above. 
    2. Check the created application and its URL (should be in format of `https://<website name>.azurewebsites.net`)

4. AAD Application (optional)

    AAD Application is used as identity for Project Management Copilot to access resources. Following the steps below to create the resource first and may need to update several configuration later.

    1. App Registration: register application in "[App registrations](https://ms.portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)" on Azure Portal. 
    2. Get Application information: after the application is created, check the "Application (client) ID", "Directory (Tenant) ID", which might be used in later steps.
    3. Create application secret: in "Certificate & Secret" Page, in the "Client Secret" tab, add a new client secret and take it for later use.
    
    For more information, refer to [Azure document on create AAD Application](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

5. Azure App Configuration (for cloud)

    Azure App Configuration is used to store the app configuraiton 

    1. Create the Azure App Configuration  on [Azure App Configuratioion](https://learn.microsoft.com/en-us/azure/azure-app-configuration/quickstart-azure-app-configuration-create?tabs=azure-portal) 
    
6. Key Vault (Azure Key vault)

    Azure Key vault is used Storing Sensitive information.

    1. Create Azure Key vault at [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/basic-concepts)in the resource group. 


6.  Azure OpenAI

    Azure OpenAI service is used for accessing base LLM API. The deployment of AOAI could be deployed or configured with existing deployments.
    
    1. Ensure the subscription has access to Azure OpenAI, or need to apply for access in [aka.ms/oai/access](https://aka.ms/oai/access).
    2. Create Azure OpenAI service in [Azure Portal](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesOpenAI).
    3. After creation, in "Model Deployments" page, create a model deployment. Currently the model `gpt-35-turbo` has been used. Note the model deployment name for later usage.
    4. Check the "keys and endpoint" page, note the "endpoint" and "key" (either "key1" or "key2") for later usage.

10.  Cloud GPT (Optional)


11. DB Copilot

    To use DB Copilot feature, provision Self Serve DB-Copilot [DB Copilot](https://dev.azure.com/TScience/NL2Code/_git/DBCopilotLib-Samples?path=/docs/create-dbcopilot-endpoint.md&_a=preview)

## Build

### Local build
1. Clone repo to your local
2. Prepare WebConfigurations:
      1. Add following keys 

**    It's recommended to use Key Vault for managing various secrets in configuration.
**
| Key | Value | Description |
| --- | --- | --- |
| AzureAd.TokenIssuer1 | https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/ | The URL of the token issuer |
| AzureAd.Instance | https://login.microsoftonline.com/ | The URL of the Azure AD instance |
| AzureAd.Domain | microsoft.onmicrosoft.com | The domain of your Azure AD |
| AzureAd.TenantId | 72f988bf-86f1-41af-91ab-2d7cd011db47 | The ID of your Azure AD tenant |
| AzureAd.ClientId | App-Client-Id-a5af-29d9d54801cd | The ID of your Azure AD client |
| AzureAd.Audience | api://Your-Auidence-Info | The audience for your Azure AD |
| ConnectionStrings.AppInsightsInstrumentationKey |  | The instrumentation key for your Application Insights resource |
| LogLevl | Trace | Log level |
| VirtuosoCopilotBotName | Project Management Copilot | Project Management Copilot bot name |
| ShowExceptionMessage | true | A boolean value indicating whether to show exception messages |
| TestLoginUser | TestuserEmail@microsoft.com | The test login user email |
| AppConfigurationEndpoint |  | The endpoint for your app configuration, For cloud setup |
| IsManagedIdentityEnabled | true/false  |Is Managed Identity Enabled |
| UserManagedIdentityId | <ID>  |Managed Identity Id |
| Instructions | Given a question and then answer in tabular format... | Instructions for the application |
| OpenAiEndpoint | https://az-open-ai-base-url.openai.azure.com | OpenAI endpoint |
| copilotDbBotOpenApi-kvr | DB CopilotKey | Copilot DB Bot Open API key (attach to kv for security reasons)|
| MaxTokenValue | 8000 | Maximum token value |
| TemperatureValue | 0.7 | Temperature value |
| deploymentOrModelName | Your GPT model Deployment Name | Deployment or model name |
| IsCloudGPTEnabled | true/false  |Is cloud GPT integrated |
| CloudGptEndpoint | https://cgptprodwebapp.azurewebsites.net/api/cloud-gpt/scenario/v2CopilotDataTest | Cloud GPT endpoint |
| copilotDbCloudGpt-kvr | CloudGPT key | Copilot DB Cloud GPT key(attach to kv for security reasons) |
| CopilotDbEndpoint | https://db-copilot-sel-host-end-point.eastus.inference.ml.azure.com/score | Copilot DB endpoint |
| IsDbSelfHostEndpointEnabled | true,false  | Is Self hosted DB Copilot integrated |
| copilotDbBotApi-kvr | key for dbcopilot | Copilot DB Bot API key-value reference (attach to kv for security reasons)|
| IsCopilotDbDebugModeOn | false | A boolean value indicating whether Copilot DB debug mode is on |
| AiFlag | true | AI flag |
| ExceptionMessage | Sorry, we couldn't find any results for your query... | Exception message |
| ResponseGreetingMessage | Hello, I am Project Management Copilot. How can I help you today? | Response greeting message |
| IntentDetectionPrompt | You are an expert intent classifier system... | Intent detection prompt |
| RephraseAIFailureResponse | Your query appears to be quite extensive... | Rephrase AI failure response |
| NoAvailableDataMessage | No data available for your query... | No available data message |
| SQLQueryRelatedPrompt | You are an expert SQL query detection system... | SQL Query Related Prompt message |
| ValidSqlQueryMessage | Sorry, we do not support these questions at the moment... | Valid SQL Query message |
| IsDbSelfHostAutoSuggestionEndpointEnabled | true,false  | Is Self hosted DB Copilot for Auto suggestion integrated |
| CopilotDbAutoSuggestionEndpointWithFilter | https://sh-virtuoso-buddy-copilot-westus.search.windows.net/indexes/azureblob-index-autosugg-datawithtags/docs/suggest?api-version=2020-06-30 | Copilot DB endpoint that gives autosuggested question |
| copilotDbAutoSuggestionAISearchBotApi-kvr | key for dbcopilot auto suggestion endpoint | Copilot DB Bot Auto Suggestion API key-value reference (attach to kv for security reasons)|
| aiSearchEnabled | false | AI Search Enabled | key to enable aisearch to get the data from the search index instead of CloudGpt|
| minRelevance | 0.5 | Relevance factor for AI Search |
| AISearchIndexName | index name | Name of Index created for AI Search |
| SuggestQuestionsIndexName | index name | Name of Index created for suggestions coming from AI Search |
| KernelMemory.Services.AzureOpenAIText.Auth | ApiKey | Auth Type for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIText.Endpoint | https://oai-virtuoso-buddy-ncus-01.openai.azure.com/ | Endpoint for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIText.APIKey | ApiKey | APIKey for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIText.Deployment | gpt-35-turbo-16k | Deployment Type for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIText.https | https | https for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIText.MaxTokenTotal | 16384 | MaxTokenTotal for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIText.APIType | ChatCompletion | APIType for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIText.MaxRetries | 10 | MaxRetries for AzureOpenAIText |
| KernelMemory.Services.AzureOpenAIEmbedding.Auth | ApiKey | Auth Type for AzureOpenAIEmbedding |
| KernelMemory.Services.AzureOpenAIEmbedding.Endpoint | https://oai-virtuoso-buddy-ncus-01.openai.azure.com/ | Endpoint for AzureOpenAIEmbedding |
| KernelMemory.Services.AzureOpenAIEmbedding.APIKey | ApiKey | APIKey for AzureOpenAIEmbedding |
| KernelMemory.Services.AzureOpenAIEmbedding.Deployment | text-embedding-ada-002 | Deployment Type for AzureOpenAIEmbedding |
| KernelMemory.Services.AzureOpenAIEmbedding.https | https | https for AzureOpenAIEmbedding |
| KernelMemory.Services.AzureOpenAIEmbedding.MaxTokenTotal | 8191 | MaxTokenTotal for AzureOpenAIEmbedding |
| KernelMemory.Services.AzureAISearch.Auth | ApiKey | Auth Type for AzureAISearch |
| KernelMemory.Services.AzureAISearch.Endpoint | https://sh-virtuoso-buddy-copilot-westus.search.windows.net | Endpoint for AzureAISearch |
| KernelMemory.Services.AzureAISearch.APIKey | ApiKey | APIKey for AzureAISearch |
| KernelMemory.Retrieval.SearchClient.MaxAskPromptSize | -1 | Maximum number of tokens accepted by the LLM used to generate answers |
| KernelMemory.Retrieval.SearchClient.MaxMatchesCount | 100 | Maximum number of relevant sources to consider when generating an answer |
| KernelMemory.Retrieval.SearchClient.AnswerTokens | 300 | How many tokens to reserve for the answer generated by the LLM |
| KernelMemory.Retrieval.SearchClient.EmptyAnswer | EmptyAnswer | Text to return when the LLM cannot produce an answer |
| ResponseFormatRelatedPrompt | You are developing an intent classification system.. | Response Format Detection Prompt |
| IntentAndResponseDetectionPrompt | As an expert intent classifier, you classify user queries into.. | Intent and Response Format Detection Prompt |
| CheckPromptForSQLQuery | true | Flag to enable check for SQL query in input |
| DBCopilotExtensiveQuery | Your current query is retrieving a large .. | Message returned in case of DbCopilot timeout |

Copy below json in the appsettings.Development.json
```
{

  "AzureAd": {
    "TokenIssuer1": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "microsoft.onmicrosoft.com",
    "TenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "ClientId": "",
    "Audience": ""
  },
  "ConnectionStrings": {
    "AppInsightsInstrumentationKey": ""
  },
  "Logging": {
    "LogLevel": {
      "Default": "Trace",
      "System": "Information",
      "Microsoft": "Information"
    }
  },
  "VirtuosoCopilotBotName": "Project Management Copilot",
  "LogLevl": "Trace",
  "ShowExceptionMessage": "true",
  "TestLoginUser": "mabadola@microsoft.com",
  "AppConfigurationEndpoint": "",
  "IsManagedIdentityEnabled": "false",
  "UserManagedIdentityId": "",
  "OpenAiEndpoint": "",
  "copilotDbBotOpenApi-kvr": "",
  "MaxTokenValue": "8000",
  "TemperatureValue": "0.7",
  "deploymentOrModelName": "gpt-35-turbo-16k-0613",

  "IsCloudGPTEnabled": "true",
  "CloudGptEndpoint": "",
  "copilotDbCloudGpt-kvr": "",

  "IsDbSelfHostEndpointEnabled": "false",
  "CopilotDbEndpoint": "",
  "copilotDbBotApi-kvr": "",

  "IsCopilotDbDebugModeOn": "false",
  "AiFlag": "true",

  "ExceptionMessage": "Sorry, we couldn't find any results for your query. Can you please rephrase your query and try again?",
  "ResponseGreetingMessage": "Hello, I am Project Management Copilot. How can I help you today?",
  "IntentDetectionPrompt": "As an expert intent classifier, you classify user queries into three categories: dbcopilot, cloudgpt, and greetings. If the response format is unclear, default to 'text'.\n\ndbcopilot: Queries that require database access. These pertain to project details and can be answered in formats like rows/columns, average, count, or top 'n' list.\ncloudgpt: Queries answered using a predefined knowledge base, typically about project management. The response could be a definition, steps, FAQs, access modifications, or persona/roles.\ngreetings: User introductions or greetings. Examples include 'Hi', 'How are you?', 'Hola', 'Hello' etc.\n\nYour task is to identify the intent of user questions and return the result without any metadata or explanation. The response format should be one of the following: htmltable, markdown, image, graph, text. Follow the examples strictly.\n \nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration as a markdown table.\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\nQuestion: Show active projects by delivery region and consumption KPI status as a graph. Use appropriate colors in graph as a  bar chart.\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'graph'}\nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration.\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration as an image\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'image'}\nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration as a htmltable\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'htmltable'}\nQuestion: Can you provide a detailed summary of my projects including name, status, planned end date, financials, risk reserve, and next submit date?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Are there any risks, actions, issues, or findings overdue or within one month of the due date in my engagements?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Can you provide a summarized list of RAID items highlighting the due dates and any delays?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Why are some of my engagements and their financials in yellow or red status?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Can you show the projects in my portfolio that have been in red status for over 3 weeks, including their name, status, domain, last updated date, and duration?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: What are the active projects in my portfolio as DME, their total billed revenues, and their distribution by delivery region and consumption KPI status?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Can you list the projects managed by a specific person and their cost rate?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Who are the DMEs of my projects and can you find the OKRs from active engagements?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Are there any CPOEs from my engagements that are due or overdue?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: What are the conditions for considering a contract amendment in CompassOne as internal and when does a change request require a contract amendment in c1?  \nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: What are the key financial KPIs being monitored and what actions should be taken for proper financial management of an engagement?  \nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you explain cost overrun, its impact on RR, and how it affects the financial RYG?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}  \nQuestion: How can I update and edit risk status and findings in the project status report?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: What is a GTG Action Item and how can it be updated in Virtuoso? Who is authorized to do so?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}  \nQuestion: What is the recommended frequency for updating the status of an engagement and does it vary depending on the type of engagement?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: why can't I see forecast in Billed Revenue in Virtuoso?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you elaborate on the conditions and guidelines for achieving a green status in financial RYG, considering factors like forecast to plan variance and cost overrun? Please provide specific percentages for different ranges.\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I add an enrollment id to cloud consumption and where can I find complete ACR data for the project or customer?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you explain the entries in the Data Element dropdown field in the Data Protection Questionnaire and where can I find Secure by Default?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I submit the ISRA form and where can I find videos of DevOps setup on Virtuoso?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you describe the project initiation process and steps, and how to resolve issues with PIH showing as incomplete?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: What is the markup for subcontractors and what templates are used for SPOD and proof of delivery for subcontractors?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you explain the DME role and how to activate a project with On-Hold Risk and Slow burn risk?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Is there a specific template for POE for FF projects and how can I request a re-evaluation of the CPOE indicator if it's not accurate?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I upload a DAF to Virtuoso and where can I find a template for the delivery acceptance form?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I resolve issues with the submit button and CPE survey, and is it possible to export dashboard data to excel?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: ",
  "RephraseAIFailureResponse": "Your query appears to be quite extensive. To assist you more effectively, could you please consider rephrasing your query to be more concise and specific?",
  "NoAvailableDataMessage": "No data available for your query. For further questions, feel free to ask.",
  "Instructions": "Given a question and then answer in tabular format representing data, Please reply in List or statement using both. Try to be precise with the output and avoid any extra information like the full form of the acronyms which are not in the original input. Please make sure that you strictly follow all the rules given below: -Revenue should have a dollar symbol. -When the result is displayed in a List, column headings must have meaningful column names with no symbols. -Don't generate extra information that is not in the input. -Do not return row-by-row record count in the statement. -When the answer does not have data or only column names, return a 'no data available' message for that question"
  "SQLQueryRelatedPrompt": "You are an expert SQL query detection system, which can identify if the given input is a valid SQL query.\nYou need to identify if the input is a SQL query so that SQL injection can be stopped\nYou have to classify the user query into two classes - [yes, no]\nBelow is the description for the two classes\n1. yes: The input query can be in the following format: a. The user input should be a valid SQL statement.\n Example: select top 10 * from tablename\n b. The input query asks for the table definition \n Example:give me columns of table projectrisk\n c. The input query asks to list the column names of tables \n Example:give me columns of table projectrisk\n d.The user input query asks for information about users in any database objects \n Answer: yes\n2. no: The user input is not a SQL query\n   Example: View 10 active projects having RED status for over 3 weeks with name, status, domain, last updated and duration.\n  Example: count of active projects \n Example: give me action type for active or pending action items for projectid 32010 \n Example: give me title of active or pending action items for projectid 32010 \n Example: list the impact area of active or pending action items for projectid 32010 \n Example: provide the due date for active or pending action items for projectid 32010 \n Example:give me 2 active projects as markdown table \n Example: show top 5 projects as table \n Example:give me 2 active projects as table \n Example: show 5 active projects as html table \n Example: show top 5 projects with project name, id and status as table \n Example: list the actions that have a resolution provided \n Example: list the actions that have a due date in the past but are still active \n Answer: no\nNote: Do not add any metadata or explanation to the answer, just return the intent.\nThe answer format should be : Answer: output class ",
  "ValidSqlQueryMessage": "Sorry, we do not support these questions at the moment. Please ask a different question.",
  "CopilotDbAutoSuggestionEndpointWithFilter": "",
  "copilotDbAutoSuggestionAISearchBotApi-kvr": "",
  "IsDbSelfHostAutoSuggestionEndpointEnabled": "true",
  "aiSearchEnabled": "false",
  "minRelevance": "0.5",
  "AISearchIndexName": "",
  "SuggestQuestionsIndexName": "",

  "KernelMemory": {
    "Services": {
      "AzureOpenAIText": {
        "Auth": "ApiKey",
        "Endpoint": "",
        "APIKey": "",
        "Deployment": "gpt-35-turbo-16k",
        "https": "",
        "MaxTokenTotal": "16384",
        "APIType": "ChatCompletion",
        "MaxRetries": "10"
      },
      "AzureOpenAIEmbedding": {
        "Auth": "ApiKey",
        "Endpoint": "",
        "APIKey": "",
        "Deployment": "text-embedding-ada-002",
        "https": "",
        "MaxTokenTotal": "8191"
      },
      "AzureAISearch": {
        "Auth": "ApiKey",
        "Endpoint": "",
        "APIKey": ""
      }
    },
    "Retrieval": {
      "SearchClient": {
        "MaxAskPromptSize": "-1",
        "MaxMatchesCount": "100",
        "AnswerTokens": "300",
        "EmptyAnswer": "INFO NOT FOUND"
      }
    }
  },
  "ResponseFormatRelatedPrompt": "You are developing an intent classification system to categorize response of user queries into five predefined intents: `graph`, `htmltable`, `markdown`,`image` and `text`. - `htmltable`: Indicates the user wants data presented in tabular format. - `graph`: Indicates the user wants data presented in graph format or pie chart format or bar graph format. - `image`: Indicates the user wants data presented in image format. - `markdown`: Indicates the user wants data presented in markdown format or markdown table format. - `text`: Denotes queries that do not specifically request for any of graph,htmltable or markdown format.**Instructions:**Given a user query as input, you need to classify it into one of the above intents. If the user query contains content words like 'table' or 'tabular' or 'html' or 'html markup' classify it as `htmltable`;If the user query contains content words like 'markdown' or 'markdown table,' classify it as `markdown`; If the user query contains content words like 'image' or 'image format,' classify it as `image`; If the user query contains content words like 'graph' or 'pie chart,' classify it as `graph`; textwise, classify it as `text`.**Example Output Format:**- If the intent is `htmltable`: `{'intent': 'htmltable'}`- If the intent is `graph`: `{'intent': 'graph'}`- If the intent is `image`: `{'intent': 'image'}`- If the intent is `markdown`: `{'intent': 'markdown'}`- If the intent is `text`: `{'intent': 'text'}`**Examples:**1. **Input:** 'Show me the sales data in a tabular format.'- **Output:** `{'intent': 'htmltable'}`2. **Input:** 'What are the total sales for January?'- **Output:** `{'intent': 'text'}`3. **Input:** 'Can you provide a table of monthly expenses?'- **Output:** `{'intent': 'htmltable'}`4. **Input:** 'Show active projects by delivery region and consumption KPI status as a graph. Use appropriate colors in graph'- **Output:** `{'intent': 'graph'}`5. **Input:** 'show top 5 projects with project name, id and status as table'- **Output:** `{'intent': 'htmltable'}`6. **Input:** 'what is cost overrun. show me in markdown formatted table'- **Output:** `{'intent': 'markdown'}`7. **Input:** 'Give me a pie chart on action type for active projects'- **Output:** `{'intent': 'graph'}`8. **Input:** 'show top 5 projects with project name, id and status as html'- **Output:** `{'intent': 'htmltable'}`9. **Input:** 'what is markdown'- **Output:** `{'intent': 'text'}` 10. **Input:** 'Give me 2 active projects as image'- **Output:** `{'intent': 'image'}`11. **Input:** 'Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration'- **Output:** `{'intent': 'text'}` Remember, only return the intent and adhere strictly to the given format.",
  "IntentAndResponseDetectionPrompt": "As an expert intent classifier, you classify user queries into three categories: dbcopilot, cloudgpt, and greetings. If the response format is unclear, default to 'text'.\n\ndbcopilot: Queries that require database access. These pertain to project details and can be answered in formats like rows/columns, average, count, or top 'n' list.\ncloudgpt: Queries answered using a predefined knowledge base, typically about project management. The response could be a definition, steps, FAQs, access modifications, or persona/roles.\ngreetings: User introductions or greetings. Examples include 'Hi', 'How are you?', 'Hola', 'Hello' etc.\n\nYour task is to identify the intent of user questions and return the result without any metadata or explanation. The response format should be one of the following: htmltable, markdown, image, graph, text. Follow the examples strictly.\n \nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration as a markdown table.\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\nQuestion: Show active projects by delivery region and consumption KPI status as a graph. Use appropriate colors in graph as a  bar chart.\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'graph'}\nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration.\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'text'}\nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration as an image\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'image'}\nQuestion: Show top 10 active projects having RED status for over 3 weeks, give name, status, domain, last updated and duration as a htmltable\nAnswer: { 'intent': 'dbcopilot', 'responseFormat': 'htmltable'}\nQuestion: Can you provide a detailed summary of my projects including name, status, planned end date, financials, risk reserve, and next submit date?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Are there any risks, actions, issues, or findings overdue or within one month of the due date in my engagements?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Can you provide a summarized list of RAID items highlighting the due dates and any delays?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Why are some of my engagements and their financials in yellow or red status?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Can you show the projects in my portfolio that have been in red status for over 3 weeks, including their name, status, domain, last updated date, and duration?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: What are the active projects in my portfolio as DME, their total billed revenues, and their distribution by delivery region and consumption KPI status?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Can you list the projects managed by a specific person and their cost rate?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Who are the DMEs of my projects and can you find the OKRs from active engagements?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: Are there any CPOEs from my engagements that are due or overdue?\nAnswer: { 'intent': dbcopilot, 'responseFormat': 'text'}\nQuestion: What are the conditions for considering a contract amendment in CompassOne as internal and when does a change request require a contract amendment in c1?  \nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: What are the key financial KPIs being monitored and what actions should be taken for proper financial management of an engagement?  \nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you explain cost overrun, its impact on RR, and how it affects the financial RYG?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}  \nQuestion: How can I update and edit risk status and findings in the project status report?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: What is a GTG Action Item and how can it be updated in Virtuoso? Who is authorized to do so?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}  \nQuestion: What is the recommended frequency for updating the status of an engagement and does it vary depending on the type of engagement?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: why can't I see forecast in Billed Revenue in Virtuoso?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you elaborate on the conditions and guidelines for achieving a green status in financial RYG, considering factors like forecast to plan variance and cost overrun? Please provide specific percentages for different ranges.\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I add an enrollment id to cloud consumption and where can I find complete ACR data for the project or customer?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you explain the entries in the Data Element dropdown field in the Data Protection Questionnaire and where can I find Secure by Default?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I submit the ISRA form and where can I find videos of DevOps setup on Virtuoso?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you describe the project initiation process and steps, and how to resolve issues with PIH showing as incomplete?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: What is the markup for subcontractors and what templates are used for SPOD and proof of delivery for subcontractors?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Can you explain the DME role and how to activate a project with On-Hold Risk and Slow burn risk?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: Is there a specific template for POE for FF projects and how can I request a re-evaluation of the CPOE indicator if it's not accurate?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I upload a DAF to Virtuoso and where can I find a template for the delivery acceptance form?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: How can I resolve issues with the submit button and CPE survey, and is it possible to export dashboard data to excel?\nAnswer: { 'intent': cloudgpt, 'responseFormat': 'text'}\nQuestion: ",
  "CheckPromptForSQLQuery": "true",
  "DBCopilotExtensiveQuery": "Your current query is retrieving a large volume of data. Could you please refine it? For instance, you could use a ‘TOP N’ clause to limit the number of records or add more specific filters on attributes to narrow down the results. This would help in managing the data load and speeding up the response time. Thank you!"
}
```
1. Run the API
2. Navigate to API project
   1. Update the App configuration end point  "AppConfigurationEndpoint": "https://virtuoso-ac-buddy.azconfig.io",
 
 For some of the confidential configuration, they could also be stored in Azure KeyVault and refer them via [secret references](https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references?tabs=azure-cli). Configure your App Configuraiton to read from KV.

1. Open a terminal and naviate to the Web Project location which host Copilot UI
2. Issue npm install --force command
3. to run  npm run dev
4. Run Visual Studio, Start debugging

### Azure DevOps build

1. Refer pipelines in repo and tune them based on your environment
