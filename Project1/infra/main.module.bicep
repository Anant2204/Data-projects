//DEV UI App Service Plan
param devUIandAPIASPLName string
param location string
param pSKUName string
param devUIandAPIASPLTier string
param devUIandAPIASPLSize string
param devUIandAPIASPLFamily string
param devUIandAPIASPLKind string
param devUIandAPIASPLElasticScale bool
param devUIandAPIASPLMinWorkerCount int

param deployDevUIASPL bool
module devUIandAPIASPL 'modules/App Service/AppServicePlan.module.bicep' = if(deployDevUIASPL)  {
  name: 'deploy-${devUIandAPIASPLName}'
  params: {
    ASPlan: devUIandAPIASPLName
    location: location
    pSKUName: pSKUName
    appServicePlanTier: devUIandAPIASPLTier
    appServicePlanSize: devUIandAPIASPLSize
    appServicePlanFamily: devUIandAPIASPLFamily
    appServicePlanKind: devUIandAPIASPLKind
    appServicePlanElasticScale: devUIandAPIASPLElasticScale
    appServicePlanMinWorkerCount: devUIandAPIASPLMinWorkerCount

  }
}

//dev Logic App Service Plan
param devLogicASPL string
param devLogicASPLSKUName string
param devLogicASPLTier string
param devLogicASPLSize string
param devLogicASPLFamily string
param devLogicASPLKind string
param devLogicASPLElasticScale bool
param devLogicMinWorkerCount int

param deployDevLogicASPL bool
module devLogicAppASPL 'modules/App Service/AppServicePlan.module.bicep' = if(deployDevLogicASPL) {
  name: 'deploy-${devLogicASPL}'
  params: {
    ASPlan: devLogicASPL
    location: location
    pSKUName: devLogicASPLSKUName
    appServicePlanTier: devLogicASPLTier
    appServicePlanSize: devLogicASPLSize
    appServicePlanFamily: devLogicASPLFamily
    appServicePlanKind: devLogicASPLKind
    appServicePlanElasticScale: devLogicASPLElasticScale
    appServicePlanMinWorkerCount: devLogicMinWorkerCount

  }
}



//DEV UI WebApp
param UIWebapp string
param devUIWebappKind string

param deployDevUIwebApp bool
module uiwebApp 'modules/Azure WebApp/webapp.module.bicep' = if (deployDevUIwebApp){
  name: 'deploy-${UIWebapp}'
  params: {
    appServicePlanID: devUIandAPIASPL.outputs.appServicePlanId
    location: location
    webAppName: UIWebapp
    allowedCors: [
      'https://mcapshelpapi.azurewebsites.net'
    ]
    webAppKind: devUIWebappKind
  }
}

//DEV API WebApp
param APIWebapp string
param devAPIWebappKind string

param deployDevapiWebApp bool
module apiwebApp 'modules/Azure WebApp/webapp.module.bicep' = if(deployDevapiWebApp){
  name: 'deploy-${APIWebapp}'
  params: {
    appServicePlanID: devUIandAPIASPL.outputs.appServicePlanId
    location: location
    webAppName: APIWebapp
    allowedCors: [
      'https://mcapshelpdev.azurewebsites.net'
    ]
    webAppKind: devAPIWebappKind
  }
}

//DEV Logic App (Standard)
param devLogiceAppName string

param deployDevLogicAppSTD bool
module devLogicAppStandard 'modules/Logic app (standard)/logicappStandard.module.bicep' = if(deployDevLogicAppSTD){
  name: 'deploy-${devLogiceAppName}'
  params: {
    LogicAppServicePlanID: devLogicAppASPL.outputs.appServicePlanId
    location: location
    logicAppName: devLogiceAppName
  }
}

//DEV UI and API Application Insights
param devappInsightsName string
param devappInsightsKind string

param deployDevUIandAPIAppInsights bool
module devApplicationInsights 'modules/Application Insights/applicationInsights.module.bicep' = if(deployDevUIandAPIAppInsights){
  name: 'deploy-${devappInsightsName}'
  params: {
    kind: devappInsightsKind
    location: location
    name: devappInsightsName
  }
}

//DEV Logic app Application Insights
param devLogicAppApplicationInsightsName string
param devLogicAppApplicationInsightsKind string

param deployDevLogicAppAppInsights bool
module devLogicAppApplicationInsights 'modules/Application Insights/applicationInsights.module.bicep' = if(deployDevLogicAppAppInsights){
  name: 'deploy-${devLogicAppApplicationInsightsName}'
  params: {
    kind: devLogicAppApplicationInsightsKind
    location: location
    name: devLogicAppApplicationInsightsName
  }
}

