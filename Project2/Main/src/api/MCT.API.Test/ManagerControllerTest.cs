namespace MCT.Business.Test.ManagerControllerTests
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Threading.Tasks;
    using MCT.API.Attributes;
    using MCT.API.Controllers;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Routing;
    using Microsoft.Azure.Cosmos.Serialization.HybridRow;
    using Microsoft.Extensions.Options;
    using Moq;
    using Xunit;

    public class ManagerControllerTests
    {
        private readonly Mock<IManagerService> _mockManagerService;
        private readonly ManagerController _controller;
        private readonly IOptions<ApplicationStateOptions>? _applicationState;
        private readonly ActionContext actionContext;

        public ManagerControllerTests()
        {
            _mockManagerService = new Mock<IManagerService>();

            _applicationState = Options.Create<ApplicationStateOptions>(new ApplicationStateOptions());
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

            _controller = new ManagerController(_mockManagerService.Object, _applicationState,httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext(actionContext);
        }

        [Fact]
        public async Task Get_ShouldReturnManagerList_WhenDataFound()
        {
            // Arrange
            var request = new ManagerListRequest();
            string user = "testuser";
            var managers = new List<Manager> {  new Manager {  FullName = "SreeRam Test" },
                    new Manager {  FullName = "Murari Raga" },
                    new Manager {  FullName = "Lashmi Rao" } };

            var managerList = new GetManagerWithDefaultSelection
            {
                Managers = managers,
                DefaultSelection = "Murari"
            };
            List<string> roleList = new List<string>() { "Manager", "Delegate" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockManagerService.Setup(service => service.GetManagerList(It.IsAny<ManagerListRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                     .ReturnsAsync(managerList);

            // Act
            var result = await _controller.Get(request);

            // Assert
            var okResult = Assert.IsType<ObjectResult>(result);
            var response = Assert.IsType<GetManagerWithDefaultSelection>(okResult.Value);
            Assert.Equal(managerList.Managers.Count, response.Managers.Count);
        }

        [Fact]
        public async Task Get_ShouldReturnForbidden_WhenDataNotFound()
        {
            // Arrange
            var request = new ManagerListRequest();
            var user = "testuser";
            var managerList = new GetManagerWithDefaultSelection
            {
                Managers = new List<Manager>()
            };
            List<string> roleList = new List<string>() { "Admin" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockManagerService.Setup(service => service.GetManagerList(It.IsAny<ManagerListRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                     .ReturnsAsync(managerList);

            // Act
            var result = await _controller.Get(request);

            // Assert
            var forbiddenResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status403Forbidden, forbiddenResult.StatusCode);
        }

        [Fact]
        public async Task Get_ShouldThrowException()
        {
            // Arrange
            var request = new ManagerListRequest();
            var errorMessage = "An error occurred while fetching managers list";

            List<string> roleList = new List<string>() { "Admin" };

            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;

            _mockManagerService.Setup(x => x.GetManagerList(request, It.IsAny<string>(), It.IsAny<List<string>>())).ThrowsAsync(new Exception(errorMessage));

            var exception = await Assert.ThrowsAsync<Exception>(async () =>
            {
                await _controller.Get(request);
            });
            // Assert
            Assert.NotNull(exception);
            Assert.Equal("An error occurred while fetching managers list", exception.Message);

        }

    }

}
