namespace MCT.Business.Services.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.Azure.Cosmos.Scripts;
    using Moq;
    using Xunit;
    public class TaxonomyScriptContentServiceTests
    {
        private readonly TaxonomyScriptContentService taxonomyScriptContentService;
        private readonly Mock<IUnitOfWork> mockUnitOfWork;
        private readonly Mock<IAuthService> mockAuthService;
        private readonly Mock<ITaxonomyScriptContentRepository> mockTaxonomyScriptContentRepository;

        private readonly Mock<ICommonRepository> mockCommonRepository;

        //create a mock of IReceiveRepository

        public TaxonomyScriptContentServiceTests()
        {
            mockUnitOfWork = new Mock<IUnitOfWork>();
            mockAuthService = new Mock<IAuthService>();
            mockTaxonomyScriptContentRepository = new Mock<ITaxonomyScriptContentRepository>();
            mockCommonRepository = new Mock<ICommonRepository>();
            taxonomyScriptContentService  = new TaxonomyScriptContentService(mockTaxonomyScriptContentRepository.Object,mockUnitOfWork.Object, mockAuthService.Object);
        }

        [Fact]
        public async Task Get_ValidInput_ReturnsTaxonomyScriptContentResponse()
        {
            // Arrange
            var loggedInUserAlias = "user1";
            var roleList = new List<string> { "Admin" };

            var scriptContentList = GetTaxonomyScriptContentData();

            TaxonomyScriptContentResponse response =  new TaxonomyScriptContentResponse();
            response.TaxonomyScriptsContent = scriptContentList;
            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);
            mockTaxonomyScriptContentRepository.Setup(x => x.Get()).ReturnsAsync(response);

            // Act
            var result = await taxonomyScriptContentService.Get(loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<TaxonomyScriptContentResponse>(result);
        }

        [Fact]
        public async Task Get_InvalidRole_ReturnsNull()
        {
            // Arrange
            var loggedInUserAlias = "user1";
            var roleList = new List<string> { "Delegate" };

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);
            mockTaxonomyScriptContentRepository.Setup(x => x.Get()).ReturnsAsync((TaxonomyScriptContentResponse)null);

            // Act
            var result = await taxonomyScriptContentService.Get(loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task Get_ReturnsTaxonomyScriptContentResponse_WhenRoleListIsNotNull()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            List<string> roleList = new List<string> { "Admin", "ScriptContributor" };
            var expectedResponse = new TaxonomyScriptContentResponse();

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);
            mockTaxonomyScriptContentRepository.Setup(x => x.Get()).ReturnsAsync(expectedResponse);

            // Act
            var result = await taxonomyScriptContentService.Get(loggedInUserAlias, roleList);

            // Assert
            Assert.Equal(expectedResponse, result);
        }

        [Fact]
        public async Task Get_ReturnsNull_WhenRoleListIsNull()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            List<string> roleList = null;

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);
            mockTaxonomyScriptContentRepository.Setup(x => x.Get()).ReturnsAsync((TaxonomyScriptContentResponse)null);

            // Act
            var result = await taxonomyScriptContentService.Get(loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task Get_WhenRepositoryIsNull_ThrowsInvalidOperationException()
        {
            // Arrange
            mockUnitOfWork.Setup(uow => uow.GetRepository<ITaxonomyScriptContentRepository>()).Returns((ITaxonomyScriptContentRepository)null);

            // Act and Assert
            await Assert.ThrowsAsync<InvalidOperationException>(() => taxonomyScriptContentService.Get("user", new List<string>()));
        }

        [Fact]
        public async Task GetFYManagersForScriptExclusionAsync_Should_Return_ExclusionManagers()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            List<string> roles = new List<string> { "Admin" };
            string searchString = "Man";

            var exclusionManagers = new List<FutureManager>
            {
                new FutureManager { Ic = "M1", FullName = "Manager1" },
                new FutureManager { Ic = "M2", FullName = "Manager2" }
            };

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);

            mockTaxonomyScriptContentRepository.Setup(repo => repo.GetFYManagersForScriptExclusionAsync(searchString))
                .ReturnsAsync(exclusionManagers);

            // Act
            var result = await taxonomyScriptContentService.GetFYManagersForScriptExclusionAsync(loggedInUserAlias, roles, searchString);

            // Assert
            Assert.Equal(exclusionManagers, result);
        }

     

        [Fact]
        public async Task GetFYManagersForScriptExclusion_InvalidRole_ReturnsNull()
        {
            // Arrange
            var loggedInUserAlias = "user1";
            var roles = new List<string> { "Delegate" };
            var searchString = "man";

            // Act
            var result = await taxonomyScriptContentService.GetFYManagersForScriptExclusionAsync(loggedInUserAlias, roles, searchString);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetStatisticsAsync_ShouldReturnStatistics()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            List<string> roles = new List<string> { "Admin" };
            var expectedStatistics = new TaxonomyScriptContentStatisticResponse()
            {
                TotalChangeContextScript = 5,
                TotalApproved = 3,
                TotalReadyForReview=2
            
            };
            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);
            mockTaxonomyScriptContentRepository.Setup(r => r.GetStatisticsAsync()).ReturnsAsync(expectedStatistics);

            // Act
            var result = await taxonomyScriptContentService.GetStatisticsAsync(loggedInUserAlias, roles);

            // Assert
            Assert.Equal(expectedStatistics, result);
        }


        [Fact]
        public async Task GetStatistics_InvalidRole_ReturnsNull()
        {
            // Arrange
            var loggedInUserAlias = "user1";
            var roles = new List<string> { "Delegate" };

            // Act
            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);
            mockTaxonomyScriptContentRepository.Setup(r => r.GetStatisticsAsync()).ReturnsAsync((TaxonomyScriptContentStatisticResponse)null);

            var result = await taxonomyScriptContentService.GetStatisticsAsync(loggedInUserAlias, roles);

            // Assert
            Assert.Null(result);
        }


        [Fact]
        public async Task GetAuditDetailsAsync_Should_Return_AuditDetails()
        {
            // Arrange
            int scriptId = 1;
            List<string> roleList = new List<string> { "Admin" };
            string loggedInUserAlias = "user1";

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);

            mockTaxonomyScriptContentRepository.Setup(repo => repo.GetAuditDetailsAsync(scriptId))
                .ReturnsAsync(new List<TaxonomyScriptContentAuditHistoryResponse>());


            // Act
            var result = await taxonomyScriptContentService.GetAuditDetailsAsync(scriptId, roleList, loggedInUserAlias);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<TaxonomyScriptContentAuditHistoryResponse>>(result);
        }
        [Fact]
        public async Task GetAuditDetails_InvalidRole_ReturnsNull()
        {
            // Arrange
            var scriptId = 1;
            var roleList = new List<string> { "Delegate" };
            var loggedInUserAlias = "user1";

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);

            mockTaxonomyScriptContentRepository.Setup(repo => repo.GetAuditDetailsAsync(scriptId))
                .ReturnsAsync(( List<TaxonomyScriptContentAuditHistoryResponse>)null);
            // Act
            var result = await taxonomyScriptContentService.GetAuditDetailsAsync(scriptId, roleList, loggedInUserAlias);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateTaxonomyScriptContentStatusAsync_ValidInput_ReturnsTrue()
        {
            // Arrange
            int scriptId = 1;
            string loggedInUserAlias = "testUser";
            List<string> roleList = new List<string> { "Admin" };

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);

            mockTaxonomyScriptContentRepository.Setup(repo => repo.UpdateTaxonomyScriptContentStatusAsync(scriptId, loggedInUserAlias))
                .ReturnsAsync(true);

            // Act
            var result = await taxonomyScriptContentService.UpdateTaxonomyScriptContentStatusAsync(scriptId, loggedInUserAlias, roleList);

            // Assert
            Assert.True(result);
        }


        [Fact]
        public async Task UpdateTaxonomyScriptContentStatus_InvalidRole_ReturnsNull()
        {
            // Arrange
            var scriptId = 1;
            var loggedInUserAlias = "user1";
            var roleList = new List<string> { "Delegate" };

            // Act
            var result = await taxonomyScriptContentService.UpdateTaxonomyScriptContentStatusAsync(scriptId, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task CreateOrUpdateTaxonomyScriptContentAsync_WithValidData_ReturnsTrue()
        {
            // Arrange
            var taxonomyScriptContentUpsertRequest = new TaxonomyScriptContentUpsertRequest()
            {
                CyOrg = "Mock CY org",
                ScriptContent = "Mock script content",
                CyRoleSummary = "Mock CY role summary",
                CyQ1 = "Mock CY Q1",
                CyQ2 = "Mock CY Q2",
                FyRoleSummary  ="Mock FY role summary",
               FyOrg="mock FY org",
               FyQ1="Mock FY Q1",
               FyQ2="mock FY Q2",
               Title="mock title"
            };
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "Admin" };

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);    

            mockTaxonomyScriptContentRepository.Setup(repo => repo.CreateOrUpdateTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, loggedInUserAlias)).ReturnsAsync(true);

            // Act
            var result = await taxonomyScriptContentService.CreateOrUpdateTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.True(result);
        }

       

        [Fact]
        public async Task CreateOrUpdateTaxonomyScriptContent_InvalidRole_ReturnsNull()
        {
            // Arrange
            var taxonomyScriptContentUpsertRequest = new TaxonomyScriptContentUpsertRequest();
            var loggedInUserAlias = "user1";
            var roleList = new List<string> { "Delegate" };

            mockUnitOfWork.Setup(x => x.GetRepository<ITaxonomyScriptContentRepository>()).Returns(mockTaxonomyScriptContentRepository.Object);

            mockTaxonomyScriptContentRepository.Setup(repo => repo.CreateOrUpdateTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, loggedInUserAlias)).ReturnsAsync(null);

            // Act
            var result = await taxonomyScriptContentService.CreateOrUpdateTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        private List<TaxonomyScriptContent> GetTaxonomyScriptContentData()
        {
            var mockData = new List<TaxonomyScriptContent>
            {
                new TaxonomyScriptContent
                {
                    Id = 1,
                    ScriptContent = "Mock script content 1",
                    ScriptTitle = "Mock script title 1",
                    FyOrg = "Mock FY org 1",
                    FyRoleSummary = "Mock FY role summary 1",
                    FyQ1 = "Mock FY Q1 1",
                    FyQ2 = "Mock FY Q2 1",
                    CyOrg = "Mock CY org 1",
                    CyRoleSummary = "Mock CY role summary 1",
                    CyQ1 = "Mock CY Q1 1",
                    CyQ2 = "Mock CY Q2 1",
                    Status = "Mock status 1",
                    ModifiedBy = "Mock modified by 1",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                    CreatedBy = "Mock created by 1",
                    Exclusions = new List<ExcludedManagerDetails>
                    {
                        new ExcludedManagerDetails
                        {
                            Alias = "Mock manager name 1",
                            FullName= "mockmanager1@example.com"
                        },
                        new ExcludedManagerDetails
                        {
                            Alias = "Mock manager name 2",
                            FullName= "mockmanager2@example.com"
                        }
                    },
                    ScriptAppliedEmployeesCount = 10
                },
                new TaxonomyScriptContent
                {
                    Id = 2,
                    ScriptContent = "Mock script content 2",
                    ScriptTitle = "Mock script title 2",
                    FyOrg = "Mock FY org 2",
                    FyRoleSummary = "Mock FY role summary 2",
                    FyQ1 = "Mock FY Q1 2",
                    FyQ2 = "Mock FY Q2 2",
                    CyOrg = "Mock CY org 2",
                    CyRoleSummary = "Mock CY role summary 2",
                    CyQ1 = "Mock CY Q1 2",
                    CyQ2 = "Mock CY Q2 2",
                    Status = "Mock status 2",
                    ModifiedBy = "Mock modified by 2",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                    CreatedBy = "Mock created by 2",
                    Exclusions = new List<ExcludedManagerDetails>
                    {
                        new ExcludedManagerDetails
                        {
                            Alias = "Mock manager name 3",
                            FullName = "mockmanager3@example.com"
                        },
                        new ExcludedManagerDetails
                        {
                            Alias = "Mock manager name 4",
                            FullName = "mockmanager4@example.com"
                        }
                    },
                    ScriptAppliedEmployeesCount = 20
                }
            };

            return mockData;
        }
    }
}
