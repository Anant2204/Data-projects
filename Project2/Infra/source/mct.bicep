// //scope
// targetScope =  'subscription'

//Parameters-General
@description('Specify resource group to create')
param resourceGroupName string = ''

// @description('Specify resource group to create')
// param serviceConnectionPrincipleId string = ''

@description('Location of the resource group to be created')
param location string = ''

// @description('Specifies the UTC time')
// param utcTime string = utcNow()

// @description('Specifies the deploy env')
// param deployEnvironment string = ''

// @description('Specifies resource tagging')
// param tags object = {
//   Environment: deployEnvironment
//   Project: 'MCT'
//   Team: 'mct'
//   ProjectUrl: 'https://dev.azure.com/VSOGD/MCT'
//   CreatedUsing: 'Bicep'
// }

// @description('Specifies the Shared KeyVault name with deployment secrets.')
// param sharedKeyVaultName string = ''

// @description('Specifies the Shared KeyVault resource group name.')
// param sharedKeyVaultRGName string = ''

// @description('Specifies the Shared KeyVault rsubscription id.')
// param sharedKeyVaultSubId string = ''

//###Parameters for specific resources########//
//Parameters- Diagnostics Storage Account
@description('Specifies the Storage Account name')
@minLength(3)
@maxLength(24)
param storageAccountDiagName string = 'mctenvsa'     //Mandatory

@description('Specifies the Storage Account sku')
param storageAccountSku string = ''     //Mandatory

// //Parameters- Configuration Storage Account
// @description('Specifies the Storage Account name')
// @minLength(3)
// @maxLength(24)
// param storageAccountPortalName string = 'mctenvsa'     //Mandatory

// @description('Specifies the Storage Account name')
// param storageAccountPortalSku string = ''     //Mandatory

// //parameters- Log Anlalyics workspace
// @description('Name of the workspace')
// @minLength(4)
// @maxLength(63)
// param logAnalyticsWorkspaceName string = 'mct-la'     //Mandatory

// //parameters- virtual netwrok
// @description('Name of the VNet')
// @minLength(4)
// @maxLength(63)
// param vnetName string = 'mct-la'     //Mandatory

// //parameters-Appinsights
// @description('Name of the Application Insights')
// @minLength(1)
// @maxLength(260)
// param appInsightsName string = 'mctai'     //Mandatory

// // parameters - CDN
// @description('The name of the Azure CDN to create.')
// @minLength(1)
// @maxLength(260)
// param cdnProfileName string = 'mctcdn'     //Mandatory

// @description('SKU of the Azure CDN.')
// param cdnSku string = ''     //Mandatory

// @description('Name of the CDN Endpoint.')
// @minLength(1)
// @maxLength(50)
// param cdnEndpointName string = 'mctcde'       //mandatory

// //parameters- Container Registry
// @description('The name of the Azure Container Registry to create.')
// @minLength(5)
// @maxLength(50)
// param containerRegistryName string = 'mctacr'     //Mandatory

// @description('The image path for MCT API.')
// param containerImagePath string = 'mct:latest'     //Mandatory

// @description('The sku of the Azure Container Registry to create.')
// param acrSku string = ''     //Mandatory

// @description('The name of the role to assign. If it cannot be found you can specify the role definition ID instead.')
// param roleDefinitionIdOrNameAcr array = [
//   'AcrPull'
//   'AcrPush'
// ]

// @description('The name of the role to assign to access KV')
// param roleDefinitionIdOrNameKV array = [
//   'Key Vault Secrets Officer'
// ]
// @description('The name of the role to assign to access KV')
// param roleDefinitionIdOrNameKVReader array = [
//   'Key Vault Secrets User'
// ]

// //parameters- KeyVault
// @description('The name of the Azure KeyVault to create.')
// param keyVaultName string = ''     //Mandatory

// var kvAccessDefaultPermissions = {
//   keys: []
//   secrets: []
//   certificates: []
// }

// var kvAccessManagePermissions = {
//   keys: [
//     'all'
//   ]
//   secrets: [
//     'all'
//   ]
//   certificates: [
//     'all'
//   ]
// }

// //parameters- App Service Plan
// @description('The name of the Azure AppService Plan to create.')
// param appServicePlanNameApi string = ''     //Mandatory

