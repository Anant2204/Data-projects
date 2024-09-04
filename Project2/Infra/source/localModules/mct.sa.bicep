//parameters
@description('Specifies the Storage Account name')
@minLength(3)
@maxLength(24)
param storageAccountDiagName string    //mandatory
 
@description('Specifies resource location creation. Override it if the resource goup is different')
param location string = resourceGroup().location
 
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
param storageAccountSku string 
 
//resource - Storage account
@description('create storage account')
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccountDiagName
  location: location
  kind: storageAccountKind
  sku: {
    name: storageAccountSku
  }
  properties: {
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
    allowSharedKeyAccess: false
    networkAcls: {defaultAction: 'Allow'}
    }
  }

 
