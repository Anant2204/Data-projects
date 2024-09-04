//parameters
@description('Specifies the KeyVault resource name.')
@minLength(3)
@maxLength(24)
param keyVaultName string = 'Testkv'
 
@description('Specifies resource location creation. Override it if the resource goup is different')
param location string = resourceGroup().location
 
@description('Specifies whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.')
@allowed([
  true
  false
])
param enableVaultForDeployment bool = true
 
@description('Specifies whether Azure Resource Manager is permitted to retrieve secrets from the key vault.')
@allowed([
  true
  false
])
param enableVaultForTemplateDeployment bool = true
 
@description('Specifies whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.')
@allowed([
  true
  false
])
param enableVaultForDiskEncryption bool = true
 
@description('Property to specify whether the \'soft delete\' functionality is enabled for this key vault. ')
@allowed([
  true
  false
])
param enableSoftDelete bool = true
 
@description('Property to specify whether the \'Purge protection\' functionality is enabled for this key vault. Soft delete is a prerequisites for this ')
@allowed([
  true
  false
])
param enablePurgeProtection bool = false
 
@description('Specifies the Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. Get it by using Get-AzSubscription cmdlet.')
param tenantId string = subscription().tenantId
 
@description('Specifies the SKU for the key vault.')
@allowed([
  'standard'
  'premium'
])
param vaultSku string = 'standard'
 
@description('Specifies the resource tagging.')
param tags object = {}
 
 
//module-keyvault
@description('Create resource KeyVault')
resource keyVault 'Microsoft.KeyVault/vaults@2021-10-01' = {
  name: keyVaultName
  location: location
  tags: tags
  properties: {
    enabledForDeployment: enableVaultForDeployment
    enabledForTemplateDeployment: enableVaultForTemplateDeployment
    enabledForDiskEncryption: enableVaultForDiskEncryption
    enableSoftDelete: enableSoftDelete
    enablePurgeProtection: enablePurgeProtection == true ? enablePurgeProtection : null
    tenantId: tenantId
    accessPolicies: []
    sku: {
      name: vaultSku
      family: 'A'
      
    }
  }
}
  
//outputs
output keyVaultName string = keyVault.name
output keyVaultId string = keyVault.id
 