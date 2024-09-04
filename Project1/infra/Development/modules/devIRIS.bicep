param serverfarms_ASP_RGMCAPSHELPDEVIRISAPI_9aca_name string
param location string

resource serverfarms_ASP_RGMCAPSHELPDEVIRISAPI_9aca_name_resource 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: serverfarms_ASP_RGMCAPSHELPDEVIRISAPI_9aca_name
  location: location
  sku: {
    name: 'P0v3'
    tier: 'Premium0V3'
    size: 'P0v3'
    family: 'Pv3'
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

//API App

param sites_mcapshelpexternalapidev_name string
param serverfarms_ASP_RGMCAPSHELPDEVIRISAPI_9aca_externalid string
resource sites_mcapshelpexternalapidev_name_resource 'Microsoft.Web/sites@2023-01-01' = {
  name: sites_mcapshelpexternalapidev_name
  location: location
  kind: 'api'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${sites_mcapshelpexternalapidev_name}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${sites_mcapshelpexternalapidev_name}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: serverfarms_ASP_RGMCAPSHELPDEVIRISAPI_9aca_externalid
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

resource sites_mcapshelpexternalapidev_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_mcapshelpexternalapidev_name_resource
  name: 'ftp'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_mcapshelpexternalapidev_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_mcapshelpexternalapidev_name_resource
  name: 'scm'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_mcapshelpexternalapidev_name_web 'Microsoft.Web/sites/config@2023-01-01' = {
  parent: sites_mcapshelpexternalapidev_name_resource
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
    netFrameworkVersion: 'v6.0'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    httpLoggingEnabled: false
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: false
    publishingUsername: '$mcapshelpexternalapidev'
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
        'https://localhost:3000'
        'https://mcapshelpdev.microsoft.com'
      ]
      supportCredentials: true
    }
    localMySqlEnabled: false
    managedServiceIdentityId: 11104
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

resource sites_mcapshelpexternalapidev_name_sites_mcapshelpexternalapidev_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
  parent: sites_mcapshelpexternalapidev_name_resource
  name: '${sites_mcapshelpexternalapidev_name}.azurewebsites.net'
  // location: 'East US'
  properties: {
    siteName: 'mcapshelpexternalapidev'
    hostNameType: 'Verified'
  }
}

//application insights
param components_mcapshelpexternalapidev_name string
param workspaces_DefaultWorkspace_dbe10480_e093_4f44_a29c_e69c0f44c583_EUS_externalid string

