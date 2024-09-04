using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Moq;
using MCT.DataAccess.UnitOfWork;
using MCT.Business.SharedServices;
using MCT.DataAccess.Interfaces;
using MCT.DataAccess.Models;

namespace MCT.Business.Tests.Shared
{
    public class AuthServiceTests
    {
        private readonly Mock<IUnitOfWork> mockUnitOfWork;
        private readonly AuthService authService;

        public AuthServiceTests()
        {
            mockUnitOfWork = new Mock<IUnitOfWork>();
            authService = new AuthService(mockUnitOfWork.Object);
        }

        [Fact]
        public async Task GetAuthorizedAliasesListAsync_ShouldReturnAuthorizedAliases()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };
            var loggedInUserAlias = "user1";

            var managerRepositoryMock = new Mock<IManagerRepository>();
            managerRepositoryMock.Setup(repo => repo.GetAll(loggedInUserAlias)).ReturnsAsync(new List<Manager>
            {
                new Manager { Alias = "manager1" },
                new Manager { Alias = "manager2" },
                new Manager { Alias = "manager3" }
            });

            mockUnitOfWork.Setup(uow => uow.GetRepository<IManagerRepository>()).Returns(managerRepositoryMock.Object);

            // Act
            var result = await authService.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Contains("manager1", result);
            Assert.Contains("manager2", result);
        }

        [Fact]
        public async Task GetAuthorizedAliasesListAsync_ShouldReturnEmptyList_WhenManagerRepositoryIsNull()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };
            var loggedInUserAlias = "user1";

            mockUnitOfWork.Setup(uow => uow.GetRepository<IManagerRepository>()).Returns((IManagerRepository)null);

            // Act
            var result = await authService.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }

    }
}
