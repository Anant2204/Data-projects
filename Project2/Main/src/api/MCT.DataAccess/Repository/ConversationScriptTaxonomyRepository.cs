// <copyright file="ConversationScriptTaxonomyRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Repository
{
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Linq;
    using Constants = MCT.DataAccess.ApplicationConstants;

    /// <summary>
    /// ConversationScriptTaxonomyRepository
    /// </summary>
    public class ConversationScriptTaxonomyRepository : IConversationScriptTaxonomyRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;

        /// <summary>ConversationScriptTaxonomyRepository</summary>
        /// <param name="context">The context.</param>
        public ConversationScriptTaxonomyRepository(ConversationContext context)
        {
            _context = context;
        }

        /// <summary>
        ///Emp Conversation Script   Method.
        /// </summary>
        public async Task<EmpConversationScriptResponse> GetEmpConversationScript(HrDataModel empHrData, string requestFrom)
        {
            EmpConversationScriptResponse empConversationScriptResponse = new EmpConversationScriptResponse();

            empConversationScriptResponse.EmpAlias = empHrData.Ic;

            empConversationScriptResponse.EmpName = empHrData.IcFullName;
            TaxonomyDto cyTaxonomyData = new TaxonomyDto()
            {
                Org = empHrData.CyOrg,
                IncentivePlan = empHrData.CyIncentivePlan,
                Q1 = empHrData.CyQ1,
                Q2 = empHrData.CyQ2,
                RoleSummary = empHrData.CyRoleSummary,
                CareerStage = empHrData.CyCareerStage,
                Discipline = empHrData.CyDiscipline,
                Profession = empHrData.CyProfession,
                BusinessLeader = GetBusinessLeader(empHrData.Ic, "Cy"),
                Manager = empHrData.CyManagerFullName
            };
            empConversationScriptResponse.CYTaxonomy = cyTaxonomyData;

            TaxonomyDto fyTaxonomyData = new TaxonomyDto()
            {
                Org = empHrData.FyOrg,
                IncentivePlan = empHrData.FyIncentivePlan,
                Q1 = empHrData.FyQ1,
                Q2 = empHrData.FyQ2,
                RoleSummary = empHrData.FyRoleSummary,
                CareerStage = empHrData.FyCareerStage,
                Discipline = empHrData.FyDiscipline,
                Profession = empHrData.FyProfession,
                BusinessLeader = GetBusinessLeader(empHrData.Ic, "Fy"),
                Manager = empHrData.FyManagerFullName
            };
            var cyManagerHierarchy = await _context.DimManagerhierarchies.FirstOrDefaultAsync(s => s.Mtype == ApplicationConstants.CY && s.Ic == empHrData.CyManagerAlias).ConfigureAwait(false);
            var fyManagerHiearachy = await _context.DimManagerhierarchies.FirstOrDefaultAsync(s => s.Mtype == ApplicationConstants.FY && s.Ic == empHrData.FyManagerAlias).ConfigureAwait(false);

            if (cyManagerHierarchy != null && fyManagerHiearachy != null)
            {
                string? cyHigherManager = cyManagerHierarchy.DirectManagerAlias;
                string? fyHigherManager = fyManagerHiearachy.DirectManagerAlias;

                if (cyHigherManager?.ToLowerInvariant() != fyHigherManager?.ToLowerInvariant())
                {
                    fyTaxonomyData.M2 = fyHigherManager;
                    cyTaxonomyData.M2 = cyHigherManager;
                }
            }


            empConversationScriptResponse.FYTaxonomy = fyTaxonomyData;

            var specificChangeForEmployee = string.Empty;
            var sectionDeatils = await _context.GetSectionDetailsResult(empHrData.Ic, requestFrom).ConfigureAwait(false);
            empConversationScriptResponse.SectionDetails = new List<SectionDetails>();

            if (sectionDeatils != null)
            {
                foreach (var section in sectionDeatils)
                {
                    empConversationScriptResponse.SectionDetails.Add(new SectionDetails
                    {
                        Content = section.SectionValue,
                        SectionName = section.SectionName,
                        DisplayValue = section.DisplayName
                    });
                }
            }

            return empConversationScriptResponse;

        }

        /// <summary>
        /// UpdateConversationScript .
        /// </summary>
        /// <param name="conversationScriptUpdateScenarioRequest">Conversation completion request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <returns></returns>
        public async Task<bool> UpdateConversationScript(ConversationScriptUpdateScenarioRequest conversationScriptUpdateScenarioRequest, string loggedInUserAlias)
        {
            bool isUpdate = false;
            if (conversationScriptUpdateScenarioRequest == null)
            {
                return isUpdate;
            }

            var tccData = conversationScriptUpdateScenarioRequest.Id;
            // Find the record with the given IC
            if (tccData != null)
            {
                foreach (var tcc in tccData)
                {
                    ConversationScriptUpdateScenarioRequest content = new ConversationScriptUpdateScenarioRequest();
                    // var specificContextOptionalData = await _context.ScriptsTemplateContexts.Where(s => s.Section == Constants.SpecificContextOptional && (s.CY_Org == null || s.CY_Org == tcc.CyOrg)
                    //&& (s.CY_Q1 == null || s.CY_Q1 == tcc.CyQ1) && (s.CY_Q2 == null || s.CY_Q2 == tcc.CyQ2) &&
                    //(s.CY_Q2 == null || s.CY_RoleSummary == tcc.CyRoleSummary) && (s.CY_Org == null || s.CY_Org == tcc.CyOrg) &&
                    //(s.FY_Q1 == null || s.FY_Q1 == tcc.FyQ1) && (s.FY_Q2 == null || s.FY_Q2 == tcc.FyQ2) &&
                    //(s.FY_RoleSummary == null || s.FY_RoleSummary == tcc.FyRoleSummary) &&
                    //(s.FY_Org == null || s.FY_Org == tcc.FyOrg)).FirstOrDefaultAsync().ConfigureAwait(false);       

                    var specificContextOptionalData = await _context.ScriptsTemplates.Where(s => (s.Section == Constants.SpecificContextOptional) && (s.Id == tcc)).FirstOrDefaultAsync().ConfigureAwait(false);

                    if (specificContextOptionalData != null)
                    {
                        var title = conversationScriptUpdateScenarioRequest.Content != null ? conversationScriptUpdateScenarioRequest.Content.Title : null;

                        var specificContextOptional = conversationScriptUpdateScenarioRequest.Content != null ? conversationScriptUpdateScenarioRequest.Content.SpecificContextOptional : null;

                        var disciplineContextOptional = conversationScriptUpdateScenarioRequest.Content != null ? conversationScriptUpdateScenarioRequest.Content.DisciplineContextOptional : null;

                        var exclusion = conversationScriptUpdateScenarioRequest.Content != null ? conversationScriptUpdateScenarioRequest.Content.Exclusions : null;

                        var exclusions = exclusion != null ? string.Join(",", exclusion) : null;
                        specificContextOptionalData.ContextDescription = specificContextOptional;
                        specificContextOptionalData.Title = title;
                        specificContextOptionalData.DisciplineContextOptional = disciplineContextOptional;
                        specificContextOptionalData.Exclusion = exclusions;
                        specificContextOptionalData.CreatedBy = specificContextOptionalData.CreatedBy == ApplicationConstants.System ? loggedInUserAlias : specificContextOptionalData.CreatedBy;
                        specificContextOptionalData.CreatedOn = specificContextOptionalData.CreatedBy == ApplicationConstants.System ? DateTime.UtcNow : specificContextOptionalData.CreatedOn;
                        specificContextOptionalData.ModifiedBy = loggedInUserAlias;
                        specificContextOptionalData.ModifiedOn = DateTime.UtcNow;
                        _context.Entry(specificContextOptionalData).State = EntityState.Modified;
                        await _context.SaveChangesAsync().ConfigureAwait(false);
                        isUpdate = true;
                    }

                }
            }

            return isUpdate;
        }

        /// <summary>
        /// GetEmpHrData .
        /// </summary>
        /// <param name="empAlias">empAlias.</param>
        /// <returns></returns>
        public async Task<HrDataModel?> GetEmpHrData(string empAlias)
        {
            var hrdata = await _context.TblHrdata.Where(s => s.Ic == empAlias).Select(s => new HrDataModel()
            {

                CyCareerStage = s.CyCareerStage,
                CyRoleSummary = s.CyRoleSummary,
                CyCostCenter = s.CyCostCenter,
                CyQ1 = s.CyQ1,
                FyCareerStage = s.FyCareerStage,
                CyQ2 = s.CyQ2,
                FyRoleSummary = s.FyRoleSummary,
                CyDiscipline = s.CyDiscipline,
                CyIncentivePlan = s.CyIncentivePlan,
                CyOrg = s.CyOrg,
                CyProfession = s.CyProfession,
                FyCostCenter = s.FyCostCenter,
                FyDiscipline = s.FyDiscipline,
                FyIncentivePlan = s.FyIncentivePlan,
                FyOrg = s.FyOrg,
                FyProfession = s.FyProfession,
                FyQ1 = s.FyQ1,
                FyQ2 = s.FyQ2,
                Ic = s.Ic,
                IcFullName = s.IcFullName,
                ReportsToLevel2FullName = s.ReportsToLevel2FullName,
                CyManagerAlias = s.CyManagerAlias,
                CyManagerFullName = s.CyManagerFullName,
                FyManagerAlias = s.FyManagerAlias,
                FyManagerFullName = s.FyManagerFullName


            }).FirstOrDefaultAsync().ConfigureAwait(false);

            return hrdata;
        }


        private string? GetBusinessLeader(string? ic, string? type)
        {
            if (ic == null)
            {
                return null;
            }          

            var yearType = type == "Cy" ? "CY" : "FY";

            var businessLeader = (from orgLeader in _context.TblOrgLeaders
                                  join hierarchy in _context.DimManagerhierarchies on orgLeader.Manager equals hierarchy.ManagerAlias
                                  where hierarchy.Ic == ic && hierarchy.Mtype == type
                                  orderby hierarchy.ManagerLevel descending
                                  select new
                                  {
                                      businessLeader = orgLeader.Manager
                                  }).FirstOrDefault();


            if (businessLeader != null && businessLeader.businessLeader != null)
            {
                string? leader = businessLeader.businessLeader.ToString();
                return GetFullName(leader);
            }


            else if (businessLeader == null)
            {
                var result = _context.DimManagerhierarchies
                .Where(row => row.Ic == ic && row.Mtype == type)
                .OrderByDescending(row => row.ManagerLevel)
                .Skip(1)
                .FirstOrDefault();

                if (result != null && result.ManagerAlias != null)
                {
                    string leader = result.ManagerAlias.ToString();
                    return GetFullName(leader);

                }

                return null;
            }

            return null;
        }

        private string? GetFullName(string? alias)
        {
            if (alias == null)
            {
                return null;
            }

            var employeeRecord = _context.TblHrdata.Where(s => s.Ic == alias).FirstOrDefault();

            if (employeeRecord != null && employeeRecord.IcFullName != null)
            {
                return employeeRecord.IcFullName.ToString();
            }

            return null;
        }

        private string? GetProfession(string? rolesummary)
        {
            string? profession = "";
            var ispRolesummary = _context.IspRolesummaries.Where(s => s.IspName == rolesummary).FirstOrDefault();
            if (ispRolesummary != null)
            {
                profession = ispRolesummary.IspProfession;
                // ispRolesummary.Professioncode = profession.IspProfessioncode
            }
            return profession;
        }

        private string? GetDiscipline(string? roleSummary)
        {
            if (roleSummary != null)
            {
                roleSummary = roleSummary.Trim();
            }
            string discipline = "";
            if (roleSummary != null && roleSummary.Contains(" "))
            {
                discipline = roleSummary.Remove(roleSummary.LastIndexOf(' ')).TrimEnd();
            }
            return discipline;
        }

        //private useFulResource[] GetUsefulResources()
        //{
        //    var useFulResourse = _context.ScriptsTemplates.Where(s => s.Section == Constants.UsefulResource).OrderBy(s => s.Seq).Select(s => s.ContextDescription).ToArray();
        //    List<useFulResource> useFulResources = new List<useFulResource>();
        //    foreach (var item in useFulResourse)
        //    {
        //        useFulResource resource = new useFulResource();
        //        if (item != null)
        //        {
        //            var splitedItem = item.Split("#");
        //            resource.Text = splitedItem[0];
        //            resource.Url = splitedItem[1];
        //            useFulResources.Add(resource);
        //        }
        //    }

        //    return useFulResources.ToArray();
        //}

        private static string GetSpecificChangeForEmp(VwHrdatum empHrData, TaxonomyDto cyTaxonomyData, TaxonomyDto fyTaxonomyData, string specificChangeForEmployee)
        {
            if (empHrData.CyOrg != empHrData.FyOrg)
            {
                var formatedString = $" {"<li>"}{Constants.OrgChange} {empHrData.CyOrg} {Constants.To} {empHrData.FyOrg} {"</li>"}";
                specificChangeForEmployee = specificChangeForEmployee + formatedString;
            }
            if (empHrData.CyRoleSummary != empHrData.FyRoleSummary)
            {
                var formatedString = $"{"<li>"}{Constants.RoleSummary} {empHrData.CyRoleSummary} {Constants.To} {empHrData.FyRoleSummary} {"</li>"}";
                specificChangeForEmployee = $"{specificChangeForEmployee}{formatedString}";
            }
            if (empHrData.CyQ1 != empHrData.FyQ1)
            {
                var formatedString = $"{"<li>"}{Constants.Qualifier1} {empHrData.CyQ1} {Constants.To} {empHrData.FyQ1}  {"</li>"}";
                specificChangeForEmployee = $"{specificChangeForEmployee}{formatedString}";
            }
            if (empHrData.CyQ2 != empHrData.FyQ2)
            {
                var formatedString = $"{"<li>"}{Constants.Qualifier2} {empHrData.CyQ2} {Constants.To} {empHrData.FyQ2} {"</li>"}";
                specificChangeForEmployee = $"{specificChangeForEmployee}{formatedString}";
            }
            if (empHrData.CyIncentivePlan != empHrData.FyIncentivePlan)
            {
                var formatedString = $"{"<li>"}{Constants.IncentivePlan} {empHrData.CyIncentivePlan} {Constants.To} {empHrData.FyIncentivePlan} {"</li>"}";
                specificChangeForEmployee = $"{specificChangeForEmployee}{formatedString}";
            }
            if (empHrData.CyCareerStage != empHrData.FyCareerStage)
            {
                var formatedString = $"{"<li>"} {Constants.CareerStage} {empHrData.CyCareerStage} {Constants.To} {empHrData.FyCareerStage} {"</li>"}";
                specificChangeForEmployee = $"{specificChangeForEmployee}{formatedString}";
            }
            //if ((cyTaxonomyData.Discipline != null && fyTaxonomyData.Discipline != null) && (cyTaxonomyData.Discipline != fyTaxonomyData.Discipline))
            //{
            //    var formatedString =  $"{Constants.Discipline} {empHrData.d} {empHrData.FyCareerStage}";
            //    specificChangeForEmployee = $"{specificChangeForEmployee}  {formatedString}";
            //    specificChangeForEmployee = specificChangeForEmployee + Constants.Discipline + cyTaxonomyData.Discipline + Constants.To + fyTaxonomyData.Discipline +"/";
            //}

            return specificChangeForEmployee;
        }

    }
}