resource components_mcapshelpexternalapidev_name_resource 'microsoft.insights/components@2020-02-02' = {
  name: components_mcapshelpexternalapidev_name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaWebAppExtensionCreate'
    RetentionInDays: 90
    WorkspaceResourceId: workspaces_DefaultWorkspace_dbe10480_e093_4f44_a29c_e69c0f44c583_EUS_externalid
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource components_mcapshelpexternalapidev_name_degradationindependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'degradationindependencyduration'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'degradationindependencyduration'
      DisplayName: 'Degradation in dependency duration'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_degradationinserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'degradationinserverresponsetime'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'degradationinserverresponsetime'
      DisplayName: 'Degradation in server response time'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_digestMailConfiguration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'digestMailConfiguration'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'digestMailConfiguration'
      DisplayName: 'Digest Mail Configuration'
      Description: 'This rule describes the digest mail preferences'
      HelpUrl: 'www.homail.com'
      IsHidden: true
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_extension_billingdatavolumedailyspikeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'extension_billingdatavolumedailyspikeextension'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'extension_billingdatavolumedailyspikeextension'
      DisplayName: 'Abnormal rise in daily data volume (preview)'
      Description: 'This detection rule automatically analyzes the billing data generated by your application, and can warn you about an unusual increase in your application\'s billing costs'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/tree/master/SmartDetection/billing-data-volume-daily-spike.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_extension_canaryextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'extension_canaryextension'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'extension_canaryextension'
      DisplayName: 'Canary extension'
      Description: 'Canary extension'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/'
      IsHidden: true
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_extension_exceptionchangeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'extension_exceptionchangeextension'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'extension_exceptionchangeextension'
      DisplayName: 'Abnormal rise in exception volume (preview)'
      Description: 'This detection rule automatically analyzes the exceptions thrown in your application, and can warn you about unusual patterns in your exception telemetry.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/abnormal-rise-in-exception-volume.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_extension_memoryleakextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'extension_memoryleakextension'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'extension_memoryleakextension'
      DisplayName: 'Potential memory leak detected (preview)'
      Description: 'This detection rule automatically analyzes the memory consumption of each process in your application, and can warn you about potential memory leaks or increased memory consumption.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/tree/master/SmartDetection/memory-leak.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_extension_securityextensionspackage 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'extension_securityextensionspackage'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'extension_securityextensionspackage'
      DisplayName: 'Potential security issue detected (preview)'
      Description: 'This detection rule automatically analyzes the telemetry generated by your application and detects potential security issues.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/application-security-detection-pack.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_extension_traceseveritydetector 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'extension_traceseveritydetector'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'extension_traceseveritydetector'
      DisplayName: 'Degradation in trace severity ratio (preview)'
      Description: 'This detection rule automatically analyzes the trace logs emitted from your application, and can warn you about unusual patterns in the severity of your trace telemetry.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/degradation-in-trace-severity-ratio.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_longdependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'longdependencyduration'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'longdependencyduration'
      DisplayName: 'Long dependency duration'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_migrationToAlertRulesCompleted 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'migrationToAlertRulesCompleted'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'migrationToAlertRulesCompleted'
      DisplayName: 'Migration To Alert Rules Completed'
      Description: 'A configuration that controls the migration state of Smart Detection to Smart Alerts'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: true
      IsEnabledByDefault: false
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: false
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_slowpageloadtime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'slowpageloadtime'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'slowpageloadtime'
      DisplayName: 'Slow page load time'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_mcapshelpexternalapidev_name_slowserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpexternalapidev_name_resource
  name: 'slowserverresponsetime'
  location: location
  properties: {
    RuleDefinitions: {
      Name: 'slowserverresponsetime'
      DisplayName: 'Slow server response time'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

//KeyVault
param vaults_MCAPSHelpExtKeyVaultDev_name string = 'MCAPSHelpExtKeyVaultDev'
param keyvaultLocation string = 'South Central US'

resource vaults_MCAPSHelpExtKeyVaultDev_name_resource 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: vaults_MCAPSHelpExtKeyVaultDev_name
  location: keyvaultLocation
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Allow'
      ipRules: [
        {
          value: '20.121.240.140/32'
        }
        {
          value: '20.121.241.76/32'
        }
        {
          value: '20.121.246.169/32'
        }
        {
          value: '20.121.247.253/32'
        }
        {
          value: '20.242.129.48/32'
        }
        {
          value: '20.242.129.171/32'
        }
        {
          value: '20.242.134.229/32'
        }
        {
          value: '20.242.135.6/32'
        }
        {
          value: '20.242.135.30/32'
        }
        {
          value: '20.242.135.49/32'
        }
        {
          value: '20.242.135.56/32'
        }
        {
          value: '20.242.135.151/32'
        }
        {
          value: '20.242.135.173/32'
        }
        {
          value: '20.242.135.180/32'
        }
        {
          value: '4.157.112.10/32'
        }
        {
          value: '4.157.112.14/32'
        }
        {
          value: '4.157.112.41/32'
        }
        {
          value: '4.157.112.164/32'
        }
        {
          value: '20.242.130.82/32'
        }
        {
          value: '20.242.130.210/32'
        }
        {
          value: '20.242.131.147/32'
        }
        {
          value: '20.242.131.231/32'
        }
        {
          value: '20.242.132.119/32'
        }
        {
          value: '20.242.132.144/32'
        }
        {
          value: '20.242.132.174/32'
        }
        {
          value: '20.242.132.183/32'
        }
        {
          value: '20.242.133.50/32'
        }
        {
          value: '20.242.133.59/32'
        }
        {
          value: '20.242.133.90/32'
        }
        {
          value: '20.242.133.143/32'
        }
        {
          value: '20.242.133.165/32'
        }
        {
          value: '20.242.134.68/32'
        }
        {
          value: '20.242.134.114/32'
        }
        {
          value: '20.242.134.135/32'
        }
        {
          value: '20.242.134.136/32'
        }
        {
          value: '20.242.134.173/32'
        }
        {
          value: '20.119.8.54/32'
        }
        {
          value: '4.157.113.125/32'
        }
        {
          value: '4.157.113.123/32'
        }
        {
          value: '4.157.113.106/32'
        }
        {
          value: '4.157.112.217/32'
        }
        {
          value: '4.157.112.186/32'
        }
        {
          value: '4.157.112.174/32'
        }
      ]
      virtualNetworkRules: []
    }
    accessPolicies: []
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: false
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enableRbacAuthorization: true
    vaultUri: 'https://mcapshelpextkeyvaultdev.vault.azure.net/'
    provisioningState: 'Succeeded'
    publicNetworkAccess: 'Enabled'
  }
}

