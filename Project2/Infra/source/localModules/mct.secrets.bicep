//Parameters-Keyvault
@description('Specifies the KeyVault resource name.')
param keyVaultName string = ''

@description('Specifies the deployment environment.')
param deployEnvironment string = ''

@description('Specifies the utctime for deployment name.')
param utcTime string = utcNow()

@description('Specifies the Shared KeyVault name with deployment secrets.')
param sharedKeyVaultName string = ''

@description('Specifies the Shared KeyVault resource group name.')
param sharedKeyVaultRGName string = ''

@description('Specifies the Shared KeyVault subscription id.')
param sharedKeyVaultSubId string = ''

// AppInsights
@description('Specifies the AppInsights resource name.')
param appInsightsName string = ''

// Default expiry
param expiry int = dateTimeToEpoch(dateTimeAdd(utcNow(), 'P90D'))

// Get KeyVault
resource keyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = {
  name: keyVaultName
}

// AppInsights
resource appInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: appInsightsName
}

resource appInsightsInstrumentationKey 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  name: 'MCTAPI--ApplicationInsights--InstrumentationKey'
  parent: keyVault
  properties: {
    value: appInsights.properties.InstrumentationKey
    attributes: {
      exp: expiry
    }
  }
}

resource appInsightsConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  name: 'MCTAPI--ApplicationInsights--ConnectionString'
  parent: keyVault
  properties: {
    value: appInsights.properties.ConnectionString
    attributes: {
      exp: expiry
    }
  }
}

// External secrets from shared keyvault
var externalKeys = [
  'MCTAPI--AzureAd--TenantId'
  'MCTAPI--AzureAd--ClientId'
  'MCTAPI--AzureAd--Audience'
  'MCTAPI--Swagger--ClientId'
]

resource sharedKeyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = {
  name: sharedKeyVaultName
  scope: resourceGroup(sharedKeyVaultSubId, sharedKeyVaultRGName)
}

module kvSecretsExternal 'mct.secrets.external.bicep' = [for (item,i) in externalKeys: {
  name: 'kvs-${i}-${utcTime}'
  params: {
    keyVaultName: keyVaultName
    secretName: item
    secretValue: sharedKeyVault.getSecret('${deployEnvironment}--${item}')
  }
}]
