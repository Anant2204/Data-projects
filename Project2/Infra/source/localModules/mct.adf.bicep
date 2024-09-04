//parameters
@description('Name of the Datafactory Creation')
@minLength(3)
@maxLength(63)
param dataFactoryName string     //mandatory
 
@description('Specifies resource location creation. Override it if the resource goup is different')
param location string = resourceGroup().location
 
@description('Specifies the resource tagging.')
param tags object = {}
 
@description('Specify public access to be enabled or not')
@allowed([
  'disabled'
  'enabled'
])
param publicNetworkAccess string = 'disabled'
 
@description('Enable or disable diagnostic Settings')
@allowed([
  true
  false
])
param enableDiagnostics bool = true
 
@description('The list of Diagnostic settings logs to be deployed')
@allowed([
  'ActivityRuns'
  'PipelineRuns'
  'TriggerRuns'
  'SandboxPipelineRuns'
  'SandboxActivityRuns'
  'SSISPackageEventMessages'
  'SSISPackageExecutableStatistics'
  'SSISPackageEventMessageContext'
  'SSISPackageExecutionComponentPhases'
  'SSISPackageExecutionDataStatistics'
  'SSISIntegrationRuntimeLogs'
])
param diagnosticLogs array = [
  'ActivityRuns'
  'PipelineRuns'
  'TriggerRuns'
  'SandboxPipelineRuns'
  'SandboxActivityRuns'
  'SSISPackageEventMessages'
  'SSISPackageExecutableStatistics'
  'SSISPackageEventMessageContext'
  'SSISPackageExecutionComponentPhases'
  'SSISPackageExecutionDataStatistics'
  'SSISIntegrationRuntimeLogs'
]
 
@description('The list of Diagnostic settings metrics to be deployed')
@allowed([
  'AllMetrics'
])
param diagnosticMetrics array = [
  'AllMetrics'
]
 
@description('Identity Assignment type like SystemAssigned or UserAssigned or both')
@allowed([
  'SystemAssigned'
  'UserAssigned'
  'SystemAssigned, UserAssigned'
])
param identityType string = 'SystemAssigned'
 
@description('Provide value if the parameter identityType has or includes userAssignedIdentity ')
param userAssignedIdentity object = {}
 
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
var identity = (identityType == 'SystemAssigned')
var diagnosticSettingsName = '${dataFactory.name}-DiagnosticSettings'
var lockName = '${dataFactory.name}-lock'

var logAnalyticsWorkspaceId = resourceId(logAnalyticsWorkspaceSubId, logAnalyticsWorkspaceRG, 'Microsoft.OperationalInsights/workspaces', logAnalyticsWorkspaceName)
 
//resources
@description('Create resource Datafactory')
resource dataFactory 'Microsoft.DataFactory/factories@2018-06-01' = {
  name: dataFactoryName
  location: location
  tags: tags
  identity: {
    type: identityType
    userAssignedIdentities: (identity ? null : userAssignedIdentity)
  }
  properties: {
    publicNetworkAccess: publicNetworkAccess
  }
}
 
//resource - diagnostic settings
@description('A diagnostic setting specifies a list of categories of platform logs and/or metrics that you want to collect from a resource, and one or more destinations that you would stream them to. Normal usage charges for the destination will occur.')
resource diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (enableDiagnostics) {
  name: diagnosticSettingsName
  scope: dataFactory
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
}
 
//resource - lock
@description('Prevent deletion of the resource')
resource lock 'Microsoft.Authorization/locks@2017-04-01' = if (enableDeleteLock) {
  name: lockName
  properties: {
    level: lockLevel
    notes: 'Prevent deletion of the resource'
  }
  scope: dataFactory
}
 
//outputs
output dataFactoryName string = dataFactory.name
output dataFactoryId string = dataFactory.id
            