//Search Service
param searchServices_mcapshelpsearchdev_name string = 'mcapshelpsearchdev'
param searchServiceLocation string = 'South Central US'

resource searchServices_mcapshelpsearchdev_name_resource 'Microsoft.Search/searchServices@2023-11-01' = {
  name: searchServices_mcapshelpsearchdev_name
  location: searchServiceLocation
  sku: {
    name: 'standard'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    replicaCount: 2
    partitionCount: 1
    hostingMode: 'default'
    publicNetworkAccess: 'enabled'
    networkRuleSet: {
      ipRules: []
    }
    encryptionWithCmk: {
      enforcement: 'Unspecified'
    }
    disableLocalAuth: false
    authOptions: {
      apiKeyOnly: {}
    }
    semanticSearch: 'disabled'
  }
}


//SQL Server
@secure()
param vulnerabilityAssessments_Default_storageContainerPath string
param servers_mcapshelpexternal_name string = 'mcapshelpexternal'
param serverLocation string = 'South Central US'

resource servers_mcapshelpexternal_name_resource 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: servers_mcapshelpexternal_name
  location: serverLocation
  kind: 'v12.0'
  properties: {
    administratorLogin: 'CloudSAfb6f46ed'
    version: '12.0'
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
    administrators: {
      administratorType: 'ActiveDirectory'
      principalType: 'Group'
      login: 'MxpaCatSrvice@microsoft.com'
      sid: '71414682-3274-4ada-86a4-16e5e10dbb77'
      tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
      azureADOnlyAuthentication: true
    }
    restrictOutboundNetworkAccess: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_ActiveDirectory 'Microsoft.Sql/servers/administrators@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ActiveDirectory'
  properties: {
    administratorType: 'ActiveDirectory'
    login: 'MxpaCatSrvice@microsoft.com'
    sid: '71414682-3274-4ada-86a4-16e5e10dbb77'
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
  }
}

resource servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/advancedThreatProtectionSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Default'
  properties: {
    state: 'Enabled'
  }
}

resource servers_mcapshelpexternal_name_CreateIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'CreateIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_DbParameterization 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'DbParameterization'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_DefragmentIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'DefragmentIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_DropIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'DropIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_ForceLastGoodPlan 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ForceLastGoodPlan'
  properties: {
    autoExecuteValue: 'Enabled'
  }
}

resource Microsoft_Sql_servers_auditingPolicies_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/auditingPolicies@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Default'
  // location: serverLocation
  properties: {
    auditingState: 'Disabled'
  }
}

