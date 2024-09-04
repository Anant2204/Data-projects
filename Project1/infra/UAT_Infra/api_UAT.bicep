param storageAccounts_rgmcapshelpuat878e_name string = 'rgmcapshelpuat878e'

resource storageAccounts_rgmcapshelpuat878e_name_resource 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccounts_rgmcapshelpuat878e_name
  location: 'southcentralus'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'Storage'
  properties: {
    defaultToOAuthAuthentication: true
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    networkAcls: {
      resourceAccessRules: [
        {
          tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
          resourceId: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Security/datascanners/StorageDataScanner'
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
  }
}

resource storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccounts_rgmcapshelpuat878e_name_resource
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

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/fileServices@2023-01-01' = {
  parent: storageAccounts_rgmcapshelpuat878e_name_resource
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

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/queueServices@2023-01-01' = {
  parent: storageAccounts_rgmcapshelpuat878e_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/tableServices@2023-01-01' = {
  parent: storageAccounts_rgmcapshelpuat878e_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource storageAccounts_rgmcapshelpuat878e_name_default_azure_webjobs_hosts 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: storageAccounts_rgmcapshelpuat878e_name_default
  name: 'azure-webjobs-hosts'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
}

resource storageAccounts_rgmcapshelpuat878e_name_default_azure_webjobs_secrets 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: storageAccounts_rgmcapshelpuat878e_name_default
  name: 'azure-webjobs-secrets'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
}

resource storageAccounts_rgmcapshelpuat878e_name_default_sql_db_backup 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: storageAccounts_rgmcapshelpuat878e_name_default
  name: 'sql-db-backup'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
}

resource storageAccounts_rgmcapshelpuat878e_name_default_changetriggerservicerequestsync_uat9e82 'Microsoft.Storage/storageAccounts/fileServices/shares@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'changetriggerservicerequestsync-uat9e82'
  properties: {
    accessTier: 'TransactionOptimized'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7jobtriggers00 'Microsoft.Storage/storageAccounts/queueServices/queues@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_queueServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7jobtriggers00'
  properties: {
    metadata: {}
  }
}

resource storageAccounts_rgmcapshelpuat878e_name_default_AzureFunctionsDiagnosticEvents202401 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'AzureFunctionsDiagnosticEvents202401'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_AzureFunctionsScaleMetrics202401 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'AzureFunctionsScaleMetrics202401'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240125t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e725010deb347f3f920240125t000000zactions'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240129t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e725010deb347f3f920240129t000000zactions'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f9flows 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e725010deb347f3f9flows'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f9histories 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e725010deb347f3f9histories'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f9runs 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e725010deb347f3f9runs'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3ac20240123t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7fb0cf3486beb3ac20240123t000000zactions'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3acflows 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7fb0cf3486beb3acflows'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3achistories 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7fb0cf3486beb3achistories'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3acruns 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7fb0cf3486beb3acruns'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowaccesskeys 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7flowaccesskeys'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowruntimecontext 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7flowruntimecontext'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flows 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7flows'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowsubscriptions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7flowsubscriptions'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowsubscriptionsummary 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7flowsubscriptionsummary'
  properties: {}
}

resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7jobdefinitions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
  name: 'flowfb76df7234c57e7jobdefinitions'
  properties: {}
}