// DEV Keyvault
param devkeyVaultenableSoftDelete bool
param devkeyVaultName string
param devkeyVaultLocation string
param devkeyVaultskuFamily string
param devkeyVaultskuName string
param devkeyVaultsoftDeleteRetentionInDays int

param deployDevKeyVault bool
module devKeyvault 'modules/KeyVault/keyvault.module.bicep' = if(deployDevKeyVault){
  name: 'deploy-${devkeyVaultName}'
  params: {
    enableSoftDelete: devkeyVaultenableSoftDelete
    keyVaultLocation: devkeyVaultLocation
    keyVaultName: devkeyVaultName
    skuFamily: devkeyVaultskuFamily
    skuName: devkeyVaultskuName
    softDeleteRetentionInDays: devkeyVaultsoftDeleteRetentionInDays
  }
}

//storage account - dev

param storageAccountNameOne string
param containerNamesOne array

param deployDevStorageAccountOne bool
module devStorageAccountOne 'modules/Storage Account/storageAccount.module.bicep' = if(deployDevStorageAccountOne){
  name: 'deploy-${storageAccountNameOne}'
  params: {
    location: location
    storageAccountName: storageAccountNameOne
    containerNames: containerNamesOne
  }
}

//storage account - two
param devStorageAccountNameTwo string
param containerNamesTwo array

param deployDevStorageAccountTwo bool
module devStorageAccountTwo 'modules/Storage Account/storageAccount.module.bicep' = if(deployDevStorageAccountTwo){
  name: 'deploy-${devStorageAccountNameTwo}'
  params: {
    containerNames: containerNamesTwo
    location: location
    storageAccountName: devStorageAccountNameTwo
  }
}

//storage account - three
param devStorageAccountNameThree string
param containerNamesThree array

param deployDevStorageAccountThree bool
module devStorageAccountThree 'modules/Storage Account/storageAccount.module.bicep' = if(deployDevStorageAccountThree) {
  name: 'deploy-${devStorageAccountNameThree}'
  params: {
    containerNames: containerNamesThree
    location: location
    storageAccountName: devStorageAccountNameThree
  }
}

//DEV AFD
param devAFDEndpoint string
param devAFDRoute string
param devApiURL string
param devfrontdoorName string
param devoriginGroup string
param devSecurityPolicy string
param devwafMode string
param devwafPolicyName string
param resourceGroupNameAFD string

param deployDevAFDEndpoint bool
module devFrontdoorEndpoint 'modules/Frontdoor/azureFrontDoor.module.bicep' = if(deployDevAFDEndpoint){
  name: 'deploy-${devAFDEndpoint}'
  scope: resourceGroup(resourceGroupNameAFD)
  params: {
    AFDEndpoint: devAFDEndpoint
    AFDRoute: devAFDRoute
    ApiURL: devApiURL
    frontdoorName: devfrontdoorName
    originGroup: devoriginGroup
    SecurityPolicy: devSecurityPolicy
    wafMode: devwafMode
    wafPolicyName: devwafPolicyName
  }
}

//UAT AFD
param uatAFDEndpoint string
param uatAFDRoute string
param uatApiURL string
param uatfrontdoorName string
param uatoriginGroup string
param uatSecurityPolicy string
param uatwafMode string
param uatwafPolicyName string

param deployUatAFDEndpoint bool
module uatFrontdoorEndpoint 'modules/Frontdoor/azureFrontDoor.module.bicep' = if(deployUatAFDEndpoint){
  name: 'deploy-${uatAFDEndpoint}'
  scope: resourceGroup(resourceGroupNameAFD)
  params: {
    AFDEndpoint: uatAFDEndpoint
    AFDRoute: uatAFDRoute
    ApiURL: uatApiURL
    frontdoorName: uatfrontdoorName
    originGroup: uatoriginGroup
    SecurityPolicy: uatSecurityPolicy
    wafMode: uatwafMode
    wafPolicyName: uatwafPolicyName
  }
}


//PROD AFD
// param prodAFDEndpoint string
// param prodAFDRoute string
// param prodApiURL string
// param prodfrontdoorName string
// param prodoriginGroup string
// param prodSecurityPolicy string
// param prodwafMode string
// param prodwafPolicyName string
// param prodResourceGroupName string

