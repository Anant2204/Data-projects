namespace MCT.Business.Test
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;
    using Moq;
    using MCT.Business.Services;
    using MCT.DataAccess.Interfaces;
    using Microsoft.Extensions.Configuration;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.EfModels;
    using MCT.Business.Interfaces;
   
    public class CommonServiceTests
    {
        private readonly Mock<ICommonRepository> _mockAccessRepository;
        private readonly Mock<IConfiguration> _mockConfiguration;

        public CommonServiceTests()
        {
            _mockAccessRepository = new Mock<ICommonRepository>();
            _mockConfiguration = new Mock<IConfiguration>();
        }

        [Fact]
        public async Task GetLoggedInUserPrivilege_ShouldReturnUserPermissions()
        {
            // Arrange
            string loggedInUserAlias = "testUser";
            List<UserAccessDetails> userAccessDetailsList = new List<UserAccessDetails>
            {
                new UserAccessDetails
                {
                    FeatureName = "Feature1",
                    Permissions = "Permission1,Permission2",
                    RoleName = "Role1",
                    DefaultFeature = "DefaultFeature1"
                },
                new UserAccessDetails
                {
                    FeatureName = "Feature2",
                    Permissions = "Permission3,Permission4",
                    RoleName = "Role2",
                    DefaultFeature = "DefaultFeature2"
                }
            };

            _mockAccessRepository.Setup(x => x.GetUserPermissionsAsync(loggedInUserAlias)).ReturnsAsync(userAccessDetailsList);

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetLoggedInUserPrivilege(loggedInUserAlias);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(userAccessDetailsList.Count, result.Permissions.Count);
            Assert.Equal(userAccessDetailsList[0].RoleName, result.Roles[0]);
            Assert.Equal(userAccessDetailsList[0].DefaultFeature, result.DefaultFeatures[0].defaultFeature);
        }

        [Fact]
        public async Task GetLoggedInUserPrivilege_ShouldReturnNull_WhenUserAccessDetailsListIsEmpty()
        {
            // Arrange
            string loggedInUserAlias = "testUser";
            List<UserAccessDetails> userAccessDetailsList = new List<UserAccessDetails>();

            _mockAccessRepository.Setup(x => x.GetUserPermissionsAsync(loggedInUserAlias)).ReturnsAsync(userAccessDetailsList);

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetLoggedInUserPrivilege(loggedInUserAlias);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result.Permissions);
            Assert.Empty(result.Roles);
            Assert.Empty(result.DefaultFeatures);
        }

        [Fact]
        public async Task GetLoggedInUserPrivilegeWithRunTimeWindowAsync_ShouldReturnUserPermissionsAndToolWindow()
        {
            // Arrange
            string loggedInUserAlias = "testUser";
            List<UserAccessDetails> userAccessDetailsList = new List<UserAccessDetails>
            {
                new UserAccessDetails
                {
                    FeatureName = "Feature1",
                    Permissions = "Permission1,Permission2",
                    RoleName = "Role1",
                    DefaultFeature = "DefaultFeature1"
                },
                new UserAccessDetails
                {
                    FeatureName = "Feature2",
                    Permissions = "Permission3,Permission4",
                    RoleName = "Role2",
                    DefaultFeature = "DefaultFeature2"
                }
            };

            _mockAccessRepository.Setup(x => x.GetUserPermissionsAsync(loggedInUserAlias)).ReturnsAsync(userAccessDetailsList);
            _mockAccessRepository.Setup(x => x.GetToolRuntimeWindowAsync()).ReturnsAsync(new ToolRuntimeWindow
            {
                StartDate = DateTime.Now.AddDays(-1),
                EndDate = DateTime.Now.AddDays(1)
            });

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(loggedInUserAlias);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(userAccessDetailsList.Count, result.Permissions.Count);
            Assert.Equal(userAccessDetailsList[0].RoleName, result.Roles[0]);
            Assert.NotNull(result.StartDate);
            Assert.NotNull(result.EndDate);
        }

        [Fact]
        public async Task GetLoggedInUserPrivilegeWithRunTimeWindowAsync_ShouldReturnNull_WhenUserAccessDetailsListIsEmpty()
        {
            // Arrange
            string loggedInUserAlias = "testUser";
            List<UserAccessDetails> userAccessDetailsList = new List<UserAccessDetails>();

            _mockAccessRepository.Setup(x => x.GetUserPermissionsAsync(loggedInUserAlias)).ReturnsAsync(userAccessDetailsList);
            _mockAccessRepository.Setup(x => x.GetToolRuntimeWindowAsync()).ReturnsAsync(new ToolRuntimeWindow
            {
                StartDate = DateTime.Now.AddDays(-1),
                EndDate = DateTime.Now.AddDays(1)
            });

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(loggedInUserAlias);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result.Permissions);
            Assert.Empty(result.Roles);
            Assert.Empty(result.DefaultFeatures);
            Assert.NotNull(result.StartDate);
            Assert.NotNull(result.EndDate);
        }

        [Fact]
        public async Task GetTaxonomyDetailsInHierarchyAsync_ShouldReturnTaxonomyDetails()
        {
            // Arrange
            string org = "TestOrg";
            string requestType = "CY";
            string loggedInUserAlias = "testUser";
            List<string> roleList = new List<string> { "Admin" };

            TaxonomyDetailsWithIncentivePlanHierarchy taxonomyDetails = new TaxonomyDetailsWithIncentivePlanHierarchy()
            {
                TaxonomyInfoDetails =  GenerateMockData()
                
            };

            _mockAccessRepository.Setup(x => x.GetTaxonomyDetailsInHierarchy(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(taxonomyDetails);

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetTaxonomyDetailsInHierarchyAsync(org, requestType, loggedInUserAlias, roleList);

            // Assert
            Assert.Equal(taxonomyDetails, result);
        }

        [Fact]
        public async Task GetTaxonomyDetailsInHierarchyAsync_ShouldReturnNull_WhenUserDoesNotHaveAdminOrScriptContributorRole()
        {
            // Arrange
            string org = "TestOrg";
            string requestType = "CY";
            string loggedInUserAlias = "testUser";
            List<string> roleList = new List<string> { "Role3", "Role4" };

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetTaxonomyDetailsInHierarchyAsync(org, requestType, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetOrgDetailsAsync_ShouldReturnOrgDetails()
        {
            // Arrange
            string requestType = "CY";
            string loggedInUserAlias = "testUser";
            List<string?> orgDetails = new List<string?> { "Org1", "Org2" };

            _mockAccessRepository.Setup(x => x.GetOrgDetailsAsync(requestType)).ReturnsAsync(orgDetails);

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetOrgDetailsAsync(requestType, loggedInUserAlias, new List<string> { "Admin" });

            // Assert
            Assert.Equal(orgDetails, result);
        }

        [Fact]
        public async Task GetOrgDetailsAsync_ShouldReturnNull_WhenUserDoesNotHaveAdminOrScriptContributorRole()
        {
            // Arrange
            string requestType = "CY";
            string loggedInUserAlias = "testUser";

            ICommonService commonService = new CommonService(_mockAccessRepository.Object, _mockConfiguration.Object);

            // Act
            var result = await commonService.GetOrgDetailsAsync(requestType, loggedInUserAlias, new List<string>());

            // Assert
            Assert.Null(result);
            Assert.Null(result);
        }

        public static List<TaxonomyInfoDetails?> GenerateMockData()
        {
            var taxonomyDetails = new List<TaxonomyInfoDetails?> () { new TaxonomyInfoDetails
            {
                RoleSummary = "Mock Role Summary",
                QualifierAndIncentivePlan = new List<QualifierAndIncentivePlan?>
                {
                    new QualifierAndIncentivePlan { Q1 = "Qualifier 1", q2AndIncentivePlan = new List<Q2AndIncentivePlan?>(){ new Q2AndIncentivePlan { Q2 = "Qualifier 2", IncentivePlan = new List<string?>() { "q22" } } } },
                    new QualifierAndIncentivePlan { Q1 = "Qualifier 1", q2AndIncentivePlan = new List<Q2AndIncentivePlan?>(){ new Q2AndIncentivePlan { Q2 = "Qualifier 2", IncentivePlan = new List<string?>() { "q22" } } } },

                }
                }
            };

            return taxonomyDetails;
        }

    }

}
