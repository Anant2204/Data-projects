// Parameters
@description('Specifies the KeyVault resource name.')
param keyVaultName string = ''

@description('Specifies the KeyVault Secret name.')
param secretName string = ''

@description('Specifies the KeyVault Secret value.')
@secure()
param secretValue string =''

// Default expiry
param expiry int = dateTimeToEpoch(dateTimeAdd(utcNow(), 'P90D'))

// Get KeyVault
resource keyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = {
  name: keyVaultName
}

resource secretKey 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  name: secretName
  parent: keyVault
  properties: {
    value: secretValue
    attributes: {
      exp: expiry
    }
  }
}
