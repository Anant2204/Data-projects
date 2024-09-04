namespace Copilot.Backend.Integration.Tests
{
    //-----------------------------------------------------------------------
    // <copyright file="Constants.cs" company="Microsoft">
    //     Copyright (c) Microsoft. All rights reserved.
    // </copyright>
    //-----------------------------------------------------------------------

    /// <summary>
    /// Constants class
    /// </summary>
    public static class Constants
    {
        #region Constants
        /// <summary>
        /// The Copilot API constant for VwwCopilot/Question
        /// </summary>
        public static readonly string GetAnswerBasedOnQuestion = "VwwCopilot/Question";

        /// <summary>
        /// The Copilot API constant for VwwCopilot/PostSummaryQuestionToCopilotBot
        /// </summary>
        public static readonly string PostSummaryQuestionToCopilotBot = "VwwCopilot/PostSummaryQuestionToCopilotBot";

        /// <summary>
        /// The Copilot API constant for VwwCopilot
        /// </summary>
        public static readonly string PostQuestionToPhraserBot = "VwwCopilot/";

        /// <summary>
        /// The Copilot API constant for VwwCopilot/PostSummaryQuestionToCopilotBot
        /// </summary>
        public static readonly string PostQuestionToCopilotBot = "VwwCopilot/PostQuestionToCopilotBot";

        /// <summary>
        /// The Copilot Integration Test Constant
        /// </summary>
        public static readonly string CopilotIntegrationTest = "Copilot_Integration_Test";

        /// <summary>
        /// Getting started token message
        /// </summary>
        public static readonly string GettingTokenStartedMessage = "Getting Token Started for Copilot API";

        /// <summary>
        /// Token received message
        /// </summary>
        public static readonly string TokenReceivedMessage = "Token Received for Copilot API";

        /// <summary>
        /// The Buddy Key Vault Name
        /// </summary>
        public static readonly string BuddyKeyVaultName = "BuddyKeyVaultName";

        /// <summary>
        /// The Application Json request constant
        /// </summary>
        public static readonly string AppJson = "application/json";

        #endregion
    }
}