// param deployProdAFDEndpoint bool
// module prodFrontdoorEndpoint 'modules/Frontdoor/azureFrontDoor.module.bicep' = if(deployProdAFDEndpoint){
//   name: 'deploy-${prodAFDEndpoint}'
//   scope: resourceGroup(prodResourceGroupName)
//   params: {
//     AFDEndpoint: prodAFDEndpoint
//     AFDRoute: prodAFDRoute
//     ApiURL: prodApiURL
//     frontdoorName: prodfrontdoorName
//     originGroup: prodoriginGroup
//     SecurityPolicy: prodSecurityPolicy
//     wafMode: prodwafMode
//     wafPolicyName: prodwafPolicyName
//   }
// }

//dev SQL Server

param devSQLServeradministratorLogin string
param devSQLServeradministratorLoginUserName string
param devSQLServeradministratorsid string
param devSQLServeradministratortenantId string
param devSQLServerazureADOnlyAuthentication bool
// param devSQLServerprimaryDBName string
param devsqlServerName string
param deploydevSQLServerWithFailOverGroup bool
// param devvulnerabilityAssessments_Default_storageContainerPath string

param devsqlServerFailOverGroupName string
module devSQLServerWithFailOverModule 'modules/SQL Server/sqlServerWithFailover.module.bicep' = if(deploydevSQLServerWithFailOverGroup){
  name: 'deploy-${devsqlServerFailOverGroupName}'
  params: {
    administratorLogin: devSQLServeradministratorLogin
    administratorLoginUserName: devSQLServeradministratorLoginUserName
    administratorsid: devSQLServeradministratorsid
    administratortenantId: devSQLServeradministratortenantId
    azureADOnlyAuthentication: devSQLServerazureADOnlyAuthentication
    location: location
    primaryDBName: devSQLDB.outputs.primaryDBID
    sqlPartnerServerID: devSecondarySQLServer.outputs.serverID
    sqlServerFailOverGroupName: '${devsqlServerName}/${devsqlServerName}devsecondaryservergroup'
    sqlServerName: devsqlServerName
    sqlTargetServerID: devSecondarySQLServer.outputs.serverID
  }
}


// module devSQLServer 'modules/SQL Server/sqlServer.module.bicep' = if(deploydevSQLServer){
//   name: 'deploy-${devsqlServerName}'
//   scope: resourceGroup(resourceGroupNameDEV)
//   params: {
//     administratorLogin: devSQLServeradministratorLogin
//     administratorLoginUserName: devSQLServeradministratorLoginUserName
//     administratorsid: devSQLServeradministratorsid
//     administratortenantId: devSQLServeradministratortenantId
//     azureADOnlyAuthentication: devSQLServerazureADOnlyAuthentication
//     location: location
//     sqlServerName: devsqlServerName
//   }
// }

// param devFailOverGroupName string
// param deploydevFailOverGroup bool

// module sqlServerFailOverModule 'modules/SQL Server/sqlServerFailover.module.bicep' = if(deploydevFailOverGroup){
//   name: 'deploy-${devFailOverGroupName}'
//   scope: resourceGroup(resourceGroupNameDEV)
//   params: {
//     primaryDBName: devSQLDB.outputs.primaryDBID
//     sqlPartnerServerID: devSecondarySQLServer.outputs.serverID
//     sqlServerFailOverGroupName: '${devsqlServerName}/${devsqlServerName}devsecondaryservergroup'
//     sqlTargetServerID: devSecondarySQLServer.outputs.serverID
//     // secondaryDBName: devSQLSecondaryDB.outputs.secondaryDBID
//   }
// }

param devdbMaxSize int
param devskuCapacity int
param devskuName string
param devskuTier string
param deploydevDB bool

module devSQLDB 'modules/SQL Database/sqlDB.module.bicep' = if(deploydevDB){
  name: 'deploy-${devsqlServerName}db'
  scope: resourceGroup(resourceGroupNameDEV)
  params: {
    dbMaxSize: devdbMaxSize
    location: location
    sqlDBName: '${devsqlServerName}/${devsqlServerName}db'
    skuCapacity: devskuCapacity
    skuName: devskuName
    skuTier: devskuTier
  }
}

//dev secondary server

param devSecondarySQLServerName string
param devSecondarySQLServerLocation string
param deploydevSecondaryServer bool
param resourceGroupNameDEV string
param devSecondarySQLServeradministratorLogin string

module devSecondarySQLServer 'modules/SQL Server/sqlServer.module.bicep' = if(deploydevSecondaryServer){
  name: 'deploy-${devSecondarySQLServerName}'
  scope: resourceGroup(resourceGroupNameDEV)
  params: {
    administratorLogin: devSecondarySQLServeradministratorLogin
    administratorLoginUserName: devSQLServeradministratorLoginUserName
    administratorsid: devSQLServeradministratorsid
    administratortenantId: devSQLServeradministratortenantId
    azureADOnlyAuthentication: devSQLServerazureADOnlyAuthentication
    location: devSecondarySQLServerLocation
    sqlServerName: devSecondarySQLServerName
  }
}

