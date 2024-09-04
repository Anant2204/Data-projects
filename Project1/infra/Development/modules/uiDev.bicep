//create app service plan, webapp & keyvault

@description('name of the development UI app service plan')
param devASPlan string

param pEnv bool

@description('location of the resources')
param location string

@description('name of the development UI app name')
param devUIApp string
param pSKUName string

resource serverfarms_ASP_RGMCAPSHELPDEV_87a4_name_resource 'Microsoft.Web/serverfarms@2023-01-01' = if (pEnv == true){
  name: devASPlan
  location: location
  sku: {
    name: pSKUName
    tier: 'Standard'
    size: 'S1'
    family: 'S'
    capacity: 1
  }
  kind: 'app'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

resource sites_mcapshelpdev_name_resource 'Microsoft.Web/sites@2023-01-01' = {
  name: devUIApp
  location: location
  kind: 'app'
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${devUIApp}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${devUIApp}.microsoft.com'
        sslState: 'SniEnabled'
        thumbprint: '14F5B72A5D3250252916E700E12C143CFC9CC332'
        hostType: 'Standard'
      }
      {
        name: '${devUIApp}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: serverfarms_ASP_RGMCAPSHELPDEV_87a4_name_resource.id
    reserved: false
    isXenon: false
    hyperV: false
    vnetRouteAllEnabled: false
    vnetImagePullEnabled: false
    vnetContentShareEnabled: false
    siteConfig: {
      numberOfWorkers: 1
      acrUseManagedIdentityCreds: false
      alwaysOn: true
      http20Enabled: false
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
      appSettings: []
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: true
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    customDomainVerificationId: '9F9107B169DA2736F547049B0B61BFF109F9FBBD2279E5832E4F1160286751EE'
    containerSize: 0
    dailyMemoryTimeQuota: 0
    httpsOnly: true
    redundancyMode: 'None'
    publicNetworkAccess: 'Enabled'
    storageAccountRequired: false
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

resource sites_mcapshelpdev_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_mcapshelpdev_name_resource
  name: 'ftp'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_mcapshelpdev_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_mcapshelpdev_name_resource
  name: 'scm'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_mcapshelpdev_name_web 'Microsoft.Web/sites/config@2023-01-01' = {
  parent: sites_mcapshelpdev_name_resource
  name: 'web'
  // location: location
  properties: {
    numberOfWorkers: 1
    defaultDocuments: [
      'Default.htm'
      'Default.html'
      'Default.asp'
      'index.htm'
      'index.html'
      'iisstart.htm'
      'default.aspx'
      'index.php'
      'hostingstart.html'
    ]
    netFrameworkVersion: 'v7.0'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    httpLoggingEnabled: false
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: false
    publishingUsername: '$mcapshelpdev'
    scmType: 'None'
    use32BitWorkerProcess: true
    webSocketsEnabled: false
    alwaysOn: true
    managedPipelineMode: 'Integrated'
    virtualApplications: [
      {
        virtualPath: '/'
        physicalPath: 'site\\wwwroot'
        preloadEnabled: true
      }
    ]
    loadBalancing: 'LeastRequests'
    experiments: {
      rampUpRules: []
    }
    autoHealEnabled: false
    vnetRouteAllEnabled: false
    vnetPrivatePortsCount: 0
    publicNetworkAccess: 'Enabled'
    cors: {
      allowedOrigins: [
        'https://mcapshelpapi.azurewebsites.net'
      ]
      supportCredentials: false
    }
    localMySqlEnabled: false
    ipSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 2147483647
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 2147483647
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictionsUseMain: false
    http20Enabled: false
    minTlsVersion: '1.2'
    scmMinTlsVersion: '1.2'
    ftpsState: 'FtpsOnly'
    preWarmedInstanceCount: 0
    elasticWebAppScaleLimit: 0
    functionsRuntimeScaleMonitoringEnabled: false
    minimumElasticInstanceCount: 0
    azureStorageAccounts: {}
  }
}

resource sites_mcapshelpdev_name_sites_mcapshelpdev_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
  parent: sites_mcapshelpdev_name_resource
  name: '${devUIApp}.azurewebsites.net'
  // location: location
  properties: {
    siteName: 'mcapshelpdev'
    hostNameType: 'Verified'
  }
}

resource sites_mcapshelpdev_name_sites_mcapshelpdev_name_microsoft_com 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
  parent: sites_mcapshelpdev_name_resource
  name: '${devUIApp}.microsoft.com'
  // location: location
  properties: {
    siteName: 'mcapshelpdev'
    hostNameType: 'Verified'
    sslState: 'SniEnabled'
    thumbprint: '14F5B72A5D3250252916E700E12C143CFC9CC332'
  }
}

output appServicePlanName string = serverfarms_ASP_RGMCAPSHELPDEV_87a4_name_resource.name
output uiWebAppName string = sites_mcapshelpdev_name_resource.name
