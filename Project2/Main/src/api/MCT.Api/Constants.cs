// <copyright file="Constants.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API
{
    /// <summary>
    ///   Constants 
    /// </summary>
    public static class Constants
    {
        /// <summary>The internal server error</summary>
        public const string InternalServerError  = "An Error Occured While Fetching the data";

        /// <summary>
        /// Retrieving user context Error Message.
        /// </summary>
        public const string RetrievingUserContextErrorMessage = "Error retrieving user context.";

        /// <summary>
        /// Insufficient permissions Error Message.
        /// </summary>
        public const string InsufficientPermissionsErrorMessage = "Insufficient permissions while accessing data";

        /// <summary>
        /// Access restricted message.
        /// </summary>
        public const string AccessRestrictedMessage = "CustomError-AccessRestrictedMessage-Access to MCT is restricted. For any inquiries or issues, please contact your local HR representative";

        /// <summary>
        /// The HTTP context response content type
        /// </summary>
        public const string HttpContextResponseContentType = "text/plain; charset=utf-8";

        /// <summary>
        /// MCT Script Conversation URL
        /// </summary>
        public const string MCTScriptUrl = "https://aka.ms/MCTConversationScript";

        /// <summary>
        /// Tool Not Opened Error Message
        /// </summary>
        public const string ToolNotOpenedMessage = "CustomError-ToolNotOpenedMessage-Manager Conversation Tool is not yet opened-Please look out for communication on timelines when tool will open and reach out to your manager for any additional queries.";

        /// <summary>
        /// Tool Closed Error Message
        /// </summary>
        public const string ToolClosedMessage = $"CustomError-ToolClosedMessage-Manager Conversation Tool is now Closed-In Order to have conversation with your employee please download the conversation script and guide located at {MCTScriptUrl}";




    }
}
