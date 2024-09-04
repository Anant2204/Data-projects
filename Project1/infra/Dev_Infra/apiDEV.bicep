param serverfarms_ASP_RGMCAPSHELPPROD string
param location string = 'southcentralus'
param ProdWebAPI string
// param serverfarms_ASP_RGMCAPSHELPDEV_87a4_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/serverfarms/ASP-RGMCAPSHELPDEV-87a4'
param vaults_MCAPSHELPKeyVaultDEV_name string = 'MCAPSHELPKeyVaultDEV'
param server_mcapshelp_name string = 'mcapshelp'

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
        name: 'mcapshelpapi.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: 'mcapshelpapi.scm.azurewebsites.net'
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
    publishingUsername: '$MCAPSHELPAPI'
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
        'http://localhost:3000'
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
    siteName: 'MCAPSHELPAPI'
    hostNameType: 'Verified'
  }
}

// SQL Server with SQL DB - Dev
// sql servername = mcapshelp
// param server_mcapshelp_name string
@secure()
param devadministratorLoginPassword string
param vulnerabilityAssessments_Default_storageContainerPath string = 'https://rgmcapshelpdev870d.blob.core.windows.net/mcapshelpblob'

resource servers_mcapshelp_name_resource 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: server_mcapshelp_name
  location: location
  // kind: 'v12.0'
  properties: {
    administratorLogin: 'CloudSA0ca42751'
    administratorLoginPassword: devadministratorLoginPassword
    version: '12.0'
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
    administrators: {
      administratorType: 'ActiveDirectory'
      principalType: 'User'
      login: 'mxpacatsrvice@microsoft.com'
      sid: '28367f8b-80f4-4eb1-a833-88a7108ea20e'
      tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
      azureADOnlyAuthentication: true
    }
    restrictOutboundNetworkAccess: 'Disabled'
  }
}

resource servers_mcapshelp_name_ActiveDirectory 'Microsoft.Sql/servers/administrators@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'ActiveDirectory'
  properties: {
    administratorType: 'ActiveDirectory'
    login: 'mxpacatsrvice@microsoft.com'
    sid: '28367f8b-80f4-4eb1-a833-88a7108ea20e'
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
  }
}

resource servers_mcapshelp_name_Default 'Microsoft.Sql/servers/advancedThreatProtectionSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    state: 'Enabled'
  }
}

resource servers_mcapshelp_name_CreateIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_resource
  name: 'CreateIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelp_name_DbParameterization 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_resource
  name: 'DbParameterization'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelp_name_DefragmentIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_resource
  name: 'DefragmentIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelp_name_DropIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_resource
  name: 'DropIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelp_name_ForceLastGoodPlan 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_resource
  name: 'ForceLastGoodPlan'
  properties: {
    autoExecuteValue: 'Enabled'
  }
}

resource Microsoft_Sql_servers_auditingPolicies_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/auditingPolicies@2014-04-01' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  // location: location
  properties: {
    auditingState: 'Disabled'
  }
}

resource Microsoft_Sql_servers_auditingSettings_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/auditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
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

resource Microsoft_Sql_servers_azureADOnlyAuthentications_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/azureADOnlyAuthentications@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    azureADOnlyAuthentication: true
  }
}

resource Microsoft_Sql_servers_connectionPolicies_servers_mcapshelp_name_default 'Microsoft.Sql/servers/connectionPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'default'
  // location: location
  properties: {
    connectionType: 'Default'
  }
}

resource servers_mcapshelp_name_master_Default 'Microsoft.Sql/servers/databases/advancedThreatProtectionSettings@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Default'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_auditingPolicies_servers_mcapshelp_name_master_Default 'Microsoft.Sql/servers/databases/auditingPolicies@2014-04-01' = {
  name: '${servers_mcapshelp_name}/master/Default'
  // location: location
  properties: {
    auditingState: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_auditingSettings_servers_mcapshelp_name_master_Default 'Microsoft.Sql/servers/databases/auditingSettings@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_extendedAuditingSettings_servers_mcapshelp_name_master_Default 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_geoBackupPolicies_servers_mcapshelp_name_master_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Default'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource servers_mcapshelp_name_master_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Current'
  properties: {}
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_securityAlertPolicies_servers_mcapshelp_name_master_Default 'Microsoft.Sql/servers/databases/securityAlertPolicies@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Default'
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
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_transparentDataEncryption_servers_mcapshelp_name_master_Current 'Microsoft.Sql/servers/databases/transparentDataEncryption@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Current'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_vulnerabilityAssessments_servers_mcapshelp_name_master_Default 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2023-05-01-preview' = {
  name: '${servers_mcapshelp_name}/master/Default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
      emails: []
    }
  }
  dependsOn: [
    servers_mcapshelp_name_resource
  ]
}

