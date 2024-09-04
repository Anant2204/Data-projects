namespace MCT.DataAccess.Tests.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Repository;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Query;
    using Moq;
    using Xunit;

    public class TaxonomyScriptContentRepositoryTests
    {
        private readonly Mock<ConversationContext> _contextMock;
        private readonly TaxonomyScriptContentRepository _repository;

        public TaxonomyScriptContentRepositoryTests()
        {
            _contextMock = new Mock<ConversationContext>();
            _repository = new TaxonomyScriptContentRepository(_contextMock.Object);
        }

        [Fact]
        public async Task GetFYManagersForScriptExclusionAsync_ShouldReturnListOfFutureManagers()
        {
            // Arrange
            var searchString = "Test";
            var expectedManagers = new List<FutureManager>()
            {
                new FutureManager()
                {
                    Ic = "TestIC",
                    FullName = "Test Manager"
                }
            };

            var data = new List<DimManagerhierarchy>()
            {
                new DimManagerhierarchy()
                {
                    DirectManagerAlias = "TestIC",
                    DirectManagerFullName = "Test Manager",
                    Mtype = ApplicationConstants.FY
                }
            }.AsQueryable();


            var mockSet = new Mock<DbSet<DimManagerhierarchy>>();

            mockSet.As<IAsyncEnumerable<DimManagerhierarchy>>()
                .Setup(m => m.GetAsyncEnumerator(default))
                .Returns(new TestDbAsyncEnumerator<DimManagerhierarchy>(data.GetEnumerator()));

            mockSet.As<IQueryable<DimManagerhierarchy>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<DimManagerhierarchy>(data.Provider));

            mockSet.As<IQueryable<DimManagerhierarchy>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<DimManagerhierarchy>>().Setup(m => m.ElementType).Returns(data.ElementType);

            mockSet.As<IQueryable<DimManagerhierarchy>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            _contextMock.Setup(c => c.DimManagerhierarchies).Returns(mockSet.Object);
            _contextMock.Setup(c => c.Set<DimManagerhierarchy>()).Returns(mockSet.Object);

            // Act
            var result = await _repository.GetFYManagersForScriptExclusionAsync(searchString);

            // Assert
            Assert.Equal(1, result.Count);
            Assert.Equal("TestIC", result[0].Ic);

        }

        [Fact]
        public async Task GetStatisticsAsync_ShouldReturnTaxonomyScriptContentStatisticResponse()
        {
            // Arrange
            var expectedResponse = new TaxonomyScriptContentStatisticResponse()
            {
                TotalChangeContextScript = 0,
                TotalApproved = 2,
                TotalReadyForReview = 3
            };

            var data = new List<ScriptTaxonomyContent>()
            {
                new ScriptTaxonomyContent() { Status = ApplicationConstants.ReadyForReview },
                new ScriptTaxonomyContent() { Status = ApplicationConstants.Approved },
                new ScriptTaxonomyContent() { Status = ApplicationConstants.Approved },
                new ScriptTaxonomyContent() { Status = ApplicationConstants.ReadyForReview },
                new ScriptTaxonomyContent() { Status = ApplicationConstants.ReadyForReview }
            }.AsQueryable();


            var mockSet = new Mock<DbSet<ScriptTaxonomyContent>>();
           

            mockSet.As<IAsyncEnumerable<ScriptTaxonomyContent>>()
                .Setup(m => m.GetAsyncEnumerator(default))
                .Returns(new TestDbAsyncEnumerator<ScriptTaxonomyContent>(data.GetEnumerator()));

            mockSet.As<IQueryable<ScriptTaxonomyContent>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<ScriptTaxonomyContent>(data.Provider));

            mockSet.As<IQueryable<ScriptTaxonomyContent>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<ScriptTaxonomyContent>>().Setup(m => m.ElementType).Returns(data.ElementType);

            mockSet.As<IQueryable<ScriptTaxonomyContent>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            _contextMock.Setup(c => c.Set<ScriptTaxonomyContent>()).Returns(mockSet.Object);
            _contextMock.Setup(c => c.ScriptTaxonomyContents).Returns(mockSet.Object);

            // Act
            var result = await _repository.GetStatisticsAsync();

            // Assert
            Assert.Equal(expectedResponse.TotalChangeContextScript, result.TotalChangeContextScript);
            Assert.Equal(expectedResponse.TotalApproved, result.TotalApproved);
            Assert.Equal(expectedResponse.TotalReadyForReview, result.TotalReadyForReview);
        }


        private class ApplicationConstants
        {
            public const string ReadyForReview = "Ready For Review";
            public const string Approved = "Approved";
            public const string FY = "FY";
        }
    }
}
