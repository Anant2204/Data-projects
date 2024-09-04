//parameters

@description('Specifies the Storage Account name')
@minLength(3)
@maxLength(24)
param storageAccountName string    //mandatory

@description('Specifies resource location creation. Override it if the resource goup is different')
param location string




@description('Storage Account kind')
@allowed([
  'Storage'
  'StorageV2'
  'BlobStorage'
  'FileStorage'
  'BlockBlobStorage'
])

param storageAccountKind string = 'StorageV2'


@description('Storage Account sku type')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_RAGRS'
  'Standard_ZRS'
  'Premium_LRS'
  'Premium_ZRS'
  'Standard_GZRS'
  'Standard_RAGZRS'
])

param storageAccountSku string = 'Standard_LRS'

@description('Amount of days the soft deleted data is stored and available for recovery')
param deleteRetentionPolicy int = 7


@description('Create Container?')
@allowed([
  true
  false
])

param createContainer bool = false


@description('Set values for BlobServices corsRules?')
param corsRules array = []


@description('Specifies the list of container names')
param containerNames array

@description('Specifies the resource tagging')
param tags object = {}




@description('Enable or disable delete lock?')
@allowed([
  true
  false
])

param enableDeleteLock bool = false

@description('Apply Lock level to be read only or delete')
@allowed([
  'CanNotDelete'
  'ReadOnly'
])

param lockLevel string = 'CanNotDelete'

//Variables
var storageAccntName = toLower(storageAccountName)
var lockName = '${storageAccount.name}-lock'


//resource - Storage account
@description('create storage account')
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccntName
  location: location
  tags: tags
  kind: storageAccountKind
  sku: {
    name: storageAccountSku
  }
  properties: {
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
  }
}




//resource - Storage blob service
@description('create Blobservices')
resource blobServices 'Microsoft.Storage/storageAccounts/blobServices@2021-09-01' = if(createContainer) {
  name: 'default'
  parent: storageAccount
  properties: {
    cors: {
      corsRules: corsRules
    }
    deleteRetentionPolicy: {
      enabled: true
      days: deleteRetentionPolicy
    }
  }
}




//resource - Storage blob container service
@description('create Blobservices/Containers')

resource containers 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-09-01' = [for  containerName in containerNames: if(createContainer) {
  parent: blobServices
  name: containerName
}]




//resource - lock
@description('Prevent deletion of the resource')

resource lock 'Microsoft.Authorization/locks@2017-04-01' = if (enableDeleteLock) {
  name: lockName
  properties: {
    level: lockLevel
    notes: 'Prevent deletion of the resource'
  }
  scope: storageAccount
}




//outputs
output storageAccountName string = storageAccount.name
output storageAccountId string = storageAccount.id
output storageBlobEndpoint string = storageAccount.properties.primaryEndpoints.blob
