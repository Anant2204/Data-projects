//Parameters-Keyvault
@description('Specifies the KeyVault resource name.')
param keyVaultName string = ''
param enableKv bool = false

@description('Specifies the webApp resource name.')
param webAppName string = ''
param enableWa bool = false

@description('Specifies the ACR resource name.')
param acrName string = ''
param enableAcr bool = false

param managedIdentityName string = ''

@sys.description('Required. The name of the role to assign. If it cannot be found you can specify the role definition ID instead.')
param roleDefinitionIdOrName array = []

param principalId string = ''

var builtInRoleNames = {
  'Owner': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '8e3af657-a8ff-443c-a75c-2fe8c4bcb635')
  'Contributor': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b24988ac-6180-42a0-ab88-20f7382dd24c')
  'Reader': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'acdd72a7-3385-48ef-bd42-f606fba81ae7')
  'Log Analytics Contributor': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '92aaf0da-9dab-42b6-94a3-d43ce8d16293')
  'Log Analytics Reader': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '73c42c96-874c-492b-b04d-ab87d138a893')
  'Managed Application Contributor Role': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '641177b8-a67a-45b9-a033-47bc880bb21e')
  'Managed Application Operator Role': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'c7393b34-138c-406f-901b-d8cf2b17e6ae')
  'Managed Applications Reader': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b9331d33-8a36-4f8c-b097-4f54124fdb44')
  'Managed Identity Contributor': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'e40ec5ca-96e0-45a2-b4ff-59039f2c2b59')
  'Managed Identity Operator': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'f1a07417-d97a-45cb-824c-7a7467783830')
  'Monitoring Contributor': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '749f88d5-cbae-40b8-bcfc-e573ddc772fa')
  'Monitoring Metrics Publisher': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
  'Monitoring Reader': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '43d0d8ad-25c7-4714-9337-8ba259a9fe05')
  'Resource Policy Contributor': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '36243c78-bf99-498c-9df9-86d9f8d28608')
  'User Access Administrator': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '18d7d88d-d35e-4fb5-a5c3-7773c20a72d9')
  'AcrPull': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
  'AcrPush': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '8311e382-0749-4cb8-b61a-304f252e45ec')
  'Key Vault Secrets User': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6')
  'Key Vault Secrets Officer': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b86a8fe4-44ce-4948-aee5-eccb2c155cd7')
}

resource keyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = if(enableKv) {
  name: keyVaultName
}

resource webApp 'Microsoft.Web/sites@2021-03-01' existing = if(enableWa) {
  name: webAppName
}

resource acr 'Microsoft.ContainerRegistry/registries@2021-06-01-preview' existing = if(enableAcr) {
  name: acrName
}

resource roleAssignmentKv 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = [for id in roleDefinitionIdOrName: if(enableKv) {
  name: guid('${managedIdentityName}-roleAssignment-${id}')
  scope: keyVault
  properties: {
    description: 'RoleAssignment to the keyvault'
    principalId: principalId
    roleDefinitionId: builtInRoleNames[id]
  }
}]

resource roleAssignmentWa 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = [for id in roleDefinitionIdOrName: if(enableWa) {
  name: guid('${managedIdentityName}-roleAssignment-${id}')
  scope: webApp
  properties: {
    description: 'RoleAssignment to the webapp'
    principalId: principalId
    roleDefinitionId: builtInRoleNames[id]
  }
}]

resource roleAssignmentAcr 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = [for id in roleDefinitionIdOrName: if(enableAcr) {
  name: guid('${managedIdentityName}-roleAssignment-${id}')
  scope: acr
  properties: {
    description: 'RoleAssignment to the container registry'
    principalId: principalId
    roleDefinitionId: builtInRoleNames[id]
  }
}]
