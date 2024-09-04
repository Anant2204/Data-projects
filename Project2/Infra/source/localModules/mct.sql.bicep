@description('The name of the SQL logical server.')
@minLength(1)
@maxLength(63)
param serverName string = 'mctuatserver17'
 
@description('Specifies resource location creation. Override it if the resource goup is different')
param location string = resourceGroup().location
 
@description('Specifies the resource tagging')
param tags object = {}
 
/*@description('Admin Username of the SQL Server')
param adminUserName string = 'CloudSA29201f73'*/
 
/*@description('The  administrator password of the SQL logical server.')
@secure()
param administratorLoginPassword string*/
 
@description('The list of the firewall IP addresses.')
param firewallIpAddresses array = [
  {
    start: '0.0.0.0'
    end: '0.0.0.0'
    firewallRule: 'AllowAllWindowsAzureIps'
  }
]
 

 
@description('The AD administrator username of the SQL logical server.')
param adAdministratorLogin string
//param adAdministratorLogin string = 'v-detrivedi@microsoft.com'
 
@description('The AD administrator SID of the SQL logical server. SID (object ID) of the server administrator.')
//param sid string = '9e21d22e-b9be-44fd-8544-f26c55c95301'
param sid string 

@description('The tenant ID of the SQL logical server.')
param tenantid string
//param tenantid string = '72f988bf-86f1-41af-91ab-2d7cd011db47'
 
@description('Enable diagnostic logs')
@allowed([
  true
  false
])
param enablebackupShortTermPolicies bool = true
 
@description('Enable diagnostic logs')
@allowed([
  true
  false
])
param enablebackupLongTermPolicies bool = true
 
@description('SQL database dynamic creation info')
@minLength(1)
@maxLength(128)
param sqldatabase array

 
param sqlDbbackupPlan object = {
  backupShortTermPolicies: {
    diffBackupIntervalInHours: 24
    retentionDays: 7
  }
  backupLongTermPolicies: {
    monthlyRetention: 'P4W'
    weeklyRetention: 'P1W'
    weekOfYear: 1
    yearlyRetention: 'P12M'
  }
}

 
@description('Specifies the number of days that logs will be kept for; a value of 0 will retain data indefinitely for SQL Server Audit logs')
@minValue(0)
@maxValue(365)
param auditLogsRetentionInDays int = 90

param enableAdAdministrator bool = true
 
@description('Specifies the number of days that logs will be kept for; a value of 0 will retain data indefinitely')
@minValue(0)
@maxValue(365)
param logsRetentionInDays int = 30
 
@description('Array of Email Addresses for notification to team. Provide comma separated emails values if more than one email address required')
param emailAddresses array = [
]
 
@description('SQL Version')
param version string = '12.0'
 
@description('SQL Database Edition')
@allowed([
  'Basic'
  'Standard'
  'Premium'
  'GP_Gen5'
  'BC_Gen5'
])
param skuEdition string = 'Standard'

@description('Name of SQL sku')
param sqlskuname string

@description('Tier of sql sku')
param sqlskutier string

@description('capacity of sql sku')
param sqlskucapacity int


 
@description('Create SQL databses in Elastic pool?')
@allowed([
  true
  false
])
param createDbinElasticPool bool = false
 
@description('The Elastic Pool DTU or nomber of vcore.')
param capacity int = 50
 
@description('Specify public access to be enabled or not')
@allowed([
  'disabled'
  'enabled'
])
param publicNetworkAccess string = 'enabled'
 
@description('Enable diagnostic logs')
@allowed([
  true
  false
])
param enableDiagnostics bool = true
 
@description('The list of Diagnostic settings logs to be deployed')
@allowed([
  'SQLInsights'
  'AutomaticTuning'
  'QueryStoreRuntimeStatistics'
  'QueryStoreWaitStatistics'
  'Errors'
  'DatabaseWaitStatistics'
  'Timeouts'
  'Blocks'
  'Deadlocks'
])
param diagnosticLogs array = [
  'SQLInsights'
  'AutomaticTuning'
  'QueryStoreRuntimeStatistics'
  'QueryStoreWaitStatistics'
  'Errors'
  'DatabaseWaitStatistics'
  'Timeouts'
  'Blocks'
  'Deadlocks'
]
 
@description('The list of Diagnostic settings metrics to be deployed')
@allowed([
  'Basic'
  'InstanceAndAppAdvanced'
  'WorkloadManagement'
])
param diagnosticMetrics array = [
  'Basic'
  'InstanceAndAppAdvanced'
  'WorkloadManagement'
]

@description('Enable or disable delete lock?')
@allowed([
  true
  false
])
param enableDeleteLock bool = true
 
@description('Apply Lock level to be read only or delete')
@allowed([
  'CanNotDelete'
  'ReadOnly'
])
param lockLevel string = 'CanNotDelete'

@description('Name of the exisiting Log analystics workspace')
param logAnalyticsWorkspaceName string = ''

