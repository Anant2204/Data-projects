
//UAT AFD
param uatAFDEndpoint string
param uatAFDRoute string
param uatApiURL string
param uatfrontdoorName string
param uatoriginGroup string
param uatSecurityPolicy string
param uatwafMode string
param uatwafPolicyName string
param resourceGroupNameAFD string
param deployUatAFDEndpoint bool
module uatFrontdoorEndpoint 'modules/Frontdoor/azureFrontDoor.module.bicep' = if(deployUatAFDEndpoint == true){
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


param location string
// param SQLServeradministratorLogin string
param SQLServeradministratorLoginUserName string
param SQLServeradministratorsid string
param SQLServeradministratortenantId string
param SQLServerazureADOnlyAuthentication bool
// param devSQLServerprimaryDBName string
param sqlServerName string
param deploySQLServerWithFailOverGroup bool
@secure()
// param administratorLoginPassword string
// param devvulnerabilityAssessments_Default_storageContainerPath string
param sqlServerFailOverGroupName string
module SQLServerWithFailOverModule 'modules/SQL Server/sqlServerWithFailover.module.bicep' = if(deploySQLServerWithFailOverGroup == true){
  name: 'deploy-${sqlServerFailOverGroupName}'
  scope: resourceGroup(resourceGroupName)
  params: {
    administratorLogin: SQLServeradministratorLoginUserName
    administratorsid: SQLServeradministratorsid
    administratortenantId: SQLServeradministratortenantId
    azureADOnlyAuthentication: SQLServerazureADOnlyAuthentication
    location: location
    primaryDBName: SQLDB.outputs.primaryDBID
    sqlPartnerServerID: SecondarySQLServer.outputs.serverID
    sqlServerFailOverGroupName: '${sqlServerName}/${sqlDBName}prodservergroup'
    sqlServerName: sqlServerName
    sqlTargetServerID: SecondarySQLServer.outputs.serverID
    // administratorLoginPassword: administratorLoginPassword
  }
}

param dbMaxSize int
param dbskuCapacity int
param dbskuName string
param dbskuTier string
param deployDB bool
param sqlDBName string
module SQLDB 'modules/SQL Database/sqlDB.module.bicep' = if(deployDB == true){
  name: 'deploy-${sqlDBName}'
  scope: resourceGroup(resourceGroupName)
  params: {
    dbMaxSize: dbMaxSize
    location: location
    sqlDBName: '${sqlServerName}/${sqlDBName}'
    skuCapacity: dbskuCapacity
    skuName: dbskuName
    skuTier: dbskuTier
  }
}
//dev secondary server
param SecondarySQLServerName string
param SecondarySQLServerLocation string
param deploySecondaryServer bool
param resourceGroupName string
param SecondarySQLServeradministratorLogin string

module SecondarySQLServer 'modules/SQL Server/sqlServer.module.bicep' = if(deploySecondaryServer == true){
  name: 'deploy-${SecondarySQLServerName}'
  scope: resourceGroup(resourceGroupName)
  params: {
    administratorLogin: SecondarySQLServeradministratorLogin
    administratorsid: SQLServeradministratorsid
    administratortenantId: SQLServeradministratortenantId
    azureADOnlyAuthentication: SQLServerazureADOnlyAuthentication
    location: SecondarySQLServerLocation
    sqlServerName: SecondarySQLServerName
    // administratorLoginPassword: administratorLoginPassword
  }
}
param eventGridTopicName string
param eventGridName string
param deployEventGridTopic bool
module eventGridTopic 'modules/Event Grid/eventgrid.module.bicep' = if(deployEventGridTopic == true){
  name: 'deploy-${eventGridName}'
  params: {
    eventGridTopicName: eventGridTopicName
    location: location
  }
}
param logicAppName string
param deploylogicApp bool

module logicApp 'modules/Logic app/logicapp.module.bicep' = if(deploylogicApp == true){
  name: 'deploy-${logicAppName}'
  scope: resourceGroup(resourceGroupName)
  params: {
    location: location
    logicAppName: logicAppName
  }
}

param appServicePlanElasticScale bool
param appServicePlanFamily string
param appServicePlanKind string
param appServicePlanMinWorkerCount int
param appServicePlanSize string
param appServicePlanTier string
param ASPlan string
param pSKUName string
param deployAzureAppService bool
module azureAppService 'modules/App Service/AppServicePlan.module.bicep' = if(deployAzureAppService == true){
  name: 'deploy-${ASPlan}'
  scope: resourceGroup(resourceGroupName)
  params: {
    appServicePlanElasticScale: appServicePlanElasticScale
    appServicePlanFamily: appServicePlanFamily
    appServicePlanKind: appServicePlanKind
    appServicePlanMinWorkerCount: appServicePlanMinWorkerCount
    appServicePlanSize: appServicePlanSize
    appServicePlanTier: appServicePlanTier
    ASPlan: ASPlan
    location: location
    pSKUName: pSKUName
  }
}
param webAppName string
param webAppKind string
param allowedCors array
param deployazureWebApp bool
module azureWebApp 'modules/Azure WebApp/webapp.module.bicep' = if(deployazureWebApp == true){
  name: 'deploy-${webAppName}'
  scope: resourceGroup(resourceGroupName)
  params: {
    allowedCors: allowedCors
    appServicePlanID: azureAppService.outputs.appServicePlanId
    location: location
    webAppKind: webAppKind
    webAppName: webAppName
  }
}

param deployazureCDN bool
param cdnProfileName string
param prodcdnEndpoint string
param cdnResourceGroupName string

module azureCDN 'modules/Azure CDN/azureCDN.module.bicep' = if(deployazureCDN == true){
  name: 'deploy-${cdnProfileName}'
  scope: resourceGroup(cdnResourceGroupName)
  params: {
    cdnProfileName: cdnProfileName
    originUrl: storageAccount.outputs.storageAccountEndpoint
    prodcdnEndpoint: prodcdnEndpoint
  }
}

param deploystorageAccount bool
param storageAccountName string


module storageAccount 'modules/Storage Account/cdnStorageAccount.bicep' = if(deploystorageAccount == true){
  name: 'deploy-${storageAccountName}'
  scope: resourceGroup(cdnResourceGroupName)
  params: {
    storageAccountName: storageAccountName
  }
}
