namespace MCT.Service.Test
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Repository;
    using MCT.DataAccess.UnitOfWork;
    using Moq;
    using Xunit;

    public class ReceiveConversationServiceTest
    {
        private readonly ReceiveConversationService receiveConversationService;
        private readonly Mock<IUnitOfWork> mockUnitOfWork;
        private readonly Mock<IAuthService> mockAuthService;
        private readonly Mock<IReceiveConversationRepository> mockReceiveConverstionRepository;

        private readonly Mock<ICommonRepository> mockCommonRepository;

        //create a mock of IReceiveRepository
        private readonly Mock<IReceiveConversationRepository> mockReceiveRepository;

        public ReceiveConversationServiceTest()
        {
            mockUnitOfWork = new Mock<IUnitOfWork>();
            mockAuthService = new Mock<IAuthService>();
            mockReceiveRepository = new Mock<IReceiveConversationRepository>();
            mockReceiveConverstionRepository = new Mock<IReceiveConversationRepository>();
            mockCommonRepository = new Mock<ICommonRepository>();
            receiveConversationService = new ReceiveConversationService(mockUnitOfWork.Object, mockAuthService.Object);
        }


        [Fact]
        public async Task SetConversationComplete_ShouldReturnSuccess()
        {
            //Arrange
            var fyManagerAlias1 = "fyManagerAlias1";
            var fyManagerAlias2 = "fyManagerAlias2";
            List<string> roleList = new List<string>() { "Delegate" };

            var user = "user";
            var requestedData1 = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias1",
                FYManagerAlias = fyManagerAlias1,
                ScriptFollowed = true,
                EmployeeAlias = "empAlias1",
            };

            var requestedData2 = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias2",
                FYManagerAlias = fyManagerAlias2,
                ScriptFollowed = true,
                EmployeeAlias = "empAlias2",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData1, requestedData2 };

            var fyManagerAliasList = new List<string>() { fyManagerAlias1, fyManagerAlias2 };
            var employeeAliasList = new List<string>() { requestedData1.EmployeeAlias, requestedData2.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData1.EmployeeAlias!, FYManagerAlias = requestedData1.FYManagerAlias },
                new EmployeeManager() { EmployeeAlias = requestedData2.EmployeeAlias!, FYManagerAlias = requestedData2.FYManagerAlias } };

            string selectedManagerList = String.Join(",", fyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ReturnsAsync(employeeManagerList);
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);

            mockReceiveRepository.Setup(x => x.CompleteConversation(conversationCompletionRequest, It.IsAny<string>())).ReturnsAsync(true);
            mockUnitOfWork.Setup(x => x.GetRepository<IReceiveConversationRepository>()).Returns(mockReceiveRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(fyManagerAliasList, user)).ReturnsAsync(true);
            mockAuthService.Setup(repo => repo.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            // Act         
            var result = await receiveConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(true, result);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnFalse_WhenUpdateFails()
        {
            //Arrange
            var fyManagerAlias = "fyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias",
                FYManagerAlias = fyManagerAlias,
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };
            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };

            var fyManagerAliasList = new List<string>() { fyManagerAlias };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData.EmployeeAlias!, FYManagerAlias = requestedData.FYManagerAlias } };
            string selectedManagerList = String.Join(",", fyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockUnitOfWork.Setup(x => x.GetRepository<IReceiveConversationRepository>()).Returns(mockReceiveRepository.Object);
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(new List<string> { "Manager" });
            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManagerList);
            mockReceiveRepository.Setup(x => x.CompleteConversation(conversationCompletionRequest, It.IsAny<string>())).ReturnsAsync(false);
            mockAuthService.Setup(x => x.HasAccessAsync(fyManagerAliasList, user)).ReturnsAsync(true);
            mockAuthService.Setup(repo => repo.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);


            // Act         
            var result = await receiveConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(false, result);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnNull_WhenNoAccess()
        {
            //Arrange
            var fyManagerAlias = "fyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias",
                FYManagerAlias = fyManagerAlias,
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var fyManagerAliasList = new List<string>() { fyManagerAlias };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData.EmployeeAlias!, FYManagerAlias = requestedData.FYManagerAlias } };
            string selectedManagerList = String.Join(",", fyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ReturnsAsync(employeeManagerList);
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);

            mockUnitOfWork.Setup(x => x.GetRepository<IReceiveConversationRepository>()).Returns(mockReceiveRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(fyManagerAliasList, user)).ReturnsAsync(false);
            // Act
            var result = await receiveConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(null, result);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnNull_WhenManagerDetailsAreEmpty()
        {
            //Arrange
            var user = "user";

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            List<string> roleList = new List<string>();
            // Act
            var result = await receiveConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(null, result);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnNull_WhenIncorrectCyManagerIsPassed()
        {
            //Arrange
            var fyManagerAlias = "fyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias",
                FYManagerAlias = "fyManagerAlias1",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var fyManagerAliasList = new List<string>() { fyManagerAlias };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData.EmployeeAlias!, FYManagerAlias = requestedData.FYManagerAlias } };
            string selectedManagerList = String.Join(",", fyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ReturnsAsync(employeeManagerList);
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);

            mockUnitOfWork.Setup(x => x.GetRepository<IReceiveConversationRepository>()).Returns(mockReceiveRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(fyManagerAliasList, user)).ReturnsAsync(true);
            // Act
            var result = await receiveConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(null, result);
        }

        [Fact]
        public async Task SetConversationComplete_ThrowsException_InCaseOfError()
        {
            //Arrange
            var fyManagerAlias = "fyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = fyManagerAlias,
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var fyManagerAliasList = new List<string>() { fyManagerAlias };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            string selectedManagerList = String.Join(",", fyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ThrowsAsync(new System.Exception("Error occured"));
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);

            mockReceiveRepository.Setup(x => x.CompleteConversation(conversationCompletionRequest, It.IsAny<string>())).ReturnsAsync(true);
            mockUnitOfWork.Setup(x => x.GetRepository<IReceiveConversationRepository>()).Returns(mockReceiveRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(fyManagerAliasList, user)).ReturnsAsync(true);
            // Act
            try
            {
                await receiveConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);
            }
            catch (System.Exception ex)
            {
                Assert.Equal("Error occured", ex.Message);
            }
        }

        [Fact]
        public async Task Get_ShouldReturnReceiveConversationResponse_WhenDataFound()
        {
            // Arrange
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string> { "managerAlias" }
            };
            var loggedInUserAlias = "loggedInUserAlias";
            var repositoryObj = new Mock<IReceiveConversationRepository>();
            var aliasList = new List<string> { "managerAlias" };
            var receiveConversations = GetResponse();
            var receiveConversationResponse = new ReceiveConversationResponse
            {
                Conversations = receiveConversations
            };

            mockUnitOfWork.Setup(uow => uow.GetRepository<IReceiveConversationRepository>()).Returns(repositoryObj.Object);
            mockAuthService.Setup(authService => authService.GetAuthorizedAliasesListAsync(It.IsAny<List<string>>(), loggedInUserAlias))
                .ReturnsAsync(aliasList);
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);
            repositoryObj.Setup(repo => repo.Get(aliasList)).ReturnsAsync(receiveConversations);
            List<string> roleList = new List<string>();
            // Act
            var result = await receiveConversationService.Get(conversationListRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Equal(receiveConversationResponse.Conversations, result?.Conversations);
            mockUnitOfWork.Verify(uow => uow.GetRepository<IReceiveConversationRepository>(), Times.Once);
            repositoryObj.Verify(repo => repo.Get(aliasList), Times.Once);
        }

        [Fact]
        public async Task Get_ShouldReturnNull_WhenManagerAliasListAreEmpty()
        {
            // Arrange
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string> { "managerAlias" }
            };
            var loggedInUserAlias = "loggedInUserAlias";
            List<string>? aliasList = null;
            var response = new List<ReceiveConversationDto>();

            mockUnitOfWork.Setup(uow => uow.GetRepository<IReceiveConversationRepository>()).Returns(mockReceiveConverstionRepository.Object);
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);
            mockReceiveConverstionRepository.Setup(x => x.Get(It.IsAny<List<string>>())).ReturnsAsync(response);
            // Act
            ReceiveConversationResponse? result = await receiveConversationService.Get(conversationListRequest, loggedInUserAlias, new List<string>());

            // Assert
            Assert.Null(result);
            mockAuthService.Verify(authService => authService.GetManagerListForAuthorizedUser(
                It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>()), Times.Once);

        }

        [Fact]
        public async Task Get_ShouldThrowException_WhenRepositoryIsNotValid()
        {
            // Arrange
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string> { "managerAlias" }
            };
            var loggedInUserAlias = "loggedInUserAlias";
            var aliasList = new List<string> { "managerAlias" };

            mockUnitOfWork.Setup(uow => uow.GetRepository<IReceiveConversationRepository>()).Returns<IReceiveConversationRepository>(null);

            List<string> roleList = new List<string>();
            // Act & Assert
            await Assert.ThrowsAsync<InvalidOperationException>(async () =>
                await receiveConversationService.Get(conversationListRequest, loggedInUserAlias, roleList));

            mockUnitOfWork.Verify(uow => uow.GetRepository<IReceiveConversationRepository>(), Times.Once);
        }

        [Fact]
        public async Task GetStatistics_ShouldReturnConversationStatisticsResponse_WhenDataFound()
        {
            // Arrange
            var conversationStatisticsRequest = new ConversationStatisticsRequest
            {
                ManagerAliases = new List<string> { "managerAlias" }
            };
            var loggedInUserAlias = "loggedInUserAlias";
            var repositoryObj = new Mock<IReceiveConversationRepository>();
            var aliasList = new List<string> { "managerAlias" };
            var conversationsStatistics = new ConversationStatisticsResponse()
            {
                RequiredCompleted = 2,
                RequiredPending = 3,
                RequiredConversations = 5
            };

            mockUnitOfWork.Setup(uow => uow.GetRepository<IReceiveConversationRepository>())
                .Returns(repositoryObj.Object);
            repositoryObj.Setup(repo => repo.GetStatistics(aliasList)).ReturnsAsync(conversationsStatistics);
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var result = await receiveConversationService.GetStatistics(conversationStatisticsRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Equal(conversationsStatistics, result);
            mockUnitOfWork.Verify(uow => uow.GetRepository<IReceiveConversationRepository>(), Times.Once);
            mockAuthService.Verify(authService => authService.GetManagerListForAuthorizedUser(
               It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>()), Times.Once);

            repositoryObj.Verify(repo => repo.GetStatistics(aliasList), Times.Once);
        }

        [Fact]
        public async Task GetStatistics_ShouldReturnNull_WhenManagerAliasListAreEmpty()
        {
            // Arrange
            var conversationStatisticsRequest = new ConversationStatisticsRequest
            {
                ManagerAliases = new List<string> { "managerAlias" }
            };
            var loggedInUserAlias = "loggedInUserAlias";
            var repositoryObj = new Mock<IReceiveConversationRepository>();
            var aliasList = new List<string>();

            mockUnitOfWork.Setup(uow => uow.GetRepository<IReceiveConversationRepository>())
                           .Returns(repositoryObj.Object);
            
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);

            List<string> roleList = new List<string>();
            // Act
            var result = await receiveConversationService.GetStatistics(conversationStatisticsRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        private static List<ReceiveConversationDto> GetResponse()
        {
            return new List<ReceiveConversationDto>()
            {
                new ReceiveConversationDto()
                {
                Alias = "TestIc1",
                FullName = "Test Full Name IC1",
                FyManagerChange="Y",
                SendingConversationStatus="Pending",
                ReceiveConversationStatus="Pending",
                FyManagerAlias="CyManagerAlias1",
                CyManagerAlias = "CyManagerAlias1",
                EdmValidation ="EdmValidation",
                CyOrg = "Cy Organization 1",
                CyRoleSummary = "Cy Role Summary 1",
                CyQ1 = "Cy Q1 Data 1",
                CyQ2 = "Cy Q2 Data 1",
                CyCareerStage = "Cy Career Stage 1",
                CyIncentivePlan = "Cy Incentive Plan 1",
                CyCostCenter = "Cy Cost Center 1",
                FyOrg = "Fy Organization 1",
                FyRoleSummary = "Fy Role Summary 1",
                FyQ1 = "Fy Q1 Data 1",
                FyQ2 = "Fy Q2 Data 1",
                FyIncentivePlan = "Fy Incentive Plan 1",
                FyCostCenter = "Fy Cost Center 1",
                },
                new ReceiveConversationDto()
                {
                  Alias = "TestIc2",
                  FullName = "Test Full Name IC2",
                  FyManagerChange="Y",
                  SendingConversationStatus="Completed",
                  ReceiveConversationStatus="Pending",
                  FyManagerAlias="CyManagerAlias2",
                  CyManagerAlias = "CyManagerAlias2",
                  EdmValidation ="EdmValidation",
                  CyOrg = "Cy Organization 2",
                  CyRoleSummary = "Cy Role Summary 2",
                  CyQ2 = "Cy Q2 Data 2",
                  CyQ1 = "Cy Q2 Data 2",
                  CyCareerStage = "Cy Career Stage 2",
                  CyIncentivePlan = "Cy Incentive Plan 2",
                  CyCostCenter = "Cy Cost Center 2",
                  FyOrg = "Fy Organization 2",
                  FyRoleSummary = "Fy Role Summary 2",
                  FyQ2 = "Fy Q2 Data 2",
                  FyQ1 = "Fy Q2 Data 2",
                  FyIncentivePlan = "Fy Incentive Plan 2",
                  FyCostCenter = "Fy Cost Center 2",
                },
                new ReceiveConversationDto()
                 {
                  Alias = "TestIc3",
                  FullName = "Test Full Name IC3",
                  FyManagerChange="Y",
                  SendingConversationStatus="Pending",
                  ReceiveConversationStatus="Pending",
                  FyManagerAlias="FyManagerAlias3",
                  CyManagerAlias = "CyManagerAlias3",
                  EdmValidation ="EdmValidation",
                  CyOrg = "Cy Organization 3",
                  CyRoleSummary = "Cy Role Summary 3",
                  CyQ2 = "Cy Q3 Data 3",
                  CyQ1 = "Cy Q3 Data 3",
                  CyCareerStage = "Cy Career Stage 3",
                  CyIncentivePlan = "Cy Incentive Plan 3",
                  CyCostCenter = "Cy Cost Center 3",
                  FyOrg = "Fy Organization 3",
                  FyRoleSummary = "Fy Role Summary 3",
                  FyQ2 = "Fy Q3 Data 3",
                  FyQ1 = "Fy Q3 Data 3",
                  FyIncentivePlan = "Fy Incentive Plan 3",
                  FyCostCenter = "Fy Cost Center 3",
                  },

            };
        }
    }

}

