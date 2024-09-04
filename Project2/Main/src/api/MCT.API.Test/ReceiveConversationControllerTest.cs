namespace MCT.API.Test
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Threading.Tasks;

    using MCT.API.Attributes;
    using MCT.API.Controllers;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.Models;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Routing;
    using Microsoft.Azure.Cosmos.Serialization.HybridRow;
    using Microsoft.Extensions.Options;

    using Moq;
    using Xunit;

    public class ReceiveConversationControllerTest
    {
        private readonly ActionContext actionContext;
        private readonly IOptions<ApplicationStateOptions> applicationState;

        private readonly Mock<IReceiveConversationService> _mockService;

        private readonly Mock<IConversationScriptTaxonomyService> _mockTaxonomyService;

        private readonly ReceiveConversationController _controller;

        public ReceiveConversationControllerTest()
        {
           
            applicationState = Options.Create<ApplicationStateOptions>(new ApplicationStateOptions());

            _mockService = new Mock<IReceiveConversationService>();
            _mockTaxonomyService = new Mock<IConversationScriptTaxonomyService>();

            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            var httpContextMock = new Mock<HttpContext>();
            var userMock = new Mock<ClaimsPrincipal>();
            var claimsMock = new Mock<IEnumerable<Claim>>();
            var claimMock = new Mock<Claim>("upn", "testUser@example.com");
            claimsMock.Setup(x => x.GetEnumerator()).Returns(new List<Claim> { claimMock.Object }.GetEnumerator());
            userMock.Setup(x => x.Claims).Returns(claimsMock.Object);
            httpContextMock.Setup(x => x.User).Returns(userMock.Object);
            httpContextAccessor.Setup(x => x.HttpContext).Returns(httpContextMock.Object);
            httpContextMock.Setup(x => x.Items).Returns(new Dictionary<object, object>());
            actionContext = new ActionContext(httpContextMock.Object, new RouteData(), new ControllerActionDescriptor());

            _controller = new ReceiveConversationController(_mockService.Object, _mockTaxonomyService.Object, applicationState,httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext(actionContext);

        }

        [Fact]
        public async Task CompleteReceiveConversation_ShouldReturnTrue_OnSuccess()
        {
            //Arrange
            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias",
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };

            List<string> roleList = new List<string> { "Manager" };
            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(x => x.SetConversationComplete(It.Is<List<ConversationCompletionRequest>>(y => y == conversationCompletionRequest), It.IsAny<string>(), roleList)).ReturnsAsync(true);

            // Act
            var result = await _controller.CompleteReceiveConversation(conversationCompletionRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            bool? value = okResult.Value as bool?;
            if (value.HasValue)
            {
                Assert.True(value.Value);
            }
            else
            {
                Assert.Null(value);
            }
        }

        [Fact]
        public async Task CompleteReceiveConversation_ShouldReturnForbiddenResult_WithIncorrectDetails()
        {
            //Arrange

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "invalidManagerAlias",
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            _controller.ControllerContext = new ControllerContext(actionContext);
            List<string> roleList = new List<string>();
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(x => x.SetConversationComplete(It.Is<List<ConversationCompletionRequest>>(y => y == conversationCompletionRequest), It.IsAny<string>(), roleList)).ReturnsAsync((bool?)null);

            // Act
            var result = await _controller.CompleteReceiveConversation(conversationCompletionRequest);

            // Assert
            var okResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, okResult.StatusCode);
        }

        [Fact]
        public async Task CompleteReceiveConversation_ShouldReturn_ForbiddenResult()
        {
            //Arrange

            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "invalidManagerAlias",
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            List<string> roleList = new List<string>();

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(x => x.SetConversationComplete(It.Is<List<ConversationCompletionRequest>>(y => y == conversationCompletionRequest), It.IsAny<string>(), roleList))
                .ThrowsAsync(new Exception("Server error encountered while completing receive conversation"));

            // Assert 

            var result = await _controller.CompleteReceiveConversation(conversationCompletionRequest);

            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task CompleteReceiveConversation_ShouldReturnForbiddenResult_WhenUserNotLoggedIn()
        {
            //Arrange
            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "invalidManagerAlias",
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "empAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            List<string> roleList = new List<string> { "Manager" };
            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            // Act
            var result = await _controller.CompleteReceiveConversation(conversationCompletionRequest);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task CompleteReceiveConversation_ReturnsInternalServerError_WhenDataNotFound()
        {
            //Arrange
            var requestedData = new ConversationCompletionRequest
            {
                CYManagerAlias = "cyManagerAlias",
                FYManagerAlias = "fyManagerAlias",
                ScriptFollowed = true,
                EmployeeAlias = "invalidAlias",
            };

            var conversationCompletionRequest = new List<ConversationCompletionRequest>() { requestedData };
            List<string> roleList = new List<string> { "Manager" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(x => x.SetConversationComplete(It.Is<List<ConversationCompletionRequest>>(y => y == conversationCompletionRequest), It.IsAny<string>(), roleList)).ReturnsAsync(false);

            // Act
            var result = await _controller.CompleteReceiveConversation(conversationCompletionRequest);

            // Assert
            var response = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status500InternalServerError, response.StatusCode);
            Assert.Equal("No record found with this data.", response.Value);
        }

        [Fact]
        public async Task Get_ShouldReturnOkResponse_WhenSuccess()
        {
            // Arrange
            var ReceiveEntitiesList = TestReceiveEntitiesData();
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                FilterOption = 0,
                PaginationDetails = new Pagination()
            };
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            var expectedConversation = new ReceiveConversationResponse
            {
                Conversations = ReceiveEntitiesList.Where(s => s.FyManagerAlias == "FyManagerAlias1").ToList()
            };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(service => service.Get(It.IsAny<ConversationListRequest>(), It.IsAny<string>(), roleList)).ReturnsAsync(expectedConversation);
            // Act
            var result = await _controller.Get(conversationListRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(expectedConversation, okResult.Value);
        }

        [Fact]
        public async Task Get_ShouldReturnForbiddenResponse_WhenDataNotFound()
        {
            // Arrange
            var ReceiveEntitiesList = TestReceiveEntitiesData();
            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string>() { "abc" },
                FilterOption = 0,
                PaginationDetails = new Pagination()
            };
            var expectedConversation = new ReceiveConversationResponse
            {
                Conversations = new List<ReceiveConversationDto>()
            };
            expectedConversation = null;
            List<string> roleList = new List<string>() { new string("Manager"), new string("Delegate") };
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(service => service.Get(It.IsAny<ConversationListRequest>(), It.IsAny<string>(), roleList)).ReturnsAsync(expectedConversation);

            // Act
            var result = await _controller.Get(conversationListRequest);

            // Assert
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task Get_ReturnsInternalServerError_OnException()
        {
            // Arrange

            var conversationListRequest = new ConversationListRequest
            {
                ManagerAliases = new List<string>() { "abc" },
                FilterOption = 0,
                PaginationDetails = new Pagination()
            };
            List<string> roleList = new List<string>() { "Delegate" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(service => service.Get(It.IsAny<ConversationListRequest>(), It.IsAny<string>(), roleList))
                       .ThrowsAsync(new Exception());

            var result = await _controller.Get(conversationListRequest);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status500InternalServerError, statusCodeResult.StatusCode);
        }

        [Fact]
        public async Task GetStatistic_ShouldReturnOkResponse_WhenSuccess()
        {
            // Arrange
            var conversationStatisticRequest = new ConversationStatisticsRequest()
            {
                ManagerAliases = new List<string>() { "abc" }
            };
            var expectedConversationStatistic = new ConversationStatisticsResponse
            {
                RequiredCompleted = 2,
                RequiredPending = 3,
                RequiredConversations = 5
            };
            List<string> roleList = new List<string>() { "Manager", "Delegate" };
            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(service => service.GetStatistics(conversationStatisticRequest, It.IsAny<string>(), roleList)).ReturnsAsync(expectedConversationStatistic);

            // Act
            var result = await _controller.GetStatistics(conversationStatisticRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(expectedConversationStatistic, okResult.Value);
        }

        [Fact]
        public async Task GetStatistic_ShouldReturnForbiddenResponse_WhenDataNotFound()
        {
            // Arrange
            var conversationStatisticRequest = new ConversationStatisticsRequest()
            {
                ManagerAliases = new List<string>() { "abc1" }
            };
            ConversationStatisticsResponse? expectedConversationStatistic = null;
            List<string> roleList = new List<string>() { new string("Manager"), new string("Delegate") };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(service => service.GetStatistics(It.IsAny<ConversationStatisticsRequest>(), It.IsAny<string>(), roleList)).ReturnsAsync(expectedConversationStatistic);

            // Act
            var result = await _controller.GetStatistics(conversationStatisticRequest);

            // Assert
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetStatistic_ReturnsInternalServerError_OnException()
        {
            // Arrange
            var conversationStatisticRequest = new ConversationStatisticsRequest()
            {
                ManagerAliases = new List<string>() { "abc" }
            };
            var expectedConversationStatistic = new ConversationStatisticsResponse
            {
                RequiredCompleted = 2,
                RequiredPending = 3,
                RequiredConversations = 5
            };
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockService.Setup(service => service.GetStatistics(It.IsAny<ConversationStatisticsRequest>(), It.IsAny<string>(), roleList))
                       .ThrowsAsync(new Exception());

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(async () =>
            {
                var result = await _controller.GetStatistics(conversationStatisticRequest);

            });

            // Assert
            Assert.NotNull(exception);
        }

        [Fact]
        public async Task GetEmpConversationScript_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange

            string empAlias = "abc";
            var expectedConversationScript = TestConversationScriptData();
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockTaxonomyService.Setup(service => service.GetEmpConversationScript(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync(expectedConversationScript);


            // Act
            var result = await _controller.GetEmpConversationScript(empAlias);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(expectedConversationScript, okResult.Value);
        }

        [Fact]
        public async Task GetEmpConversationScript_ShouldReturnForbiddenResponse_WhenDataNotFound()
        {
            // Arrange

            string empAlias = "abc";
            EmpConversationScriptResponse? expectedConversationScript = null;
            List<string> roleList = new List<string> { "Admin" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockTaxonomyService.Setup(service => service.GetEmpConversationScript(empAlias, It.IsAny<string>(), roleList, "")).ReturnsAsync(expectedConversationScript);

            // Act
            var result = await _controller.GetEmpConversationScript(empAlias);

            // Assert
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetEmpConversationScript_Returns_ForbiddenResult()
        {
            string empAlias = "abc";
            var expectedConversationScript = TestConversationScriptData();
            List<string> roleList = new List<string>();
            _mockTaxonomyService.Setup(service => service.GetEmpConversationScript(empAlias, It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ThrowsAsync(new Exception());

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            // Act
            var result = await _controller.GetEmpConversationScript(empAlias);

            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);

        }

        private static List<ReceiveConversationDto> TestReceiveEntitiesData()
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
                new ReceiveConversationDto()
                {
                 FullName = "Test Full Name IC4",
                 FyManagerChange="Y",
                 SendingConversationStatus="Completed",
                 ReceiveConversationStatus="Pending",
                 FyManagerAlias="CyManagerAlias1",
                 CyManagerAlias = "CyManagerAlias1",
                 EdmValidation ="EdmValidation",
                 CyOrg = "Cy Organization 4",
                 CyRoleSummary = "Cy Role Summary 4",
                 CyQ2 = "Cy Q4 Data 4",
                 CyQ1 = "Cy Q4 Data 4",
                 CyCareerStage = "Cy Career Stage 4",
                 CyIncentivePlan = "Cy Incentive Plan 4",
                 CyCostCenter = "Cy Cost Center 4",
                 FyOrg = "Fy Organization 4",
                 FyRoleSummary = "Fy Role Summary 4",
                 FyQ2 = "Fy Q4 Data 4",
                 FyQ1 = "Fy Q4 Data 4",
                 FyIncentivePlan = "Fy Incentive Plan 4",
                 Alias = "TestIc4",
                 FyCostCenter = "Fy Cost Center 4",
                 },
                new ReceiveConversationDto()
                 {
                   Alias = "TestIc5",
                   FullName = "Test Full Name IC5",
                   FyManagerChange="Y",
                   SendingConversationStatus="Completed",
                   ReceiveConversationStatus="Pending",
                   FyManagerAlias="FyManagerAlias5",
                   CyManagerAlias = "CyManagerAlias5",
                   EdmValidation ="EdmValidation",
                   CyOrg = "Cy Organization 5",
                   CyRoleSummary = "Cy Role Summary 5",
                   CyQ2 = "Cy Q5 Data 5",
                   CyQ1 = "Cy Q5 Data 5",
                   CyCareerStage = "Cy Career Stage 5",
                   CyIncentivePlan = "Cy Incentive Plan 5",
                   CyCostCenter = "Cy Cost Center 5",
                   FyOrg = "Fy Organization 5",
                   FyRoleSummary = "Fy Role Summary 5",
                   FyQ2 = "Fy Q5 Data 5",
                   FyQ1 = "Fy Q5 Data 5",
                   FyIncentivePlan = "Fy Incentive Plan 5",
                   FyCostCenter = "Fy Cost Center 5",
                 },
                new ReceiveConversationDto()
                  {
                   Alias = "TestIc6",
                   FullName = "Test Full Name IC6",
                   FyManagerChange="Y",
                   SendingConversationStatus="Completed",
                   ReceiveConversationStatus="Completed",
                   FyManagerAlias="FyManagerAlias5",
                   CyManagerAlias = "CyManagerAlias5",
                   EdmValidation ="EdmValidation",
                   CyOrg = "Cy Organization 6",
                   CyRoleSummary = "Cy Role Summary 6",
                   CyQ2 = "Cy Q6 Data 6",
                   CyQ1 = "Cy Q6 Data 6",
                   CyCareerStage = "Cy Career Stage 6",
                   CyIncentivePlan = "Cy Incentive Plan 6",
                   CyCostCenter = "Cy Cost Center 6",
                   FyOrg = "Fy Organization 6",
                   FyRoleSummary = "Fy Role Summary 6",
                   FyQ2 = "Fy Q6 Data 6",
                   FyQ1 = "Fy Q6 Data 6",
                   FyIncentivePlan = "Fy Incentive Plan 6",
                   FyCostCenter = "Fy Cost Center 6",
                  },
                new ReceiveConversationDto()
                  {
                  Alias = "TestIc7",
                  FullName = "Test Full Name IC7",
                  FyManagerChange="Y",
                  SendingConversationStatus="Attempted",
                  ReceiveConversationStatus="Pending",
                  FyManagerAlias="FyManagerAlias7",
                  CyManagerAlias = "CyManagerAlias1",
                  EdmValidation ="EdmValidation",
                  CyOrg = "Cy Organization 7",
                  CyRoleSummary = "Cy Role Summary 7",
                  CyQ2 = "Cy Q7 Data 7",
                  CyQ1 = "Cy Q7 Data 7",
                  CyCareerStage = "Cy Career Stage 7",
                  CyIncentivePlan = "Cy Incentive Plan 7",
                  CyCostCenter = "Cy Cost Center 7",
                  FyOrg = "Fy Organization 7",
                  FyRoleSummary = "Fy Role Summary 7",
                  FyQ2 = "Fy Q7 Data 7",
                  FyQ1 = "Fy Q7 Data 7",
                  FyIncentivePlan = "Fy Incentive Plan 7",
                  FyCostCenter = "Fy Cost Center 7"
                  },
                new ReceiveConversationDto()
                 {
                  Alias = "TestIc8",
                  FullName = "Test Full Name IC8",
                  FyManagerChange="Y",
                  SendingConversationStatus="Pending",
                  ReceiveConversationStatus="Completed",
                  FyManagerAlias="CyManagerAlias2",
                  CyManagerAlias = "CyManagerAlias2",
                  EdmValidation ="EdmValidation",
                  CyOrg = "Cy Organization 8",
                  CyRoleSummary = "Cy Role Summary 8",
                  CyQ2 = "Cy Q8 Data 8",
                  CyQ1 = "Cy Q8 Data 8",
                  CyCareerStage = "Cy Career Stage 8",
                  CyIncentivePlan = "Cy Incentive Plan 8",
                  CyCostCenter = "Cy Cost Center 8",
                  FyOrg = "Fy Organization 8",
                  FyRoleSummary = "Fy Role Summary 8",
                  FyQ2 = "Fy Q8 Data 8",
                  FyQ1 = "Fy Q8 Data 8",
                  FyIncentivePlan = "Fy Incentive Plan 8",
                  FyCostCenter = "Fy Cost Center 8",
                },
                new ReceiveConversationDto()
                 {
                  Alias = "TestIc9",
                  FullName = "Test Full Name IC9",
                  FyManagerChange="Y",
                  SendingConversationStatus="Completed",
                  ReceiveConversationStatus="Completed",
                  FyManagerAlias="CyManagerAlias9",
                  CyManagerAlias = "CyManagerAlias9",
                  EdmValidation ="EdmValidation",
                  CyOrg = "Cy Organization 9",
                  CyRoleSummary = "Cy Role Summary 9",
                  CyQ2 = "Cy Q9 Data 9",
                  CyQ1 = "Cy Q9 Data 9",
                  CyCareerStage = "Cy Career Stage 9",
                  CyIncentivePlan = "Cy Incentive Plan 9",
                  CyCostCenter = "Cy Cost Center 9",
                  FyOrg = "Fy Organization 9",
                  FyRoleSummary = "Fy Role Summary 9",
                  FyQ2 = "Fy Q9 Data 9",
                  FyQ1 = "Fy Q9 Data 9",
                  FyIncentivePlan = "Fy Incentive Plan 9",
                  FyCostCenter = "Fy Cost Center 9",
                 },
                new ReceiveConversationDto()
                  {
                   Alias = "TestIc10",
                   FullName = "Test Full Name IC10",
                   FyManagerChange="Y",
                   SendingConversationStatus="Pending",
                   ReceiveConversationStatus="Completed",
                   FyManagerAlias="CyManagerAlias10",
                   CyManagerAlias = "CyManagerAlias10",
                   EdmValidation ="EdmValidation",
                   CyOrg = "Cy Organization 10",
                   CyRoleSummary = "Cy Role Summary 10",
                   CyQ2 = "Cy Q10 Data 10",
                   CyQ1 = "Cy Q10 Data 10",
                   CyCareerStage = "Cy Career Stage 10",
                   CyIncentivePlan = "Cy Incentive Plan 10",
                   CyCostCenter = "Cy Cost Center 10",
                   FyOrg = "Fy Organization 10",
                   FyRoleSummary = "Fy Role Summary 10",
                   FyQ2 = "Fy Q10 Data 10",
                   FyQ1 = "Fy Q10 Data 10",
                   FyIncentivePlan = "Fy Incentive Plan 10",
                   FyCostCenter = "Fy Cost Center 10",
                  }

            };
        }

        private static EmpConversationScriptResponse TestConversationScriptData()
        {
            String[] keyMessages = { "abc", "def" };
            String[] closingContext = { "m", "def" };
            String[] specificChangeForEmployee = { "abc", "def" };
            String[] specificChangeOptional = { "abc", "def" };

            SectionDetails sectionDetails = new SectionDetails();

            var taxonomyData = new TaxonomyDto()
            {
                Org = "abc",
                Profession = "k",
                Discipline = "rolesum",
                RoleSummary = "rolesum M",
                Q1 = "q1",
                Q2 = "q2",
                IncentivePlan = "ip",
                CareerStage = "l",
                BusinessLeader = "bl",
                Manager = "acs"
            };

            return new EmpConversationScriptResponse()
            {
                EmpAlias = "test",
                EmpName = "test F",
                CYTaxonomy = taxonomyData,
                FYTaxonomy = taxonomyData,

            };
        }
    }
}
