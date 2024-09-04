namespace MCT.DataAccess.Tests.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Net.Sockets;
    using System.Threading.Tasks;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Repository;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using Xunit;

    public class FutureManagerCorrectionRepositoryTests
    {
        private readonly FutureManagerCorrectionRepository _repository;
        private readonly Mock<ConversationContext> _contextMock;

        public FutureManagerCorrectionRepositoryTests()
        {
            _contextMock = new Mock<ConversationContext>();
            _repository = new FutureManagerCorrectionRepository(_contextMock.Object);
        }    

        [Fact]
        public async Task GetFutureManager_WithValidData_ReturnsFutureManagers()
        {
            // Arrange
            string loggedInUserAlias = "IC1";
            string searchString = "IC1";
            var data = new List<TblHrdatum>
            {
                new TblHrdatum { Ic = "IC1", IcFullName = "Full Name 1" },
                new TblHrdatum { Ic = "IC2", IcFullName = "Full Name 2" }
            }.AsQueryable();
            var sellerDetails = new List<TblSellerDetail>
            {
                new TblSellerDetail { Alias = "IC1", ReviewStatus = ApplicationConstants.Approved },
                new TblSellerDetail { Alias = "IC2", ReviewStatus = ApplicationConstants.Approved }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<TblHrdatum>>();

            mockSet.As<IAsyncEnumerable<TblHrdatum>>()
                .Setup(m => m.GetAsyncEnumerator(default))
                .Returns(new TestDbAsyncEnumerator<TblHrdatum>(data.GetEnumerator()));

            mockSet.As<IQueryable<TblHrdatum>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<TblHrdatum>(data.Provider));

            mockSet.As<IQueryable<TblHrdatum>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<TblHrdatum>>().Setup(m => m.ElementType).Returns(data.ElementType);

            mockSet.As<IQueryable<TblHrdatum>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

            _contextMock.Setup(c => c.TblHrdata).Returns(mockSet.Object);

            var sellerDetailsMockSet = new Mock<DbSet<TblSellerDetail>>();

            sellerDetailsMockSet.As<IAsyncEnumerable<TblSellerDetail>>()
                .Setup(m => m.GetAsyncEnumerator(default))
                .Returns(new TestDbAsyncEnumerator<TblSellerDetail>(sellerDetails.GetEnumerator()));

            sellerDetailsMockSet.As<IQueryable<TblSellerDetail>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<TblSellerDetail>(sellerDetails.Provider));
            sellerDetailsMockSet.As<IQueryable<TblSellerDetail>>().Setup(m => m.Expression).Returns(sellerDetails.Expression);
            sellerDetailsMockSet.As<IQueryable<TblSellerDetail>>().Setup(m => m.ElementType).Returns(sellerDetails.ElementType);

            _contextMock.Setup(c => c.TblSellerDetails).Returns(sellerDetailsMockSet.Object);

            // Act
            var result = await _repository.GetFutureManager(loggedInUserAlias, searchString);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Count);
            Assert.Equal("IC1", result[0].Ic);
            Assert.Equal("Full Name 1", result[0].FullName);
        }
    }
}
