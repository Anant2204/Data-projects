namespace MCT.Business.Test
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Azure.Messaging.EventHubs.Producer;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.AspNetCore.Mvc;
    using Moq;
    using Xunit;

    public class FYSummaryServiceTests
    {
        private readonly Mock<IUnitOfWork> _mockUnitOfWork;
        private readonly Mock<IAuthService> _mockAuthService;
        private readonly FYSummaryService _fySummaryService;
        private readonly Mock<IFYSummaryRepository> _mockFYSummaryRepository;


        public FYSummaryServiceTests()
        {
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockAuthService = new Mock<IAuthService>();
            _mockFYSummaryRepository = new Mock<IFYSummaryRepository>();
            _fySummaryService = new FYSummaryService(_mockUnitOfWork.Object, _mockAuthService.Object);
        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldReturnFYSummaryResponse_WhenDataFound()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };
            var loggedInUserAlias = "testUser";

            var aliasList = new List<string> { "manager1" };

            var response = new List<FYSummaryDto>()
            {
                new FYSummaryDto()
                {
                    FullName = "testFullName",
                    Alias = "testAlias",
                    RoleSummary = "testRoleSummary",
                    Q1 = "testQ1",
                    Q2 = "testQ2",
                    IsMoving = true,
                },
                new FYSummaryDto()
                {
                    FullName = "testFullName2",
                    Alias   = "testAlias2",
                    RoleSummary = "testRoleSummary2",
                    Q1 = "N/A",
                    Q2 = "N/A",
                    IsMoving = false,
                }
            };

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias)).ReturnsAsync(aliasList);
            _mockFYSummaryRepository.Setup(repo => repo.GetCurrentYearEmployeesAsync(aliasList)).ReturnsAsync(response);
            _mockUnitOfWork.Setup(uow => uow.GetRepository<IFYSummaryRepository>()).Returns(_mockFYSummaryRepository.Object);
            _mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(managerAliasList, loggedInUserAlias, It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);

            List<string> roleList = new List<string>();
            // Act
            var result = await _fySummaryService.GetCurrentYearEmployeesAsync(fySummaryRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<FYSummaryResponse>(result);
            Assert.Equal(response.Count, result?.Team.Count);
            Assert.Equal(response, result?.Team);
        }

        [Fact]
        public async Task GetFutureYearEmployeesAsync_ShouldReturnFYSummaryResponse_WhenDataFound()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string> { "manager1" };

            var response = new List<FYSummaryDto>()
            {
                new FYSummaryDto()
                {
                    FullName = "testFullName",
                    Alias = "testAlias",
                    RoleSummary = "testRoleSummary",
                    Q1 = "testQ1",
                    Q2 = "testQ2",
                    IsMoving = true,
                },
                new FYSummaryDto()
                {
                    FullName = "testFullName2",
                    Alias   = "testAlias2",
                    RoleSummary = "testRoleSummary2",
                    Q1 = "N/A",
                    Q2 = "N/A",
                    IsMoving = true,
                }
            };

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias))
                .ReturnsAsync(aliasList);

            var repositoryObj = new Mock<IFYSummaryRepository>();
            repositoryObj.Setup(repo => repo.GetFutureYearEmployeesAsync(aliasList))
                .ReturnsAsync(response);
            _mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(managerAliasList, loggedInUserAlias, It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);
            _mockUnitOfWork.Setup(uow => uow.GetRepository<IFYSummaryRepository>()).Returns(repositoryObj.Object);

            List<string> roleList = new List<string>();
            // Act
            var result = await _fySummaryService.GetFutureYearEmployeesAsync(fySummaryRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<FYSummaryResponse>(result);
            Assert.Equal(response.Count, result?.Team.Count);
            Assert.Equal(response, result?.Team);
        }

        [Fact]
        public async Task GetStatisticsAsync_ShouldReturnFYSummaryStatisticsResponse_WhenDataFound()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string> { "manager1" };

            var response = new FYSummaryStatisticsResponse()
            {
                CYTeam = 5,
                FYTeam = 3,
                Joining = 1,
                Leaving = 3
            };
            List<string> roleList = new List<string> { "Manager" };

            //Mock
            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias)).ReturnsAsync(aliasList);
            _mockAuthService.Setup(service => service.GetManagerListForAuthorizedUser(managerAliasList, loggedInUserAlias, It.IsAny<List<string>>(), It.IsAny<bool>())).ReturnsAsync(aliasList);
            _mockFYSummaryRepository.Setup(repo => repo.GetStatisticsAsync(It.IsAny<List<string>>())).ReturnsAsync(response);
            _mockUnitOfWork.Setup(uow => uow.GetRepository<IFYSummaryRepository>()).Returns(_mockFYSummaryRepository.Object);

            // Act
            var result = await _fySummaryService.GetStatisticsAsync(fySummaryRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<FYSummaryStatisticsResponse>(result);
            Assert.Equal(5, result?.CYTeam);
            Assert.Equal(3, result?.FYTeam);
            Assert.Equal(1, result?.Joining);
            Assert.Equal(3, result?.Leaving);
        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldReturnNullResponse_WhenAccessDenied()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string>();
            var repositoryObj = new Mock<IFYSummaryRepository>();

            _mockUnitOfWork.Setup(uow => uow.GetRepository<IFYSummaryRepository>())
                .Returns(repositoryObj.Object);

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias))
                .ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var result = await _fySummaryService.GetCurrentYearEmployeesAsync(fySummaryRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetFutureYearEmployeesAsync_ShouldReturnNullResponse_WhenAccessDenied()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string>();
            var repositoryObj = new Mock<IFYSummaryRepository>();

            _mockUnitOfWork.Setup(uow => uow.GetRepository<IFYSummaryRepository>())
                .Returns(repositoryObj.Object);

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias))
                .ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var result = await _fySummaryService.GetFutureYearEmployeesAsync(fySummaryRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetStatisticsAsync_ShouldReturnNullResponse_WhenAccessDenied()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string>();
            var repositoryObj = new Mock<IFYSummaryRepository>();

            _mockUnitOfWork.Setup(uow => uow.GetRepository<IFYSummaryRepository>())
                .Returns(repositoryObj.Object);

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias))
                .ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var result = await _fySummaryService.GetStatisticsAsync(fySummaryRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetStatisticsAsync_ShouldThrowInvalidOperationException_WhenRepositoryIsNull()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string>();

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias))
                .ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _fySummaryService.GetStatisticsAsync(fySummaryRequest, loggedInUserAlias, roleList));

            // Assert
            Assert.Equal("FY Summary repository is not available.", exception.Message);
        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldThrowInvalidOperationException_WhenRepositoryIsNull()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string>();

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias))
                .ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _fySummaryService.GetCurrentYearEmployeesAsync(fySummaryRequest, loggedInUserAlias, roleList));

            // Assert
            Assert.Equal("FY Summary repository is not available.", exception.Message);
        }

        [Fact]
        public async Task GetFutureYearEmployeesAsync_ShouldThrowInvalidOperationException_WhenRepositoryIsNull()
        {
            // Arrange
            var managerAliasList = new List<string> { "manager1", "manager2" };

            var fySummaryRequest = new FYSummaryRequest()
            {
                ManagerAliases = managerAliasList,
            };

            var loggedInUserAlias = "testUser";

            var aliasList = new List<string>();

            _mockAuthService.Setup(service => service.GetAuthorizedAliasesListAsync(managerAliasList, loggedInUserAlias))
                .ReturnsAsync(aliasList);
            List<string> roleList = new List<string>();
            // Act
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _fySummaryService.GetFutureYearEmployeesAsync(fySummaryRequest, loggedInUserAlias, roleList));

            // Assert
            Assert.Equal("FY Summary repository is not available.", exception.Message);
        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ReturnsNull_WhenAliasListIsEmpty()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var authServiceMock = new Mock<IAuthService>();
            var fySummaryRepositoryMock = new Mock<IFYSummaryRepository>();

            var fySummaryService = new FYSummaryService(unitOfWorkMock.Object, authServiceMock.Object);

            var fySummaryRequest = new FYSummaryRequest();
            var loggedInUserAlias = "testUser";
            var roleList = new List<string>();

            List<string> managerAliasList = new List<string>();

            authServiceMock.Setup(x => x.GetManagerListForAuthorizedUser(It.IsAny<List<string>>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<bool>()))
                .ReturnsAsync(managerAliasList);

            unitOfWorkMock.Setup(x => x.GetRepository<IFYSummaryRepository>())
                .Returns(fySummaryRepositoryMock.Object);

            // Act
            var result = await fySummaryService.GetCurrentYearEmployeesAsync(fySummaryRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }
    }
}