//uat SQL Server

param uatSQLServeradministratorLogin string
param uatSQLServeradministratorLoginUserName string
param uatSQLServeradministratorsid string
param uatSQLServeradministratortenantId string
param uatSQLServerazureADOnlyAuthentication bool
param uatsqlServerName string
param deployuatSQLServerWithFailOverGroup bool
// param devvulnerabilityAssessments_Default_storageContainerPath string

param uatsqlServerFailOverGroupName string
module uatSQLServerWithFailOverModule 'modules/SQL Server/sqlServerWithFailover.module.bicep' = if(deployuatSQLServerWithFailOverGroup){
  name: 'deploy-${uatsqlServerFailOverGroupName}'
  params: {
    administratorLogin: uatSQLServeradministratorLogin
    administratorLoginUserName: uatSQLServeradministratorLoginUserName
    administratorsid: uatSQLServeradministratorsid
    administratortenantId: uatSQLServeradministratortenantId
    azureADOnlyAuthentication: uatSQLServerazureADOnlyAuthentication
    location: location
    primaryDBName: uatSQLDB.outputs.primaryDBID
    sqlPartnerServerID: uatSecondarySQLServer.outputs.serverID
    sqlServerFailOverGroupName: '${uatsqlServerName}/${uatsqlServerName}devsecondaryservergroup'
    sqlServerName: uatsqlServerName
    sqlTargetServerID: uatSecondarySQLServer.outputs.serverID
  }
}

// module uatSQLServer 'modules/SQL Server/sqlServer.module.bicep' = if(deployuatSQLServer){
//   name: 'deploy-${uatsqlServerName}'
//   scope: resourceGroup(uatResourceGroup)
//   params: {
//     administratorLogin: uatSQLServeradministratorLogin
//     administratorLoginUserName: uatSQLServeradministratorLoginUserName
//     administratorsid: uatSQLServeradministratorsid
//     administratortenantId: uatSQLServeradministratortenantId
//     azureADOnlyAuthentication: uatSQLServerazureADOnlyAuthentication
//     location: location
//     sqlServerName: uatsqlServerName
//   }
// }



// param uatFailOverGroupName string
// param uatFailoverGroup bool


// module uatsqlServerFailOverGroup 'modules/SQL Server/sqlServerFailover.module.bicep' = if(uatFailoverGroup){
//   name: 'deploy-${uatFailOverGroupName}'
//   scope: resourceGroup(uatResourceGroup)
//   params: {
//     primaryDBName: uatSQLDB.outputs.primaryDBID
//     sqlPartnerServerID: uatSecondarySQLServer.outputs.serverID
//     sqlServerFailOverGroupName: '${uatsqlServerName}/${uatsqlServerName}secondaryservergroup'
//     sqlTargetServerID: uatSecondarySQLServer.outputs.serverID
//   }
// }

param uatdbMaxSize int
param uatskuCapacity int
param uatskuName string
param uatskuTier string
param deployuatDB bool

module uatSQLDB 'modules/SQL Database/sqlDB.module.bicep' = if(deployuatDB){
  name: 'deploy-${uatsqlServerName}db'
  scope: resourceGroup(uatResourceGroup)
  params: {
    dbMaxSize: uatdbMaxSize
    location: location
    sqlDBName: '${uatsqlServerName}/mcapshelpuat'
    skuCapacity: uatskuCapacity
    skuName: uatskuName
    skuTier: uatskuTier
  }
}

//uat secondary server

param uatSecondarySQLServerName string
param uatSecondarySQLServerLocation string
param deployuatSecondaryServer bool
param uatResourceGroup string

module uatSecondarySQLServer 'modules/SQL Server/sqlServer.module.bicep' = if(deployuatSecondaryServer){
  name: 'deploy-${uatSecondarySQLServerName}'
  scope: resourceGroup(uatResourceGroup)
  params: {
    administratorLogin: uatSQLServeradministratorLogin
    administratorLoginUserName: uatSQLServeradministratorLoginUserName
    administratorsid: uatSQLServeradministratorsid
    administratortenantId: uatSQLServeradministratortenantId
    azureADOnlyAuthentication: uatSQLServerazureADOnlyAuthentication
    location: uatSecondarySQLServerLocation
    sqlServerName: uatSecondarySQLServerName
  }
}
















