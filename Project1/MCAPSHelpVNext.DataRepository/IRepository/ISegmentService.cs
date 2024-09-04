// <copyright file="ISegmentService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.IRepository
{
    public interface ISegmentService
    {
        void AddSegment(Segment segment);
        void UpdateSegment(Segment segment);
        void DeleteSegment(int segmentId);
        Segment FindSegment(int segmentId);        
        IEnumerable<CommonModel> GetAll();
        IEnumerable<CommonModel> GetAllSegmentByRole(int id);
    }
}