resource Microsoft_Sql_servers_auditingSettings_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/auditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: [
      'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
      'FAILED_DATABASE_AUTHENTICATION_GROUP'
      'BATCH_COMPLETED_GROUP'
    ]
    isAzureMonitorTargetEnabled: true
    isManagedIdentityInUse: false
    state: 'Enabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource Microsoft_Sql_servers_azureADOnlyAuthentications_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/azureADOnlyAuthentications@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Default'
  properties: {
    azureADOnlyAuthentication: true
  }
}

resource Microsoft_Sql_servers_connectionPolicies_servers_mcapshelpexternal_name_default 'Microsoft.Sql/servers/connectionPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'default'
  // location: 'southcentralus'
  properties: {
    connectionType: 'Default'
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: '${servers_mcapshelpexternal_name}data'
  location: serverLocation
  sku: {
    name: 'HS_PRMS'
    tier: 'Hyperscale'
    family: 'PRMS'
    capacity: 2
  }
  kind: 'v12.0,user,vcore,hyperscale'
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: -1
    catalogCollation: 'SQL_Latin1_General_CP1_CI_AS'
    zoneRedundant: false
    licenseType: 'LicenseIncluded'
    readScale: 'Disabled'
    highAvailabilityReplicaCount: 0
    requestedBackupStorageRedundancy: 'Local'
    maintenanceConfigurationId: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default'
    isLedgerOn: false
    availabilityZone: 'NoPreference'
  }
}

resource servers_mcapshelpexternal_name_master_Default 'Microsoft.Sql/servers/databases/advancedThreatProtectionSettings@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Default'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_auditingPolicies_servers_mcapshelpexternal_name_master_Default 'Microsoft.Sql/servers/databases/auditingPolicies@2014-04-01' = {
  name: '${servers_mcapshelpexternal_name}/master/Default'
  // location: serverLocation
  properties: {
    auditingState: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_auditingSettings_servers_mcapshelpexternal_name_master_Default 'Microsoft.Sql/servers/databases/auditingSettings@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_extendedAuditingSettings_servers_mcapshelpexternal_name_master_Default 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_geoBackupPolicies_servers_mcapshelpexternal_name_master_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Default'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource servers_mcapshelpexternal_name_master_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Current'
  properties: {}
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_securityAlertPolicies_servers_mcapshelpexternal_name_master_Default 'Microsoft.Sql/servers/databases/securityAlertPolicies@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Default'
  properties: {
    state: 'Disabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: [
      ''
    ]
    emailAccountAdmins: false
    retentionDays: 0
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_transparentDataEncryption_servers_mcapshelpexternal_name_master_Current 'Microsoft.Sql/servers/databases/transparentDataEncryption@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Current'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_vulnerabilityAssessments_servers_mcapshelpexternal_name_master_Default 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2023-05-01-preview' = {
  name: '${servers_mcapshelpexternal_name}/master/Default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
      emails: []
    }
  }
  dependsOn: [
    servers_mcapshelpexternal_name_resource
  ]
}

resource Microsoft_Sql_servers_devOpsAuditingSettings_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/devOpsAuditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Default'
  properties: {
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource servers_mcapshelpexternal_name_current 'Microsoft.Sql/servers/encryptionProtector@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'current'
  kind: 'servicemanaged'
  properties: {
    serverKeyName: 'ServiceManaged'
    serverKeyType: 'ServiceManaged'
    autoRotationEnabled: false
  }
}

resource Microsoft_Sql_servers_extendedAuditingSettings_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/extendedAuditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: [
      'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
      'FAILED_DATABASE_AUTHENTICATION_GROUP'
      'BATCH_COMPLETED_GROUP'
    ]
    isAzureMonitorTargetEnabled: true
    isManagedIdentityInUse: false
    state: 'Enabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource servers_mcapshelpexternal_name_abh 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'abh'
}

resource servers_mcapshelpexternal_name_AllowAllWindowsAzureIps 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'AllowAllWindowsAzureIps'
}

