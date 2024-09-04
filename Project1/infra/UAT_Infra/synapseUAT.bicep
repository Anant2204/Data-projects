param storageAccounts_mcapshelpsynapse_name string = 'mcapshelpsynapseuat'
param workspaces_mcapshelpsynapseworkspace_name string = 'mcapshelpsynapseworkspaceuat'
// param systemTopics_mcapshelpsynapse_740140b7_6f14_4eb4_bf3f_f72c46baad60_name string = 'mcapshelpsynapseUAT-eventGridTopic'

resource storageAccounts_mcapshelpsynapse_name_resource 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccounts_mcapshelpsynapse_name
  location: 'southcentralus'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'StorageV2'
  properties: {
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    isHnsEnabled: true
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
    accessTier: 'Hot'
  }
}

// resource systemTopics_mcapshelpsynapse_740140b7_6f14_4eb4_bf3f_f72c46baad60_name_resource 'Microsoft.EventGrid/systemTopics@2023-12-15-preview' = {
//   name: systemTopics_mcapshelpsynapse_740140b7_6f14_4eb4_bf3f_f72c46baad60_name
//   location: 'southcentralus'
//   properties: {
//     source: storageAccounts_mcapshelpsynapse_name_resource.id
//     topicType: 'microsoft.storage.storageaccounts'
//   }
// }

// resource systemTopics_mcapshelpsynapse_740140b7_6f14_4eb4_bf3f_f72c46baad60_name_StorageAntimalwareSubscription 'Microsoft.EventGrid/systemTopics/eventSubscriptions@2023-12-15-preview' = {
//   parent: systemTopics_mcapshelpsynapse_740140b7_6f14_4eb4_bf3f_f72c46baad60_name_resource
//   name: 'StorageAntimalwareSubscription'
//   properties: {
//     destination: {
//       properties: {
//         maxEventsPerBatch: 1
//         preferredBatchSizeInKilobytes: 64
//         azureActiveDirectoryTenantId: '33e01921-4d64-4f8c-a055-5bdaffd5e33d'
//         azureActiveDirectoryApplicationIdOrUri: 'f1f8da5f-609a-401d-85b2-d498116b7265'
//       }
//       endpointType: 'WebHook'

//     }
//     filter: {
//       includedEventTypes: [
//         'Microsoft.Storage.BlobCreated'
//       ]
//       advancedFilters: [
//         {
//           values: [
//             'BlockBlob'
//           ]
//           operatorType: 'StringContains'
//           key: 'data.blobType'
//         }
//       ]
//     }
//     eventDeliverySchema: 'EventGridSchema'
//     retryPolicy: {
//       maxDeliveryAttempts: 30
//       eventTimeToLiveInMinutes: 1440
//     }
//   }
// }

