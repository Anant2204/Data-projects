// <copyright file="IServiceOwnerServiceRepository.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.IRepository
{
    public interface IServiceOwnerServiceRepository
    {
        void AddServiceOwner(ServiceOwnerServiceModel obj);
        void UpdateServiceOwner(ServiceOwnerServiceModel obj);
        void DeleteServiceOwner(int objId);
        ServiceOwnerServiceModel FindServiceOwner(int objId);
        IEnumerable<ServiceOwnerServiceModel> GetAll();
    }
}
