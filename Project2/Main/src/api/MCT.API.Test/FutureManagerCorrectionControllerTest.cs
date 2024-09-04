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
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Routing;
    using Microsoft.Extensions.Options;
    using Moq;
    using Xunit;

    public class FutureManagerCorrectionControllerTest
    {
        private readonly Mock<IFutureManagerCorrectionService> _futureManagerCorrectionService;
        private readonly FutureManagerCorrection _controller;
        private readonly IOptions<ApplicationStateOptions>? _applicationState;
        private readonly ActionContext actionContext;
       

        public FutureManagerCorrectionControllerTest()
        {
            _futureManagerCorrectionService = new Mock<IFutureManagerCorrectionService>();
            _applicationState = Options.Create<ApplicationStateOptions>(new ApplicationStateOptions());
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
            _controller = new FutureManagerCorrection(_futureManagerCorrectionService.Object, _applicationState, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = new List<string>() { "Admin", "Delegate" };
        }


        [Fact]
        public async Task GetFutureManagerCorrectionRequests_ShouldReturnSuccessResultWithData()
        {
            //Arrange
            List<string> roleList = new List<string>() { "Admin", "Delegate" };
            _controller.ControllerContext = new ControllerContext(actionContext);
            _controller.ControllerContext.HttpContext.Items["Roles"] = roleList;
            List<GetFutureManagerRequestsResult> response = new List<GetFutureManagerRequestsResult>();
            response.Add(new GetFutureManagerRequestsResult { 
             IcAlias ="Alias",
             EmployeeName ="employeename",
             CurrentYearManager = "MAlias",
             FyCorrectManagerAlias = "FyCorrect",
             CurrentFutureYearManager = "CurrentFutureYear",
             CyManagerAlias = "CyManagerAlias",
             Comment= "Comment",
             ApproverComments = "Approver Comment",
             ProposedFutureYearManager = "Future manager Alias",
             Status ="pending",
             CreatedBy = "Admin",
             CreatedDate = new DateTime(),
             ApprovedRejectedBy= "approver",
             ApprovedRejectedDate = new DateTime(),
             CanApprove = true,

            });

            _futureManagerCorrectionService.Setup(service => service.GetFutureManagerCorrectionRequest(It.IsAny<string>(), It.IsAny<List<string>>()))
                     .ReturnsAsync(response);
            // Act
            var result = await _controller.GetFutureManagerCorrectionRequests();

            // Assert
            var okResult = Assert.IsType<ObjectResult>(result);
            var response1 = Assert.IsType<List<GetFutureManagerRequestsResult>>(okResult.Value);
            Assert.Equal(response.Count, response1.Count);
            Assert.Equal(response[0].IcAlias, response1[0].IcAlias);
            Assert.Equal(response[0].EmployeeName, response1[0].EmployeeName);
            Assert.Equal(response[0].CyManagerAlias, response1[0].CyManagerAlias);
            Assert.Equal(response[0].FyCorrectManagerAlias, response1[0].FyCorrectManagerAlias);
            Assert.Equal(response[0].Status, response1[0].Status);
        }

        [Fact]
        public async Task UpdateFutureManager_ReturnsOk_WhenServiceReturnsResponseWithTrueStatus()
        {
            // Arrange
            var request = new FutureManagerChangeRequest();
            _futureManagerCorrectionService.Setup(service => service.UpdateFutureManager(It.IsAny<FutureManagerChangeRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(new FutureManagerChangeResponse { ResponseStatus = true });

            // Act
            var result = await _controller.UpdateFutureManager(request);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.True(((FutureManagerChangeResponse)(result.Result as OkObjectResult).Value).ResponseStatus);
        }

        [Fact]
        public async Task UpdateFutureManager_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            var request = new FutureManagerChangeRequest();
            _futureManagerCorrectionService.Setup(service => service.UpdateFutureManager(It.IsAny<FutureManagerChangeRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((FutureManagerChangeResponse)null);

            // Act
            var result = await _controller.UpdateFutureManager(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateFutureManager_ReturnsUnprocessableEntity_WhenServiceReturnsResponseWithFalseStatus()
        {
            // Arrange
            var request = new FutureManagerChangeRequest();
            _futureManagerCorrectionService.Setup(service => service.UpdateFutureManager(It.IsAny<FutureManagerChangeRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(new FutureManagerChangeResponse { ResponseStatus = false });

            // Act
            var result = await _controller.UpdateFutureManager(request);

            // Assert
            Assert.NotNull(result);
            var unprocessableEntityResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status422UnprocessableEntity, unprocessableEntityResult.StatusCode);
        }

        [Fact]
        public async Task UpdateFutureManager_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;
            var request = new FutureManagerChangeRequest();

            // Act
            var result = await _controller.UpdateFutureManager(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_ReturnsOk_WhenServiceReturnsTrue()
        {
            // Arrange
            var request = new UpdateFYManagerCorrectionStatusRequest();
            _futureManagerCorrectionService.Setup(service => service.UpdateFYManagerCorrectionStatusAsync(It.IsAny<UpdateFYManagerCorrectionStatusRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateFYManagerCorrectionStatusAsync(request);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.True((bool)(result.Result as OkObjectResult).Value);
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_ReturnsForbidden_WhenServiceReturnsNull()
        {
            // Arrange
            var request = new UpdateFYManagerCorrectionStatusRequest();
            _futureManagerCorrectionService.Setup(service => service.UpdateFYManagerCorrectionStatusAsync(It.IsAny<UpdateFYManagerCorrectionStatusRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((bool?)null);

            // Act
            var result = await _controller.UpdateFYManagerCorrectionStatusAsync(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_ReturnsInternalServerError_WhenServiceReturnsFalse()
        {
            // Arrange
            var request = new UpdateFYManagerCorrectionStatusRequest();
            _futureManagerCorrectionService.Setup(service => service.UpdateFYManagerCorrectionStatusAsync(It.IsAny<UpdateFYManagerCorrectionStatusRequest>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateFYManagerCorrectionStatusAsync(request);

            // Assert
            Assert.NotNull(result);
            var internalServerErrorResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status500InternalServerError, internalServerErrorResult.StatusCode);
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_ReturnsForbidden_WhenNoUserRole()
        {
            // Arrange
            _controller.ControllerContext.HttpContext.Items["Roles"] = null;
            var request = new UpdateFYManagerCorrectionStatusRequest();

            // Act
            var result = await _controller.UpdateFYManagerCorrectionStatusAsync(request);

            // Assert
            Assert.NotNull(result);
            var noContentResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status403Forbidden, noContentResult.StatusCode);
        }
    }
}
