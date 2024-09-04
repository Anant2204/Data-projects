namespace MCT.DataAccess.Tests.Repository
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Repository;
    using Moq;
    using Xunit;
    using System.Data.Entity.Infrastructure;
    using System.Reflection.Metadata;

    public class FYSummaryRepositoryTests
    {
        private readonly Mock<ConversationContext> _contextMock;
        private readonly FYSummaryRepository _repository;

        public FYSummaryRepositoryTests()
        {
            _contextMock = new Mock<ConversationContext>();
            _repository = new FYSummaryRepository(_contextMock.Object);
        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldReturnEmptyList_WhenManagerAliasListIsNull()
        {
            // Arrange
            IEnumerable<string> managerAliasList = null;

            // Act
            var result = await _repository.GetCurrentYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldReturnEmptyList_WhenManagerAliasListIsEmpty()
        {
            // Arrange
            IEnumerable<string> managerAliasList = Enumerable.Empty<string>();

            // Act
            var result = await _repository.GetCurrentYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldReturnFYSummaryDtos_WhenManagerAliasListIsValid()
        {

            // Arrange
            IEnumerable<string> managerAliasList = new List<string> { "alias1", "alias2" };
            var data = new List<TblHrdatum>
            {
                new TblHrdatum { CyManagerAlias = "alias1", IcFullName = "John Doe", Ic = "JD", CyQ1 = "Q1", CyQ2 = "Q2", FymanagerChange = "Y", CyRoleSummary = "Summary 1" },
                new TblHrdatum { CyManagerAlias = "alias2", IcFullName = "Jane Smith", Ic = "JS", CyQ1 = "Q1", CyQ2 = "Q2", FymanagerChange = "N", CyRoleSummary = "Summary 2" }
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
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            _contextMock.Setup(c => c.TblHrdata).Returns(mockSet.Object);

            // Act
            var result = await _repository.GetCurrentYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal("John Doe", result[0].FullName);
            Assert.Equal("JD", result[0].Alias);
            Assert.Equal("Q1", result[0].Q1);
            Assert.Equal("Q2", result[0].Q2);
            Assert.True(result[0].IsMoving);
            Assert.True(result[0].HasTaxonomyChange);
            Assert.Equal("Jane Smith", result[1].FullName);
            Assert.Equal("JS", result[1].Alias);
            Assert.Equal("Q1", result[1].Q1);
            Assert.Equal("Q2", result[1].Q2);
            Assert.False(result[1].IsMoving);
            Assert.True(result[1].HasTaxonomyChange);

        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldReturnFYSummaryDtosWithHasTaxonomyChangeTrue_WhenManagerAliasListIsValid()
        {

            // Arrange
            IEnumerable<string> managerAliasList = new List<string> { "alias1", "alias2" };
            var data = new List<TblHrdatum>
            {
                new TblHrdatum { CyManagerAlias = "alias1", IcFullName = "John Doe", Ic = "JD", CyQ1 = "Q1", CyQ2 = "Q2", FymanagerChange = "Y", CyRoleSummary = "Summary 1" },
                new TblHrdatum { CyManagerAlias = "alias2", IcFullName = "Jane Smith", Ic = "JS", CyQ1 = "Q1", CyQ2 = "Q2", FymanagerChange = "N", CyRoleSummary = "Summary 2" }
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
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            _contextMock.Setup(c => c.TblHrdata).Returns(mockSet.Object);

            // Act
            var result = await _repository.GetCurrentYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal("John Doe", result[0].FullName);
            Assert.Equal("JD", result[0].Alias);
            Assert.Equal("Q1", result[0].Q1);
            Assert.Equal("Q2", result[0].Q2);
            Assert.True(result[0].IsMoving);
            Assert.True(result[0].HasTaxonomyChange);
            Assert.Equal("Jane Smith", result[1].FullName);
            Assert.Equal("JS", result[1].Alias);
            Assert.Equal("Q1", result[1].Q1);
            Assert.Equal("Q2", result[1].Q2);
            Assert.False(result[1].IsMoving);
            Assert.True(result[1].HasTaxonomyChange);

        }

        [Fact]
        public async Task GetCurrentYearEmployeesAsync_ShouldReturnFYSummaryDtosWithHasTaxonomyChangeFalse_WhenManagerAliasListIsValid()
        {

            // Arrange
            IEnumerable<string> managerAliasList = new List<string> { "alias1", "alias2" };
            var data = new List<TblHrdatum>
            {
                new TblHrdatum { CyManagerAlias = "alias1", IcFullName = "John Doe", Ic = "JD", CyQ1 = "Q1", CyQ2 = "Q2", FymanagerChange = "Y", CyRoleSummary = "Summary 1", FyQ1 = "Q1", FyQ2 = "Q2",  CyIncentivePlan = "IncentivePlan",FyIncentivePlan = "IncentivePlan", FyRoleSummary = "Summary 1" },
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
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            _contextMock.Setup(c => c.TblHrdata).Returns(mockSet.Object);

            // Act
            var result = await _repository.GetCurrentYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Equal(1, result.Count);
            Assert.Equal("John Doe", result[0].FullName);
            Assert.Equal("JD", result[0].Alias);
            Assert.Equal("Q1", result[0].Q1);
            Assert.Equal("Q2", result[0].Q2);
            Assert.True(result[0].IsMoving);
            Assert.False(result[0].HasTaxonomyChange);
     
        }

        [Fact]
        public async Task GetFutureYearEmployeesAsync_ShouldReturnEmptyList_WhenManagerAliasListIsNull()
        {
            // Arrange
            IEnumerable<string> managerAliasList = null;

            // Act
            var result = await _repository.GetFutureYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetFutureYearEmployeesAsync_ShouldReturnEmptyList_WhenManagerAliasListIsEmpty()
        {
            // Arrange
            IEnumerable<string> managerAliasList = Enumerable.Empty<string>();

            // Act
            var result = await _repository.GetFutureYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetFutureYearEmployeesAsync_ShouldReturnFYSummaryDtos_WhenManagerAliasListIsValid()
        {
            // Arrange
            IEnumerable<string> managerAliasList = new List<string> { "alias1", "alias2" };
            var data = new List<TblHrdatum>
            {
                new TblHrdatum { FyManagerAlias = "alias1", IcFullName = "John Doe", Ic = "JD", FyQ1 = "Q1", FyQ2 = "Q2", FymanagerChange = "Y", FyRoleSummary = "Summary 1" },
                new TblHrdatum { FyManagerAlias = "alias2", IcFullName = "Jane Smith", Ic = "JS", FyQ1 = "Q1", FyQ2 = "Q2", FymanagerChange = "N", FyRoleSummary = "Summary 2" }
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
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            _contextMock.Setup(c => c.TblHrdata).Returns(mockSet.Object);


            // Act
            var result = await _repository.GetFutureYearEmployeesAsync(managerAliasList);

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal("John Doe", result[0].FullName);
            Assert.Equal("JD", result[0].Alias);
            Assert.Equal("Q1", result[0].Q1);
            Assert.Equal("Q2", result[0].Q2);
            Assert.True(result[0].IsMoving);
            Assert.Equal("Summary 1", result[0].RoleSummary);
            Assert.Equal("Jane Smith", result[1].FullName);
            Assert.Equal("JS", result[1].Alias);
            Assert.False(result[1].IsMoving);
            Assert.Equal("Summary 2", result[1].RoleSummary);
        }

        [Fact]
        public async Task GetStatisticsAsync_ShouldReturnEmptyResponse_WhenManagerAliasListIsNull()
        {
            // Arrange
            IEnumerable<string> managerAliasList = null;

            // Act
            var result = await _repository.GetStatisticsAsync(managerAliasList);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(0, result.CYTeam);
            Assert.Equal(0, result.FYTeam);
            Assert.Equal(0, result.Joining);
            Assert.Equal(0, result.Leaving);
        }

        [Fact]
        public async Task GetStatisticsAsync_ShouldReturnEmptyResponse_WhenManagerAliasListIsEmpty()
        {
            // Arrange
            IEnumerable<string> managerAliasList = Enumerable.Empty<string>();

            // Act
            var result = await _repository.GetStatisticsAsync(managerAliasList);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(0, result.CYTeam);
            Assert.Equal(0, result.FYTeam);
            Assert.Equal(0, result.Joining);
            Assert.Equal(0, result.Leaving);
        }
      
    }
}
