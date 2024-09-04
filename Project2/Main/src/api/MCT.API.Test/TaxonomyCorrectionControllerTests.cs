namespace MCT.API.Test
{
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MCT.Business.Interfaces;
    using MCT.API.Controllers;
    using MCT.DataAccess.Models;
    using MCT.API.Attributes;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Routing;
    using Xunit;
    using Moq;

    public class TaxonomyCorrectionControllerTests
    {
        private readonly Mock<ITaxonomyCorrectionService> _mockService;
        private readonly TaxonomyCorrectionController _controller;
        private readonly IOptions<ApplicationStateOptions> _applicationState;
        private readonly ActionContext actionContext;

        public TaxonomyCorrectionControllerTests()
        {
            _mockService = new Mock<ITaxonomyCorrectionService>();
            _applicationState = Options.Create(new ApplicationStateOptions());
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
             _controller = new TaxonomyCorrectionController(_applicationState, _mockService.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string> { "Admin" };
        }

        [Fact]
        public async Task GetTaxonomyDetailsBasedOnOrgAndCareerStage_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            var request = new TaxonomyRoleSummaryChangeRequest();
            _mockService.Setup(service => service.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(It.IsAny<string>(), It.IsAny<TaxonomyRoleSummaryChangeRequest>()))
                .ReturnsAsync((TaxonomyDetailsInHierarchyResponse)null);

            // Act
            var result = await _controller.GetTaxonomyDetailsBasedOnOrgAndCareerStage(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetTaxonomyDetailsBasedOnOrgAndCareerStage_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            var request = new TaxonomyRoleSummaryChangeRequest();
            var response = new TaxonomyDetailsInHierarchyResponse();
            _mockService.Setup(service => service.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(It.IsAny<string>(), It.IsAny<TaxonomyRoleSummaryChangeRequest>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.GetTaxonomyDetailsBasedOnOrgAndCareerStage(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetTaxonomyChangeRequestAsync_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;

            // Act
            var result = await _controller.GetTaxonomyChangeRequestAsync();

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<BadRequestResult>(result.Result);
            Assert.Equal(StatusCodes.Status400BadRequest, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetTaxonomyChangeRequestAsync_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            var request = new List<GetTaxonomyCorrectionRequestsResult> { new GetTaxonomyCorrectionRequestsResult() };
            _mockService.Setup(service => service.GetTaxonomyChangeRequestAsync(It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(request);

            // Act
            var result = await _controller.GetTaxonomyChangeRequestAsync();

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status200OK, noContentResult.StatusCode);
        }

        [Fact]
        public async Task GetTaxonomyChangeRequestAsync_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            _mockService.Setup(service => service.GetTaxonomyChangeRequestAsync(It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((List<GetTaxonomyCorrectionRequestsResult>)null);

            // Act
            var result = await _controller.GetTaxonomyChangeRequestAsync();

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomy_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            var request = new TaxonomyChangeRequest();
            var response = new TaxonomyCorrectionResponse { ResponseStatus = true };
            _mockService.Setup(service => service.SubmitTaxonomyCorrectionRequestAsync(It.IsAny<TaxonomyChangeRequest>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.UpdateTaxonomy(request);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(response, (result.Result as OkObjectResult).Value);
        }

        [Fact]
        public async Task UpdateTaxonomy_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            var request = new TaxonomyChangeRequest();
            _mockService.Setup(service => service.SubmitTaxonomyCorrectionRequestAsync(It.IsAny<TaxonomyChangeRequest>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((TaxonomyCorrectionResponse)null);

            // Act
            var result = await _controller.UpdateTaxonomy(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomy_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;
            var request = new TaxonomyChangeRequest();

            // Act
            var result = await _controller.UpdateTaxonomy(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<BadRequestResult>(result.Result);
            Assert.Equal(StatusCodes.Status400BadRequest, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateTaxonomy_ReturnsForbidden_WhenUserIsNull()
        {
            // Arrange

            Mock<IOptions<ApplicationStateOptions>> applicationStateMock = new Mock<IOptions<ApplicationStateOptions>>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            var _mockService = new Mock<ITaxonomyCorrectionService>();
            var _mockOptions = new Mock<IOptions<ApplicationStateOptions>>();
            TaxonomyCorrectionController _controller = new TaxonomyCorrectionController(applicationStateMock.Object, _mockService.Object, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = null;

            var request = new TaxonomyChangeRequest();

            // Act
            var result = await _controller.UpdateTaxonomy(request);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result.Result);
            var objectResult = (ObjectResult)result.Result;
            Assert.Equal(StatusCodes.Status403Forbidden, objectResult.StatusCode);
        }

    }

}