resource servers_mcapshelpexternal_name_Amit 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Amit'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_01_22_06_56_51 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-01-22_06:56:51'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_01_24_09_46_45 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-01-24_09:46:45'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_01_25_08_37_44 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-01-25_08:37:44'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_01_25_08_38_34 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-01-25_08:38:34'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_01_29_04_56_23 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-01-29_04:56:23'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_01_31_08_23_43 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-01-31_08:23:43'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_02_02_10_15_37 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-02-02_10:15:37'
}

resource servers_mcapshelpexternal_name_ClientIPAddress_2024_02_05_11_10_56 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ClientIPAddress_2024-02-05_11:10:56'
}

resource servers_mcapshelpexternal_name_neeraj 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'neeraj'
}

resource servers_mcapshelpexternal_name_query_editor_508d78 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-508d78'
}

resource servers_mcapshelpexternal_name_query_editor_5a8c85 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-5a8c85'
}

resource servers_mcapshelpexternal_name_query_editor_84663c 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-84663c'
}

resource servers_mcapshelpexternal_name_query_editor_a49deb 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-a49deb'
}

resource servers_mcapshelpexternal_name_query_editor_a88747 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-a88747'
}

resource servers_mcapshelpexternal_name_query_editor_ab698c 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-ab698c'
}

resource servers_mcapshelpexternal_name_query_editor_c8da3b 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-c8da3b'
}

resource servers_mcapshelpexternal_name_query_editor_cf2d3c 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-cf2d3c'
}

resource servers_mcapshelpexternal_name_query_editor_d3b86b 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-d3b86b'
}

resource servers_mcapshelpexternal_name_query_editor_e19f6b 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-e19f6b'
}

resource servers_mcapshelpexternal_name_query_editor_f36022 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'query-editor-f36022'
}

resource servers_mcapshelpexternal_name_ServiceManaged 'Microsoft.Sql/servers/keys@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'ServiceManaged'
  kind: 'servicemanaged'
  properties: {
    serverKeyType: 'ServiceManaged'
  }
}

resource Microsoft_Sql_servers_securityAlertPolicies_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/securityAlertPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Default'
  properties: {
    state: 'Enabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: [
      ''
    ]
    emailAccountAdmins: false
    retentionDays: 0
  }
}

resource Microsoft_Sql_servers_sqlVulnerabilityAssessments_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/sqlVulnerabilityAssessments@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Default'
  properties: {
    state: 'Enabled'
  }
}

resource Microsoft_Sql_servers_vulnerabilityAssessments_servers_mcapshelpexternal_name_Default 'Microsoft.Sql/servers/vulnerabilityAssessments@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: 'Default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
    }
    storageContainerPath: vulnerabilityAssessments_Default_storageContainerPath
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/advancedThreatProtectionSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'Default'
  properties: {
    state: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_CreateIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'CreateIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_DbParameterization 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'DbParameterization'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_DefragmentIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'DefragmentIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_DropIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'DropIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_ForceLastGoodPlan 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'ForceLastGoodPlan'
  properties: {
    autoExecuteValue: 'Enabled'
  }
}

resource Microsoft_Sql_servers_databases_auditingPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/auditingPolicies@2014-04-01' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'Default'
  location: 'South Central US'
  properties: {
    auditingState: 'Disabled'
  }
}

resource Microsoft_Sql_servers_databases_auditingSettings_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/auditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource Microsoft_Sql_servers_databases_backupLongTermRetentionPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_default 'Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'default'
  properties: {
    makeBackupsImmutable: false
    backupStorageAccessTier: 'Hot'
    weeklyRetention: 'PT0S'
    monthlyRetention: 'PT0S'
    yearlyRetention: 'PT0S'
    weekOfYear: 0
  }
}

resource Microsoft_Sql_servers_databases_backupShortTermRetentionPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_default 'Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'default'
  properties: {
    retentionDays: 7
  }
}

