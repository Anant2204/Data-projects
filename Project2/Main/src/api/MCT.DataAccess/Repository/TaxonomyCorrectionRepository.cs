// <copyright file="TaxonomyCorrectionRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Repository
{
    using System.Data;
    using System.Linq;
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;

    /// <summary>
    /// TaxonomyCorrectionRepository
    /// </summary>
    public class TaxonomyCorrectionRepository : ITaxonomyCorrectionRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;

        /// <summary>Initializes a new instance of the <see cref="ITaxonomyCorrectionRepository" /> class.</summary>
        /// <param name="context">The context.</param>
        public TaxonomyCorrectionRepository(ConversationContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get list of role summary based on org and carrer stage
        /// </summary>
        /// <param name="taxonomyRoleSummaryChangeRequest"></param>
        /// <returns></returns>
        public async Task<TaxonomyDetailsInHierarchyResponse?> GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(TaxonomyRoleSummaryChangeRequest taxonomyRoleSummaryChangeRequest)
        {
            var entities = await this._context.GetTaxonomyResult(taxonomyRoleSummaryChangeRequest.Org, taxonomyRoleSummaryChangeRequest.CareerStage).ConfigureAwait(false);

            if (entities == null || entities.Count == 0)
            {
                return null;
            }

            TaxonomyDetailsInHierarchyResponse taxonomyDetails = new TaxonomyDetailsInHierarchyResponse()
            {
                TaxonomyDetails = this.CreateRoleSummary(entities),
            };

            return taxonomyDetails;
        }

        /// <summary>
        /// Update the future manager.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="icDetails">The details of IC.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="loggedInUserFullName"></param>
        /// <returns>True if the update is successful, otherwise false.</returns>
        public async Task<bool> SubmitTaxonomyCorrectionRequestAsync(TaxonomyChangeRequest request, ManagerAndTaxonomyDetailsForCYandFY icDetails, string loggedInUserAlias, string loggedInUserFullName)
        {

            var requestedBy = await _context.TblHrdata.Where(x => x.Ic == loggedInUserAlias).Select(x => x.IcFullName).FirstOrDefaultAsync();
            if (String.IsNullOrEmpty(requestedBy))
            {
                requestedBy = loggedInUserFullName;
            }
            var taxonomyCorrection = new TblHrdataTaxonomyCorrection
            {
                IcAlias = request.IcAlias,
                IcName = icDetails.IcFullName,
                CyManagerAlias = icDetails.CyManagerAlias,
                FyManagerAlias = icDetails.FyManagerAlias,
                CyOrg = icDetails.CyOrg,
                FyOrg = icDetails.FyOrg,
                ProposedOrg = icDetails.FyOrg,
                CyRoleSummary = icDetails.CyRoleSummary,
                FyRoleSummary = icDetails.FyRoleSummary,
                ProposedRoleSummary = request.RoleSummary,
                CyCareerStage = icDetails.CyCareerStage,
                FyCareerStage = icDetails.FyCareerStage,
                ProposedCareerStage = icDetails.FyCareerStage,
                CyCostCenter = icDetails.CyCostCenter,
                FyCostCenter = icDetails.FyCostCenter,
                ProposedCostCenter = icDetails.FyCostCenter,
                CyIncentivePlan = icDetails.CyIncentivePlan,
                FyIncentivePlan = icDetails.FyIncentivePlan,
                ProposedIncentivePlan = icDetails.FyIncentivePlan,
                CyQ1 = icDetails.CyQ1,
                FyQ1 = icDetails.FyQ1,
                ProposedQ1 = request.Q1,
                CyQ2 = icDetails.CyQ2,
                FyQ2 = icDetails.FyQ2,
                ProposedQ2 = request.Q2,
                Status = MessageConstants.TaxonomyCorrectionRequestSubmittedStatus,
                Comments = request.Comments,
                IsActive = true,
                CreatedBy = loggedInUserAlias,
                CreatedByUserFullName = requestedBy,
                ModifiedBy = loggedInUserAlias
            };

            _context.TblHrdataTaxonomyCorrections.Add(taxonomyCorrection);

            _context.Entry(taxonomyCorrection).State = EntityState.Added;

            await _context.SaveChangesAsync().ConfigureAwait(false);

            return true;
        }

        /// <summary>
        /// Get list of taxonomy change request
        /// </summary>
        /// <param name="loggedInUserAlias">Logged in UserName</param>
        /// <param name="roleList">User Role List</param>
        /// <param name="completeReportingHierarchy"></param>
        /// <returns>List of TaxonomyCorrection Requests</returns>
        public async Task<List<GetTaxonomyCorrectionRequestsResult>> GetTaxonomyChangeRequestAsync(string loggedInUserAlias, string roleList, bool completeReportingHierarchy = true)
        {
            var result = await _context.GetTaxonomyChangeRequest(loggedInUserAlias, roleList, completeReportingHierarchy).ConfigureAwait(false);
            return result;
        }

        private List<TaxonomyDetailsInHierarchy> CreateRoleSummary(List<GetTaxonomyResult> entites)
        {
            List<TaxonomyDetailsInHierarchy> list = new List<TaxonomyDetailsInHierarchy>();

            var roleSummaries = entites.Where(x => x.RoleSummary != null).Select(x => x.RoleSummary).Distinct().ToList();

            foreach (var roleSummary in roleSummaries)
            {
                TaxonomyDetailsInHierarchy taxonomyDetails = new TaxonomyDetailsInHierarchy()
                {
                    RoleSummary = roleSummary,
                    QualifierInfoDetails = this.CreateQ1(entites, roleSummary),
                };

                list.Add(taxonomyDetails);
            }

            return list;
        }

        private List<QualifierInfo> CreateQ1(List<GetTaxonomyResult> entites, string? roleSummary)
        {
            List<QualifierInfo> qualifierInfo = new List<QualifierInfo>();

            var filteredEntities = entites.Where(x => x.RoleSummary == roleSummary);

            var qualifier1List = filteredEntities.Where(x => x.Q1 != null).Select(x => x.Q1).Distinct().OrderBy(x => x).ToList();

            var q1ToQ2Lookup = filteredEntities.Where(x => x.Q2 != null).ToLookup(x => x.Q1, x => x.Q2);

            foreach (var qualifier1 in qualifier1List)
            {
                qualifierInfo.Add(new QualifierInfo
                {
                    Q1 = qualifier1,
                    Q2 = q1ToQ2Lookup[qualifier1].Distinct().OrderBy(x => x).ToList(),
                });
            }

            return qualifierInfo;
        }
    }
}
