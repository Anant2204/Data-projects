param serverfarms_ASP_RGMCAPSHELPPROD string
param location string = 'southcentralus'
param ProdWebAPI string
// param serverfarms_ASP_RGMCAPSHELPDEV_87a4_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/serverfarms/ASP-RGMCAPSHELPDEV-87a4'
param vaults_MCAPSHELPKeyVaultDEV_name string = 'MCAPSHELPKeyVault'
// param server_mcapshelp_name string

// AppServicePlan - Dev
resource serverfarms_ASP_RGMCAPSHELPDEV_87a4_name_resource 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: serverfarms_ASP_RGMCAPSHELPPROD
  location: location
  sku: {
    name: 'S1'
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

// WebAPI - Dev

resource sites_MCAPSHELPDEVAPI_name_resource 'Microsoft.Web/sites@2023-01-01' = {
  name: ProdWebAPI
  location: location
  kind: 'app'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: 'mcapshelpprodapi.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: 'mcapshelpprodapi.scm.azurewebsites.net'
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

resource sites_MCAPSHELPDEVAPI_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_MCAPSHELPDEVAPI_name_resource
  name: 'ftp'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_MCAPSHELPDEVAPI_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_MCAPSHELPDEVAPI_name_resource
  name: 'scm'
  // location: location
  properties: {
    allow: false
  }
}

resource sites_MCAPSHELPDEVAPI_name_web 'Microsoft.Web/sites/config@2023-01-01' = {
  parent: sites_MCAPSHELPDEVAPI_name_resource
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
    requestTracingEnabled: true
    requestTracingExpirationTime: '9999-12-31T23:59:00Z'
    remoteDebuggingEnabled: false
    httpLoggingEnabled: false
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: true
    publishingUsername: '$MCAPSHELPDEVAPI'
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
        'https://mcapshelp.azurewebsites.net'
        'https://mcapshelp.microsoft.com'
      ]
      supportCredentials: false
    }
    localMySqlEnabled: false
    managedServiceIdentityId: 29123
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

resource sites_MCAPSHELPDEVAPI_name_sites_MCAPSHELPDEVAPI_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
  parent: sites_MCAPSHELPDEVAPI_name_resource
  name: '${ProdWebAPI}.azurewebsites.net'
  // location: location
  properties: {
    siteName: 'MCAPSHELPPRODAPI'
    hostNameType: 'Verified'
  }
}

// SQL Server
@secure()
param prodadministratorLoginPassword string
// param vulnerabilityAssessments_Default_storageContainerPath string = 'https://rgmcapshelpdev870d.blob.core.windows.net/mcapshelpblob'
param servers_mcapshelp_name string = 'mcapshelpserver'
resource servers_mcapshelp_name_resource 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: servers_mcapshelp_name
  location: location
  // kind: 'v12.0'
  properties: {
    administratorLogin: 'CloudSA0ca42751'
    administratorLoginPassword: prodadministratorLoginPassword
    version: '12.0'
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
    restrictOutboundNetworkAccess: 'Disabled'
  }
}

resource servers_mcapshelp_name_ActiveDirectory 'Microsoft.Sql/servers/administrators@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'ActiveDirectory'
  properties: {
    administratorType: 'ActiveDirectory'
    login: 'mxpacatsrvice@microsoft.com'
    sid: '71414682-3274-4ada-86a4-16e5e10dbb77'
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
  }
}

resource advancedThreatProtection 'Microsoft.Sql/servers/advancedThreatProtectionSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    state: 'Enabled'
  }
}

//SQL DB-Dev

param server_mcapshelp_name string = 'mcapshelpdb'

resource databaseName 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: server_mcapshelp_name
  location: 'southcentralus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 50
  }
}


// Application Insights for UI - Dev
param components_mcapshelpdev_name string = 'mcapshelpui'
// param workspaces_DefaultWorkspace_dbe10480_e093_4f44_a29c_e69c0f44c583_CUS_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/DefaultResourceGroup-CUS/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-28367f8b-80f4-4eb1-a833-88a7108ea20e-SCUS'