resource Microsoft_Sql_servers_devOpsAuditingSettings_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/devOpsAuditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    isAzureMonitorTargetEnabled: false
    isManagedIdentityInUse: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource servers_mcapshelp_name_current 'Microsoft.Sql/servers/encryptionProtector@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'current'
  // kind: 'servicemanaged'
  properties: {
    serverKeyName: 'ServiceManaged'
    serverKeyType: 'ServiceManaged'
    autoRotationEnabled: false
  }
}

resource Microsoft_Sql_servers_extendedAuditingSettings_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/extendedAuditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
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

resource servers_mcapshelp_name_AllowAllWindowsAzureIps 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'AllowAllWindowsAzureIps'
}

resource servers_mcapshelp_name_ServiceManaged 'Microsoft.Sql/servers/keys@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'ServiceManaged'
  // kind: 'servicemanaged'
  properties: {
    serverKeyType: 'ServiceManaged'
  }
}

resource Microsoft_Sql_servers_securityAlertPolicies_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/securityAlertPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
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

resource Microsoft_Sql_servers_sqlVulnerabilityAssessments_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/sqlVulnerabilityAssessments@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    state: 'Enabled'
  }
}

resource Microsoft_Sql_servers_vulnerabilityAssessments_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/vulnerabilityAssessments@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
    }
    storageContainerPath: vulnerabilityAssessments_Default_storageContainerPath
  }
}

//SQL DB-Dev

param servers_mcapshelp_name string = 'mcapshelp'

resource servers_mcapshelp_name_servers_mcapshelp_name_db 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  name: '${server_mcapshelp_name}/${servers_mcapshelp_name}'
  location: 'southcentralus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 50
  }
  kind: 'v12.0,user'
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: 268435456000
    catalogCollation: 'SQL_Latin1_General_CP1_CI_AS'
    zoneRedundant: false
    readScale: 'Disabled'
    requestedBackupStorageRedundancy: 'Local'
    maintenanceConfigurationId: '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default'
    isLedgerOn: false
    availabilityZone: 'NoPreference'
  }
}

resource servers_mcapshelp_name_servers_mcapshelp_name_db_Default 'Microsoft.Sql/servers/databases/advancedThreatProtectionSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'Default'
  properties: {
    state: 'Disabled'
  }
}

resource servers_mcapshelp_name_servers_mcapshelp_name_db_CreateIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'CreateIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

// resource servers_mcapshelp_name_servers_mcapshelp_name_db_DbParameterization 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
//   parent: servers_mcapshelp_name_servers_mcapshelp_name_db
//   name: 'DbParameterization'
//   properties: {
//     autoExecuteValue: 'Disabled'
//   }
// }

// resource servers_mcapshelp_name_servers_mcapshelp_name_db_DefragmentIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
//   parent: servers_mcapshelp_name_servers_mcapshelp_name_db
//   name: 'DefragmentIndex'
//   properties: {
//     autoExecuteValue: 'Disabled'
//   }
// }

resource servers_mcapshelp_name_servers_mcapshelp_name_db_DropIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'DropIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_mcapshelp_name_servers_mcapshelp_name_db_ForceLastGoodPlan 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'ForceLastGoodPlan'
  properties: {
    autoExecuteValue: 'Enabled'
  }
}

resource Microsoft_Sql_servers_databases_auditingPolicies_servers_mcapshelp_name_servers_mcapshelp_name_db_Default 'Microsoft.Sql/servers/databases/auditingPolicies@2014-04-01' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'Default'
  location: 'South Central US'
  properties: {
    auditingState: 'Disabled'
  }
}

resource Microsoft_Sql_servers_databases_auditingSettings_servers_mcapshelp_name_servers_mcapshelp_name_db_Default 'Microsoft.Sql/servers/databases/auditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

  // resource Microsoft_Sql_servers_databases_backupLongTermRetentionPolicies_servers_mcapshelp_name_servers_mcapshelp_name_db_default 'Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies@2023-05-01-preview' = {
  //   parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  //   name: 'default'
  //   properties: {
  //     weeklyRetention: 'PT0S'
  //     monthlyRetention: 'PT0S'
  //     yearlyRetention: 'PT0S'
  //     weekOfYear: 0
  //   }
  // }

