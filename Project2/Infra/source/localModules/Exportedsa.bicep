param storageAccounts_mctdev1sadiag_name string = 'mctdev1sadiag'

resource storageAccounts_mctdev1sadiag_name_resource 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccounts_mctdev1sadiag_name
  location: 'westus'
  tags: {
    DisplayName: 'StorageAccount'
    Environment: 'dev1'
    Project: 'MCT'
    Team: 'mct'
    ProjectUrl: 'https://dev.azure.com/VSOGD/MCT'
    CreatedUsing: 'Bicep'
  }
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'StorageV2'
  properties: {
    defaultToOAuthAuthentication: true
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false
    networkAcls: {
      resourceAccessRules: [
        {
          tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
          resourceId: '/subscriptions/924b0638-5652-4c7f-bfb5-d991815bd08d/providers/Microsoft.Security/datascanners/storageDataScanner'
        }
      ]
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource storageAccounts_mctdev1sadiag_name_default 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_resource
  name: 'default'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  properties: {
    cors: {
      corsRules: []
    }
    deleteRetentionPolicy: {
      allowPermanentDelete: false
      enabled: false
    }
  }
}

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_mctdev1sadiag_name_default 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_resource
  name: 'default'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  properties: {
    protocolSettings: {
      smb: {}
    }
    cors: {
      corsRules: []
    }
    shareDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_mctdev1sadiag_name_default 'Microsoft.Storage/storageAccounts/queueServices@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_mctdev1sadiag_name_default 'Microsoft.Storage/storageAccounts/tableServices@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_activityruns 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-activityruns'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_automatictuning 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-automatictuning'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_blocks 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-blocks'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_databasewaitstatistics 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-databasewaitstatistics'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_dataflowdebugsessionruns 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-dataflowdebugsessionruns'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_errors 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-errors'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_pipelineruns 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-pipelineruns'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_querystoreruntimestatistics 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-querystoreruntimestatistics'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_querystorewaitstatistics 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-querystorewaitstatistics'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_sandboxactivityruns 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-sandboxactivityruns'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_sandboxpipelineruns 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-sandboxpipelineruns'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_timeouts 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-timeouts'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_logs_triggerruns 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-logs-triggerruns'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_insights_metrics_pt1m 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'insights-metrics-pt1m'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_sqldbauditlogs 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'sqldbauditlogs'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_sqldbtdlogs 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'sqldbtdlogs'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}

resource storageAccounts_mctdev1sadiag_name_default_vulnerability_assessment 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccounts_mctdev1sadiag_name_default
  name: 'vulnerability-assessment'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_mctdev1sadiag_name_resource
  ]
}
  