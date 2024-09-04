namespace MCT.DataAccess.Tests.Repository
{
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Repository;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Xunit;

    public class ManagerRepositoryTests
    {
        [Fact]
        public async Task GetAll_ShouldReturnAllManagers()
        {
            // Arrange
            var data = new List<VwManagerSecurity>
            {
                new VwManagerSecurity {DirectManagerFullName= "John Doe", DirectManagerAlias = "johndoe" ,Proxy=""},
                new VwManagerSecurity { DirectManagerFullName = "Jane Smith", DirectManagerAlias = "janesmith",Proxy="" }
            }.AsQueryable();

            var mockContext = new Mock<ConversationContext>();

            var mockSet = new Mock<DbSet<VwManagerSecurity>>();

            mockSet.As<IAsyncEnumerable<VwManagerSecurity>>()
                .Setup(m => m.GetAsyncEnumerator(default))
                .Returns(new TestDbAsyncEnumerator<VwManagerSecurity>(data.GetEnumerator()));

            mockSet.As<IQueryable<VwManagerSecurity>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<VwManagerSecurity>(data.Provider));

            mockSet.As<IQueryable<VwManagerSecurity>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<VwManagerSecurity>>().Setup(m => m.ElementType).Returns(data.ElementType);

            mockSet.As<IQueryable<VwManagerSecurity>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            mockContext.Setup(c => c.VwManagerSecurities).Returns(mockSet.Object);
            mockContext.Setup(c => c.Set<VwManagerSecurity>()).Returns(mockSet.Object);

            var managerRepository = new ManagerRepository(mockContext.Object);

            // Act
            var result = await managerRepository.GetAll();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal("John Doe", result[0].FullName);
            Assert.Equal("johndoe", result[0].Alias);
            Assert.Equal("Jane Smith", result[1].FullName);
            Assert.Equal("janesmith", result[1].Alias);
        }


        [Fact]
        public async Task GetAll_ShouldReturnEmptyManagers()
        {
            // Arrange
            var data = new List<VwManagerSecurity>
            {
                new VwManagerSecurity {DirectManagerFullName= "John1 Doe", DirectManagerAlias = "john1doe" ,Proxy=""},
                new VwManagerSecurity { DirectManagerFullName = "Jane1 Smith", DirectManagerAlias = "jane1smith",Proxy="" }
            }.AsQueryable();

            var expectedResult = new List<VwManagerSecurity>
            {
                new VwManagerSecurity {DirectManagerFullName= " Doe", DirectManagerAlias = "d" ,Proxy=""},
            };

            var mockContext = new Mock<ConversationContext>();

            var mockSet = new Mock<DbSet<VwManagerSecurity>>();

            mockSet.As<IAsyncEnumerable<VwManagerSecurity>>()
                .Setup(m => m.GetAsyncEnumerator(default))
                .Returns(new TestDbAsyncEnumerator<VwManagerSecurity>(data.GetEnumerator()));

            mockSet.As<IQueryable<VwManagerSecurity>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<VwManagerSecurity>(data.Provider));

            mockSet.As<IQueryable<VwManagerSecurity>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<VwManagerSecurity>>().Setup(m => m.ElementType).Returns(data.ElementType);

            mockSet.As<IQueryable<VwManagerSecurity>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            mockSet.Setup(m => m.AsQueryable()).Returns(mockSet.Object);

            mockContext.Setup(c => c.VwManagerSecurities).Returns(mockSet.Object);
            mockContext.Setup(c => c.Set<VwManagerSecurity>()).Returns(mockSet.Object);

            var managerRepository = new ManagerRepository(mockContext.Object);

            // Act
            var result = await managerRepository.GetAll();

            // Assert
            Assert.NotEqual(expectedResult.Count(), result.Count);
            Assert.NotEqual(expectedResult.First().DirectManagerFullName, result[0].FullName);
        }
    }
}