// resource Microsoft_Sql_servers_databases_backupShortTermRetentionPolicies_servers_mcapshelp_name_servers_mcapshelp_name_db_default 'Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies@2023-05-01-preview' = {
//   parent: servers_mcapshelp_name_servers_mcapshelp_name_db
//   name: 'default'
//   properties: {
//     retentionDays: 7
//     diffBackupIntervalInHours: 12
//   }
// }

resource Microsoft_Sql_servers_databases_extendedAuditingSettings_servers_mcapshelp_name_servers_mcapshelp_name_db_Default 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource Microsoft_Sql_servers_databases_geoBackupPolicies_servers_mcapshelp_name_servers_mcapshelp_name_db_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'Default'
  properties: {
    state: 'Disabled'
  }
}

// resource servers_mcapshelp_name_servers_mcapshelp_name_db_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2023-05-01-preview' = {
//   parent: servers_mcapshelp_name_servers_mcapshelp_name_db
//   name: 'Current'
//   properties: {}
// }

resource Microsoft_Sql_servers_databases_securityAlertPolicies_servers_mcapshelp_name_servers_mcapshelp_name_db_Default 'Microsoft.Sql/servers/databases/securityAlertPolicies@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
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

resource Microsoft_Sql_servers_databases_transparentDataEncryption_servers_mcapshelp_name_servers_mcapshelp_name_db_Current 'Microsoft.Sql/servers/databases/transparentDataEncryption@2023-05-01-preview' = {
  parent: servers_mcapshelp_name_servers_mcapshelp_name_db
  name: 'Current'
  properties: {
    state: 'Enabled'
  }
}

// resource Microsoft_Sql_servers_databases_vulnerabilityAssessments_servers_mcapshelp_name_servers_mcapshelp_name_db_Default 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2023-05-01-preview' = {
//   parent: servers_mcapshelp_name_servers_mcapshelp_name_db
//   name: 'Default'
//   properties: {
//     recurringScans: {
//       isEnabled: false
//       emailSubscriptionAdmins: true
//       emails: []
//     }
//   }
// }

// Application Insights for UI - Dev

param components_mcapshelpdev_name string = 'mcapshelp'
param workspaces_DefaultWorkspace_workspaces_DefaultWorkspace_28367f8b_80f4_4eb1_a833_88a7108ea20e_CUS_externalid_CUS_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/DefaultResourceGroup-CUS/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-28367f8b-80f4-4eb1-a833-88a7108ea20e-CUS'

