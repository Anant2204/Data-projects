namespace MCT.API.Test
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Threading.Tasks;
    using MCT.API.Controllers;
    using MCT.Business.Interfaces;
    using MCT.API.Attributes;
    using MCT.DataAccess.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.KeyVault;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Routing;
    using Xunit;
    using Moq;
    using Microsoft.Azure.Amqp.Transaction;

    public class CommonControllerTests
    {
        private readonly Mock<ICommonService> _mockCommonService;
        private readonly Mock<IKeyVaultClient> _mockKeyVaultClient;
        private readonly CommonController _controller;
        private readonly IOptions<ApplicationStateOptions> _applicationState;
        private readonly ActionContext actionContext;

        public CommonControllerTests()
        {
            _mockCommonService = new Mock<ICommonService>();
            _mockKeyVaultClient = new Mock<IKeyVaultClient>();
            _applicationState = Options.Create(new ApplicationStateOptions());

            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            var httpContextMock = new Mock<HttpContext>();
            var userMock = new Mock<ClaimsPrincipal>();
            var claimsMock = new Mock<IEnumerable<Claim>>();
            var claimMock = new Mock<Claim>("upn", "test@example.com");
            var Roles = new List<string> { "Admin" };
            claimsMock.Setup(x => x.GetEnumerator()).Returns(new List<Claim> { claimMock.Object }.GetEnumerator());
            userMock.Setup(x => x.Claims).Returns(claimsMock.Object);
            httpContextMock.Setup(x => x.User).Returns(userMock.Object);
            httpContextAccessor.Setup(x => x.HttpContext).Returns(httpContextMock.Object);
            httpContextMock.Setup(x => x.Items).Returns(new Dictionary<object, object>());
            actionContext = new ActionContext(httpContextMock.Object, new RouteData(), new ControllerActionDescriptor());
            _controller = new CommonController(_mockCommonService.Object, _applicationState, _mockKeyVaultClient.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin" };
        }

        [Fact]
        public async Task GetOrgDetails_ReturnsForbidden_WhenNoRoles()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.GetOrgDetails("CY");

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetOrgDetails_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            _mockCommonService.Setup(service => service.GetOrgDetailsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(new List<string> { "Org1", "Org2" } as List<string>);

            // Act
            var result = await _controller.GetOrgDetails("CY");

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            var orgs = okResult?.Value as List<string>;
            Assert.Equal(2, orgs?.Count);
        }

        [Fact]
        public async Task GetOrgDetails_ReturnsForbidden_WhenServiceNoResponse()
        {
            // Arrange
            _mockCommonService.Setup(service => service.GetOrgDetailsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((List<string>)null);

            // Act
            var result = await _controller.GetOrgDetails("CY");

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetTaxonomyDetailsInHierarchy_ReturnsForbidden_WhenNoRoles()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.GetTaxonomyDetailsInHierarchy("org", "CY");

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetTaxonomyDetailsInHierarchy_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            var taxonomyDetails = new TaxonomyDetailsWithIncentivePlanHierarchy();
            _mockCommonService.Setup(service => service.GetTaxonomyDetailsInHierarchyAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(taxonomyDetails);

            // Act
            var result = await _controller.GetTaxonomyDetailsInHierarchy("org", "requestType");

            // Assert
            var okResult = result.Result as OkObjectResult;
            var response = okResult?.Value as TaxonomyDetailsWithIncentivePlanHierarchy;
            Assert.Equal(taxonomyDetails, response);
        }

        [Fact]
        public async Task GetTaxonomyDetailsInHierarchy_ReturnsForbidden_WhenServiceReturnsNoResponse()
        {
            // Arrange
            _mockCommonService.Setup(service => service.GetTaxonomyDetailsInHierarchyAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((TaxonomyDetailsWithIncentivePlanHierarchy?)null);

            // Act
            var result = await _controller.GetTaxonomyDetailsInHierarchy("org", "cy");

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetLoggedInUserPrivilege_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange
            Mock<ICommonService> commonServiceMock = new Mock<ICommonService>();
            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            Mock<IKeyVaultClient> keyVaultMock = new Mock<IKeyVaultClient>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            CommonController commonController = new CommonController(commonServiceMock.Object, applicationStateMock.Object, keyVaultMock.Object, httpContextAccessor.Object);
            commonController.ControllerContext = new ControllerContext();
            commonController.ControllerContext.HttpContext = null;

            // Act
            var result = await commonController.GetLoggedInUserPrivilege();

            // Assert
            Assert.IsType<ObjectResult>(result);
            var objectResult = (ObjectResult)result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
            Assert.Null(objectResult.Value);
        }

        [Fact]
        public async Task GetTaxonomyDetailsInHierarchy_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange
            Mock<ICommonService> commonServiceMock = new Mock<ICommonService>();
            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            Mock<IKeyVaultClient> keyVaultMock = new Mock<IKeyVaultClient>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            CommonController commonController = new CommonController(commonServiceMock.Object, applicationStateMock.Object, keyVaultMock.Object, httpContextAccessor.Object);
            commonController.ControllerContext = new ControllerContext();
            commonController.ControllerContext.HttpContext = null;

            // Act
            var result = await commonController.GetTaxonomyDetailsInHierarchy("org", "cy");

            // Assert
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
            Assert.Null(objectResult.Value);
        }

        [Fact]
        public async Task GetLoggedInUserPrivilege_ReturnsOkResult()
        {
            // Arrange
            UserPermissions expectedPermissions = new UserPermissions();
            expectedPermissions.Roles.Add("Admin");
            expectedPermissions.Permissions.Add(new FeatureLevelPermissions { FeatureName = "AssignEDMLead", Permission = new List<string> { "Write, Read" } });
            expectedPermissions.DefaultFeatures.Add(new RoleDefaultFeatures { Role = "Admin", defaultFeature = "Summary" });

            _mockCommonService.Setup(service => service.GetLoggedInUserPrivilege(It.IsAny<string>()))
                .ReturnsAsync(expectedPermissions);

            // Act
            var result = await _controller.GetLoggedInUserPrivilege();

            // Assert
            Assert.IsType<ObjectResult>(result);
            var objectResult = (ObjectResult)result;
            Assert.Equal(StatusCodes.Status200OK, objectResult.StatusCode);
        }

        [Fact]
        public async Task GetOrgDetails_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange
            Mock<ICommonService> commonServiceMock = new Mock<ICommonService>();
            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            Mock<IKeyVaultClient> keyVaultMock = new Mock<IKeyVaultClient>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            CommonController commonController = new CommonController(commonServiceMock.Object, applicationStateMock.Object, keyVaultMock.Object, httpContextAccessor.Object);
            commonController.ControllerContext = new ControllerContext();
            commonController.ControllerContext.HttpContext = null;

            // Act
            var result = await commonController.GetOrgDetails("cy");

            // Assert
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
            Assert.Null(objectResult.Value);
        }
    }
}
