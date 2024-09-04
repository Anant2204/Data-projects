// <copyright file="IServiceOwnerRepository.cs" company="Microsoft Corporation">
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
    public interface IServiceOwnerRepository
    {
        void AddServiceOwner(ServiceOwnerModel obj);
        void UpdateServiceOwner(ServiceOwnerModel obj);
        void DeleteServiceOwner(int objId);
        ServiceOwnerModel FindServiceOwner(int objId);
        IEnumerable<ServiceOwnerModel> GetAll();
    }
}
