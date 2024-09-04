namespace MCT.API.Test.Attributes
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using MCT.API.Attributes;
    using Azure.Security.KeyVault.Secrets;
    using Microsoft.AspNetCore.DataProtection;
    using Xunit;

    public class PrefixKeyVaultSecretManagerTests
    {
        private PrefixKeyVaultSecretManager _manager;

        public PrefixKeyVaultSecretManagerTests()
        {
            _manager = new PrefixKeyVaultSecretManager("test");
        }

        [Fact]
        public void Load_ReturnsTrue_WhenSecretNameStartsWithPrefix()
        {
            // Arrange
            var secretProperties = new SecretProperties("test--secret");

            // Act
            var result = _manager.Load(secretProperties);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Load_ReturnsFalse_WhenSecretNameDoesNotStartWithPrefix()
        {
            // Arrange
            var secretProperties = new SecretProperties("other--secret");

            // Act
            var result = _manager.Load(secretProperties);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void GetKey_ReturnsCorrectKey_WhenSecretNameStartsWithPrefix()
        {
            // Arrange
            var secret = new KeyVaultSecret("test--secret", "value");

            // Act
            var result = _manager.GetKey(secret);

            // Assert
            Assert.Equal("secret", result);
        }

        [Fact]
        public void GetKey_ThrowsArgumentNullException_WhenSecretIsNull()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => _manager.GetKey((KeyVaultSecret)null));

        }

        [Fact]
        public void GetKey_ThrowsArgumentException_WhenSecretNameIsEmpty()
        {
            // Act & Assert
            Assert.Throws<ArgumentException>(() => _manager.GetKey(new KeyVaultSecret("","value")));
        }

        [Fact]
        public void GetKey_ThrowsArgumentException_WhenSecretNameIsNull()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => _manager.GetKey(new KeyVaultSecret(null, "value")));
        }
    }

}
