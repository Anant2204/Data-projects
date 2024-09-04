// <copyright file="IConfigService.cs" company="Microsoft Corporation">
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
    public interface IConfigService
    {
        void AddConfig(Config config);
        void UpdateConfig(Config config);
        void DeleteConfig(int configId);
        Config FindConfig(int configId);
        IEnumerable<Config> GetAll();

    }
}
