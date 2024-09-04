@secure()
// param vulnerabilityAssessments_Default_storageContainerPath string
param workspaces_mcapshelpsynapseworkspace_name string = 'mcapshelpsynapseworkspaceprod'
param storageAccounts_mcapshelpsynapse_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV-SPM/providers/Microsoft.Storage/storageAccounts/mcapshelpsynapse'
param location string = 'southcentralus'

resource mcapshelpsynapse_workspace 'Microsoft.Synapse/workspaces@2021-06-01' = {
  name: workspaces_mcapshelpsynapseworkspace_name
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    defaultDataLakeStorage: {
      resourceId: storageAccounts_mcapshelpsynapse_externalid
      createManagedPrivateEndpoint: false
      accountUrl: 'https://mcapshelpsynapseprod.dfs.core.windows.net'
      filesystem: 'mcapshelpfilesystemprod'
    }
    encryption: {}
    managedResourceGroupName: 'MCAPSHELPSPM'
    sqlAdministratorLogin: 'sqladminuser'
    privateEndpointConnections: []
    publicNetworkAccess: 'Enabled'
    cspWorkspaceAdminProperties: {
      initialWorkspaceAdminObjectId: '9be3bb09-3e5f-493d-a567-b147f17077d5'
    }
    azureADOnlyAuthentication: true
    trustedServiceBypassEnabled: false
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/auditingSettings@2021-06-01' = {
  parent: mcapshelpsynapse_workspace
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
  parent: mcapshelpsynapse_workspace
  name: 'default'
  properties: {
    azureADOnlyAuthentication: true
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_mcapshelpspark 'Microsoft.Synapse/workspaces/bigDataPools@2021-06-01' = {
  parent: mcapshelpsynapse_workspace
  name: 'mcapshelpspark'
  location: location
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
  parent: mcapshelpsynapse_workspace
  name: 'default'
  // location: location
  properties: {
    minimalTlsVersion: '1.2'
  }
}

resource Microsoft_Synapse_workspaces_extendedAuditingSettings_workspaces_mcapshelpsynapseworkspace_name_Default 'Microsoft.Synapse/workspaces/extendedAuditingSettings@2021-06-01' = {
  parent: mcapshelpsynapse_workspace
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

resource workspaces_mcapshelpsynapseworkspace_name_allowAll 'Microsoft.Synapse/workspaces/firewallRules@2021-06-01' = {
  parent: mcapshelpsynapse_workspace
  name: 'allowAll'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '255.255.255.255'
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_AllowAllWindowsAzureIps 'Microsoft.Synapse/workspaces/firewallRules@2021-06-01' = {
  parent: mcapshelpsynapse_workspace
  name: 'AllowAllWindowsAzureIps'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

resource workspaces_mcapshelpsynapseworkspace_name_AutoResolveIntegrationRuntime 'Microsoft.Synapse/workspaces/integrationruntimes@2021-06-01' = {
  parent: mcapshelpsynapse_workspace
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
  parent: mcapshelpsynapse_workspace
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
