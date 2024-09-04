// <copyright file="InsertFeedbackHelperBinder.cs" company="Microsoft Corporation">
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
    public class InsertFeedbackHelperBinder
    {
        public int userID { get; set; }
        public string? satisfactionLevel { get; set; }
        public string? pleaseTellUs { get; set; }
        public System.Uri? screenshotUrl { get; set; }
        public System.Uri? videoUrl { get; set; }
        public System.Uri? fileUrl { get; set; }
        public string? email { get; set; }
        public IFormFile? File { get; set; }
        public IFormFile? VideoFile { get; set; }
        public IFormFile? ImageFile { get; set; }
        public string ? typeOfFeedback { get; set; }
    }
}
