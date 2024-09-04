namespace MCT.API.Test
{
    using System;
    using System.Collections.Generic;
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
    using Microsoft.Azure.Amqp.Transaction;
    using Microsoft.Extensions.Options;

    using Moq;
    using Xunit;

    public class FYSummaryControllerTests
    {
        private readonly ActionContext actionContext;
        private readonly IOptions<ApplicationStateOptions> applicationState;
        private readonly Mock<IFYSummaryService> _mockFYSummaryService;
        private readonly FYSummaryController _fySummaryController;

        public FYSummaryControllerTests()
        {
            applicationState = Options.Create<ApplicationStateOptions>(new ApplicationStateOptions());
            _mockFYSummaryService = new Mock<IFYSummaryService>();
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
            _fySummaryController = new FYSummaryController(_mockFYSummaryService.Object, applicationState,httpContextAccessor.Object);
            _fySummaryController.ControllerContext = new ControllerContext(actionContext);

        }

        [Fact]
        public async Task GetStatistics_ShouldReturnFYSummaryStatisticsResponse_WhenDataFound()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                PaginationDetails = new Pagination()
            };

            var userAlias = "testUser";

            FYSummaryStatisticsResponse? response = new FYSummaryStatisticsResponse();
            response = new FYSummaryStatisticsResponse()
            {
                CYTeam = 5,
                FYTeam = 3,
                Joining = 1,
                Leaving = 3,
                FyTaxonomyChange = 0
            };
            
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetStatisticsAsync(fySummaryRequest, userAlias, roleList))
                .ReturnsAsync(response);

            // Act
            var result = await _fySummaryController.GetStatistics(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(response, okResult.Value);
        }

        [Fact]
        public async Task GetStatistics_ShouldReturnForbidden_WhenUserNotLoggedIn()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                PaginationDetails = new Pagination()
            };

            List<string> roleList = new List<string>();

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            // Act
            var result = await _fySummaryController.GetStatistics(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetStatistics_ShouldReturnInternalServerError_WhenExceptionThrown()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest();
            var userAlias = "testUser";

            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetStatisticsAsync(fySummaryRequest, userAlias, roleList))
                .ThrowsAsync(new Exception("An error occured while fetching statistics for FY summary"));

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(async () =>
            {
                var result = await _fySummaryController.GetStatistics(fySummaryRequest);
            });

            // Assert
            Assert.NotNull(exception);
            Assert.Equal("An error occured while fetching statistics for FY summary", exception.Message);
        }

        [Fact]
        public async Task GetCurrentYearEmployees_ShouldReturnFYSummaryResponse_WhenDataFound()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                PaginationDetails = new Pagination()
            };

            var userAlias = "testUser";

            var response = new FYSummaryResponse()
            {
                Team = new List<FYSummaryDto>()
                {
                    new FYSummaryDto()
                    {
                        FullName = "testFullName",
                        Alias = "testAlias",
                        RoleSummary = "testRoleSummary",
                        Q1 = "testQ1",
                        Q2 = "testQ2",
                        IsMoving = true,
                    },
                    new FYSummaryDto()
                    {
                        FullName = "testFullName2",
                        Alias   = "testAlias2",
                        RoleSummary = "testRoleSummary2",
                        Q1 = "N/A",
                        Q2 = "N/A",
                        IsMoving = false,
                    }
                }
            };
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetCurrentYearEmployeesAsync(fySummaryRequest, userAlias, roleList))
                .ReturnsAsync(response);

            // Act
            var result = await _fySummaryController.GetCurrentYearEmployees(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(response, okResult.Value);
        }

        [Fact]
        public async Task GetCurrentYearEmployees_ShouldReturnInternalServerError_WhenExceptionThrown()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest();
            var userAlias = "testUser";
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetCurrentYearEmployeesAsync(fySummaryRequest, userAlias, roleList))
                .ThrowsAsync(new Exception("An unknown error occured while fetching current team for FY summary"));

            var exception = await Assert.ThrowsAsync<Exception>(async () =>
            {
                var result = await _fySummaryController.GetCurrentYearEmployees(fySummaryRequest);
            });

            // Assert
            Assert.NotNull(exception);
            Assert.Equal("An unknown error occured while fetching current team for FY summary", exception.Message);

        }

        [Fact]
        public async Task GetFutureYearEmployees_ShouldReturnInternalServerError_WhenExceptionThrown()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest();
            var userAlias = "testUser";
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetFutureYearEmployeesAsync(fySummaryRequest, userAlias, roleList))
                .ThrowsAsync(new Exception("An error occured while fetching future team for FY summary"));

            var exception = await Assert.ThrowsAsync<Exception>(async () =>
            {
                var result = await _fySummaryController.GetFutureYearEmployees(fySummaryRequest);
            });

            // Assert
            Assert.NotNull(exception);
            Assert.Equal("An error occured while fetching future team for FY summary", exception.Message);
        }

        [Fact]
        public async Task GetFutureYearEmployees_ShouldReturnFYSummaryResponse_WhenDataFound()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                PaginationDetails = new Pagination()
            };

            var userAlias = "testUser";

            var response = new FYSummaryResponse()
            {
                Team = new List<FYSummaryDto>()
                {
                    new FYSummaryDto()
                    {
                        FullName = "testFullName",
                        Alias = "testAlias",
                        RoleSummary = "testRoleSummary",
                        Q1 = "testQ1",
                        Q2 = "testQ2",
                        IsMoving = true,
                    },
                    new FYSummaryDto()
                    {
                        FullName = "testFullName2",
                        Alias   = "testAlias2",
                        RoleSummary = "testRoleSummary2",
                        Q1 = "N/A",
                        Q2 = "N/A",
                        IsMoving = false,
                    }
                }
            };
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetFutureYearEmployeesAsync(fySummaryRequest, userAlias, roleList))
                .ReturnsAsync(response);

            // Act
            var result = await _fySummaryController.GetFutureYearEmployees(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(response, okResult.Value);
        }

        [Fact]
        public async Task GetCurrentYearEmployees_ShouldReturnForbidden_WhenUserNotLoggedIn()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                PaginationDetails = new Pagination()
            };

            List<string> roleList = new List<string>() { "Manager" };

            FYSummaryResponse? response = null;

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetCurrentYearEmployeesAsync(fySummaryRequest, It.IsAny<string>(), It.IsAny<List<string>>()))
                    .ReturnsAsync(response);

            // Act
            var result = await _fySummaryController.GetCurrentYearEmployees(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetFutureYearEmployees_ShouldReturnForbidden_WhenUserNotLoggedIn()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias" },
                PaginationDetails = new Pagination()
            };

            List<string> roleList = new List<string>();

            var response = new FYSummaryResponse()
            { };

            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            // Act
            var result = await _fySummaryController.GetFutureYearEmployees(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetFutureYearEmployees_ShouldReturnForbidden_WhenUserNotAuthorized()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias" },
                PaginationDetails = new Pagination()
            };

            var userAlias = "testUser";
            List<string> roleList = new List<string>() { new string("Manager"), new string("Delegate") };
            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetFutureYearEmployeesAsync(fySummaryRequest, userAlias, roleList))
                .ReturnsAsync((FYSummaryResponse)null);

            // Act
            var result = await _fySummaryController.GetFutureYearEmployees(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetCurrentYearEmployees_ShouldReturnForbidden_WhenUserNotAuthorized()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias" },
                PaginationDetails = new Pagination()
            };

            var userAlias = "testUser";
            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            List<string> roleList = new List<string>() { "Manager", "Delegate" };
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetCurrentYearEmployeesAsync(fySummaryRequest, userAlias, roleList))
                .ReturnsAsync((FYSummaryResponse)null);

            // Act
            var result = await _fySummaryController.GetCurrentYearEmployees(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetStatistics_ShouldReturnForbidden_WhenUserNotAuthorized()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                PaginationDetails = new Pagination()
            };

            var userAlias = "testUser";
            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            List<string> roleList = new List<string>() { new string("Manager"), new string("Delegate") };
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockFYSummaryService.Setup(service => service.GetStatisticsAsync(fySummaryRequest, userAlias, roleList))
                .ReturnsAsync((FYSummaryStatisticsResponse)null);

            // Act
            var result = await _fySummaryController.GetStatistics(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetCurrentYearEmployees_ShouldLogRequestResponse_WhenItIsEnabled()
        {
            // Arrange
            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = new List<string>() { "CyManagerAlias1" },
                PaginationDetails = new Pagination()
            };

            var userAlias = "testUser";

            var response = new FYSummaryResponse()
            {
                Team = new List<FYSummaryDto>()
                {
                    new FYSummaryDto()
                    {
                        FullName = "testFullName",
                        Alias = "testAlias",
                        RoleSummary = "testRoleSummary",
                        Q1 = "testQ1",
                        Q2 = "testQ2",
                        IsMoving = true,
                    },
                    new FYSummaryDto()
                    {
                        FullName = "testFullName2",
                        Alias   = "testAlias2",
                        RoleSummary = "testRoleSummary2",
                        Q1 = "N/A",
                        Q2 = "N/A",
                        IsMoving = false,
                    }
                }
            };
            List<string> roleList = new List<string> { "Manager", "Delagate", "Admin" };
            var appState = Options.Create<ApplicationStateOptions>(new ApplicationStateOptions()
            {
                LogRequestResponse = true,
            });
            _fySummaryController.ControllerContext = new ControllerContext(actionContext);
            _fySummaryController.ControllerContext.HttpContext.Items["Roles"] = roleList;


            _mockFYSummaryService.Setup(service => service.GetCurrentYearEmployeesAsync(fySummaryRequest, userAlias, roleList))
                    .ReturnsAsync(response);
            // Act
            var result = await _fySummaryController.GetCurrentYearEmployees(fySummaryRequest);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(response, okResult.Value);
        }
    }
}