resource components_mcapshelpdev_name_resource 'microsoft.insights/components@2020-02-02' = {
  name: components_mcapshelpdev_name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaWebAppExtensionCreate'
    RetentionInDays: 90
    WorkspaceResourceId: workspaces_DefaultWorkspace_workspaces_DefaultWorkspace_28367f8b_80f4_4eb1_a833_88a7108ea20e_CUS_externalid_CUS_externalid
    IngestionMode: 'LogAnalytics'
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

// Application Insights for WebAPI - Dev

param components_MCAPSHELPAPI_name string = 'MCAPSHELPAPI'
param workspaces_DefaultWorkspace_28367f8b_80f4_4eb1_a833_88a7108ea20e_SCUS_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/DefaultResourceGroup-SCUS/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-28367f8b-80f4-4eb1-a833-88a7108ea20e-SCUS'

resource components_MCAPSHELPDEVAPI_name_resource 'microsoft.insights/components@2020-02-02' = {
  name: components_MCAPSHELPAPI_name
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
          value: '136.226.250.245/32'
        }
        {
          value: '136.226.232.81/32'
        }
        {
          value: '165.225.124.248/32'
        }
        {
          value: '23.102.167.21/32'
        }
        {
          value: '23.102.164.125/32'
        }
        {
          value: '23.102.166.114/32'
        }
        {
          value: '23.102.162.188/32'
        }
        {
          value: '13.84.202.97/32'
        }
        {
          value: '104.210.215.22/32'
        }
        {
          value: '104.210.215.113/32'
        }
        {
          value: '20.118.109.37/32'
        }
        {
          value: '20.118.109.113/32'
        }
        {
          value: '20.118.104.67/32'
        }
        {
          value: '20.118.104.118/32'
        }
        {
          value: '20.118.106.5/32'
        }
        {
          value: '20.118.109.161/32'
        }
        {
          value: '20.118.110.18/32'
        }
        {
          value: '20.118.110.34/32'
        }
        {
          value: '20.118.110.38/32'
        }
        {
          value: '20.118.110.94/32'
        }
        {
          value: '20.118.110.127/32'
        }
        {
          value: '20.118.108.230/32'
        }
        {
          value: '23.102.161.217/32'
        }
        {
          value: '165.225.120.232/32'
        }
        {
          value: '136.226.232.112/32'
        }
        {
          value: '49.36.83.196/32'
        }
        {
          value: '117.196.198.70/32'
        }
        {
          value: '103.251.211.118/32'
        }
        {
          value: '49.15.183.170/32'
        }
        {
          value: '152.58.16.38/32'
        }
        {
          value: '152.58.17.18/32'
        }
        {
          value: '49.205.250.251/32'
        }
        {
          value: '49.204.104.207/32'
        }
        {
          value: '136.226.245.17/32'
        }
        {
          value: '203.192.251.170/32'
        }
        {
          value: '110.227.52.183/32'
        }
        {
          value: '49.204.106.56/32'
        }
        {
          value: '49.43.5.3/32'
        }
        {
          value: '52.152.99.174/32'
        }
        {
          value: '52.152.100.68/32'
        }
        {
          value: '52.152.100.129/32'
        }
        {
          value: '52.152.100.130/32'
        }
        {
          value: '52.185.210.142/32'
        }
        {
          value: '52.185.212.39/32'
        }
        {
          value: '52.255.87.17/32'
        }
        {
          value: '52.255.87.76/32'
        }
        {
          value: '52.255.87.132/32'
        }
        {
          value: '4.151.24.86/32'
        }
        {
          value: '4.151.24.117/32'
        }
        {
          value: '4.151.24.159/32'
        }
        {
          value: '4.151.24.167/32'
        }
        {
          value: '4.151.24.189/32'
        }
        {
          value: '4.151.24.190/32'
        }
        {
          value: '4.151.24.240/32'
        }
        {
          value: '4.151.24.243/32'
        }
        {
          value: '4.151.25.38/32'
        }
        {
          value: '52.185.212.161/32'
        }
        {
          value: '52.185.212.189/32'
        }
        {
          value: '52.185.213.88/32'
        }
        {
          value: '52.185.214.140/32'
        }
        {
          value: '52.185.215.73/32'
        }
        {
          value: '52.185.215.86/32'
        }
        {
          value: '52.185.215.92/32'
        }
        {
          value: '52.185.215.204/32'
        }
        {
          value: '52.255.80.23/32'
        }
        {
          value: '52.255.80.28/32'
        }
        {
          value: '52.255.80.254/32'
        }
        {
          value: '52.255.81.15/32'
        }
        {
          value: '52.255.81.117/32'
        }
        {
          value: '52.255.81.176/32'
        }
        {
          value: '52.255.83.193/32'
        }
        {
          value: '52.255.86.8/32'
        }
        {
          value: '52.255.86.187/32'
        }
        {
          value: '52.255.87.0/32'
        }
        {
          value: '4.151.26.147/32'
        }
        {
          value: '4.151.26.152/32'
        }
        {
          value: '4.151.26.167/32'
        }
        {
          value: '4.151.26.170/32'
        }
        {
          value: '4.151.26.173/32'
        }
        {
          value: '4.151.26.190/32'
        }
        {
          value: '182.68.159.132/32'
        }
        {
          value: '49.43.5.143/32'
        }
        {
          value: '49.204.111.227/32'
        }
        {
          value: '103.211.135.207/32'
        }
        {
          value: '103.175.62.41/32'
        }
        {
          value: '40.119.12.86/32'
        }
        {
          value: '122.177.232.112/32'
        }
        {
          value: '49.204.106.96/32'
        }
        {
          value: '110.224.189.231/32'
        }
        {
          value: '49.43.5.116/32'
        }
        {
          value: '103.175.169.113/32'
        }
        {
          value: '110.224.191.29/32'
        }
        {
          value: '152.58.25.73/32'
        }
        {
          value: '152.58.57.114/32'
        }
        {
          value: '122.171.14.218/32'
        }
      ]
      virtualNetworkRules: []
    }
    accessPolicies: [
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
        objectId: '0b553bcd-7940-41b1-8e83-c426bb570e2b'
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
