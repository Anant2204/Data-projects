namespace MCT.API.Test
{
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using MCT.DataAccess;
    using MCT.Business.Interfaces;
    using MCT.API.Controllers;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.API.Attributes;
    using Microsoft.Extensions.Options;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Routing;
    using Microsoft.Extensions.Configuration;
    using Xunit;
    using Moq;

    public class TaxonomyScriptContentControllerTests
    {
        private Mock<ITaxonomyScriptContentService> _mockService;
        private Mock<IOptions<ApplicationStateOptions>> _mockOptions;
        private Mock<IConfiguration> _mockConfiguration;
        private TaxonomyScriptContentController _controller;
        private readonly ActionContext actionContext;

        public TaxonomyScriptContentControllerTests()
        {
            _mockService = new Mock<ITaxonomyScriptContentService>();
            _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            _mockConfiguration = new Mock<IConfiguration>();
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
            _controller = new TaxonomyScriptContentController(_mockService.Object, _mockOptions.Object, _mockConfiguration.Object,httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext(actionContext);
        }

        [Fact]
        public async Task Get_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor", "Super User" };

            var response = new TaxonomyScriptContentResponse();
            _mockService.Setup(service => service.Get(It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.Get();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(response, (result.Result as OkObjectResult).Value);
        }

        [Fact]
        public async Task Get_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor", "Super User" };

            _mockService.Setup(service => service.Get(It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((TaxonomyScriptContentResponse)null);

            // Act
            var result = await _controller.Get();

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task Get_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.Get();

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetFYManagersForScriptExclusion_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            var response = new List<FutureManager>();
            _mockService.Setup(service => service.GetFYManagersForScriptExclusionAsync(It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.GetFYManagersForScriptExclusion("searchString");

            // Assert
            Assert.NotNull(result);
            var contentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, contentResult.StatusCode);
        }

        [Fact]
        public async Task GetFYManagersForScriptExclusion_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            _mockService.Setup(service => service.GetFYManagersForScriptExclusionAsync(It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync((List<FutureManager>)null);

            // Act
            var result = await _controller.GetFYManagersForScriptExclusion("searchString");

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetFYManagersForScriptExclusion_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.GetFYManagersForScriptExclusion("searchString");

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetStatisticsAsync_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            var response = new TaxonomyScriptContentStatisticResponse();
            _mockService.Setup(service => service.GetStatisticsAsync(It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.GetStatisticsAsync();

            // Assert
            Assert.NotNull(result);
            var contentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, contentResult.StatusCode);
        }

        [Fact]
        public async Task GetStatisticsAsync_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            _mockService.Setup(service => service.GetStatisticsAsync(It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((TaxonomyScriptContentStatisticResponse)null);

            // Act
            var result = await _controller.GetStatisticsAsync();

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetStatisticsAsync_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.GetFYManagersForScriptExclusion("searchString");

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetAuditDetailsAsync_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            var response = new List<TaxonomyScriptContentAuditHistoryResponse>();
            _mockService.Setup(service => service.GetAuditDetailsAsync(It.IsAny<int>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.GetAuditDetailsAsync(1);

            // Assert
            Assert.NotNull(result);
            var contentResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, contentResult.StatusCode);
        }

        [Fact]
        public async Task GetAuditDetailsAsync_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            _mockService.Setup(service => service.GetAuditDetailsAsync(It.IsAny<int>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync((List<TaxonomyScriptContentAuditHistoryResponse>)null);

            // Act
            var result = await _controller.GetAuditDetailsAsync(1);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetAuditDetailsAsync_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.GetAuditDetailsAsync(1);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomyScriptContentStatusAsync_ReturnsOk_WhenServiceReturnsTrue()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin" };

            _mockService.Setup(service => service.UpdateTaxonomyScriptContentStatusAsync(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateTaxonomyScriptContentStatusAsync(1);

            // Assert
            Assert.NotNull(result);
            var contentResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, contentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomyScriptContentStatusAsync_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin" };

            _mockService.Setup(service => service.UpdateTaxonomyScriptContentStatusAsync(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((bool?)null);

            // Act
            var result = await _controller.UpdateTaxonomyScriptContentStatusAsync(1);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomyScriptContentStatusAsync_ReturnsUnprocessableEntity_WhenServiceReturnsFalse()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin" };

            _mockService.Setup(service => service.UpdateTaxonomyScriptContentStatusAsync(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateTaxonomyScriptContentStatusAsync(1);

            // Assert
            Assert.NotNull(result);
            var unProcessableEntityResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status422UnprocessableEntity, unProcessableEntityResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomyScriptContentStatusAsync_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.UpdateTaxonomyScriptContentStatusAsync(1);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task CreateOrUpdateTaxonomyScriptContent_ReturnsOk_WhenServiceReturnsTrue()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            var request = new TaxonomyScriptContentUpsertRequest();
            _mockService.Setup(service => service.CreateOrUpdateTaxonomyScriptContentAsync(It.IsAny<TaxonomyScriptContentUpsertRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.CreateOrUpdateTaxonomyScriptContent(request);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.True((bool)(result.Result as OkObjectResult).Value);
        }

        [Fact]
        public async Task CreateOrUpdateTaxonomyScriptContent_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            var request = new TaxonomyScriptContentUpsertRequest();
            _mockService.Setup(service => service.CreateOrUpdateTaxonomyScriptContentAsync(It.IsAny<TaxonomyScriptContentUpsertRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((bool?)null);

            // Act
            var result = await _controller.CreateOrUpdateTaxonomyScriptContent(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task CreateOrUpdateTaxonomyScriptContent_ReturnsInternalServerError_WhenServiceReturnsFalse()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin", "Script Contributor" };

            var request = new TaxonomyScriptContentUpsertRequest();
            _mockService.Setup(service => service.CreateOrUpdateTaxonomyScriptContentAsync(It.IsAny<TaxonomyScriptContentUpsertRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.CreateOrUpdateTaxonomyScriptContent(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status500InternalServerError, noContentResult.StatusCode);
        }

        [Fact]
        public async Task CreateOrUpdateTaxonomyScriptContent_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;
            var request = new TaxonomyScriptContentUpsertRequest();

            // Act
            var result = await _controller.CreateOrUpdateTaxonomyScriptContent(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task ImportTaxonomyScriptContent_ReturnsOk_WhenServiceReturnsTrue()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Super User" };

            var request = new List<TaxonomyScriptContentUpsertRequest>();
            _mockConfiguration.Setup(config => config[ApplicationConstants.SuperUsers]).Returns("Role1,Role2,v-test");
            _mockService.Setup(service => service.ImportTaxonomyScriptContentAsync(It.IsAny<List<TaxonomyScriptContentUpsertRequest>>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.ImportTaxonomyScriptContent(request);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.True((bool)(result.Result as OkObjectResult).Value);
        }

        [Fact]
        public async Task ImportTaxonomyScriptContent_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Super User" };

            var request = new List<TaxonomyScriptContentUpsertRequest>();
            _mockConfiguration.Setup(config => config[ApplicationConstants.SuperUsers]).Returns("Role1,Role2,v-test");
            _mockService.Setup(service => service.ImportTaxonomyScriptContentAsync(It.IsAny<List<TaxonomyScriptContentUpsertRequest>>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync((bool?)null);

            // Act
            var result = await _controller.ImportTaxonomyScriptContent(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task ImportTaxonomyScriptContent_ReturnsInternalServerError_WhenServiceReturnsFalse()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Super User" };

            var request = new List<TaxonomyScriptContentUpsertRequest>();
            _mockConfiguration.Setup(config => config[ApplicationConstants.SuperUsers]).Returns("Role1,Role2,v-test");
            _mockService.Setup(service => service.ImportTaxonomyScriptContentAsync(It.IsAny<List<TaxonomyScriptContentUpsertRequest>>(), It.IsAny<List<string>>(), It.IsAny<string>()))
                .ReturnsAsync(false);


            // Act
            var result = await _controller.ImportTaxonomyScriptContent(request);

            // Assert
            Assert.NotNull(result);
            var internalServerErrorResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status500InternalServerError, internalServerErrorResult.StatusCode);
        }

        [Fact]
        public async Task Get_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange
            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            _mockConfiguration = new Mock<IConfiguration>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockService = new Mock<ITaxonomyScriptContentService>();
            _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            TaxonomyScriptContentController _controller = new TaxonomyScriptContentController(_mockService.Object, applicationStateMock.Object, _mockConfiguration.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = null;

            // Act
            var result = await _controller.Get();

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
        }

        [Fact]
        public async Task GetFYManagersForScriptExclusion_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange

            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            _mockConfiguration = new Mock<IConfiguration>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockService = new Mock<ITaxonomyScriptContentService>();
            _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            TaxonomyScriptContentController _controller = new TaxonomyScriptContentController(_mockService.Object, applicationStateMock.Object, _mockConfiguration.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = null;

            // Act
            var result = await _controller.GetFYManagersForScriptExclusion("debcupp");

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
        }

        [Fact]
        public async Task GetStatisticsAsync_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange
            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            _mockConfiguration = new Mock<IConfiguration>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockService = new Mock<ITaxonomyScriptContentService>();
            _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            TaxonomyScriptContentController _controller = new TaxonomyScriptContentController(_mockService.Object, applicationStateMock.Object, _mockConfiguration.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = null;

            // Act
            var result = await _controller.GetStatisticsAsync();

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
        }

        [Fact]
        public async Task GetAuditDetailsAsync_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange
            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            _mockConfiguration = new Mock<IConfiguration>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockService = new Mock<ITaxonomyScriptContentService>();
            _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            TaxonomyScriptContentController _controller = new TaxonomyScriptContentController(_mockService.Object, applicationStateMock.Object, _mockConfiguration.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = null;

            // Act
            var result = await _controller.GetAuditDetailsAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomyScriptContentStatusAsync_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange

            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            _mockConfiguration = new Mock<IConfiguration>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockService = new Mock<ITaxonomyScriptContentService>();
            _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            TaxonomyScriptContentController _controller = new TaxonomyScriptContentController(_mockService.Object, applicationStateMock.Object, _mockConfiguration.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = null;

            // Act
            var result = await _controller.UpdateTaxonomyScriptContentStatusAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result);
            var objectResult = (ObjectResult)result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
        }

        [Fact]
        public async Task CreateOrUpdateTaxonomyScriptContent_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange

            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            _mockConfiguration = new Mock<IConfiguration>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockService = new Mock<ITaxonomyScriptContentService>();
            _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            TaxonomyScriptContentController _controller = new TaxonomyScriptContentController(_mockService.Object, applicationStateMock.Object, _mockConfiguration.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = null;

            var request = new TaxonomyScriptContentUpsertRequest();

            // Act
            var result = await _controller.CreateOrUpdateTaxonomyScriptContent(request);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
        }
    }
}
