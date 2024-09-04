// <copyright file="IAreaService.cs" company="Microsoft Corporation">
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
    public interface IAreaService
    {
        void AddArea(Area area);
        void UpdateArea(Area area);
        int DeleteArea(int areaId);
        Area FindArea(int areaId);
        IEnumerable<CommonModel> GetAll();
    }
}
