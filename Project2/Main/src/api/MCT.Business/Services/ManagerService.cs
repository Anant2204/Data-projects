// <copyright file="IUnitOfWork.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.Business.Services
{
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Linq;

    using MCT.Business.Interfaces;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;

    using Microsoft.AspNetCore.Authentication;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    /// <summary>
    ///  Manager Service.
    /// </summary>
    public class ManagerService : IManagerService
    {
        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>Initializes a new instance of the <see cref="ManagerService" /> class.</summary>
        /// <param name="unitOfWork">The unit of work.</param>
        public ManagerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <inheritdoc/>
        public async Task<GetManagerWithDefaultSelection> GetManagerList(ManagerListRequest managerListRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
                {
                    { "User", loggedInUserAlias },
                };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "605EA077-ABC5-4611-AAAA-0DCBCE41D52E", $"Starting - {this.GetType()}.GetManagerList");
                GetManagerWithDefaultSelection response = new GetManagerWithDefaultSelection();

                var repositoryObj = _unitOfWork.GetRepository<IManagerRepository>();

                if (repositoryObj == null)
                {
                    return response;
                }

                var managersList = await repositoryObj.GetManagersList(loggedInUserAlias, managerListRequest.CompleteReportingHierarchy, roleList).ConfigureAwait(false);
                var searchPattern = managerListRequest.SearchPattern;
                if (string.IsNullOrWhiteSpace(searchPattern) && managersList != null && managersList.Any())
                {
                    string? defaultSelection = managersList.FirstOrDefault(x => x.IsDefaultSelection == true)?.ManagerAlias;
                    response.DefaultSelection = defaultSelection;
                    foreach (var manager in managersList)
                    {
                        response.Managers.Add(new Manager { Alias = manager.ManagerAlias, FullName = manager.FullName });
                    }
                }
                else
                {
                    if (managersList != null)
                    {
                        foreach (var manager in managersList)
                        {
                            if (searchPattern != null && (manager.ManagerAlias.Contains(searchPattern, StringComparison.InvariantCultureIgnoreCase) || manager.FullName.Contains(searchPattern, StringComparison.InvariantCultureIgnoreCase)))
                            {
                                response.Managers.Add(new Manager { Alias = manager.ManagerAlias, FullName = manager.FullName });
                            }
                        }
                    }
                    string? defaultSelection = managersList?.FirstOrDefault(x => x.IsDefaultSelection == true)?.ManagerAlias;
                    response.DefaultSelection = defaultSelection;
                }

                stopWatch.Stop();

                return response;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("605EA077-ABC5-4611-AAAA-0DCBCE41D52E", ex.Message, ex);
                throw;
            }
            finally
            {

                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("605EA077-ABC5-4611-AAAA-0DCBCE41D52E", "GetManagerList", eventProperties, metrics);
            }
        }
    }
}
