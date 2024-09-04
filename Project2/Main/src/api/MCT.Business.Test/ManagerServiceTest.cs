namespace MCT.Service.Test
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.Extensions.Logging;
    using Moq;
    using Xunit;

    public class ManagerServiceTest
    {
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly Mock<IManagerRepository> _managerRepositoryMock;
        private readonly ManagerService _managerService;

        public ManagerServiceTest()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _managerRepositoryMock = new Mock<IManagerRepository>();
            _managerService = new ManagerService(_unitOfWorkMock.Object);
        }

        [Fact]
        public async Task GetManagerList_Should_Return_ManagerListResponse()
        {
            // Arrange
            var managerListRequest = new ManagerListRequest();
            var loggedInUserAlias = "user1";
            var managersList = new List<Manager>
            {
             new Manager { Alias = "manager2", FullName = "Jane Smith" }
            };

            var roleList = new List<string>() { "Admin" };
            List<GetManagerListResult> res = new List<GetManagerListResult> { new GetManagerListResult { ManagerAlias = "manager2", FullName = "Jane Smith" } };

            _managerRepositoryMock.Setup(repo => repo.GetAll(loggedInUserAlias)).ReturnsAsync(managersList);
            _unitOfWorkMock.Setup(uow => uow.GetRepository<IManagerRepository>()).Returns(_managerRepositoryMock.Object);

            _managerRepositoryMock.Setup(repo => repo.GetManagersList(It.IsAny<string>(), It.IsAny<bool?>(), It.IsAny<List<string>>()))
                .ReturnsAsync(res);

            // Act
            var result = await _managerService.GetManagerList(managerListRequest, loggedInUserAlias, roleList).ConfigureAwait(false);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(managersList.Select(x => x.FullName), result.Managers.Select(x => x.FullName));
        }

        [Fact]
        public async Task GetManagerList_Should_Return_Empty_ManagerListResponse_When_RepositoryObj_Is_Null()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var managerService = new ManagerService(unitOfWorkMock.Object);
            var managerListRequest = new ManagerListRequest();
            var loggedInUserAlias = "user1";
            unitOfWorkMock.Setup(uow => uow.GetRepository<IManagerRepository>()).Returns((IManagerRepository)null);
            var roleList = new List<string>();
            roleList.Add("admin");
            // Act
            var result = await managerService.GetManagerList(managerListRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result.Managers);
        }

        [Fact]
        public void GetManagerList_ExceptionThrown_LogsExceptionAndRethrows()
        {
            // Arrange
            var managerListRequest = new ManagerListRequest();
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "role1", "role2" };

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var managerRepositoryMock = new Mock<IManagerRepository>();
            unitOfWorkMock.Setup(uow => uow.GetRepository<IManagerRepository>()).Returns(managerRepositoryMock.Object);
            managerRepositoryMock.Setup(repo => repo.GetManagersList(It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<List<string>>())).Throws(new Exception("Test exception"));

            var managerService = new ManagerService(unitOfWorkMock.Object);

            // Act & Assert
            Assert.ThrowsAsync<Exception>(async () => await managerService.GetManagerList(managerListRequest, loggedInUserAlias, roleList));
            unitOfWorkMock.Verify(uow => uow.GetRepository<IManagerRepository>(), Times.Once);
            managerRepositoryMock.Verify(repo => repo.GetManagersList(loggedInUserAlias, managerListRequest.CompleteReportingHierarchy, roleList), Times.Once);
        }

        [Fact]
        public async Task GetManagerList_WithValidInput_ReturnsResponse()
        {
            // Arrange
            var managerListRequest = new ManagerListRequest
            {
                CompleteReportingHierarchy = true,
                SearchPattern = "John",
            };
            var loggedInUserAlias = "user123";
            var roleList = new List<string> { "Delegate", "Manager" };

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var managerRepositoryMock = new Mock<IManagerRepository>();
            unitOfWorkMock.Setup(uow => uow.GetRepository<IManagerRepository>()).Returns(managerRepositoryMock.Object);

            var managersList = new List<GetManagerListResult>
            {
                new GetManagerListResult { ManagerAlias = "john123", IsDefaultSelection=true  },
                new GetManagerListResult { ManagerAlias = "jane456", IsDefaultSelection=true },
            };
            managerRepositoryMock.Setup(repo => repo.GetManagersList(loggedInUserAlias, managerListRequest.CompleteReportingHierarchy, roleList)).ReturnsAsync(managersList);

            var managerService = new ManagerService(unitOfWorkMock.Object);

            // Act
            var result = await managerService.GetManagerList(managerListRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("john123", result.DefaultSelection);
            Assert.Equal(1, result.Managers.Count);
            Assert.Equal("john123", result.Managers[0].Alias);
        }
    }
}