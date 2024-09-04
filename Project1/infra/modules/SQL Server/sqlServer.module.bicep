param sqlServerName string
param location string
param administratorLogin string
// param administratorLoginUserName string
param administratorsid string
param administratortenantId string
param azureADOnlyAuthentication bool
// @secure()
// param administratorLoginPassword string



resource servers_mcapshelp_name_resource 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: sqlServerName
  location: location
  kind: 'v12.0'
  properties: {
    // administratorLogin: administratorLogin
    // administratorLoginPassword: administratorLoginPassword
    version: '12.0'
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
    administrators: {
      administratorType: 'ActiveDirectory'
      principalType: 'User'
      login: administratorLogin
      sid: administratorsid
      tenantId: administratortenantId
      azureADOnlyAuthentication: azureADOnlyAuthentication
    }
    restrictOutboundNetworkAccess: 'Disabled'
  }
}

resource servers_mcapshelp_name_ActiveDirectory 'Microsoft.Sql/servers/administrators@2023-08-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'ActiveDirectory'
  properties: {
    administratorType: 'ActiveDirectory'
    login: administratorLogin
    sid: administratorsid
    tenantId: administratortenantId
  }
}

resource servers_mcapshelp_name_Default 'Microsoft.Sql/servers/advancedThreatProtectionSettings@2023-08-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    state: 'Enabled'
  }
}

resource Microsoft_Sql_servers_auditingSettings_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/auditingSettings@2021-11-01' = {
  parent: servers_mcapshelp_name_resource
  name: 'default'
  properties: {
    isDevopsAuditEnabled: false
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

resource Microsoft_Sql_servers_azureADOnlyAuthentications_servers_mcapshelp_name_Default 'Microsoft.Sql/servers/azureADOnlyAuthentications@2023-08-01-preview' = {
  parent: servers_mcapshelp_name_resource
  name: 'Default'
  properties: {
    azureADOnlyAuthentication: true
  }
}

output serverName string = servers_mcapshelp_name_resource.name
output serverID string = servers_mcapshelp_name_resource.id

