//Parameters-Keyvault
@description('Specifies the KeyVault resource name.')
param keyVaultName string = ''

// AppInsights
@description('Specifies the AppInsights resource name.')
param appInsightsName string = ''

@description('NAme of resource group of app insights')
param resourceGroupNamereference string

// Default expiry
param expiry int = dateTimeToEpoch(dateTimeAdd(utcNow(), 'P90D'))

// Get KeyVault
resource keyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = {
  name: keyVaultName
}

// AppInsights
resource appInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  scope: resourceGroup(resourceGroupNamereference)
  name: appInsightsName
}

resource appInsightsInstrumentationKey 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  name: 'MCTCopilot--ApplicationInsights--InstrumentationKey'
  parent: keyVault
  properties: {
    value: appInsights.properties.InstrumentationKey
    attributes: {
      exp: expiry
    }
  }
}

resource appInsightsConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  name: 'MCTCopilot--ApplicationInsights--ConnectionString'
  parent: keyVault
  properties: {
    value: appInsights.properties.ConnectionString
    attributes: {
      exp: expiry
    }
  }
}

