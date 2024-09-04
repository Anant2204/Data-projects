param managedIdentityName string = ''
param location string = resourceGroup().location
resource managedidentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: managedIdentityName
  location: location
}

output userAssignedIdentity string = managedidentity.properties.principalId
