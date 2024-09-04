namespace MCT.Business.Test
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Azure.Core;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.AspNetCore.Mvc;
    using Moq;
    using Xunit;

    public class ConversationScriptTaxonomyServiceTest
    {
        private readonly ConversationScriptTaxonomyService conversationScriptTaxonomyService;
        private readonly Mock<IUnitOfWork> mockUnitOfWork;
        private readonly Mock<IConversationScriptTaxonomyRepository> mockRepository;
        private readonly Mock<IManagerRepository> mockManagerRepository;
        private readonly Mock<IAuthService> mockAuthService;

        public ConversationScriptTaxonomyServiceTest()
        {
            mockUnitOfWork = new Mock<IUnitOfWork>();
            mockRepository = new Mock<IConversationScriptTaxonomyRepository>();
            mockAuthService = new Mock<IAuthService>();
            mockManagerRepository = new Mock<IManagerRepository>();
            conversationScriptTaxonomyService = new ConversationScriptTaxonomyService(mockUnitOfWork.Object, mockAuthService.Object);
        }

        [Fact]
        public async Task GetEmpConversationScript_ShouldReturnConversationScript()
        {
            // Arrange
            string empAlias = "empAlias";
            HrDataModel tblHrdatum = new HrDataModel();
            string loggedInUserAlias = "loggedInUserAlias";
            List<string> roleList = new List<string> { "Admin" };

            EmpConversationScriptResponse expectedResponse = TestConversationScriptData();

            mockUnitOfWork.Setup(uow => uow.GetRepository<IConversationScriptTaxonomyRepository>()).Returns(mockRepository.Object);
            mockRepository.Setup(repo => repo.GetEmpConversationScript(tblHrdatum, It.IsAny<string>())).ReturnsAsync(expectedResponse);
            mockAuthService.Setup(repo => repo.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            mockRepository.Setup(x => x.GetEmpHrData(It.IsAny<string>())).ReturnsAsync(tblHrdatum);
            // Act
            var result = await conversationScriptTaxonomyService.GetEmpConversationScript(empAlias, loggedInUserAlias, roleList, "sent");

            // Assert
            Assert.Equal(expectedResponse, result);
            mockRepository.Verify(repo => repo.GetEmpConversationScript(tblHrdatum, It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async Task GetEmpConversationScript_RepositoryIsNull_ThrowsInvalidOperationException()
        {
                // Arrange
                var unitOfWorkMock = new Mock<IUnitOfWork>();
                IConversationScriptTaxonomyService conversationScriptTaxonomyService = new ConversationScriptTaxonomyService(unitOfWorkMock.Object, null);

                // Act and Assert
                await Assert.ThrowsAsync<InvalidOperationException>(async () =>
                {
                    await conversationScriptTaxonomyService.GetEmpConversationScript("empAlias", "loggedInUserAlias", new List<string>(), "requestFrom");
                });
         }

        [Fact]
        public async Task GetEmpConversationScript_CheckAccessFalse_ReturnsNull()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var authServiceMock = new Mock<IAuthService>();
            var repositoryMock = new Mock<IConversationScriptTaxonomyRepository>();

            var service = new ConversationScriptTaxonomyService(unitOfWorkMock.Object, authServiceMock.Object);

            var empAlias = "testEmpAlias";
            var loggedInUserAlias = "testUserAlias";
            var roleList = new List<string> { "Role1", "Role2" };
            var requestFrom = "Send";

            repositoryMock.Setup(r => r.GetEmpHrData(empAlias)).ReturnsAsync(new HrDataModel());
            repositoryMock.Setup(r => r.GetEmpConversationScript(It.IsAny<HrDataModel>(), requestFrom)).ReturnsAsync(new EmpConversationScriptResponse());

            unitOfWorkMock.Setup(u => u.GetRepository<IConversationScriptTaxonomyRepository>()).Returns(repositoryMock.Object);
            authServiceMock.Setup(a => a.checkUserAccessForSelectedManager(loggedInUserAlias, It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(false);

            // Act
            var result = await service.GetEmpConversationScript(empAlias, loggedInUserAlias, roleList, requestFrom);

            // Assert
            Assert.Null(result);
        }
        [Fact]
        public async Task UpdateConversationScript_ShouldReturnTrue_WhenUpdateSuccessful()
        {
            // Arrange
            ConversationScriptUpdateScenarioRequest request = new ConversationScriptUpdateScenarioRequest();
            string loggedInUserAlias = "loggedInUserAlias";

            mockUnitOfWork.Setup(uow => uow.GetRepository<IConversationScriptTaxonomyRepository>())
                .Returns(mockRepository.Object);

            mockRepository.Setup(repo => repo.UpdateConversationScript(request, loggedInUserAlias))
                .ReturnsAsync(true);

            // Act
            var result = await conversationScriptTaxonomyService.UpdateConversationScript(request, loggedInUserAlias);

            // Assert
            Assert.True(result);
            mockRepository.Verify(repo => repo.UpdateConversationScript(request, loggedInUserAlias), Times.Once);
        }

        [Fact]
        public async Task UpdateConversationScript_ShouldReturnFalse_WhenIdIsNotFound()
        {
            // Arrange
            int[] id = { 21, 22 };
            var conversationScriptUpdateScenarioRequest = new ConversationScriptUpdateScenarioRequest()
            {
                Id = id,
                Content = new content()
                {
                    SpecificContextOptional = "specificContextOptional",
                    Title = "title"
                }
            };
            string loggedInUserAlias = "loggedInUserAlias";

            mockUnitOfWork.Setup(uow => uow.GetRepository<IConversationScriptTaxonomyRepository>())
                .Returns(mockRepository.Object);

            mockRepository.Setup(repo => repo.UpdateConversationScript(conversationScriptUpdateScenarioRequest, loggedInUserAlias))
                .ReturnsAsync(false);


            // Act
            var result = await conversationScriptTaxonomyService.UpdateConversationScript(conversationScriptUpdateScenarioRequest, loggedInUserAlias);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task UpdateConversationScript_ShouldThrowInvalidOperationException_WhenRepositoryIsNull()
        {
            // Arrange
            int[] id = { 21, 22 };
            var conversationScriptUpdateScenarioRequest = new ConversationScriptUpdateScenarioRequest()
            {
                Id = id,
                Content = new content()
                {
                    SpecificContextOptional = "specificContextOptional",
                    Title = "title"
                }
            };
            var loggedInUserAlias = "v-test";

            mockUnitOfWork.Setup(uow => uow.GetRepository<IConversationScriptTaxonomyRepository>()).Returns((IConversationScriptTaxonomyRepository)null);

            // Act & Assert
            await Assert.ThrowsAsync<InvalidOperationException>(() => conversationScriptTaxonomyService.UpdateConversationScript(conversationScriptUpdateScenarioRequest, loggedInUserAlias));
        }

        private static TaxonomyScriptContent[] GetScenarioData()
        {
            var data = new TaxonomyScriptContent()
            {
                CreatedBy = "test",
                CreatedDate = DateTime.UtcNow,
                CyOrg = "CyOrg",
                CyQ1 = "w1",
                CyQ2 = "q2",
                FyQ1 = "w2",
                CyRoleSummary = "w3",
                FyOrg = "w7",
                FyQ2 = "w5",
                ScriptTitle = "w4",
                FyRoleSummary = "w8",
                Id = 21, 
                ModifiedBy = "test",
                ModifiedDate = DateTime.UtcNow,
            };

            TaxonomyScriptContent[] scenarios = { data };
            return scenarios;
        }

        private static EmpConversationScriptResponse TestConversationScriptData()
        {
            List<SectionDetails> sectionDetails = new List<SectionDetails>();


            SectionDetails sectionDetail = new SectionDetails();

            sectionDetail.SectionName = "taxonomy";
            sectionDetail.DisplayValue = "taxonomyTitle";
            sectionDetail.Content = "data";

            sectionDetails.Add(sectionDetail);
            var taxonomyData = new TaxonomyDto()
            {
                Org = "abc",
                Profession = "k",
                Discipline = "rolesum",
                RoleSummary = "rolesum M",
                Q1 = "q1",
                Q2 = "q2",
                IncentivePlan = "ip",
                CareerStage = "career",
                BusinessLeader = "bl",
                Manager = "acs"
            };

            return new EmpConversationScriptResponse()
            {
                EmpAlias = "test",
                EmpName = "test F",
                CYTaxonomy = taxonomyData,
                FYTaxonomy = taxonomyData,
                SectionDetails = sectionDetails

            };
        }

    }
}