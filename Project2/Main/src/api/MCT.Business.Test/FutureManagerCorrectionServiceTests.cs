namespace MCT.Business.Test
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Runtime.CompilerServices;
    using System.Threading.Tasks;
    using Azure.Security.KeyVault.Certificates;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Moq;
    using Xunit;

    public class FutureManagerCorrectionServiceTests
    {
        private readonly Mock<IFutureManagerCorrectionRepository> _futureManagerCorrectionRepositoryMock;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly Mock<IAuthService> _authServiceMock;
        private readonly Mock<ICommonRepository> _commonRepositoryMock;
        private readonly FutureManagerCorrectionService _futureManagerCorrectionService;

        public FutureManagerCorrectionServiceTests()
        {
            _futureManagerCorrectionRepositoryMock = new Mock<IFutureManagerCorrectionRepository>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _authServiceMock = new Mock<IAuthService>();
            _commonRepositoryMock = new Mock<ICommonRepository>();

            _futureManagerCorrectionService = new FutureManagerCorrectionService(
                _futureManagerCorrectionRepositoryMock.Object,
                _unitOfWorkMock.Object,
                _authServiceMock.Object
            );
        }

        [Fact]
        public async Task GetFutureManager_ValidInput_ReturnsFutureManagerList()
        {
            // Arrange
            string loggedInUserAlias = "user1";
            string searchString = "search";

            List<FutureManager> expectedFutureManagers = new List<FutureManager>
            {
                new FutureManager { Ic = "AADEBAYO", FullName = "Adekola Adebayo" },
                new FutureManager { Ic = "AADEBOWALE", FullName = "Anjola Adebowale" }
            };

            _futureManagerCorrectionRepositoryMock.Setup(x => x.GetFutureManager(loggedInUserAlias, searchString))
                .ReturnsAsync(expectedFutureManagers);

            // Act
            var result = await _futureManagerCorrectionService.GetFutureManager(loggedInUserAlias, searchString);

            // Assert
            Assert.Equal(expectedFutureManagers, result);
        }

        [Fact]
        public async Task UpdateFutureManager_RequestFromSendStay_ReturnsExpectedResult()
        {
            // Arrange
            List <EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { CYManagerAlias = "CYAlias1" });
            var request = new FutureManagerChangeRequest();
            request.RequestFrom = "sendstay";
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            var expected = new FutureManagerChangeResponse { Response = "Success", ResponseStatus = true };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsEmployeeRecordApproved(It.IsAny<string>())).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsSelectedManagerIsValid(It.IsAny<string>())).ReturnsAsync(true);
            // Act
            var result = await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList);

            // Assert
            Assert.Equal(expected.ResponseStatus, result.ResponseStatus);
        }

        [Fact]
        public async Task UpdateFutureManager_ReturnsExpectedResult()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            var expected = new FutureManagerChangeResponse { Response = "Success", ResponseStatus = true };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsEmployeeRecordApproved(It.IsAny<string>())).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsSelectedManagerIsValid(It.IsAny<string>())).ReturnsAsync(true);

            // Act
            var result = await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList);

            // Assert
            Assert.Equal(expected.ResponseStatus, result.ResponseStatus);
        }

        [Fact]
        public async Task UpdateFutureManager_ManagerAliasEmpty_ReturnsNull()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            var expected = new FutureManagerChangeResponse { Response = "Success", ResponseStatus = true };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            // Act
            var result = await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateFutureManager_UnAuthorizedRole_ReturnsNullResult()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Admin" };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(false);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsSelectedManagerIsValid(It.IsAny<string>())).ReturnsAsync(true);

            // Act
            var result = await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateFutureManager_CommonRepositoryNotInitialized_ThrowsIOException()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };

            // Act & Assert
            Assert.ThrowsAsync<IOException>(async () => await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList));

        }

        [Fact]
        public async Task UpdateFutureManager_GetFutureManagerCorrectionStatusNotNull_ThrowsBadRequestException()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.GetFutureManagerCorrectionStatus(It.IsAny<string>())).ReturnsAsync(new FutureManagerCorrectionStatusResponse());
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            // Act & Assert
            Assert.ThrowsAsync<Microsoft.AspNetCore.Http.BadHttpRequestException>(async () => await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList));

        }

        [Fact]
        public async Task UpdateFutureManager_CircularReferenceTrue_ThrowsBadRequestException()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.CheckCircularReferenceAsync(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            // Act & Assert
            Assert.ThrowsAsync<Microsoft.AspNetCore.Http.BadHttpRequestException>(async () => await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList));

        }

        [Fact]
        public async Task UpdateFutureManager_TaggedExceptionTrue_ThrowsBadRequestException()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsTaggedAsExceptionAsync(It.IsAny<string>())).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            // Act & Assert
            Assert.ThrowsAsync<Microsoft.AspNetCore.Http.BadHttpRequestException>(async () => await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList));

        }

        [Fact]
        public async Task UpdateFutureManager_EmployeeReviewStatusIsNotApproved_ThrowsBadRequestException()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsEmployeeRecordApproved(It.IsAny<string>())).ReturnsAsync(false);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            // Act & Assert
            Assert.ThrowsAsync<Microsoft.AspNetCore.Http.BadHttpRequestException>(async () => await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList));

        }

        [Fact]
        public async Task UpdateFutureManager_EmployeeManagerNull_ReturnsNull()
        {
            // Arrange
            List<EmployeeManager> employeeManager = null;
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsTaggedAsExceptionAsync(It.IsAny<string>())).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            // Act & Assert
            var result = await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList);

            //Assert
            Assert.Null(result);

        }

        [Fact]
        public async Task GetFutureManagerCorrectionRequest_ValidInput_ReturnsExpectedResult()
        {
            // Arrange
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "Admin" };
            var expectedResponse = new List<GetFutureManagerRequestsResult> { new GetFutureManagerRequestsResult() };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.GetFutureManagerCorrectionRequest(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>())).ReturnsAsync(expectedResponse);

            // Act
            var result = await _futureManagerCorrectionService.GetFutureManagerCorrectionRequest(loggedInUserAlias, roleList);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetFutureManagerCorrectionRequest_RepositoryThrowsException_ThrowsException()
        {
            // Arrange
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "Manager" };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.GetFutureManagerCorrectionRequest(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>())).ThrowsAsync(new Exception());

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _futureManagerCorrectionService.GetFutureManagerCorrectionRequest(loggedInUserAlias, roleList));
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_ValidInput_ReturnsExpectedResult()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "Admin" };
            var updateStatusOfManagerCorrectionRequest = new UpdateFYManagerCorrectionStatusRequest();
            _commonRepositoryMock.Setup(x => x.FYManagerCorrectionApprovalAccessAsync(updateStatusOfManagerCorrectionRequest.IcAlias, loggedInUserAlias, roleList)).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, loggedInUserAlias, roleList)).ReturnsAsync(true);

            // Act
            var result = await _futureManagerCorrectionService.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_CommonRepositoryNotInitialized_ReturnsFalse()
        {
            // Arrange
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "Admin" };
            var updateStatusOfManagerCorrectionRequest = new UpdateFYManagerCorrectionStatusRequest();

            // Act
            var result = await _futureManagerCorrectionService.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_NoAccess_ReturnsNull()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "Admin" };
            var updateStatusOfManagerCorrectionRequest = new UpdateFYManagerCorrectionStatusRequest();
            _commonRepositoryMock.Setup(x => x.FYManagerCorrectionApprovalAccessAsync(updateStatusOfManagerCorrectionRequest.IcAlias, loggedInUserAlias, roleList)).ReturnsAsync(false);

            // Act
            var result = await _futureManagerCorrectionService.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, loggedInUserAlias, roleList);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateFYManagerCorrectionStatusAsync_RepositoryThrowsException_ThrowsException()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            var loggedInUserAlias = "testUser";
            var roleList = new List<string> { "Admin" };
            var updateStatusOfManagerCorrectionRequest = new UpdateFYManagerCorrectionStatusRequest();
            _commonRepositoryMock.Setup(x => x.FYManagerCorrectionApprovalAccessAsync(updateStatusOfManagerCorrectionRequest.IcAlias, loggedInUserAlias, roleList)).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, loggedInUserAlias, roleList)).ThrowsAsync(new Exception());

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _futureManagerCorrectionService.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, loggedInUserAlias, roleList));
        }

        [Fact]
        public async Task UpdateFutureManager_InvalidManagerSelected_ThrowsBadHttpRequestException()
        {
            // Arrange
            List<EmployeeManager> employeeManager = new List<EmployeeManager>();
            employeeManager.Add(new EmployeeManager { FYManagerAlias = "FYAlias1" });
            var request = new FutureManagerChangeRequest();
            var alias = "testAlias";
            var roleList = new List<string> { "Manager" };
            var expected = new FutureManagerChangeResponse { Response = "Success", ResponseStatus = true };
            _futureManagerCorrectionRepositoryMock.Setup(x => x.UpdateFutureManager(request, It.IsAny<EmployeeManager>(), alias)).ReturnsAsync(true);
            _unitOfWorkMock.Setup(x => x.GetRepository<ICommonRepository>()).Returns(_commonRepositoryMock.Object);
            _commonRepositoryMock.Setup(x => x.GetEmployeeManagerAliasList(It.IsAny<List<string>>())).ReturnsAsync(employeeManager);
            _authServiceMock.Setup(x => x.checkUserAccessForSelectedManager(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsEmployeeRecordApproved(It.IsAny<string>())).ReturnsAsync(true);
            _futureManagerCorrectionRepositoryMock.Setup(x => x.IsSelectedManagerIsValid(It.IsAny<string>())).ReturnsAsync(false);

            // Act and Assert
            Assert.ThrowsAsync<Microsoft.AspNetCore.Http.BadHttpRequestException>(async () => await _futureManagerCorrectionService.UpdateFutureManager(request, alias, roleList));
        }
    }
}
