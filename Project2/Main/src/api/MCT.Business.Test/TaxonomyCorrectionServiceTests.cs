using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MCT.Business.Interfaces;
using MCT.DataAccess.EfModels.EfCustomModels;
using MCT.DataAccess.Interfaces;
using MCT.DataAccess.Models;
using MCT.DataAccess.UnitOfWork;
using Moq;
using Xunit;

namespace MCT.Business.Services.Tests
{
    public class TaxonomyCorrectionServiceTests
    {
        private Mock<ITaxonomyCorrectionRepository> _mockTaxonomyCorrectionRepository;
        private Mock<ICommonRepository> _mockCommonRepository;
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private Mock<IAuthService> _mockAuthService;
        private TaxonomyCorrectionService _taxonomyCorrectionService;

        public TaxonomyCorrectionServiceTests()
        {
            _mockTaxonomyCorrectionRepository = new Mock<ITaxonomyCorrectionRepository>();
            _mockCommonRepository = new Mock<ICommonRepository>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockAuthService = new Mock<IAuthService>();

            _taxonomyCorrectionService = new TaxonomyCorrectionService(
                _mockTaxonomyCorrectionRepository.Object,
                _mockCommonRepository.Object,
                _mockUnitOfWork.Object,
                _mockAuthService.Object);
        }

        [Fact]
        public async Task GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync_PositiveScenario_ReturnsResponse()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            TaxonomyRoleSummaryChangeRequest taxonomyRoleSummaryChangeRequest = new TaxonomyRoleSummaryChangeRequest();

            // Mock the repository method
            _mockTaxonomyCorrectionRepository.Setup(x => x.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(taxonomyRoleSummaryChangeRequest))
                .ReturnsAsync(new TaxonomyDetailsInHierarchyResponse());

            // Act
            var result = await _taxonomyCorrectionService.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(loggedInUserAlias, taxonomyRoleSummaryChangeRequest);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync_ExceptionThrown_LogsExceptionAndThrows()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            TaxonomyRoleSummaryChangeRequest taxonomyRoleSummaryChangeRequest = new TaxonomyRoleSummaryChangeRequest();

            // Mock the repository method to throw an exception
            _mockTaxonomyCorrectionRepository.Setup(x => x.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(taxonomyRoleSummaryChangeRequest))
                .ThrowsAsync(new Exception("Test Exception"));

            // Act and Assert
            await Assert.ThrowsAsync<Exception>(() => _taxonomyCorrectionService.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(loggedInUserAlias, taxonomyRoleSummaryChangeRequest));
        }

        [Fact]
        public async Task SubmitTaxonomyCorrectionRequestAsync_PositiveScenario_ReturnsResponse()
        {
            // Arrange
            TaxonomyChangeRequest request = new TaxonomyChangeRequest();
            string loggedInUserAlias = "user1";
            string loggedInUserFullName = "User 1";
            List<string> roleList = new List<string> { "Manager" };

            List<EmployeeManager> managerList = new List<EmployeeManager>();
            EmployeeManager manager = new EmployeeManager()
            {
                CYManagerAlias = "mock cy1",
                FYManagerAlias = "mock fy1",
                EmployeeAlias = "mock emp1"
            };
            managerList.Add(manager);
            // Mock the repository and common repository methods
            _mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_mockCommonRepository.Object);
            _mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>()))
                .ReturnsAsync(managerList);
            _mockAuthService.Setup(x => x.checkUserAccessForSelectedManager(loggedInUserAlias, It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            _mockCommonRepository.Setup(x => x.GetEmployeeDetailsForTaxonomyCorrectionAsync(It.IsAny<string>()))
                .ReturnsAsync(new ManagerAndTaxonomyDetailsForCYandFY());
            _mockTaxonomyCorrectionRepository.Setup(x => x.SubmitTaxonomyCorrectionRequestAsync(It.IsAny<TaxonomyChangeRequest>(), It.IsAny<ManagerAndTaxonomyDetailsForCYandFY>(), loggedInUserAlias, loggedInUserFullName))
                .ReturnsAsync(true);

            // Act
            var result = await _taxonomyCorrectionService.SubmitTaxonomyCorrectionRequestAsync(request, loggedInUserAlias, loggedInUserFullName, roleList);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task SubmitTaxonomyCorrectionRequestAsync_CommonRepositoryNotAvailable_ThrowsInvalidOperationException()
        {
            // Arrange
            TaxonomyChangeRequest request = new TaxonomyChangeRequest();
            string loggedInUserAlias = "user1";
            string loggedInUserFullName = "User 1";
            List<string> roleList = new List<string> { "Manager" };

            // Mock the unit of work to return null for common repository
            _mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns((ICommonRepository)null);

            // Act and Assert
            await Assert.ThrowsAsync<InvalidOperationException>(() => _taxonomyCorrectionService.SubmitTaxonomyCorrectionRequestAsync(request, loggedInUserAlias, loggedInUserFullName, roleList));
        }

        [Fact]
        public async Task SubmitTaxonomyCorrectionRequestAsync_ExceptionThrown_LogsExceptionAndThrows()
        {
            // Arrange
            TaxonomyChangeRequest request = new TaxonomyChangeRequest();
            string loggedInUserAlias = "user1";
            string loggedInUserFullName = "User 1";
            List<string> roleList = new List<string> { "Manager" };

            // Mock the repository and common repository methods to throw an exception
            _mockUnitOfWork.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_mockCommonRepository.Object);
            _mockCommonRepository.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>()))
                .ThrowsAsync(new Exception("Test Exception"));

            // Act and Assert
            await Assert.ThrowsAsync<Exception>(() => _taxonomyCorrectionService.SubmitTaxonomyCorrectionRequestAsync(request, loggedInUserAlias, loggedInUserFullName, roleList));
        }

        [Fact]
        public async Task GetTaxonomyChangeRequestAsync_PositiveScenario_ReturnsList()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            List<string> roleList = new List<string> { "Manager" };

            // Mock the repository method
            _mockTaxonomyCorrectionRepository.Setup(x => x.GetTaxonomyChangeRequestAsync(loggedInUserAlias, It.IsAny<string>(),It.IsAny<bool>())).ReturnsAsync(new List<GetTaxonomyCorrectionRequestsResult>());

            // Act
            var result = await _taxonomyCorrectionService.GetTaxonomyChangeRequestAsync(loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetTaxonomyChangeRequestAsync_ExceptionThrown_LogsExceptionAndThrows()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            List<string> roleList = new List<string> { "Manager" };

            // Mock the repository method to throw an exception
            _mockTaxonomyCorrectionRepository.Setup(x => x.GetTaxonomyChangeRequestAsync(loggedInUserAlias, It.IsAny<string>(),It.IsAny<bool>()))
                .ThrowsAsync(new Exception("Test Exception"));

            // Act and Assert
            await Assert.ThrowsAsync<Exception>(() => _taxonomyCorrectionService.GetTaxonomyChangeRequestAsync(loggedInUserAlias, roleList));
        }
    }
}
