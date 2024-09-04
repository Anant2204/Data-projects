//scope
targetScope =  'subscription'

//Parameters-General
@description('Specify resource group to create')
param resourceGroupName string = ''


@description('Specify resource group to create')
param serviceConnectionPrincipleId string = ''

@description('Location of the resource group to be created')
param location string = ''

@description('Specifies the UTC time')
param utcTime string = utcNow()

@description('Specifies the deploy env')
param deployEnvironment string = ''

@description('Specifies the managed identity name')
param managedIdentityName string = ''

@description('Specifies resource tagging')
param tags object = {
  Environment: deployEnvironment
  Project: 'MCT'
  Team: 'mct'
  ProjectUrl: 'https://dev.azure.com/VSOGD/MCT'
  CreatedUsing: 'Bicep'
}

//parameters-Appinsights
@description('Name of the Application Insights')
@minLength(1)
@maxLength(260)
param appInsightsName string = 'mctai'     //Mandatory

//parameters- KeyVault
@description('The name of the Azure KeyVault to create.')
param keyVaultName string = ''     //Mandatory

var kvAccessDefaultPermissions = {
  keys: []
  secrets: []
  certificates: []
}

var kvAccessManagePermissions = {
  keys: [
    'all'
  ]
  secrets: [
    'all'
  ]
  certificates: [
    'all'
  ]
}

@description('The name of the role to assign to access KV')
param roleDefinitionIdOrNameKV array = [
  'Key Vault Secrets Officer'
]
@description('The name of the role to assign to access KV')
param roleDefinitionIdOrNameKVReader array = [
  'Key Vault Secrets User'
]

//parameters- App Service Plan
@description('The name of the Azure AppService Plan to create.')
param appServicePlanNameApi string = ''     //Mandatory

@description('The name of the sku of Azure AppService Plan to create.')
param appServiceskuNameApi string = ''     //Mandatory

@description('The location of the Azure AppService Plan to create.')
param appServiceLocationApi string = ''     //Mandatory

//parameters- Web App - API
@description('The name of the Azure Web App to create.')
param webAppNameApiApp string = ''     //Mandatory

@description('The name of the Azure Log Analytics Workspace to create.')
param logAnalyticsWorkspaceName string = ''     //Mandatory

@description('The kind of the Azure Web App to create.')
param appSettingsApiApp object = {
  KeyVaultName: keyVaultName
}

@description('The name of the Azure Log Analytics Workspace resource group')
param resourceGroupNamereference string

//########Modules#########//
//module resource group
resource resourceGroupModule 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location 
  tags:union({DisplayName: 'ResourceGroup'}, tags)
}

//module - keyVault
module keyVault 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/keyvault:v1' = {
  scope: resourceGroup(resourceGroupName)
  name: 'keyVault-${utcTime}'
  params: {
    keyVaultName: keyVaultName
    tags:union({DisplayName: 'KeyVault'}, tags)
    enableDeleteLock: false
    enableDiagnostics: true
    enablePurgeProtection: true
    logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
    logAnalyticsWorkspaceRG: resourceGroupNamereference
    enableRbacAuthorization: true
  }
  dependsOn: [
    resourceGroupModule
  ]
}

//module - App Service Plan for API
module appServicePlanApi 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/appserviceplan:v1' = {
  name: 'appServicePlanApi-${utcTime}'
  scope: resourceGroup(resourceGroupName)
  params: {
    appServicePlanName: appServicePlanNameApi
    kind: 'app'
    skuName: appServiceskuNameApi
    location: appServiceLocationApi
    tags:union({DisplayName: 'AppServicePlan'}, tags)
    enableDeleteLock: false
    enableDiagnostics: true
    logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
    logAnalyticsWorkspaceRG: resourceGroupNamereference
    reserved: false
  }
  dependsOn: [
    resourceGroupModule
  ]
}


//module webApp Api App
module webAppApiApp 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/webapp:v1' = {
  name: 'webAppApiApp-${utcTime}'
  scope: resourceGroup(resourceGroupName)
  params: {
    siteName: webAppNameApiApp
    tags:union({DisplayName: 'WebApp'}, tags)
    appSettings: appSettingsApiApp
    kind: 'app'
    enableDeleteLock: false
    enableDiagnostics: true
    logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
    logAnalyticsWorkspaceRG: resourceGroupNamereference
    appServicePlanName: appServicePlanNameApi
    location: appServiceLocationApi
  }
  dependsOn: [
    appServicePlanApi
    resourceGroupModule
  ]
}

//module managed identity
module managedIdentity 'localModules/managedIdentity.bicep' = {
  scope: resourceGroup(resourceGroupName)
  name: 'managedIdentity-${utcTime}'
  params: {
    managedIdentityName: managedIdentityName
    location: location
  }
  dependsOn: [
    resourceGroupModule
  ]
}

module roleAssignmentSpn 'localModules/roleAssignment.module.bicep' = {
  scope: resourceGroup(resourceGroupName)
  name: 'roleAssignmentSpn-${utcTime}'
  params: {
    principalId: serviceConnectionPrincipleId
    enableKv: true
    keyVaultName: keyVaultName
    roleDefinitionIdOrName: roleDefinitionIdOrNameKV
    managedIdentityName: 'Service connection'
  }
  dependsOn: [
    keyVault
  ]
}

module roleAssignmentManagedIdentity 'localModules/roleAssignment.module.bicep' = {
  scope: resourceGroup(resourceGroupName)
  name: 'roleAssignmentManagedIdentity-${utcTime}'
  params: {
    principalId: managedIdentity.outputs.userAssignedIdentity
    enableKv: true
    keyVaultName: keyVaultName
    roleDefinitionIdOrName: roleDefinitionIdOrNameKVReader
    managedIdentityName: managedIdentityName
  }
  dependsOn: [
    keyVault
    managedIdentity
  ]
}

//module Key Vault secrets
module kvSecrets 'localModules/mct.secrets.bicep' = {
  scope: resourceGroup(resourceGroupName)
  name: 'kvSecrets-${utcTime}'
  params: {
    keyVaultName: keyVaultName
    appInsightsName: appInsightsName
    resourceGroupNamereference: resourceGroupNamereference
  }
  dependsOn: [
    keyVault
  ]
} 




