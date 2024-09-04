namespace MCT.Service.Test
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Linq;
    using Azure.Messaging.EventHubs.Producer;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Repository;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities;
    using Moq;
    using Xunit;

    public class SendStayConversationServiceTest
    {
        private readonly SendStayConversationService sendStayConversationService;
        private readonly Mock<IUnitOfWork> mockUnitOfWork;

        private readonly Mock<IAuthService> mockAuthService;

        //create a mock of ISendStayRepository
        private readonly Mock<ISendStayRepository> mockSendStayRepository;

        private readonly Mock<ICommonRepository> mockCommonRepository;

        public SendStayConversationServiceTest()
        {
            mockUnitOfWork = new Mock<IUnitOfWork>();
            mockAuthService = new Mock<IAuthService>();
            mockSendStayRepository = new Mock<ISendStayRepository>();
            mockCommonRepository = new Mock<ICommonRepository>();
            sendStayConversationService = new SendStayConversationService(mockUnitOfWork.Object, mockAuthService.Object);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnSuccess()
        {
            //Arrange
            var cyManagerAlias = "cyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = cyManagerAlias,
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };

            var cyManagerAliasList = new List<string>() { cyManagerAlias };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData.EmployeeAlias!, CYManagerAlias = requestedData.CYManagerAlias } };
            string selectedManagerList = String.Join(",", cyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);
            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ReturnsAsync(employeeManagerList);
            mockAuthService.Setup(repo => repo.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            mockSendStayRepository.Setup(x => x.CompleteConversation(conversationCompletionRequest, It.IsAny<string>())).ReturnsAsync(true);
            mockUnitOfWork.Setup(x => x.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(cyManagerAliasList, user)).ReturnsAsync(true);
            // Act
            var result = await sendStayConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(true, result);
        }


        [Fact]
        public async Task SetConversationComplete_ShouldReturnFalse_WhenUpdateFails()
        {
            //Arrange
            var cyManagerAlias = "cyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = cyManagerAlias,
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            var cyManagerAliasList = new List<string>() { cyManagerAlias };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData.EmployeeAlias!, CYManagerAlias = requestedData.CYManagerAlias } };
            string selectedManagerList = String.Join(",", cyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);
            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ReturnsAsync(employeeManagerList);
            mockAuthService.Setup(repo => repo.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            mockSendStayRepository.Setup(x => x.CompleteConversation(conversationCompletionRequest, It.IsAny<string>())).ReturnsAsync(false);
            mockUnitOfWork.Setup(x => x.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(cyManagerAliasList, user)).ReturnsAsync(true);
            // Act          
            var result = await sendStayConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(false, result);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnNull_WhenNoAccess()
        {
            //Arrange
            var cyManagerAlias = "cyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };
            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = cyManagerAlias,
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };

            var cyManagerAliasList = new List<string>() { cyManagerAlias };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData.EmployeeAlias!, CYManagerAlias = requestedData.CYManagerAlias } };
            string selectedManagerList = String.Join(",", cyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ReturnsAsync(employeeManagerList);
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);

            mockUnitOfWork.Setup(x => x.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(cyManagerAliasList, user)).ReturnsAsync(false);
            // Act
            var result = await sendStayConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(null, result);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnNull_WhenManagerDetailsAreEmpty()
        {
            //Arrange
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };

            var requestedData = new ConversationCompletionRequest
            {
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            // Act
            var result = await sendStayConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(null, result);
        }

        [Fact]
        public async Task SetConversationComplete_ShouldReturnNull_WhenIncorrectCyManagerIsPassed()
        {
            //Arrange
            var cyManagerAlias = "cyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };
            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias1",
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };

            var cyManagerAliasList = new List<string>() { cyManagerAlias };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            var employeeManagerList = new List<EmployeeManager>() { new EmployeeManager() { EmployeeAlias = requestedData.EmployeeAlias!, CYManagerAlias = requestedData.CYManagerAlias } };
            string selectedManagerList = String.Join(",", cyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ReturnsAsync(employeeManagerList);
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);

            mockUnitOfWork.Setup(x => x.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(cyManagerAliasList, user)).ReturnsAsync(true);
            // Act
            var result = await sendStayConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);

            // Assert
            Assert.Equal(null, result);
        }

        [Fact]
        public async Task SetConversationComplete_ThrowsException_OnError()
        {
            //Arrange
            var cyManagerAlias = "cyManagerAlias";
            var user = "user";
            List<string> roleList = new List<string>() { "Delegate" };
            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = cyManagerAlias,
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };

            var cyManagerAliasList = new List<string>() { cyManagerAlias };
            var employeeAliasList = new List<string>() { requestedData.EmployeeAlias };
            string selectedManagerList = String.Join(",", cyManagerAliasList);
            string rolesListString = String.Join(",", roleList);

            mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(employeeAliasList)).ThrowsAsync(new System.Exception("Error occured"));
            mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(mockCommonRepository.Object);

            mockSendStayRepository.Setup(x => x.CompleteConversation(conversationCompletionRequest, It.IsAny<string>())).ReturnsAsync(true);
            mockUnitOfWork.Setup(x => x.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(x => x.HasAccessAsync(cyManagerAliasList, user)).ReturnsAsync(true);
            // Act
            try
            {
                await sendStayConversationService.SetConversationComplete(conversationCompletionRequest, user, roleList);
            }
            catch (System.Exception ex)
            {
                Assert.Equal("Error occured", ex.Message);
            }
        }

        [Fact]
        public async Task Get_ShouldReturnSendStayConversationResponse_WhenDataFound()
        {
            // Arrange
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                FilterOption = 0,
                PaginationDetails = new Pagination()
            };
            var loggedInUserAlias = "v-test";
            var aliasList = new List<string>() { "CyManagerAlias1" };
            var sendStayConversations = GetSendStayConversation();
            var sendStayConversationResponse = new SendStayConversationResponse
            {
                Conversations = sendStayConversations
            };

            mockUnitOfWork.Setup(uow => uow.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(authService => authService.GetAuthorizedAliasesListAsync(It.IsAny<List<string>>(), loggedInUserAlias)).ReturnsAsync(aliasList);
            mockSendStayRepository.Setup(repository => repository.Get(aliasList)).ReturnsAsync(sendStayConversations);
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);

            List<string> roleList = new List<string>();
            // Act
            var result = await sendStayConversationService.Get(conversationListRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(sendStayConversationResponse.Conversations.Count, result.Conversations.Count);
            Assert.Equal(sendStayConversationResponse.Conversations[0].FullName, result.Conversations[1].FullName);
            Assert.Equal(sendStayConversationResponse.Conversations[1].FullName, result.Conversations[0].FullName);
        }

        [Fact]
        public async Task Get_ShouldReturnNull_WhenAliasListIsEmpty()
        {
            // Arrange
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                FilterOption = 0,
                PaginationDetails = new Pagination()
            };
            var loggedInUserAlias = "v-test";
            List<string> aliasList = null;
            List<SendConversationDto> sendConversationDtos = new List<SendConversationDto>();

            var sendStayConversationResponse = new SendStayConversationResponse();
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);
            mockUnitOfWork.Setup(uow => uow.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(authService => authService.GetAuthorizedAliasesListAsync(It.IsAny<List<string>>(), loggedInUserAlias)).ReturnsAsync(aliasList);
            mockSendStayRepository.Setup(x => x.Get(It.IsAny<List<string>>())).ReturnsAsync(sendConversationDtos);
            // Act
            var result = await sendStayConversationService.Get(conversationListRequest, loggedInUserAlias, new List<string>());

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task Get_ShouldThrowInvalidOperationException_WhenSendStayRepositoryIsNull()
        {
            // Arrange
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                FilterOption = 0,
                PaginationDetails = new Pagination()
            };
            var loggedInUserAlias = "v-test";
            var aliasList = new List<string>() { "CyManagerAlias1" };

            mockUnitOfWork.Setup(uow => uow.GetRepository<ISendStayRepository>()).Returns((ISendStayRepository)null);
            mockAuthService.Setup(authService => authService.GetAuthorizedAliasesListAsync(It.IsAny<List<string>>(), loggedInUserAlias)).ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act & Assert
            await Assert.ThrowsAsync<InvalidOperationException>(() => sendStayConversationService.Get(conversationListRequest, loggedInUserAlias, roleList));
        }

        [Fact]
        public async Task GetStatistics_ShouldReturnConversationStatisticsResponse_WhenDataFound()
        {
            // Arrange
            var conversationStatisticRequest = new ConversationStatisticsRequest
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" }
            };
            var loggedInUserAlias = "v-test";
            var aliasList = new List<string>() { "CyManagerAlias1" };
            var conversationsStatistics = new ConversationStatisticsResponse();

            mockUnitOfWork.Setup(uow => uow.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(authService => authService.GetAuthorizedAliasesListAsync(It.IsAny<List<string>>(), loggedInUserAlias)).ReturnsAsync(aliasList);
            mockSendStayRepository.Setup(repository => repository.GetStatistics(aliasList)).ReturnsAsync(conversationsStatistics);
            mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var result = await sendStayConversationService.GetStatistics(conversationStatisticRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(conversationsStatistics, result);
        }

        [Fact]
        public async Task GetStatistics_ShouldThrowInvalidOperationException_WhenSendStayRepositoryIsNull()
        {
            // Arrange
            var conversationStatisticRequest = new ConversationStatisticsRequest
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" }
            };
            var loggedInUserAlias = "v-test";
            var aliasList = new List<string>() { "CyManagerAlias1" };

            mockUnitOfWork.Setup(uow => uow.GetRepository<ISendStayRepository>()).Returns((ISendStayRepository)null);
            mockAuthService.Setup(authService => authService.GetAuthorizedAliasesListAsync(It.IsAny<List<string>>(), loggedInUserAlias)).ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act & Assert
            await Assert.ThrowsAsync<InvalidOperationException>(() => sendStayConversationService.GetStatistics(conversationStatisticRequest, loggedInUserAlias, roleList));
        }

        [Fact]
        public async Task GetStatistics_ShouldReturnNull_WhenAliasListIsEmpty()
        {
            // Arrange
            var conversationStatisticRequest = new ConversationStatisticsRequest
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" }
            };
            var loggedInUserAlias = "v-test";
            var aliasList = new List<string>();
            var conversationsStatistics = new ConversationStatisticsResponse();

            mockUnitOfWork.Setup(uow => uow.GetRepository<ISendStayRepository>()).Returns(mockSendStayRepository.Object);
            mockAuthService.Setup(authService => authService.GetAuthorizedAliasesListAsync(It.IsAny<List<string>>(), loggedInUserAlias)).ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var result = await sendStayConversationService.GetStatistics(conversationStatisticRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        private static List<SendConversationDto> GetSendStayConversation()
        {
            return new List<SendConversationDto>()
            {
                                new SendConversationDto()
                {
                 Alias = "TestIc2",
                 FullName = "Test Full Name IC2",
                 Conversation="Required",
                 FyManagerChange="Y",
                 ConversationStatus="Completed",
                 FyManagerAlias="CyManagerAlias2",
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

                 new SendConversationDto()
                {
                  Alias = "TestIc1",
                  FullName = "Test Full Name IC1",
                  Conversation="Optional",
                  FyManagerChange="Y",
                  ConversationStatus="Pending",
                  FyManagerAlias="CyManagerAlias1",
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
                new SendConversationDto()
                {
                 Alias = "TestIc3",
                 Conversation="Required",
                 FullName = "Test Full Name IC3",
                 FyManagerChange="Y",
                 ConversationStatus="Pending",
                 FyManagerAlias="FyManagerAlias3",
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
                }
            };
        }
    }
}