resource Microsoft_Sql_servers_databases_extendedAuditingSettings_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource Microsoft_Sql_servers_databases_geoBackupPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'Default'
  properties: {
    state: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'Current'
  properties: {}
}

resource Microsoft_Sql_servers_databases_securityAlertPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/securityAlertPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'Default'
  properties: {
    state: 'Disabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: [
      ''
    ]
    emailAccountAdmins: false
    retentionDays: 0
  }
}

resource Microsoft_Sql_servers_databases_transparentDataEncryption_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Current 'Microsoft.Sql/servers/databases/transparentDataEncryption@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'Current'
  properties: {
    state: 'Enabled'
  }
}

resource Microsoft_Sql_servers_databases_vulnerabilityAssessments_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data
  name: 'Default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
      emails: []
    }
  }
}

//SQL Database

param mcapshelpexternalDB string = 'mcapshelpexternal'

resource servers_mcapshelpexternal 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  name: '${mcapshelpexternalDB}/${mcapshelpexternalDB}data'
  location: 'southcentralus'
  sku: {
    name: 'HS_PRMS'
    tier: 'Hyperscale'
    family: 'PRMS'
    capacity: 2
  }
  kind: 'v12.0,user,vcore,hyperscale'
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: -1
    catalogCollation: 'SQL_Latin1_General_CP1_CI_AS'
    zoneRedundant: false
    licenseType: 'LicenseIncluded'
    readScale: 'Disabled'
    highAvailabilityReplicaCount: 0
    requestedBackupStorageRedundancy: 'Local'
    maintenanceConfigurationId: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default'
    isLedgerOn: false
    availabilityZone: 'NoPreference'
  }
}

resource servers_mcapshelpexternal_default 'Microsoft.Sql/servers/databases/advancedThreatProtectionSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'Default'
  properties: {
    state: 'Disabled'
  }
}

resource servers_mcapshelpexternal_createIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal
  name: 'CreateIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_DbParameterization 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal
  name: 'DbParameterization'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_defragmentation 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal
  name: 'DefragmentIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_DropIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal
  name: 'DropIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelpexternal_ForceLastGoodPlan 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelpexternal
  name: 'ForceLastGoodPlan'
  properties: {
    autoExecuteValue: 'Enabled'
  }
}

resource servers_mcapshelpexternal_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/auditingPolicies@2014-04-01' = {
  parent: servers_mcapshelpexternal
  name: 'Default'
  // location: 'South Central US'
  properties: {
    auditingState: 'Disabled'
  }
}

resource servers_mcapshelpexternal_auditingSettings 'Microsoft.Sql/servers/databases/auditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource servers_mcapshelpexternal_backupLongTermRetentionPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_default 'Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'default'
  properties: {
    makeBackupsImmutable: false
    backupStorageAccessTier: 'Hot'
    weeklyRetention: 'PT0S'
    monthlyRetention: 'PT0S'
    yearlyRetention: 'PT0S'
    weekOfYear: 0
  }
}

resource servers_mcapshelpexternal_backupShortTermRetentionPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_default 'Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'default'
  properties: {
    retentionDays: 7
  }
}

resource servers_mcapshelpexternal_extendedAuditingSettings_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource servers_mcapshelpexternal_geoBackupPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'Default'
  properties: {
    state: 'Disabled'
  }
}

resource servers_mcapshelpexternal_name_data_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'Current'
  properties: {}
}

resource servers_mcapshelpexternal_SecurityPolicy 'Microsoft.Sql/servers/databases/securityAlertPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'Default'
  properties: {
    state: 'Disabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: [
      ''
    ]
    emailAccountAdmins: false
    retentionDays: 0
  }
}

resource servers_mcapshelpexternal_transparentDataEncryption 'Microsoft.Sql/servers/databases/transparentDataEncryption@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'Current'
  properties: {
    state: 'Enabled'
  }
}

resource servers_mcapshelpexternal_VulnerabilityAssesment 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal
  name: 'Default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
      emails: []
    }
  }
}