// @description('The name of the sku of Azure AppService Plan to create.')
// param appServiceskuNameApi string = ''     //Mandatory

// @description('The location of the Azure AppService Plan to create.')
// param appServiceLocationApi string = ''     //Mandatory

// @description('The name of the Azure AppService Plan to create.')
// param appServicePlanNamePortal string = ''     //Mandatory

// @description('The name of the sku Azure AppService Plan to create.')
// param appServiceskuNamePortal string = ''     //Mandatory

// @description('The location of the Azure AppService Plan to create.')
// param appServiceLocationPortal string = ''     //Mandatory

// //parameters- Web App - API
// @description('The name of the Azure Web App to create.')
// param webAppNameApiApp string = ''     //Mandatory

// @description('The name of Log Analytics Workspace sku')
// param logAnalyticsWorkspacesku string = ''     //Mandatory

// @description('The kind of the Azure Web App to create.')
// param appSettingsApiApp object = {
//   KeyVaultName: keyVaultName
// }

// @description('External CORS.')
// param apiCors array = []

// //parameters- Web App - Portal
// @description('The name of the Azure Web App to create.')
// param webAppNamePortalApp string = ''     //Mandatory

// @description('The kind of the Azure Web App to create.')
// param appSettingsPortalApp object = {
//   KeyVaultName: keyVaultName
// }

// @description('The name of sqlserver to create')
// param serverName string = ''

// @description('The name of sqldb to create')
// param sqldatabase array = []

// @description('SID')
// param sid string = ''

// @description('Tenant ID')
// param tenantid string = ''

// @description('Administrator Login ID')
// param adAdministratorLogin string = ''

// @description('Name of SQL sku')
// param sqlskuname string

// @description('Tier of sql sku')
// param sqlskutier string

// @description('capacity of sql sku')
// param sqlskucapacity int

// @description('Name of Azure Data Factory')
// param adfname string = ''



// //########Modules#########//
// //module resource group
// resource resourceGroupModule 'Microsoft.Resources/resourceGroups@2021-04-01' = {
//   name: resourceGroupName
//   location: location 
//   tags:union({DisplayName: 'ResourceGroup'}, tags)
// }

// //module-Diagnostics Storage Account
// module storageAccountDiag 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/storageaccount:v1' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'storageAccountDiag-${utcTime}'
//   params: {
//     storageAccountName: storageAccountDiagName
//     storageAccountSku: storageAccountSku
//     tags:union({DisplayName: 'StorageAccount'}, tags)
//   }
//   dependsOn: [
//     resourceGroupModule
//   ]
// }

// //module-Config Storage Account
// module storageAccountPortal 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/storageaccount:v1' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'storageAccountPortal-${utcTime}'
//   params: {
//     storageAccountName: storageAccountPortalName
//     storageAccountSku: storageAccountPortalSku
//     tags:union({DisplayName: 'StorageAccount'}, tags)
//   }
//   dependsOn: [
//     resourceGroupModule
//   ]
// }

// //module-Log Analytics Workspace
// module logAnalyticsWorkspace 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/loganalyticsworkspace:v1' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'logAnalyticsWorkspace-${utcTime}'
//   params: {
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     tags:union({DisplayName: 'LogAnalyticsWorkSpace'}, tags)
//     sku: logAnalyticsWorkspacesku
//   }
//   dependsOn: [
//     resourceGroupModule
//   ]
// }

// //module VNET
// module vnet 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/virtualnetwork:v1' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'vnet-${utcTime}'
//   params: {
//     vnetName: vnetName
//     enableDiagnostics: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     tags:union({DisplayName: 'vNet'}, tags)
//   }
//   dependsOn: [
//     logAnalyticsWorkspace
//     resourceGroupModule
//   ]
// }

// //module appInsights
// module appInsights 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/appinsights:v1' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'appInsights-${utcTime}'
//   params: {
//     appInsightsName: appInsightsName
//     enableDiagnostics: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     tags:union({DisplayName: 'AppInsights'}, tags)
//   }
//   dependsOn: [
//     logAnalyticsWorkspace
//     resourceGroupModule
//   ]
// }

