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
    using Microsoft.Extensions.Options;
    using Moq;
    using Xunit;

    public class ConversationScriptControllerTest
    {
        private readonly ActionContext actionContext;

        private readonly IOptions<ApplicationStateOptions> applicationState;

        private readonly Mock<IConversationScriptTaxonomyService> _mockTaxonomyService;

        private readonly ConversationScriptController _controller;

        public ConversationScriptControllerTest()
        {
        
            applicationState = Options.Create<ApplicationStateOptions>(new ApplicationStateOptions());

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

            _controller = new ConversationScriptController(_mockTaxonomyService.Object, applicationState, httpContextAccessor.Object);
            _controller.ControllerContext = new ControllerContext(actionContext);

        }

        [Fact]
        public async Task UpdateConversationScript_ShouldReturnTrue_WhenUpdateSuccess()
        {
            // Arrange
            int[] id = { 21,22 };
            var conversationScriptUpdateScenarioRequest = new ConversationScriptUpdateScenarioRequest()
            {
                Id=id,
                Content = new content()
                {
                    SpecificContextOptional= "specificContextOptional",
                    Title="title"
                }
            };

            _mockTaxonomyService.Setup(service => service.UpdateConversationScript(conversationScriptUpdateScenarioRequest, It.IsAny<string>()))
                .ReturnsAsync(true);


            // Act
            var result = await _controller.UpdateConversationScript(conversationScriptUpdateScenarioRequest);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.True((bool)((OkObjectResult)result.Result).Value);
        }


        [Fact]
        public async Task UpdateConversationScript_ShouldReturnInternalServer_WhenUpdateFails()
        {
            // Arrange

            int[] id = { 21, 22 };
            var conversationScriptUpdateScenarioRequest = new ConversationScriptUpdateScenarioRequest()
            {
                Id = id,
                Content = new content()
                {
                    SpecificContextOptional = "w",
                    Title = "s"
                }
            };

            // Act
            var result = await _controller.UpdateConversationScript(conversationScriptUpdateScenarioRequest);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status500InternalServerError, ((ObjectResult)result.Result).StatusCode);
        }

        private static TaxonomyScriptContent[] GetScenarioData()
        {
            var data = new TaxonomyScriptContent()
            {
                CreatedBy = "test1",
                CreatedDate = DateTime.UtcNow,
                CyOrg = "CyOrg",
                CyQ1 = "cyQ1",
                CyQ2 = "cyQ2",
                FyQ1 = "fyQ1",
                CyRoleSummary = "cyRoleSummary",
                FyOrg = "fyOrg",
                FyQ2 = "fyQ2",
                ScriptTitle = "scriptTitle",
                FyRoleSummary = "fyRoleSummary",
                Id = 21,
                ModifiedBy = "test",
                ModifiedDate = DateTime.UtcNow,
            };

            TaxonomyScriptContent[] scenarios = { data };
            return scenarios;
        }
    }
}
