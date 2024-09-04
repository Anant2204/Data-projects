// <copyright file="ISubSegmentService.cs" company="Microsoft Corporation">
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
    public interface ISubSegmentService
    {
        void AddSubSegment(SubSegment subSegment);
        void UpdateSubSegment(SubSegment subSegment);
        void DeleteSubSegment(int subSegmentId);
        SubSegment FindSubSegment(int subSegmentId);
        IEnumerable<SubSegment> GetAll();

        IEnumerable<CommonModel> GetAllSubSegmentBySegmentId(int segmentId);
    }
}
