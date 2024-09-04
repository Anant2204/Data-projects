namespace MCT.Api.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using MCT.API;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.AspNetCore.Http;
    using Moq;
    using Xunit;

    public class AuthMiddlewareTests
    {
        [Fact]
        public async Task InvokeAsync_UserAuthenticated_ReturnsNextDelegate()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.User = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
            {
                new Claim("upn", "testuser@example.com")
            }, "TestAuthentication"));

            var commonServiceMock = new Mock<ICommonService>();
            commonServiceMock.Setup(x => x.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(It.IsAny<string>()))
                .ReturnsAsync(new UserPermissionsAndToolWindow
                {
                    StartDate = DateTime.UtcNow.AddDays(-1),
                    EndDate = DateTime.UtcNow.AddDays(1),
                });

            var middleware = new AuthMiddleware(next: (innerHttpContext) =>
            {
                // Assert
                Assert.Equal(context, innerHttpContext);

                return Task.CompletedTask;
            });

            // Act
            await middleware.InvokeAsync(context, commonServiceMock.Object);

            // Assert
            commonServiceMock.Verify(x => x.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async Task InvokeAsync_UserNotAuthenticated_ReturnsForbiddenResponse()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.User = new ClaimsPrincipal(new ClaimsIdentity());

            var commonServiceMock = new Mock<ICommonService>();

            var middleware = new AuthMiddleware(next: (innerHttpContext) =>
            {
                // Assert
                Assert.Equal(context, innerHttpContext);

                return Task.CompletedTask;
            });

            // Act
            await middleware.InvokeAsync(context, commonServiceMock.Object);

            // Assert
            Assert.Equal(StatusCodes.Status403Forbidden, context.Response.StatusCode);
        }

        [Fact]
        public async Task InvokeAsync_UserPermissionsNull_ReturnsForbiddenResponse()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.User = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
            {
                new Claim("upn", "testuser@example.com")
            }, "TestAuthentication"));

            var commonServiceMock = new Mock<ICommonService>();
            commonServiceMock.Setup(x => x.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(It.IsAny<string>()))
                .ReturnsAsync((UserPermissionsAndToolWindow)null);

            var middleware = new AuthMiddleware(next: (innerHttpContext) =>
            {
                // Assert
                Assert.Equal(context, innerHttpContext);

                return Task.CompletedTask;
            });

            // Act
            await middleware.InvokeAsync(context, commonServiceMock.Object);

            // Assert
            Assert.Equal(StatusCodes.Status403Forbidden, context.Response.StatusCode);
        }

        [Fact]
        public async Task InvokeAsync_UserPermissionsEmpty_ReturnsForbiddenResponse()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.User = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
            {
                new Claim("upn", "testuser@example.com")
            }, "TestAuthentication"));
            var commonServiceMock = new Mock<ICommonService>();
            commonServiceMock.Setup(x => x.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(It.IsAny<string>()))
                .ReturnsAsync(new UserPermissionsAndToolWindow
                {
                    Roles = new List<string>(),
                });

            var middleware = new AuthMiddleware(next: (innerHttpContext) =>
            {
                // Assert
                Assert.Equal(context, innerHttpContext);

                return Task.CompletedTask;
            });

            // Act
            await middleware.InvokeAsync(context, commonServiceMock.Object);

            // Assert
            Assert.Equal(StatusCodes.Status403Forbidden, context.Response.StatusCode);
        }

        [Fact]
        public async Task InvokeAsync_UserStartDateNotReached_ReturnsForbiddenResponse()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.User = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
            {
                new Claim("upn", "testuser@example.com")
            }, "TestAuthentication"));

            var commonServiceMock = new Mock<ICommonService>();
            commonServiceMock.Setup(x => x.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(It.IsAny<string>()))
                .ReturnsAsync(new UserPermissionsAndToolWindow
                {
                    Roles = new List<string> { "admin" },
                    StartDate = DateTime.UtcNow.AddDays(1),
                    EndDate = DateTime.UtcNow.AddDays(2)
                });

            var middleware = new AuthMiddleware(next: (innerHttpContext) =>
            {
                // Assert
                Assert.Equal(context, innerHttpContext);

                return Task.CompletedTask;
            });

            // Act
            await middleware.InvokeAsync(context, commonServiceMock.Object);

            // Assert
            Assert.Equal(StatusCodes.Status403Forbidden, context.Response.StatusCode);
        }

        [Fact]
        public async Task InvokeAsync_UserEndDatePassed_ReturnsForbiddenResponse()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.User = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
            {
                new Claim("upn", "testuser@example.com")
            }, "TestAuthentication"));

            var commonServiceMock = new Mock<ICommonService>();
            commonServiceMock.Setup(x => x.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(It.IsAny<string>()))
                .ReturnsAsync(new UserPermissionsAndToolWindow
                {
                    Roles = new List<string> { "admin" },
                    StartDate = DateTime.UtcNow.AddDays(-2),
                    EndDate = DateTime.UtcNow.AddDays(-1)
                });

            var middleware = new AuthMiddleware(next: (innerHttpContext) =>
            {
                // Assert
                Assert.Equal(context, innerHttpContext);

                return Task.CompletedTask;
            });

            // Act
            await middleware.InvokeAsync(context, commonServiceMock.Object);

            // Assert
            Assert.Equal(StatusCodes.Status403Forbidden, context.Response.StatusCode);
        }
    }
}
