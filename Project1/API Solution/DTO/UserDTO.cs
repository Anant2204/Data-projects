// <copyright file="UserDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.HelperModel;

namespace MCAPSHelpVNext.Controllers.DTO
{
    /// <summary>
    /// UserDTO
    /// </summary>
    public class UserDTO
    {
        /// <summary>
        ///      Property Name - Id.
        ///  </summary>
        public int Id { get; set; }
        /// <summary>
        ///      Property Name - UPN.
        ///  </summary>
        public string UPN { get; set; }
        /// <summary>
        ///      Property Name - Oid.
        ///  </summary>
        public string? Oid { get; set; }

        /// <summary>
        ///      Property Name - UserArea.
        ///  </summary>
        public int UserArea { get; set; }
        /// <summary>
        ///      Property Name - UserRole.
        ///  </summary>
        public int UserRole { get; set; }
        /// <summary>
        ///      Property Name - UserADGroupID.
        ///  </summary>
        public List<UserADGroupIDList> UserADGroupID { get;  set; }
        /// <summary>
        ///      Property Name - Segment.
        ///  </summary>
        public int Segment { get; set; }
        /// <summary>
        ///      Property Name - SubSegment.
        ///  </summary>
        public int? SubSegment { get; set; }

        /// <summary>
        ///      Property Name - DataverseRowID.
        ///  </summary>
        public Guid DataverseRowID { get; set; }

        /// <summary>
        ///      Property Name - IsActive.
        ///  </summary>
        public bool IsActive { get; set; }

        /// <summary>
        ///      Property Name - IsWelcomeMessage.
        ///  </summary>
        public bool? IsWelcomeMessage { get; set; }
    }
}
