//Parameters-Keyvault
@description('Specifies the KeyVault resource name.')
param keyVaultName string = ''
param enableKv bool = false

param managedIdentityName string = ''

@sys.description('Required. The name of the role to assign. If it cannot be found you can specify the role definition ID instead.')
param roleDefinitionIdOrName array = []

param principalId string = ''

var builtInRoleNames = {
  'Key Vault Secrets User': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6')
  'Key Vault Secrets Officer': subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b86a8fe4-44ce-4948-aee5-eccb2c155cd7')
}

resource keyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = if(enableKv) {
  name: keyVaultName
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