// //module - container registry
// module containerRegistry 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/containerregistry:v1' = {
//   name: 'containerRegistry-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     acrName: containerRegistryName
//     acrSku: acrSku
//     tags:union({DisplayName: 'ContainerRegistry'}, tags)
//     enableDiagnostics: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//   }
//   dependsOn: [
//     logAnalyticsWorkspace
//     resourceGroupModule
//   ]
// }

// //module - cdn profile
// module cdnPortal 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/cdnpremier:v1' = {
//   name: 'cdn-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     profileName: cdnProfileName
//     sku: cdnSku
//     endpointName: cdnEndpointName
//     originHosts: [ 
//       '${storageAccountPortalName}.blob.${environment().suffixes.storage}'
//     ]
//     tags:union({DisplayName: 'CDN'}, tags)
//   }
//   dependsOn: [
//     storageAccountPortal
//     resourceGroupModule
//   ]
// }

// //module - keyVault
// module keyVault 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/keyvault:v1' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'keyVault-${utcTime}'
//   params: {
//     keyVaultName: keyVaultName
//     tags:union({DisplayName: 'KeyVault'}, tags)
//     enableDeleteLock: false
//     enableDiagnostics: true
//     enablePurgeProtection: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     enableRbacAuthorization: true
//     vnetName: vnetName
//     subnets: [
//       'default'
//     ]
//   }
//   dependsOn: [
//     vnet
//     logAnalyticsWorkspace
//     resourceGroupModule
//   ]
// }

// //module - App Service Plan - Linux for API
// module appServicePlanApi 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/appserviceplan:v1' = {
//   name: 'appServicePlanApi-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     appServicePlanName: appServicePlanNameApi
//     kind: 'linux'
//     skuName: appServiceskuNameApi
//     location: appServiceLocationApi
//     tags:union({DisplayName: 'AppServicePlan'}, tags)
//     enableDeleteLock: false
//     enableDiagnostics: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     reserved: true
//   }
//   dependsOn: [
//     logAnalyticsWorkspace
//     resourceGroupModule
//   ]
// }

// //module - App Service Plan - Web App
// module appServicePlanPortal 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/appserviceplan:v1' = {
//   name: 'appServicePlanPortal-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     appServicePlanName: appServicePlanNamePortal
//     kind: 'app'
//     skuName: appServiceskuNamePortal
//     location: appServiceLocationPortal
//     tags:union({DisplayName: 'AppServicePlan'}, tags)
//     enableDeleteLock: false
//     enableDiagnostics: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//   }
//   dependsOn: [
//     logAnalyticsWorkspace
//     resourceGroupModule
//   ]
// }

// //module webApp Api App
// module webAppApiApp 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/webappcontainer:v1' = {
//   name: 'webAppApiApp-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     siteName: webAppNameApiApp
//     tags:union({DisplayName: 'WebApp'}, tags)
//     appSettings: appSettingsApiApp
//     kind: 'app,linux,container'
//     enableDeleteLock: false
//     enableDiagnostics: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     appServicePlanName: appServicePlanNameApi
//     location: appServiceLocationApi
//     containerRegistry: containerRegistryName
//     containerImagePath: containerImagePath
//     subnet: 'default'
//     vnetName: vnetName
//     cors: concat(apiCors, [
//       webAppPortalApp.outputs.webAppEndpoint
//     ])
//   }
//   dependsOn: [
//     vnet
//     webAppPortalApp
//     logAnalyticsWorkspace
//     appServicePlanApi
//     containerRegistry
//     resourceGroupModule
//   ]
// }

// //module webApp Portal App
// module webAppPortalApp 'br:iacacrbicepmodule01.azurecr.io/bicep/modules/webapp:v1' = {
//   name: 'webAppPortalApp-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     siteName: webAppNamePortalApp
//     tags:union({DisplayName: 'WebApp'}, tags)
//     appSettings: appSettingsPortalApp
//     kind: 'app'
//     enableDeleteLock: false
//     enableDiagnostics: true
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     appServicePlanName: appServicePlanNamePortal
//     location: appServiceLocationPortal
//   }
//   dependsOn: [
//     logAnalyticsWorkspace
//     appServicePlanPortal
//     containerRegistry
//     resourceGroupModule
//   ]
// }

