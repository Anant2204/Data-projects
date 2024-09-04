using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Azure.Core;
using MCT.API;
using MCT.API.Attributes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace MCT.Api.Tests
{
    public class ExceptionAndLogMiddlewareTests
    {
        [Fact]
        public async Task InvokeAsync_Should_Handle_BadHttpRequestException()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Request.RouteValues["controller"] = "TestController";
            context.Request.RouteValues["action"] = "TestAction";
            context.Request.Method = "GET";
            context.Request.Path = "/api/test";

            var response = context.Response;
            var options = Options.Create(new ApplicationStateOptions { LogRequestResponse = true });

            var next = new RequestDelegate((innerContext) =>
            {
                throw new BadHttpRequestException("Bad request", 400);
            });

            var middleware = new ExceptionAndLogMiddleware(next, options);

            // Act
            await middleware.InvokeAsync(context);

            // Assert
            Assert.Equal(400, response.StatusCode);
         

         }

        [Fact]
        public async Task InvokeAsync_Should_Handle_Exception()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Request.RouteValues["controller"] = "TestController";
            context.Request.RouteValues["action"] = "TestAction";
            context.Request.Method = "GET";
            context.Request.Path = "/api/test";

            var response = context.Response;
            var options = Options.Create(new ApplicationStateOptions { LogRequestResponse = true });

            var next = new RequestDelegate((innerContext) =>
            {
                throw new Exception("Internal server error");
            });

            var middleware = new ExceptionAndLogMiddleware(next, options);

            // Act
            await middleware.InvokeAsync(context);

            // Assert
            Assert.Equal(500, response.StatusCode);
       
        }
    }
}