resource storageAccounts_mcapshelpsynapse_name_default 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccounts_mcapshelpsynapse_name_resource
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

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_mcapshelpsynapse_name_default 'Microsoft.Storage/storageAccounts/fileServices@2023-01-01' = {
  parent: storageAccounts_mcapshelpsynapse_name_resource
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

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_mcapshelpsynapse_name_default 'Microsoft.Storage/storageAccounts/queueServices@2023-01-01' = {
  parent: storageAccounts_mcapshelpsynapse_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_mcapshelpsynapse_name_default 'Microsoft.Storage/storageAccounts/tableServices@2023-01-01' = {
  parent: storageAccounts_mcapshelpsynapse_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_resource 'Microsoft.Synapse/workspaces@2021-06-01' = {
  name: workspaces_mcapshelpsynapseworkspace_name
  location: 'southcentralus'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    defaultDataLakeStorage: {
      resourceId: storageAccounts_mcapshelpsynapse_name_resource.id
      createManagedPrivateEndpoint: false
      accountUrl: 'https://mcapshelpsynapse.dfs.core.windows.net'
      filesystem: 'mcapshelpfilesystem'
    }
    encryption: {}
    managedResourceGroupName: 'MCAPSHELPEXTERNAL'
    sqlAdministratorLogin: 'sqladminuser'
    privateEndpointConnections: []
    workspaceRepositoryConfiguration: {
      accountName: 'VSOGD'
      collaborationBranch: 'dev'
      lastCommitId: 'ecb36f642459394d78518043602b46d436726255'
      projectName: 'MCAPSHelp'
      repositoryName: 'mcapshelpsynapse'
      rootFolder: '/Notebooks'
      tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
      type: 'WorkspaceVSTSConfiguration'
    }
    publicNetworkAccess: 'Enabled'
    cspWorkspaceAdminProperties: {
      initialWorkspaceAdminObjectId: '9be3bb09-3e5f-493d-a567-b147f17077d5'
    }
    azureADOnlyAuthentication: true
    trustedServiceBypassEnabled: false
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/auditingSettings@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'Default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: [
      'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
      'FAILED_DATABASE_AUTHENTICATION_GROUP'
      'BATCH_COMPLETED_GROUP'
    ]
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource Microsoft_Synapse_workspaces_azureADOnlyAuthentications_workspaces_mcapshelpsynapseworkspace_name_default 'Microsoft.Synapse/workspaces/azureADOnlyAuthentications@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'default'
  properties: {
    azureADOnlyAuthentication: true
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_mcapshelpspark 'Microsoft.Synapse/workspaces/bigDataPools@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'mcapshelpspark'
  location: 'southcentralus'
  properties: {
    sparkVersion: '3.3'
    nodeCount: 10
    nodeSize: 'Small'
    nodeSizeFamily: 'MemoryOptimized'
    autoScale: {
      enabled: true
      minNodeCount: 3
      maxNodeCount: 10
    }
    autoPause: {
      enabled: true
      delayInMinutes: 15
    }
    isComputeIsolationEnabled: false
    sparkConfigProperties: {
      configurationType: 'Artifact'
      filename: '_conf'
      content: '{"name":"_conf","properties":{"configs":{"spark.synapse.logAnalytics.enabled":"true","spark.synapse.logAnalytics.workspaceId":"630ebfc2-c813-446b-a688-a0a39ef05f03","spark.synapse.logAnalytics.secret":"NcGUcAwLqtzQ46TOKDM+iXiZsObjwtTkRImaxcr3UV710HUbZ4AWvaZqJIN+5Dr8HD1LUlK4QUg9jwoC3Sb10g=="},"annotations":[],"type":"Microsoft.Synapse/workspaces/sparkconfigurations","description":"","notes":"","created":"2024-01-25T10:04:55.9140000+05:30","createdBy":"v-ampatel@microsoft.com","configMergeRule":{"admin.currentOperation.spark.synapse.logAnalytics.enabled":"replace","admin.currentOperation.spark.synapse.logAnalytics.workspaceId":"replace","admin.currentOperation.spark.synapse.logAnalytics.secret":"replace"}}}'
    }
    sessionLevelPackagesEnabled: false
    cacheSize: 50
    dynamicExecutorAllocation: {
      enabled: false
    }
    isAutotuneEnabled: false
    provisioningState: 'Succeeded'
  }
}

resource Microsoft_Synapse_workspaces_dedicatedSQLminimalTlsSettings_workspaces_mcapshelpsynapseworkspace_name_default 'Microsoft.Synapse/workspaces/dedicatedSQLminimalTlsSettings@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'default'
  location: 'southcentralus'
  properties: {
    minimalTlsVersion: '1.2'
  }
}

resource Microsoft_Synapse_workspaces_extendedAuditingSettings_workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/extendedAuditingSettings@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'Default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: [
      'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
      'FAILED_DATABASE_AUTHENTICATION_GROUP'
      'BATCH_COMPLETED_GROUP'
    ]
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_AllowAllWindowsAzureIps 'Microsoft.Synapse/workspaces/firewallRules@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'AllowAllWindowsAzureIps'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_Dhanusha_Ip 'Microsoft.Synapse/workspaces/firewallRules@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'Dhanusha_Ip'
  properties: {
    startIpAddress: '49.43.5.115'
    endIpAddress: '49.43.5.115'
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_AutoResolveIntegrationRuntime 'Microsoft.Synapse/workspaces/integrationruntimes@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
  name: 'AutoResolveIntegrationRuntime'
  properties: {
    type: 'Managed'
    typeProperties: {
      computeProperties: {
        location: 'AutoResolve'
      }
    }
  }
}

resource Microsoft_Synapse_workspaces_securityAlertPolicies_workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/securityAlertPolicies@2021-06-01' = {
  parent: workspaces_mcapshelpsynapseworkspace_name_resource
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

// resource Microsoft_Synapse_workspaces_vulnerabilityAssessments_workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/vulnerabilityAssessments@2021-06-01' = {
//   parent: workspaces_mcapshelpsynapseworkspace_name_resource
//   name: 'Default'
//   properties: {
//     recurringScans: {
//       isEnabled: false
//       emailSubscriptionAdmins: true
//     }
//   }
// }

// resource storageAccounts_mcapshelpsynapse_name_default_mcapshelpfilesystem 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
//   parent: storageAccounts_mcapshelpsynapse_name_default
//   name: 'mcapshelpfilesystem'
//   properties: {
//     immutableStorageWithVersioning: {
//       enabled: false
//     }
//     defaultEncryptionScope: '$account-encryption-key'
//     denyEncryptionScopeOverride: false
//     publicAccess: 'None'
//   }
//   dependsOn: [

//     storageAccounts_mcapshelpsynapse_name_resource
//   ]
// }
