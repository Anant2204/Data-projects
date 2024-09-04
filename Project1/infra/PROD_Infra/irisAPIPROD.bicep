param appServicePlanName string = 'ASP-RGMCAPSHELP-PRODIRISAPI-9aca'
param location string = 'South Central US'

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: appServicePlanName
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


param mcapshelpProdSearchService string = 'mcapshelpsearchprod'
param searchServicelocation string = 'South Central US'

resource searchServices_mcapshelpsearchdev_name_resource 'Microsoft.Search/searchServices@2023-11-01' = {
  name: mcapshelpProdSearchService
  location: searchServicelocation
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

//API App
param sites_mcapshelpexternalapiprod_name string = 'mcapshelpexternalapiprod'
param serverfarms_ASP_RGMCAPSHELPDEVIRISAPI_9aca_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-PROD-IRISAPI/providers/Microsoft.Web/serverfarms/ASP-RGMCAPSHELP-PRODIRISAPI-9aca'
resource sites_mcapshelpexternalapidev_name_resource 'Microsoft.Web/sites@2023-01-01' = {
  name: sites_mcapshelpexternalapiprod_name
  location: location
  kind: 'api'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${sites_mcapshelpexternalapiprod_name}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${sites_mcapshelpexternalapiprod_name}.scm.azurewebsites.net'
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
  name: '${sites_mcapshelpexternalapiprod_name}.azurewebsites.net'
  // location: 'East US'
  properties: {
    siteName: 'mcapshelpexternalapidev'
    hostNameType: 'Verified'
  }
}

//Application Insights
param components_mcapshelpexternalapiprod_name string = 'mcapshelpexternalapiprod'
param workspaces_DefaultWorkspace_28367f8b_80f4_4eb1_a833_88a7108ea20e_SCUS_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/DefaultResourceGroup-SCUS/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-28367f8b-80f4-4eb1-a833-88a7108ea20e-SCUS'

resource components_mcapshelpexternalapidev_name_resource 'microsoft.insights/components@2020-02-02' = {
  name: components_mcapshelpexternalapiprod_name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaWebAppExtensionCreate'
    RetentionInDays: 90
    WorkspaceResourceId: workspaces_DefaultWorkspace_28367f8b_80f4_4eb1_a833_88a7108ea20e_SCUS_externalid
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
param vaults_MCAPSHelpExtKeyVaultProd_name string = 'MCAPSHelpExtKeyVaultProd'
param keyvaultLocation string = 'South Central US'

resource vaults_MCAPSHelpExtKeyVaultDev_name_resource 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: vaults_MCAPSHelpExtKeyVaultProd_name
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
    vaultUri: 'https://mcapshelpextkeyvaultprod.vault.azure.net/'
    provisioningState: 'Succeeded'
    publicNetworkAccess: 'Enabled'
  }
}

//SQL Server
@secure()
param prodadministratorLoginPassword string
// param vulnerabilityAssessments_Default_storageContainerPath string
param servers_mcapshelpexternal_name string = 'mcapshelpexternalServer'
param serverLocation string = 'South Central US'


resource servers_mcapshelpexternal_name_resource 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: servers_mcapshelpexternal_name
  location: serverLocation
  // kind: 'v12.0'
  properties: {
    administratorLogin: 'CloudSAfb6f46ed'
    administratorLoginPassword: prodadministratorLoginPassword
    version: '12.0'
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
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

//SQL Database

param mcapshelpexternalDB string = 'mcapshelpexternalDB'

resource servers_mcapshelpexternal 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  parent: servers_mcapshelpexternal_name_resource
  name: mcapshelpexternalDB
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
    // maintenanceConfigurationId: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default'
    isLedgerOn: false
    availabilityZone: 'NoPreference'
  }
}

