// <copyright file="ConversationFilter.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    /// <summary>
    /// 
    /// </summary>
    [JsonConverter(typeof(StringEnumConverter))]
    [Flags]
    public enum ConversationFilter
    {
        /// <summary>
        /// Total employees.
        /// </summary>
        [EnumMember(Value = "TotalEmployees")]
        TotalEmployees = 0,

        /// <summary>
        /// Total Completed.
        /// </summary>
        [EnumMember(Value = "TotalCompleted")]
        TotalCompleted = 1,

        /// <summary>
        /// Required Pending.
        /// </summary>
        [EnumMember(Value = "RequiredPending")]
        RequiredPending = 2,

        /// <summary>
        /// Required Completed.
        /// </summary>
        [EnumMember(Value = "RequiredCompleted")]
        RequiredCompleted = 3,

        /// <summary>
        /// required conversations.
        /// </summary>
        [EnumMember(Value = "RequiredConversations")]
        RequiredConversations = 4,

        /// <summary>
        /// Optional Pending.
        /// </summary>
        [EnumMember(Value = "OptionalPending")]
        OptionalPending = 5,

        /// <summary>
        /// Optional completed.
        /// </summary>
        [EnumMember(Value = "OptionalCompleted")]
        OptionalCompleted = 6,

        /// <summary>
        /// Optional conversations.
        /// </summary>
        [EnumMember(Value = "OptionalConversations")]
        OptionalConversations = 7,
    }
}