@description('Name of the exisiting Log analystics workspace. Override it if the resource goup is different.')
param logAnalyticsWorkspaceRG string = resourceGroup().name

@description('Name of the exisiting Log analystics workspace. Override it if the subscription is different')
param logAnalyticsWorkspaceSubId string = subscription().subscriptionId
 
//variables
var subscriptionID = subscription().subscriptionId
var tenantID = subscription().tenantId
var lockName = '${sqlServer.name}-lock'
var logAnalyticsWorkspaceId = resourceId(logAnalyticsWorkspaceSubId, logAnalyticsWorkspaceRG, 'Microsoft.OperationalInsights/workspaces', logAnalyticsWorkspaceName)
var editionToSkuMap = {
  Basic: {
    name: 'BasicPool'
    tier: 'Basic'
  }
  Standard: {
    name: 'StandardPool'
    tier: 'Standard'
  }
  Premium: {
    name: 'PremiumPool'
    tier: 'Premium'
  }
  GP_Gen5: {
    family: 'Gen5'
    name: 'GP_Gen5'
    tier: 'GeneralPurpose'
  }
  BC_Gen5: {
    family: 'Gen5'
    name: 'BC_Gen5'
    tier: 'BusinessCritical'
  }
}
var skuName = editionToSkuMap[skuEdition].name
var skuTier = editionToSkuMap[skuEdition].tier
 
//resources
@description('Create resource SQL Server')
resource sqlServer 'Microsoft.Sql/servers@2021-11-01-preview' = {
  name: serverName
  location: location
  tags: tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    version: version
    publicNetworkAccess: publicNetworkAccess  
    administrators: {
      administratorType: 'ActiveDirectory'
      principalType: 'User'
      login: adAdministratorLogin
      sid: sid
      tenantId: tenantid
      azureADOnlyAuthentication: true
    } 
  }
}
 
resource elasticPool 'Microsoft.Sql/servers/elasticPools@2021-11-01-preview' = if(createDbinElasticPool) {
  parent: sqlServer
  name: '${serverName}ElasticPool'
  location: location
  sku: {
    name: skuName
    tier: skuTier
    capacity: capacity
  }
}
 
//Databases
@description('Create resource Sql/servers/databases')
@batchSize(1)
resource sqlDb 'Microsoft.Sql/servers/databases@2021-11-01-preview' = [for item in sqldatabase: if(!empty(sqldatabase)) {
  parent: sqlServer
  name: item.databaseName
  location: location
  sku: {
    name: sqlskuname
    tier: sqlskutier
    capacity: sqlskucapacity
  }
  // sku: {
  //   name: createDbinElasticPool ? 'ElasticPool' : skuTier
  //   tier: skuTier
  // }
  properties: createDbinElasticPool ? { 
    elasticPoolId: elasticPool.id 
  } : null
 
  dependsOn: [
    sqlServer
  ]
}]
 
 
@description('Create resource Sql/servers/databases/auditingSettings')
@batchSize(1)
resource sqlDbAuditingSettings 'Microsoft.Sql/servers/databases/auditingSettings@2021-11-01-preview' = [for (item, i) in sqldatabase: {
  parent: sqlDb[i]
  name: 'default'
  properties: {
    retentionDays: auditLogsRetentionInDays
    auditActionsAndGroups: [
      'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
      'FAILED_DATABASE_AUTHENTICATION_GROUP'
      'BATCH_COMPLETED_GROUP'
    ]
    state: 'Enabled'
    isAzureMonitorTargetEnabled: true
  }
}]
 
@description('Create resource Sql/servers/databases/backupShortTermRetentionPolicies')
@batchSize(1)
resource sqlDbBackupShortTermRetentionPolicies 'Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies@2021-11-01-preview' = [for (item, i) in sqldatabase: if (enablebackupShortTermPolicies) {
  parent: sqlDb[i]
  name: 'default'
  properties: {
    diffBackupIntervalInHours: sqlDbbackupPlan.backupShortTermPolicies.diffBackupIntervalInHours
    retentionDays: sqlDbbackupPlan.backupShortTermPolicies.retentionDays
  }
}]
 
@description('Create resource Sql/servers/databases/backupLongTermRetentionPolicies')
@batchSize(1)
resource sqlDbBackupLongTermRetentionPolicies 'Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies@2021-11-01-preview' = [for (item, i) in sqldatabase: if (enablebackupLongTermPolicies) {
  parent: sqlDb[i]
  name: 'default'
  properties: {
    monthlyRetention: sqlDbbackupPlan.backupLongTermPolicies.monthlyRetention
    weeklyRetention: sqlDbbackupPlan.backupLongTermPolicies.weeklyRetention
    weekOfYear: sqlDbbackupPlan.backupLongTermPolicies.weekOfYear
    yearlyRetention: sqlDbbackupPlan.backupLongTermPolicies.yearlyRetention
  }
}]
 
