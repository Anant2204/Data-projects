// ***********************************************************************
// <copyright file="ConfigurationHelperTests.cs" company="Microsoft">
//     Copyright (c) . All rights reserved. 
// </copyright>
// ***********************************************************************

namespace Copilot.Backend.Test
{
    using Microsoft.Extensions.Configuration;
    using System.Collections.Generic;
    using Copilot.Backend.Shared.Helpers;

    /// <summary>
    /// Configuration Helper Tests.
    /// </summary>
    public class ConfigurationHelperTests
    {
        /// <summary>
        /// Get returns configuration value when configuration is set.
        /// </summary>
        [Fact]
        public void Get_Returns_Configuration_Value_When_Configuration_Is_Set()
        {
            // Arrange
            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(new[]
                {
                new KeyValuePair<string, string>("cloudInstruction", "TestValue1"),
                new KeyValuePair<string, string>("deploymentOrModelName", "TestValue2")
                })
                .Build();

            ConfigurationHelper.Configuration = config;

            // Act
            var result = ConfigurationHelper.Get<string>("cloudInstruction");

            // Assert
            Assert.Equal("TestValue1", result);
        }

        /// <summary>
        /// Get returns default value when configuration is null.
        /// </summary>
        [Fact]
        public void Get_Returns_Default_Value_When_Configuration_Is_Null()
        {
            // Arrange
            ConfigurationHelper.Configuration = null;

            // Act
            var result = ConfigurationHelper.Get<string>("cloudInstruction");

            // Assert
            Assert.Equal(default(string), result);
        }

        /// <summary>
        /// Get returns default value when key not found.
        /// </summary>
        [Fact]
        public void Get_Returns_Default_Value_When_Key_Not_Found()
        {
            // Arrange
            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(new[]
                {
                new KeyValuePair<string, string>("cloudInstruction", "Value1"),
                new KeyValuePair<string, string>("deploymentOrModelName", "Value2")
                })
                .Build();

            ConfigurationHelper.Configuration = config;

            // Act
            var result = ConfigurationHelper.Get<string>("Key3");

            // Assert
            Assert.Equal(default(string), result);
        }
    }
}
