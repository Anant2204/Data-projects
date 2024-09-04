param logicAppName string
param LogicAppServicePlanID string 
param location string

resource sites_ChangeTriggerServiceRequestSync_name_resource 'Microsoft.Web/sites@2023-01-01' = {
  name: logicAppName
  location: location
  tags: {
    'hidden-link: /app-insights-resource-id': '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Insights/components/ChangeTriggerServiceRequestSync'
  }
  kind: 'functionapp,workflowapp'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${logicAppName}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${logicAppName}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: LogicAppServicePlanID
    reserved: false
    isXenon: false
    hyperV: false
    vnetRouteAllEnabled: false
    vnetImagePullEnabled: false
    vnetContentShareEnabled: false
    siteConfig: {
      numberOfWorkers: 1
      acrUseManagedIdentityCreds: false
      alwaysOn: false
      http20Enabled: false
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 1
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: false
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    customDomainVerificationId: '9F9107B169DA2736F547049B0B61BFF109F9FBBD2279E5832E4F1160286751EE'
    containerSize: 1536
    dailyMemoryTimeQuota: 0
    httpsOnly: true
    redundancyMode: 'None'
    publicNetworkAccess: 'Enabled'
    storageAccountRequired: false
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

resource sites_ChangeTriggerServiceRequestSync_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_ChangeTriggerServiceRequestSync_name_resource
  name: 'ftp'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_ChangeTriggerServiceRequestSync_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_ChangeTriggerServiceRequestSync_name_resource
  name: 'scm'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_ChangeTriggerServiceRequestSync_name_web 'Microsoft.Web/sites/config@2023-01-01' = {
  parent: sites_ChangeTriggerServiceRequestSync_name_resource
  name: 'web'
  // location: 'South Central US'
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
    ]
    netFrameworkVersion: 'v6.0'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    httpLoggingEnabled: false
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: false
    publishingUsername: '$ChangeTriggerServiceRequestSync'
    scmType: 'None'
    use32BitWorkerProcess: false
    webSocketsEnabled: false
    alwaysOn: false
    managedPipelineMode: 'Integrated'
    virtualApplications: [
      {
        virtualPath: '/'
        physicalPath: 'site\\wwwroot'
        preloadEnabled: false
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
      supportCredentials: false
    }
    localMySqlEnabled: false
    managedServiceIdentityId: 29912
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
    preWarmedInstanceCount: 1
    functionAppScaleLimit: 0
    functionsRuntimeScaleMonitoringEnabled: true
    minimumElasticInstanceCount: 1
    azureStorageAccounts: {}
  }
}

resource sites_ChangeTriggerServiceRequestSync_name_sites_ChangeTriggerServiceRequestSync_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
  parent: sites_ChangeTriggerServiceRequestSync_name_resource
  name: '${logicAppName}.azurewebsites.net'
  // location: 'South Central US'
  properties: {
    siteName: logicAppName
    hostNameType: 'Verified'
  }
}


