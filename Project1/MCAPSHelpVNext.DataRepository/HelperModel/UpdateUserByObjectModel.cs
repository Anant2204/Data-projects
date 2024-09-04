// <copyright file="UpdateUserByObjectModel.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class UpdateUserByObjectModel
    {
        public string? Oid { get; set; }
       
        public virtual List<UserADGroupIDList> UserADGroupID { get; private set; }
    }
}
