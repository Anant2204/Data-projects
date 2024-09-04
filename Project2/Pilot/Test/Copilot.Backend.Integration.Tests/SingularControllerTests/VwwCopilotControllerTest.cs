//-----------------------------------------------------------------------
// <copyright file="VwwCopilotControllerTest.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Integration.Tests
{
    /// <summary>
    /// Test the profile info
    /// </summary>
    [TestCaseOrderer("Copilot.Backend.Integration.Tests.DisplayNameOrder", "Copilot.Backend.Integration.Tests")]
    public class VwwCopilotControllerTest
    {
        public static BotQuestionParams botQuestionParams;

        static VwwCopilotControllerTest()
        {
            Setup.Initialize();
            RequestCreator();
        }

        private static void RequestCreator()
        {
            botQuestionParams = new BotQuestionParams()
            {
                ParentId="",
                Question="",
                SessionId=""
            };
        }

        /// <summary>
        /// Checks to see if we are getting valid response after posting a question
        /// </summary>
        /// <returns>A Task</returns>
        /// commenting out since getting error while generating buddy access token due to AADSTS53003: Access has been blocked by Conditional Access policies. The access policy does not allow token issuance.
        //[Fact]
        //public async Task PostQuestionAndValidateResponse_VwwCopilot_Question_Test()
        //{
        //    //Arrange
        //    var botQuestionParams = new BotQuestionParams
        //    {
        //        ParentId = "test",
        //        Question = "what is a string",
        //        SessionId = "test"
        //    };

        //    //Act
        //    var result = await HttpClientHelper.PostCopilotApiAsync<BotQuestionParams, string>(Constants.GetAnswerBasedOnQuestion, botQuestionParams);

        //    //Assert
        //    Assert.IsType<string>(result);
        //}

    }
}