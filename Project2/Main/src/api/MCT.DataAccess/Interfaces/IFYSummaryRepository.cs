// <copyright file="IFYSummaryRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    using MCT.DataAccess.Models;

    /// <summary>
    /// Interface of FY summary repository.
    /// </summary>
    public interface IFYSummaryRepository
    {
        /// <summary>
        /// Get current year employee details.
        /// </summary>
        /// <param name="managerAliasList">List of manager aliases.</param>
        /// <returns>List of employee details to be shown in FY summary for current year.</returns>
        Task<List<FYSummaryDto>> GetCurrentYearEmployeesAsync(IEnumerable<string> managerAliasList);

        /// <summary>
        /// Get current year employee details.
        /// </summary>
        /// <param name="managerAliasList">List of manager aliases.</param>
        /// <returns>List of employee details to be shown in FY summary for future year.</returns>
        Task<List<FYSummaryDto>> GetFutureYearEmployeesAsync(IEnumerable<string> managerAliasList);

        /// <summary>
        /// Get current year employee details.
        /// </summary>
        /// <param name="managerAliasList">List of manager aliases.</param>
        /// <returns>Statistics for FY summary.</returns>
        Task<FYSummaryStatisticsResponse> GetStatisticsAsync(IEnumerable<string> managerAliasList);
    }
}