// module roleAssignmentApiApp 'localModules/roleAssignment.module.bicep' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'roleAssignmentApiApp-${utcTime}'
//   params: {
//     principalId: webAppApiApp.outputs.webAppObjectID
//     enableKv: true
//     keyVaultName: keyVaultName
//     roleDefinitionIdOrName: roleDefinitionIdOrNameKVReader
//     managedIdentityName: webAppNameApiApp
//   }
//   dependsOn: [
//     keyVault
//     webAppApiApp
//   ]
// }

// module roleAssignmentPortalApp 'localModules/roleAssignment.module.bicep' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'roleAssignmentPortalApp-${utcTime}'
//   params: {
//     principalId: webAppPortalApp.outputs.webAppObjectID
//     enableKv: true
//     keyVaultName: keyVaultName
//     roleDefinitionIdOrName: roleDefinitionIdOrNameKVReader
//     managedIdentityName: webAppNamePortalApp
//   }
//   dependsOn: [
//     keyVault
//     webAppPortalApp
//   ]
// }

// module roleAssignmentSpn 'localModules/roleAssignment.module.bicep' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'roleAssignmentSpn-${utcTime}'
//   params: {
//     principalId: serviceConnectionPrincipleId
//     enableKv: true
//     keyVaultName: keyVaultName
//     roleDefinitionIdOrName: roleDefinitionIdOrNameKV
//     managedIdentityName: 'Service connection'
//   }
//   dependsOn: [
//     keyVault
//   ]
// }

// //module User managed Identity Role Assignment to ACR
// module roleAssignmentAcr 'localModules/roleAssignment.module.bicep' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'roleAssignmentAcr-${utcTime}'
//   params: {
//     principalId: webAppApiApp.outputs.webAppObjectID
//     acrName: containerRegistryName
//     enableAcr: true
//     roleDefinitionIdOrName: roleDefinitionIdOrNameAcr
//     managedIdentityName: webAppNameApiApp
//   }
//   dependsOn: [
//     containerRegistry
//     webAppApiApp

//   ]
// }

// //module Key Vault secrets
// module kvSecrets 'localModules/mct.secrets.bicep' = {
//   scope: resourceGroup(resourceGroupName)
//   name: 'kvSecrets-${utcTime}'
//   params: {
//     keyVaultName: keyVaultName
//     deployEnvironment: deployEnvironment
//     appInsightsName: appInsightsName
//     sharedKeyVaultName: sharedKeyVaultName
//     sharedKeyVaultRGName: sharedKeyVaultRGName
//     sharedKeyVaultSubId: sharedKeyVaultSubId
//   }
//   dependsOn: [
//     keyVault
//     appInsights
    
//   ]
// }

// //module sql

// module sqlserver 'localModules/mct.sql.bicep' = {
//    name: 'sqlserver-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     serverName: serverName
//     location: location
//     tags:union({DisplayName: 'sqldatabase'}, tags)
//     adAdministratorLogin: adAdministratorLogin
//     sid: sid
//     tenantid: tenantid
//     sqldatabase: sqldatabase
//     sqlskuname: sqlskuname
//     sqlskutier: sqlskutier
//     sqlskucapacity: sqlskucapacity
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     logAnalyticsWorkspaceRG: resourceGroupName
//     logAnalyticsWorkspaceSubId: sharedKeyVaultSubId

//   }
//   dependsOn: [
//     resourceGroupModule
//     storageAccountDiag
    
//   ]
// }

// //module data factory

// module datafactory 'localModules/mct.adf.bicep' = {
//   name: 'datafactory-${utcTime}'
//   scope: resourceGroup(resourceGroupName)
//   params: {
//     dataFactoryName: adfname
//     location: location
//     tags:union({DisplayName: 'DataFactory'}, tags)
//     publicNetworkAccess: 'disabled'
//     logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
//     logAnalyticsWorkspaceRG: resourceGroupName
//     logAnalyticsWorkspaceSubId: sharedKeyVaultSubId
    
//     //userAssignedIdentity: 

//   }
//   dependsOn: [
//     resourceGroupModule
//     storageAccountDiag
//   ]
// }

module testsa 'localModules/mct.sa.bicep' = {
  name: 'testsa'
  scope: resourceGroup(resourceGroupName)
  params:{
    storageAccountDiagName: storageAccountDiagName
    location: location
    storageAccountKind: 'StorageV2'
    storageAccountSku: storageAccountSku
}
}
