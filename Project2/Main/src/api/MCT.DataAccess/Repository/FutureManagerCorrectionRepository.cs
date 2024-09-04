// <copyright file="FutureManagerCorrectionRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Repository
{
    using System.Data;
    using System.Linq;
    using System.Text;
    using System.Xml.Linq;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json.Linq;

    /// <summary>
    /// FutureManagerCorrection Repository
    /// </summary>
    /// <seealso cref="MCT.DataAccess.Interfaces.IFutureManagerCorrectionRepository" />
    public class FutureManagerCorrectionRepository : IFutureManagerCorrectionRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;

        /// <summary>Initializes a new instance of the <see cref="IFutureManagerCorrectionRepository" /> class.</summary>
        /// <param name="context">The context.</param>
        public FutureManagerCorrectionRepository(ConversationContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Checks whether logged in user has access to tool or not.
        /// </summary>
        public async Task<List<FutureManager>> GetFutureManager(string loggedInUserAlias, string searchString)
        {
            /////Todo   
            var results = await (from hrdata in _context.TblHrdata 
                join sellerDetails in _context.TblSellerDetails on hrdata.Ic equals sellerDetails.Alias
                where ((hrdata.Ic !=null && hrdata.Ic.Contains(searchString)) ||  (hrdata.IcFullName != null && hrdata.IcFullName.Contains(searchString)))  && sellerDetails.ReviewStatus != ApplicationConstants.ExceptionReviewStatus
                                 select new FutureManager{
                    Ic = hrdata.Ic ?? string.Empty,
                    FullName = hrdata.IcFullName ?? string.Empty

                }).ToListAsync().ConfigureAwait(false);

            return results;
        }

        /// <summary>
        /// Update the future manager.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="employeeManager">The employee manager.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>True if the update is successful, otherwise false.</returns>
        public async Task<bool> UpdateFutureManager(FutureManagerChangeRequest request, EmployeeManager employeeManager, string loggedInUserAlias)
        {
            bool twoLevelApprovalRequiredForIc = false;

            bool? twoLevelApprovalRequired = await _context.GetApproverLevelResult(request.empAlias).ConfigureAwait(false);


            if (twoLevelApprovalRequired != null)
            {
                twoLevelApprovalRequiredForIc = twoLevelApprovalRequired == null || twoLevelApprovalRequired == false ? false : true;
            }
            var fyManagerCorrection = new TblHrdataFymanagerCorrection
            {
                IcAlias = request.empAlias,
                CyManagerAlias = employeeManager.CYManagerAlias,
                FyManagerAlias = employeeManager.FYManagerAlias,
                FyCorrectManagerAlias = request.UpdatedManager,
                Status = MessageConstants.FYManagerCorrectionRequestInitiatedStatus,
                Comment = request.Comments,
                IspUpdateStatus = null,
                IspErrorDetails = null,
                IsActive = true,
                CreatedBy = loggedInUserAlias,
                ModifiedBy = loggedInUserAlias,
                TwoLevelApprovalRequired = twoLevelApprovalRequiredForIc

            };

            _context.TblHrdataFymanagerCorrections.Add(fyManagerCorrection);

            _context.Entry(fyManagerCorrection).State = EntityState.Added;

            await _context.SaveChangesAsync().ConfigureAwait(false);

            return true;

        }

        /// <summary>
        /// Gets the future manager correction status.
        /// </summary>
        /// <param name="icAlias">The ic alias.</param>
        /// <returns></returns>
        public async Task<FutureManagerCorrectionStatusResponse?> GetFutureManagerCorrectionStatus(string icAlias)
        {
            var query = _context.TblHrdataFymanagerCorrections;
            return await query.Where(t => t.IcAlias == icAlias && t.IsActive == true && t.Status != "Approved" && t.Status != "Rejected").Select(s => new FutureManagerCorrectionStatusResponse()
            {
                EmployeeName = s.IcAlias,
                RequestStatus = s.Status,
                ProposedFutureYearManager = s.FyManagerAlias,
                CurrentFutureYearManager = s.CyManagerAlias,
                CurrentYearManager = s.CyManagerAlias,
                SubmittedBy = s.CreatedBy,
                ApprovedRejectedBy = s.ModifiedBy,
                approvedRejectedDate = s.ModifiedDate
            }).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Checks the circular reference asynchronous.
        /// </summary>
        /// <param name="icAlias">The ic alias.</param>
        /// <param name="mgrAlias">The MGR alias.</param>
        /// <returns></returns>
        public async Task<bool> CheckCircularReferenceAsync(string icAlias, string mgrAlias)
        {
            var icAliasParam = new SqlParameter("@ICalias", icAlias);
            var mgrAliasParam = new SqlParameter("@Mgralias", mgrAlias);

            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT [HR].[Ufn_CheckCircularReference](@ICalias, @Mgralias)";
                command.Parameters.Add(icAliasParam);
                command.Parameters.Add(mgrAliasParam);

                var result = await command.ExecuteScalarAsync();
                return result != null && (bool)result;
            }
        }

        /// <summary>
        /// Checks whether tagged as exception or not.
        /// </summary>
        /// <param name="alias">The ic alias.</param>
        /// <returns>Whether tagged as exception or not.</returns>
        public async Task<bool> IsTaggedAsExceptionAsync(string alias)
        {
            return await _context.TblSellerDetails.CountAsync
                (x => x.Alias == alias && x.ReviewStatus == ApplicationConstants.ExceptionReviewStatus).ConfigureAwait(false) > 0;
        }


        /// <summary>
        /// Get future manager correction request.
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roleList"></param>
        /// <param name="CompleteReportingHierarchy"></param>
        /// <returns>Returns List future manager correction request.</returns>
        public async Task<List<GetFutureManagerRequestsResult>> GetFutureManagerCorrectionRequest(string loggedInUserAlias, string roleList, bool CompleteReportingHierarchy = true)
        {
            var result = await _context.GetFutureManagerCorrectionRequest(loggedInUserAlias, roleList, CompleteReportingHierarchy);
            return result;
        }


        /// <summary>
        /// Updates the FYManager Correction Status.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="roleList">The roleList.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>True if the update is successful, otherwise false.</returns>
        public async Task<bool?> UpdateFYManagerCorrectionStatusAsync(UpdateFYManagerCorrectionStatusRequest request, string loggedInUserAlias, List<string> roleList)
        {
            if (request == null)
            {
                return false;
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var status = request.IsApproveOrReject ? ApplicationConstants.FYManagerCorrectionApprovedLevelTwoStatus : ApplicationConstants.FYManagerUpdateRejectedStatus;

                    if (roleList.Contains(ApplicationConstants.EdmLeadRole))
                    {
                        await UpdateStatusForLevelTwoApproval(request, loggedInUserAlias, request.IcAlias, status);
                    }

                    else
                    {
                        var pendingApprovalRequests = await _context.TblHrdataFymanagerCorrections.Where(s => s.IcAlias != null && request.IcAlias.Contains(s.IcAlias) && (s.Status == ApplicationConstants.FYManagerCorrectionPendingApprovalStatus)).Select(s => new
                        {
                            s.TwoLevelApprovalRequired,
                            s.IcAlias
                        }).ToListAsync().ConfigureAwait(false);

                        if (pendingApprovalRequests != null)
                        {
                            var level1ApprovalRequired = pendingApprovalRequests.Where(s => s.TwoLevelApprovalRequired == false).Select(s => s.IcAlias);
                            var level2ApprovalRequired = pendingApprovalRequests.Where(s => s.TwoLevelApprovalRequired == true).Select(s => s.IcAlias);

                            if (level1ApprovalRequired != null && level1ApprovalRequired.Count() > 0)
                            {
                                await UpdateStatusForLevelOneApproval(request, loggedInUserAlias, level1ApprovalRequired, status).ConfigureAwait(false);
                            }
                            if (level2ApprovalRequired != null && level2ApprovalRequired.Count() > 0)
                            {
                                status = request.IsApproveOrReject ? ApplicationConstants.FYManagerCorrectionApprovedLevelOneStatus : ApplicationConstants.FYManagerUpdateRejectedStatus;

                                await UpdateStatusForLevelOneApproval(request, loggedInUserAlias, level2ApprovalRequired, status).ConfigureAwait(false);
                            }

                        }

                    }
                    _context.SaveChanges();

                    transaction.Commit();
                    return true;

                }
                catch (Exception ex)
                {
                    // Handle exceptions and rollback transaction if needed
                    transaction.Rollback();
                    throw ex;
                }
            }


        }

        /// <summary>
        /// Check the IsEmployeeReviewStatusIsApproved.
        /// </summary>
        /// <param name="icAlias">The ic alias.</param>
        /// <returns></returns>
        public async Task<bool> IsEmployeeRecordApproved(string icAlias)
        {

            bool isEmployeeRecordApproved = false;
            var results = await _context.TblSellerDetails.Where(s => s.Alias == icAlias).FirstOrDefaultAsync().ConfigureAwait(false);
            if (results != null)
            {
                isEmployeeRecordApproved = results.ReviewStatus == ApplicationConstants.Approved ? true : false;
            }

            return isEmployeeRecordApproved;
        }

        /// <summary>
        /// Checks whether Manager is there or not in table.
        /// </summary>
        /// <param name="alias">The ic alias.</param>
        /// <returns>Whether Manager is there or not in table.</returns>
        public async Task<bool> IsSelectedManagerIsValid(string alias)
        {
            bool isSelectedManagerIsValid = false;

            var results = await _context.TblHrdata.Where(s => s.Ic == alias).FirstOrDefaultAsync().ConfigureAwait(false);
            if (results != null)
            {
                isSelectedManagerIsValid = true;
            }
            return isSelectedManagerIsValid;
        }

        private async Task UpdateStatusForLevelOneApproval(UpdateFYManagerCorrectionStatusRequest request, string loggedInUserAlias, IEnumerable<string?> ic, string status)
        {
            var ics = ic.ToArray();
            var idList = request.IdList.ToArray();
            var icParameters = ics.Select((ic, index) => new SqlParameter($"@Ic{index}", ic)).ToArray();
            var idParameters = idList.Select((id, index) => new SqlParameter($"@Id{index}", id)).ToArray();
            var query = new StringBuilder()
                .AppendLine("UPDATE HR.[Tbl_HRData_FYManagerCorrection]")
                .AppendLine("SET status = @status,")
                .AppendLine("approvedRejectedBy = @approvedRejectedBy,")
                .AppendLine("approvedRejectedDate = @approvedRejectedDate,")
                .AppendLine("approverComments = @approverComments,")
                .AppendLine("modifiedBy = @modifyBy,")
                .AppendLine("modifiedDate = @modifyDate")
                .AppendLine("WHERE icAlias IN (" + string.Join(", ", icParameters.Select(p => p.ParameterName)) + ")")
                .AppendLine("AND id IN (" + string.Join(", ", idParameters.Select(p => p.ParameterName)) + ")");

            var allParameters = new List<SqlParameter>
            {
                new SqlParameter("@status", status),
                new SqlParameter("@approvedRejectedBy", loggedInUserAlias),
                new SqlParameter("@approvedRejectedDate", DateTime.UtcNow),
                new SqlParameter("@approverComments", request.Comments),
                new SqlParameter("@modifyBy", loggedInUserAlias),
                new SqlParameter("@modifyDate", DateTime.UtcNow),
            }
            .Concat(icParameters)
            .Concat(idParameters)
            .ToArray();

            var rowsAffected = await _context.Database.ExecuteSqlRawAsync(query.ToString(), allParameters);
        }

        private async Task UpdateStatusForLevelTwoApproval(UpdateFYManagerCorrectionStatusRequest request, string loggedInUserAlias, IEnumerable<string?> ic, string status)
        {

            var ics = ic.ToArray();
            var idList = request.IdList.ToArray();

            string[] statusList = { ApplicationConstants.FYManagerCorrectionApprovedLevelTwoStatus, ApplicationConstants.FYManagerUpdateRejectedStatus };

            var icParameters = ics.Select((ic, index) => new SqlParameter($"@Ic{index}", ic)).ToArray();
            var idParameters = idList.Select((id, index) => new SqlParameter($"@Id{index}", id)).ToArray();

            var query = new StringBuilder()
                .AppendLine("UPDATE HR.[Tbl_HRData_FYManagerCorrection]")
                .AppendLine("SET status = @status,")
                .AppendLine("approvedRejectedByLevel2 = @approvedRejectedBy2,")
                .AppendLine("approvedRejectedDateByLevel2 = @approvedRejectedDate2,")
                .AppendLine("approverRejecterCommentsByLevel2 = @approverComments2,")
                .AppendLine("modifiedBy = @modifyBy,")
                .AppendLine("modifiedDate = @modifyDate")
                .AppendLine("WHERE icAlias IN (" + string.Join(", ", icParameters.Select(p => p.ParameterName)) + ")")
                .AppendLine("AND id IN (" + string.Join(", ", idParameters.Select(p => p.ParameterName)) + ")");

            var parameters = new List<SqlParameter>
            {
                new SqlParameter("@status", status),
                new SqlParameter("@approvedRejectedBy2", loggedInUserAlias),
                new SqlParameter("@approvedRejectedDate2", DateTime.UtcNow),
                new SqlParameter("@approverComments2", request.Comments),
                new SqlParameter("@modifyBy", loggedInUserAlias),
                new SqlParameter("@modifyDate", DateTime.UtcNow),

            }
            .Concat(icParameters)
            .Concat(idParameters)
            .ToArray();
            // Execute raw SQL query to update the record
            var rowsAffected = await _context.Database.ExecuteSqlRawAsync(query.ToString(), parameters);
        }
       
    }
}


