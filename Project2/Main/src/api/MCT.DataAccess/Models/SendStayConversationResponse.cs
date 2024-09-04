// <copyright file="SendStayConversationResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml.Linq;

    /// <summary>
    /// Send stay conversation response model.
    /// </summary>
    [DataContract]
    public class SendStayConversationResponse
    {
        /// <summary>Gets or sets the send stay conversations.</summary>
        [DataMember(Name = "conversations")]
        public List<SendConversationDto> Conversations { get; set; } = new List<SendConversationDto>();
    }
}