resource components_mcapshelpdev_name_resource 'microsoft.insights/components@2020-02-02' = {
  name: components_mcapshelpdev_name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaWebAppExtensionCreate'
    RetentionInDays: 90
    // WorkspaceResourceId: workspaces_DefaultWorkspace_dbe10480_e093_4f44_a29c_e69c0f44c583_CUS_externalid
    // IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource components_mcapshelpdev_name_degradationindependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_degradationinserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_digestMailConfiguration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_extension_billingdatavolumedailyspikeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_extension_canaryextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_extension_exceptionchangeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_extension_memoryleakextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_extension_securityextensionspackage 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_extension_traceseveritydetector 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_longdependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_migrationToAlertRulesCompleted 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_slowpageloadtime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

resource components_mcapshelpdev_name_slowserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_mcapshelpdev_name_resource
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

// Application Insights for WebAPI - PROD

param components_MCAPSHELPDEVAPI_name string = 'mcapshelpapi'
// param workspaces_DefaultWorkspace_dbe10480_e093_4f44_a29c_e69c0f44c583_SCUS_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/DefaultResourceGroup-SCUS/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-28367f8b-80f4-4eb1-a833-88a7108ea20e-SCUS'

resource components_MCAPSHELPDEVAPI_name_resource 'microsoft.insights/components@2020-02-02' = {
  name: components_MCAPSHELPDEVAPI_name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaWebAppExtensionCreate'
    RetentionInDays: 90
    // WorkspaceResourceId: workspaces_DefaultWorkspace_dbe10480_e093_4f44_a29c_e69c0f44c583_SCUS_externalid
    // IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource components_MCAPSHELPDEVAPI_name_degradationindependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_degradationinserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_digestMailConfiguration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_extension_billingdatavolumedailyspikeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_extension_canaryextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_extension_exceptionchangeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_extension_memoryleakextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_extension_securityextensionspackage 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_extension_traceseveritydetector 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_longdependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_migrationToAlertRulesCompleted 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_slowpageloadtime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

resource components_MCAPSHELPDEVAPI_name_slowserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_MCAPSHELPDEVAPI_name_resource
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

// Azure KeyVault - Dev

resource vaults_MCAPSHELPKeyVaultDEV_name_resource 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: vaults_MCAPSHELPKeyVaultDEV_name
  location: 'centralus'
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Deny'
      ipRules: [
        {
          value: '13.84.173.36/32'
        }
        {
          value: '13.84.173.236/32'
        }
        {
          value: '13.65.96.215/32'
        }
        {
          value: '13.84.168.238/32'
        }
        {
          value: '70.37.99.36/32'
        }
        {
          value: '70.37.66.104/32'
        }
        {
          value: '70.37.97.188/32'
        }
        {
          value: '20.114.106.234/32'
        }
        {
          value: '20.114.106.252/32'
        }
        {
          value: '20.114.107.16/32'
        }
        {
          value: '20.114.107.22/32'
        }
        {
          value: '20.114.107.46/32'
        }
        {
          value: '20.114.105.157/32'
        }
        {
          value: '20.114.105.199/32'
        }
        {
          value: '20.114.105.204/32'
        }
        {
          value: '20.114.107.55/32'
        }
        {
          value: '20.114.107.57/32'
        }
        {
          value: '20.114.107.58/32'
        }
        {
          value: '20.114.106.56/32'
        }
        {
          value: '13.84.55.137/32'
        }
        {
          value: '43.241.123.120/32'
        }
        {
          value: '13.84.173.36/32'
        }
        {
          value: '13.84.173.236/32'
        }
        {
          value: '13.65.96.215/32'
        }
        {
          value: '13.84.168.238/32'
        }
        {
          value: '70.37.99.36/32'
        }
        {
          value: '70.37.66.104/32'
        }
        {
          value: '70.37.97.188/32'
        }
        {
          value: '20.114.106.234/32'
        }
        {
          value: '20.114.106.252/32'
        }
        {
          value: '20.114.107.16/32'
        }
        {
          value: '20.114.107.22/32'
        }
        {
          value: '20.114.107.46/32'
        }
        {
          value: '20.114.105.157/32'
        }
        {
          value: '20.114.105.199/32'
        }
        {
          value: '20.114.105.204/32'
        }
        {
          value: '20.114.107.55/32'
        }
        {
          value: '20.114.107.57/32'
        }
        {
          value: '20.114.107.58/32'
        }
        {
          value: '20.114.106.56/32'
        }
        {
          value: '13.84.55.137/32'
        }
      ]
      virtualNetworkRules: []
    }
    accessPolicies: [
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'b4c73788-2caa-410d-9541-d1503643db48'
        permissions: {
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }

      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '457b43b9-57e0-466e-b049-a304f01e7d50'
        permissions: {
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'c3a7b376-2928-42d0-9d05-1df3545978b6'
        permissions: {
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'ad0a8fa5-ed12-4084-900e-d7fc56f1c6c2'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '37f8da94-05e0-4f63-826a-7839092a0f8e'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'afe166c3-ab6a-4172-8e46-b77b610e0429'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '758905e7-06de-43a3-a53b-f251d97a6947'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '9be3bb09-3e5f-493d-a567-b147f17077d5'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '309ded77-35b3-494b-8dc4-3ed2cd160744'
        permissions: {
          certificates: []
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '324d283b-4cc2-4275-b096-aeea04c3dfd1'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '23c7b78a-1543-4323-985c-13fcc466f1fd'
        permissions: {
          keys: []
          secrets: []
          certificates: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'a13a6457-2118-4b85-9f4d-9cc3436f43eb'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '7f6a161a-263b-4b6c-a1c3-f6373e87e12d'
        permissions: {
          certificates: []
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
        }
      }
    ]
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enableRbacAuthorization: false
    enablePurgeProtection: true
    vaultUri: 'https://mcapshelpkeyvaultdev.vault.azure.net/'
    provisioningState: 'Succeeded'
    publicNetworkAccess: 'Enabled'
  }
}

// resource vaults_MCAPSHELPKeyVaultDEV_name_ApiClientSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'ApiClientSecret'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//       exp: 1731831083
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_ApiSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'ApiSecret'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//       exp: 1731538286
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_ApplicationInsights_ConnectionString 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'ApplicationInsights-ConnectionString'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_ApplicationInsights_InstrumentationKey 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'ApplicationInsights-InstrumentationKey'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_ApplicationInsightsResourceId 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'ApplicationInsightsResourceId'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_catalogdbPowerPlat 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'catalogdbPowerPlat'
//   location: 'centralus'
//   properties: {
//     contentType: 'catalogdbPowerPlat@microsoft.com(Service account)'
//     attributes: {
//       enabled: true
//       exp: 1715529649
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_ECIFDBServiceAccount 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'ECIFDBServiceAccount'
//   location: 'centralus'
//   properties: {
//     contentType: 'redmond\\ECIF-OneAskDB'
//     attributes: {
//       enabled: true
//       exp: 1763958359
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_ecif_oneaskdb_uat 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'ecif-oneaskdb-uat'
//   location: 'centralus'
//   properties: {
//     contentType: 'ecif-oneaskdb-uat@microsoft.com'
//     attributes: {
//       enabled: true
//       nbf: 1701170237
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_IRISAPIClientID 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'IRISAPIClientID'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//       exp: 1732777581
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_IRISAPIClientSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'IRISAPIClientSecret'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//       exp: 1732777581
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_IRISAPIScope 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'IRISAPIScope'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//       exp: 1732777581
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_IRISAPIScopeUAT 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'IRISAPIScopeUAT'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//       exp: 1731403505
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_mxpacatsrvice 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'mxpacatsrvice'
//   location: 'centralus'
//   properties: {
//     contentType: 'service account mxpacatsrvice@microsoft.com'
//     attributes: {
//       enabled: true
//       exp: 1766055388
//     }
//   }
// }

// resource vaults_MCAPSHELPKeyVaultDEV_name_Secret_MXPA_SSO_DEV 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
//   parent: vaults_MCAPSHELPKeyVaultDEV_name_resource
//   name: 'Secret-MXPA-SSO-DEV'
//   location: 'centralus'
//   properties: {
//     attributes: {
//       enabled: true
//     }
//   }
// }

// param frontDoorEndpointName string = 'afd-${uniqueString(resourceGroup().id)}'

// @description('The name of the SKU to use when creating the Front Door profile.')
// @allowed([
//   'Standard_AzureFrontDoor'
//   'Premium_AzureFrontDoor'
// ])

// param frontDoorSkuName string = 'Premium_AzureFrontDoor'

// var frontDoorProfileName = 'RG_MCAPSHELP-PROD-AFD-Resource'
// var frontDoorOriginGroupName = 'mcapshelpapi'
// var frontDoorOriginName = 'mcapsHelpBackend'
// var frontDoorRouteName = 'AFD-McapsHelpapi'

// resource frontDoorProfile 'Microsoft.Cdn/profiles@2023-07-01-preview' = {
//   name: frontDoorProfileName
//   location: 'global'
//   sku: {
//     name: frontDoorSkuName

//   }
// }

// resource frontDoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2023-07-01-preview' = {
//   name: frontDoorEndpointName
//   parent: frontDoorProfile
//   location: 'global'
//   properties: {
//     enabledState: 'Enabled'
//   }
// }

// resource frontDoorOriginGroup 'Microsoft.Cdn/profiles/originGroups@2023-07-01-preview' = {
//   name: frontDoorOriginGroupName
//   parent: frontDoorProfile
//   properties: {
//     loadBalancingSettings: {
//       sampleSize: 4
//       successfulSamplesRequired: 3
//     }
//     healthProbeSettings: {
//       probePath: '/'
//       probeRequestType: 'HEAD'
//       probeProtocol: 'Http'
//       probeIntervalInSeconds: 100
//     }
//   }
// }

// resource frontDoorOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2023-07-01-preview' = {
//   name: frontDoorOriginName
//   parent: frontDoorOriginGroup
//   properties: {
//     hostName: sites_MCAPSHELPDEVAPI_name_resource.properties.defaultHostName
//     httpPort: 80
//     httpsPort: 443
//     originHostHeader: sites_MCAPSHELPDEVAPI_name_resource.properties.defaultHostName
//     priority: 1
//     weight: 100
//     enabledState: 'Enabled'
//     enforceCertificateNameCheck: true
//   }
// }

// resource frontDoorRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2023-07-01-preview' = {
//   name: frontDoorRouteName
//   parent: frontDoorEndpoint
//   dependsOn: [
//     frontDoorOrigin
//   ]
//   properties: {
//     originGroup: {
//       id: frontDoorOriginGroup.id
//     }
//     supportedProtocols: [
//       'Http'
//       'Https'
//     ]
//     patternsToMatch: [
//       '/*'
//       '/api/*'
//     ]
//     forwardingProtocol: 'HttpsOnly'
//     linkToDefaultDomain: 'Enabled'
//     httpsRedirect: 'Enabled'
//     enabledState: 'Enabled'
//   }
// }

// @secure()
// param vulnerabilityAssessments_Default_storageContainerPath string
// param workspaces_mcapshelpsynapseworkspace_name string = 'mcapshelpsynapseworkspaceprod'
// param storageAccounts_mcapshelpsynapse_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV-SPM/providers/Microsoft.Storage/storageAccounts/mcapshelpsynapse'

// resource mcapshelpsynapse_workspace 'Microsoft.Synapse/workspaces@2021-06-01' = {
//   name: workspaces_mcapshelpsynapseworkspace_name
//   location: location
//   identity: {
//     type: 'SystemAssigned'
//   }
//   properties: {
//     defaultDataLakeStorage: {
//       resourceId: storageAccounts_mcapshelpsynapse_externalid
//       createManagedPrivateEndpoint: false
//       accountUrl: 'https://mcapshelpsynapseprod.dfs.core.windows.net'
//       filesystem: 'mcapshelpfilesystemprod'
//     }
//     encryption: {}
//     managedResourceGroupName: 'MCAPSHELPSPM'
//     sqlAdministratorLogin: 'sqladminuser'
//     privateEndpointConnections: []
//     publicNetworkAccess: 'Enabled'
//     cspWorkspaceAdminProperties: {
//       initialWorkspaceAdminObjectId: '9be3bb09-3e5f-493d-a567-b147f17077d5'
//     }
//     azureADOnlyAuthentication: true
//     trustedServiceBypassEnabled: false
//   }
// }

// resource workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/auditingSettings@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'Default'
//   properties: {
//     retentionDays: 0
//     auditActionsAndGroups: [
//       'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
//       'FAILED_DATABASE_AUTHENTICATION_GROUP'
//       'BATCH_COMPLETED_GROUP'
//     ]
//     isStorageSecondaryKeyInUse: false
//     isAzureMonitorTargetEnabled: false
//     state: 'Disabled'
//     storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
//   }
// }

// resource Microsoft_Synapse_workspaces_azureADOnlyAuthentications_workspaces_mcapshelpsynapseworkspace_name_default 'Microsoft.Synapse/workspaces/azureADOnlyAuthentications@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'default'
//   properties: {
//     azureADOnlyAuthentication: true
//   }
// }

// resource workspaces_mcapshelpsynapseworkspace_name_mcapshelpspark 'Microsoft.Synapse/workspaces/bigDataPools@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'mcapshelpspark'
//   location: location
//   properties: {
//     sparkVersion: '3.3'
//     nodeCount: 10
//     nodeSize: 'Small'
//     nodeSizeFamily: 'MemoryOptimized'
//     autoScale: {
//       enabled: true
//       minNodeCount: 3
//       maxNodeCount: 10
//     }
//     autoPause: {
//       enabled: true
//       delayInMinutes: 15
//     }
//     isComputeIsolationEnabled: false
//     sessionLevelPackagesEnabled: false
//     cacheSize: 50
//     dynamicExecutorAllocation: {
//       enabled: false
//     }
//     isAutotuneEnabled: false
//     provisioningState: 'Succeeded'
//   }
// }

// resource Microsoft_Synapse_workspaces_dedicatedSQLminimalTlsSettings_workspaces_mcapshelpsynapseworkspace_name_default 'Microsoft.Synapse/workspaces/dedicatedSQLminimalTlsSettings@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'default'
//   // location: location
//   properties: {
//     minimalTlsVersion: '1.2'
//   }
// }

// resource Microsoft_Synapse_workspaces_extendedAuditingSettings_workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/extendedAuditingSettings@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'Default'
//   properties: {
//     retentionDays: 0
//     auditActionsAndGroups: [
//       'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
//       'FAILED_DATABASE_AUTHENTICATION_GROUP'
//       'BATCH_COMPLETED_GROUP'
//     ]
//     isStorageSecondaryKeyInUse: false
//     isAzureMonitorTargetEnabled: false
//     state: 'Disabled'
//     storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
//   }
// }

// resource workspaces_mcapshelpsynapseworkspace_name_allowAll 'Microsoft.Synapse/workspaces/firewallRules@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'allowAll'
//   properties: {
//     startIpAddress: '0.0.0.0'
//     endIpAddress: '255.255.255.255'
//   }
// }

// resource workspaces_mcapshelpsynapseworkspace_name_AllowAllWindowsAzureIps 'Microsoft.Synapse/workspaces/firewallRules@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'AllowAllWindowsAzureIps'
//   properties: {
//     startIpAddress: '0.0.0.0'
//     endIpAddress: '0.0.0.0'
//   }
// }

// resource workspaces_mcapshelpsynapseworkspace_name_AutoResolveIntegrationRuntime 'Microsoft.Synapse/workspaces/integrationruntimes@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'AutoResolveIntegrationRuntime'
//   properties: {
//     type: 'Managed'
//     typeProperties: {
//       computeProperties: {
//         location: 'AutoResolve'
//       }
//     }
//   }
// }

// resource Microsoft_Synapse_workspaces_securityAlertPolicies_workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/securityAlertPolicies@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'Default'
//   properties: {
//     state: 'Enabled'
//     disabledAlerts: [
//       ''
//     ]
//     emailAddresses: [
//       ''
//     ]
//     emailAccountAdmins: false
//     retentionDays: 0
//   }
// }

// resource Microsoft_Synapse_workspaces_vulnerabilityAssessments_workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/vulnerabilityAssessments@2021-06-01' = {
//   parent: mcapshelpsynapse_workspace
//   name: 'Default'
//   properties: {
//     recurringScans: {
//       isEnabled: false
//       emailSubscriptionAdmins: true
//     }
//     storageContainerPath: vulnerabilityAssessments_Default_storageContainerPath
//   }
// }
