@secure()
param prodadministratorLoginPassword string
// param vulnerabilityAssessments_Default_storageContainerPath string
param servers_mcapshelpexternal_name string = 'mcapshelpuattelemetry'
param serverLocation string = 'South Central US'

resource servers_mcapshelpexternal_name_resource 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: servers_mcapshelpexternal_name
  location: serverLocation
  kind: 'v12.0'
  properties: {
    administratorLogin: 'CloudSAfb6f46ed'
    administratorLoginPassword: prodadministratorLoginPassword
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


//SQL Database

param mcapshelpexternalDB string = 'mcapshelpuattelemetry'

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

// resource servers_mcapshelpexternal_DbParameterization 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
//   parent: servers_mcapshelpexternal
//   name: 'DbParameterization'
//   properties: {
//     autoExecuteValue: 'Disabled'
//   }
// }

// resource servers_mcapshelpexternal_defragmentation 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
//   parent: servers_mcapshelpexternal
//   name: 'DefragmentIndex'
//   properties: {
//     autoExecuteValue: 'Disabled'
//   }
// }

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

// resource servers_mcapshelpexternal_backupLongTermRetentionPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_default 'Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies@2023-05-01-preview' = {
//   parent: servers_mcapshelpexternal
//   name: 'default'
//   properties: {
//     makeBackupsImmutable: false
//     backupStorageAccessTier: 'Hot'
//     weeklyRetention: 'PT0S'
//     monthlyRetention: 'PT0S'
//     yearlyRetention: 'PT0S'
//     weekOfYear: 0
//   }
// }

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

// resource servers_mcapshelpexternal_geoBackupPolicies_servers_mcapshelpexternal_name_servers_mcapshelpexternal_name_data_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2023-05-01-preview' = {
//   parent: servers_mcapshelpexternal
//   name: 'Default'
//   properties: {
//     state: 'Disabled'
//   }
// }

// resource servers_mcapshelpexternal_name_data_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2023-05-01-preview' = {
//   parent: servers_mcapshelpexternal
//   name: 'Current'
//   properties: {}
// }

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

// resource servers_mcapshelpexternal_VulnerabilityAssesment 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2023-05-01-preview' = {
//   parent: servers_mcapshelpexternal
//   name: 'Default'
//   properties: {
//     recurringScans: {
//       isEnabled: false
//       emailSubscriptionAdmins: true
//       emails: []
//     }
//   }
// }
