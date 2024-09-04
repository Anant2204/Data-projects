// <copyright file="UserService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class UserService : IUserServices, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public UserService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DeleteUser(int userId)
        {
            var config = _dbContext.Users.Find(userId);
            if (config != null)
            {
                _dbContext.Users.Remove(config);
                _dbContext.SaveChanges();
            }
        }
        public User FindUser(int userId)
        {
            var result = _dbContext.Users.Where(x => x.Id == userId).FirstOrDefault();
            return result;
        }

        public async Task<UserHelper?> FindUserIdByEmail(string? emailId, string? Oid)
        {
            var upnParam = new SqlParameter("@EmailId", (object)emailId ?? DBNull.Value);
            var oIDParam = new SqlParameter("@OID", (object)Oid ?? DBNull.Value);
            var result = _dbContext.Set<UserHelper>()
                 .FromSqlRaw("EXEC BSO.GetUserByIdFromEmailDetails @EmailId, @OID", upnParam, oIDParam)
                 .AsEnumerable() // Switch to client-side processing
                                 // .Where(u => u.IsActive) // Perform additional in-memory filtering
                 .FirstOrDefault();
            return result;
        }


        // Test service for Performace
        public async Task<UserHelper> FindUserIdByEmailPerf(string emailId)
        {
            var upnParam = new SqlParameter("@EmailId", emailId);
            var result = _dbContext.Set<UserHelper>()
                 .FromSqlRaw("EXEC BSO.GetUserByIdFromEmailDetailsTest @EmailId", upnParam)
                 .AsEnumerable() // Switch to client-side processing
                                 // .Where(u => u.IsActive) // Perform additional in-memory filtering
                 .FirstOrDefault();
            return result;
        }


        public void UpdateUserByObjectID(string userOBjectId, List<string> values)
        {
            if (values == null)
            {
                throw new ArgumentNullException(nameof(values));
            }

            try
            {
                var userADGroupIDDataTable = new DataTable();
                userADGroupIDDataTable.Locale = CultureInfo.InvariantCulture;

                userADGroupIDDataTable.Columns.Add("UserADGroupID", typeof(string));
                foreach (var userADGroupID in values)
                {
                    userADGroupIDDataTable.Rows.Add(userADGroupID);
                }
                var userADGroupIDParam = new SqlParameter("@UserADGroupIDs", SqlDbType.Structured)
                {
                    TypeName = "BSO.UserADGroupListForJob",
                    Value = userADGroupIDDataTable
                };
                var idParam = new SqlParameter("@OID", userOBjectId);
                _dbContext.Database.ExecuteSqlRaw("EXEC BSO.UpdateUserByObjectID @OID, @UserADGroupIDs",
                       idParam, userADGroupIDParam);

                var result = _dbContext.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }



        public IEnumerable<UserHelper> GetAll()
        {
            return _dbContext.Set<UserHelper>().FromSqlRaw("EXEC BSO.GetAllUsers").ToList();
        }



        public async Task<int[]> AddUser(UserHelper userOb)
        {
            if (userOb == null)
            {
                throw new ArgumentNullException(nameof(userOb));
            }

            try
            {
                // Use ternary operators for concise code
                var upnParam = new SqlParameter("@UPN", string.IsNullOrWhiteSpace(userOb.UPN) ? DBNull.Value : (object)userOb.UPN);
                var userAreaParam = new SqlParameter("@UserArea", userOb.UserArea == 0 ? DBNull.Value : (object)userOb.UserArea);
                var userRoleParam = new SqlParameter("@UserRole", userOb.UserRole == 0 ? DBNull.Value : (object)userOb.UserRole);

                var userADGroupIDDataTable = new DataTable();
                userADGroupIDDataTable.Locale = CultureInfo.InvariantCulture;
                userADGroupIDDataTable.Columns.Add("UserADGroupID", typeof(int));

                foreach (var userADGroupID in userOb.UserADGroupID)
                {
                    userADGroupIDDataTable.Rows.Add(userADGroupID.UserADGroupID);
                }


                foreach (var userADGroupID in userOb.UserADGroupID)
                {
                    userADGroupIDDataTable.Rows.Add(userADGroupID.UserADGroupID);
                }

                var userADGroupIDParam = new SqlParameter("@UserADGroupIDs", SqlDbType.Structured)
                {
                    TypeName = "BSO.UserADGroupIDList",
                    Value = userADGroupIDDataTable
                };

                var segmentParam = new SqlParameter("@Segment", userOb.Segment == 0 ? DBNull.Value : (object)userOb.Segment);
                var subSegmentParam = new SqlParameter("@SubSegment", userOb.SubSegment) // Fixed parameter name
                {
                    Value = userOb.SubSegment == 0 ? DBNull.Value : (object)userOb.SubSegment
                };

                var dataverseRowIDParam = new SqlParameter("@DataverseRowID", userOb.DataverseRowID);

                var isActiveParam = new SqlParameter("@IsActive", userOb.IsActive);
                var oIdParam = new SqlParameter("@Oid", userOb.Oid);
                var idParam = new SqlParameter("@Id", SqlDbType.Int) { Direction = ParameterDirection.Output };
                var userAreaOutParam = new SqlParameter("@OutUserArea", SqlDbType.Int) { Direction = ParameterDirection.Output };

                var isWelcomeMessageParam = new SqlParameter("@IsWelcomeMessage", userOb.IsWelcomeMessage);

                // Use parameter names in the SQL command for clarity
                _dbContext.Database.ExecuteSqlRaw(
                    "EXEC BSO.AddUser @UPN, @Oid, @UserArea, @UserRole, @UserADGroupIDs, @Segment, @SubSegment, @DataverseRowID, @IsActive, @IsWelcomeMessage, @Id OUTPUT, @OutUserArea OUTPUT",
                    upnParam, oIdParam, userAreaParam, userRoleParam, userADGroupIDParam, segmentParam, subSegmentParam, dataverseRowIDParam, isActiveParam, isWelcomeMessageParam, idParam, userAreaOutParam);

                var generatedId = new int[] { (int)idParam.Value, (int)userAreaOutParam.Value };

                var result = await _dbContext.SaveChangesAsync();

                return generatedId;
            }
            catch (Exception)
            {

                throw;
            }
        }



        public void UpdateUser(UserHelper userOb)
        {
            if (userOb == null)
            {
                throw new ArgumentNullException(nameof(userOb));
            }

            try
            {
                var userADGroupIDDataTable = new DataTable();
                userADGroupIDDataTable.Locale = CultureInfo.InvariantCulture;

                userADGroupIDDataTable.Columns.Add("UserADGroupID", typeof(int));
                foreach (var userADGroupID in userOb.UserADGroupID)
                {
                    userADGroupIDDataTable.Rows.Add(userADGroupID.UserADGroupID);
                }

                var userADGroupIDParam = new SqlParameter("@UserADGroupIDs", SqlDbType.Structured)
                {
                    TypeName = "BSO.UserADGroupIDList",
                    Value = userADGroupIDDataTable
                };
                var idParam = new SqlParameter("@ID", userOb.Id);
                var upnParam = new SqlParameter("@UPN", userOb.UPN);
                var userAreaParam = new SqlParameter("@UserArea", userOb.UserArea);
                var userRoleParam = new SqlParameter("@UserRole", userOb.UserRole);

                var segmentParam = new SqlParameter("@Segment", userOb.Segment);
                var subSegmentParam = new SqlParameter("@SubSegment", SqlDbType.NVarChar)
                {
                    Value = (object)userOb.SubSegment ?? DBNull.Value
                };

                var dataverseRowIDParam = new SqlParameter("@DataverseRowID", userOb.DataverseRowID);
                var isActiveParam = new SqlParameter("@IsActive", userOb.IsActive);

                var isWelcomeMessageParam = new SqlParameter("@IsWelcomeMessage", SqlDbType.Bit)
                {
                    Value = (object)userOb.IsWelcomeMessage ?? DBNull.Value,
                    IsNullable = true
                };


                //   var isWelcomeMessageParam = new SqlParameter("@IsWelcomeMessage", userOb.IsWelcomeMessage);
                _dbContext.Database.ExecuteSqlRaw("EXEC BSO.UpdateUser @ID, @UPN, @UserArea, @UserRole, @Segment, @SubSegment, @DataverseRowID, @IsActive,@IsWelcomeMessage, @UserADGroupIDs",
                           idParam, upnParam, userAreaParam, userRoleParam, segmentParam, subSegmentParam, dataverseRowIDParam, isActiveParam, isWelcomeMessageParam, userADGroupIDParam);



                var result = _dbContext.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DisableUserAndRelatedData(string upn)
        {
            var upnParam = new SqlParameter("@UPN", upn);
            _dbContext.Database.ExecuteSqlRaw("Exec [BSO].DeleteUserAndRelatedData @UPN", upnParam);

            _dbContext.SaveChanges();
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
    }
}
