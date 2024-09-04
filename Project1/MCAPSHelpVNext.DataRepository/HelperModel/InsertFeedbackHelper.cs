// <copyright file="InsertFeedbackHelper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class InsertFeedbackHelper
    {    
        public int userID { get;set; }
        public string satisfactionLevel { get; set; }
        public string? pleaseTellUs { get; set; }


        public System.Uri? screenshotUrl { get; set; }
        public string? email { get; set; }   

    }
}
