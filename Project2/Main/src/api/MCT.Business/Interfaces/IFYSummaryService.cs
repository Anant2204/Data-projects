// <copyright file="IFYSummaryService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.Models;

    /// <summary>
    ///  FY summary service interface.
    /// </summary>
    public interface IFYSummaryService
    {
        /// <summary>Gets the current year employee details.</summary>
        /// <param name="fySummaryRequest">FY summary request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList"></param>
        /// <returns>
        ///   Current year employee details to be shown in FY summary.
        /// </returns>
        Task<FYSummaryResponse?> GetCurrentYearEmployeesAsync(FYSummaryRequest fySummaryRequest, string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Gets the future year employees asynchronous.
        /// </summary>
        /// <param name="fySummaryRequest">The fy summary request.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="roleList">The role list.</param>
        /// <returns>Future year employee details to be shown in FY summary.</returns>
        Task<FYSummaryResponse?> GetFutureYearEmployeesAsync(FYSummaryRequest fySummaryRequest, string loggedInUserAlias,List<string> roleList);

        /// <summary>
        /// Gets the statistics asynchronous.
        /// </summary>
        /// <param name="fySummaryRequest">The fy summary request.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="roleList">The role list.</param>
        /// <returns>Get Statistics to be shown in FY summary.</returns>
        Task<FYSummaryStatisticsResponse?> GetStatisticsAsync(FYSummaryRequest fySummaryRequest, string loggedInUserAlias,List<string> roleList);
    }
}

