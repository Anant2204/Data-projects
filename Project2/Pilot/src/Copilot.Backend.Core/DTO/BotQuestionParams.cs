//-----------------------------------------------------------------------
// <copyright file="BotQuestionParams.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.DTO
{
    public class BotQuestionParams
    {
        /// <summary>
        /// Question ask to bot
        /// </summary>
        public string? Question { get; set; }
        /// <summary>
        /// Parent Id pass by bot
        /// </summary>
        public string? ParentId { get; set; }
        /// <summary>
        /// session of conversation
        /// </summary>
        public string? SessionId { get; set; }
        /// <summary>
        /// Conversation ID
        /// </summary>
        public string? ConversationId { get; set; }

        /// <summary>
        /// User Alias passing to all service
        /// </summary>
        public string? UserAlias { get; set; }
    }
}