@description('Create resource Sql/servers/databases/securityAlertPolicies')
@batchSize(1)
resource sqlDbSecurityAlertPolicies 'Microsoft.Sql/servers/databases/securityAlertPolicies@2021-11-01-preview' = [for (item, i) in sqldatabase: {
  parent: sqlDb[i]
  name: 'SecurityAlerts'
  properties: {
    state: 'Enabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: emailAddresses
    emailAccountAdmins: true
  }
}]
 
@description('Create resource Sql/servers/databases/transparentDataEncryption')
@batchSize(1)
resource sqlDbTransparentDataEncryption 'Microsoft.Sql/servers/databases/transparentDataEncryption@2021-11-01-preview' = [for (item, i) in sqldatabase: {
  parent: sqlDb[i]
  name: 'current'
  properties: {
    state: 'Enabled'
  }
  dependsOn: [
    sqlDbSecurityAlertPolicies
    sqlDb
    sqlDbDiagnosticSettings
    lock
    sqlDbBackupLongTermRetentionPolicies
    sqlDbBackupShortTermRetentionPolicies
    sqlDbAuditingSettings
  ]
}]
 
//resource - diagnostic settings
@description('A diagnostic setting specifies a list of categories of platform logs and/or metrics that you want to collect from a resource, and one or more destinations that you would stream them to. Normal usage charges for the destination will occur.')
@batchSize(1)
resource sqlDbDiagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = [for (item, i) in sqldatabase: if (enableDiagnostics) {
  scope: sqlDb[i]
  name: '${item.databaseName}-diagnosticsSettings'
  properties: {
    workspaceId: logAnalyticsWorkspaceId
    logs: [for logName in diagnosticLogs: {
      category: logName
      enabled: true
       retentionPolicy: {
        enabled: true
        days: 0
      }
    }]
    metrics: [for metricName in diagnosticMetrics: {
      category: metricName
      enabled: true
       retentionPolicy: {
        enabled: true
        days: 0
      }
 
    }]
  }
}]
 
//resource - lock
@description('Prevent deletion of the resource')
resource lock 'Microsoft.Authorization/locks@2017-04-01' = if (enableDeleteLock) {
  name: lockName
  properties: {
    level: lockLevel
    notes: 'Prevent deletion of the resource'
  }
  scope: sqlServer
}
 
@description('Create resource Sql/servers/securityAlertPolicies')
resource securityAlertPolicies 'Microsoft.Sql/servers/securityAlertPolicies@2021-11-01-preview' = {
  name: 'Default'
  parent: sqlServer
  properties: {
    state: 'Enabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: emailAddresses
    emailAccountAdmins: true
  }
  dependsOn: [
    sqlDb
  ]
}
 
@description('Create resource Sql/servers/administrators')
resource administrators 'Microsoft.Sql/servers/administrators@2021-11-01-preview' = if(enableAdAdministrator) {
  name: 'ActiveDirectory'
  parent: sqlServer
  properties: {
    administratorType: 'ActiveDirectory'
    login: adAdministratorLogin
    sid: sid
    tenantId: tenantid
  }
}
@description('Create resource Sql/servers/auditingSettings')
resource auditingSettings 'Microsoft.Sql/servers/auditingSettings@2021-11-01-preview' = {
  name: 'default'
  parent: sqlServer
  properties: {
    retentionDays: logsRetentionInDays
    auditActionsAndGroups: [
      'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP'
      'FAILED_DATABASE_AUTHENTICATION_GROUP'
      'BATCH_COMPLETED_GROUP'
    ]
    state: 'Enabled'
    isAzureMonitorTargetEnabled: true
  }
  dependsOn: [
    sqlDb
  ]
}
 
@description('Create resource Sql/servers/firewallRules')
resource firewallRules 'Microsoft.Sql/servers/firewallRules@2021-11-01-preview' = [for item in firewallIpAddresses: if(!empty(firewallIpAddresses)) {
  name: item.firewallRule
  parent: sqlServer
  properties: {
    startIpAddress: item.start
    endIpAddress: item.end
  }
  dependsOn: [
    sqlDb
  ]
}]

@description('Create resource Sql/servers/vulnerabilityAssessments')
resource vulnerabilityAssessments 'Microsoft.Sql/servers/vulnerabilityAssessments@2021-11-01-preview' = {
  name: 'default'
  parent: sqlServer
  properties: {
    recurringScans: {
      emails: emailAddresses
      emailSubscriptionAdmins: true
      isEnabled: true
    }
  }
  dependsOn: [
    sqlDb
    securityAlertPolicies
  ]
}
//outputs
output sqlDB array = [for (item, i) in sqldatabase: !empty(sqldatabase) ? {
  name: item.databaseName
} : []]
output sqlServerFqdn string = sqlServer.properties.fullyQualifiedDomainName
output sqlServerName string = sqlServer.name
output sqlServerId string = sqlServer.id
//output adminUserName string = adminUserName
 