// <copyright file="AboutRepository.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class AboutRepository : IAboutRepository, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public AboutRepository(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
                // Add disposal logic for other disposable objects if any
            }
        }
        public object[] GetHTML()
        {
            var data2 = _dbContext.Set<AboutMCAPSHELPHtmlContentTableHelper>().FromSqlRaw("EXEC BSO.GetAboutMCAPSHtmlContent").ToList();
            var data1 = _dbContext.Set<NavigationLink>().FromSqlRaw("EXEC BSO.GetAboutNavigationLinks").ToList();

            var mappedData = MapData(data1);
            var organizedData = OrganizeData(mappedData, null);
            var jsonResult = JsonConvert.SerializeObject(organizedData);

            object[] result = { jsonResult, data2 };

            return result;
        }


        public List<Node> MapData(List<NavigationLink> navigationLinks)
        {
            // Map properties from NavigationLink to Node
            return navigationLinks.Select(link => new Node
            {
                Id = link.Id,
                Name = link.Name,
                Content = link.Content,
                Url = link.Url,
                Key = link.Key,
                ParentLinkId = link.ParentLinkId
            }).ToList();
        }


        public List<Node> OrganizeData(List<Node> flatData, int? parentId)
        {
            var result = new List<Node>();

            foreach (var item in flatData)
            {
                if (item.ParentLinkId == parentId)
                {
                    var children = OrganizeData(flatData, item.Id);
                    if (children.Count > 0)
                    {
                        item.Children = children;
                    }

                    result.Add(item);
                }
            }

            return result;
        }
        public class Node
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Content { get; set; }
            public string Url { get; set; }
            public string Key { get; set; }
            public int? ParentLinkId { get; set; }
            public List<Node> Children { get; set; }
        }
    }
}
