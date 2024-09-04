// ***********************************************************************
// <copyright file="TestHelper.cs" company="Microsoft">
//     Copyright (c) . All rights reserved. 
// </copyright>
// ***********************************************************************

namespace Copilot.Backend.Test
{
    using Moq;
    using Newtonsoft.Json;
    using System;
    using System.Threading.Tasks;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;

    /// <summary>
    /// Test helper class to wtite mock methods
    /// </summary>
    public static class TestHelper
    {
        /// <summary>
        /// Mock Retunrn to Cloud GPT Response
        /// </summary>
        /// <param name="rephrasedQuestion"></param>
        /// <param name="currentParentId"></param>
        /// <param name="intentFinderServiceMock"></param>
        /// <param name="expectedReply"></param>
        /// <returns></returns>
        public static Task<string> GetCloudGptResponseAsync(string rephrasedQuestion, BotQuestionParams currentQuestionParams, Mock<IIntentFinderService> intentFinderServiceMock, string expectedReply)
        {
            var jsonResponse = new
            {
                reply = expectedReply,
                parentId = currentQuestionParams.ParentId,
                greeting = intentFinderServiceMock.Object.IntentFinderResponse(rephrasedQuestion, currentQuestionParams).Result.Equals("greeting", StringComparison.OrdinalIgnoreCase)
            };

            return Task.FromResult(JsonConvert.SerializeObject(jsonResponse));
        }

        
    }
}
