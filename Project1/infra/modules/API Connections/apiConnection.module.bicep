param apiConnectionName string
param location string
param tokenClientId string
param subscriptionId string

resource apiConnectionModule 'Microsoft.Web/connections@2016-06-01' = {
  name: apiConnectionName
  location: location
  kind: 'V2'
  properties: {
    statuses: [
      {
        status: 'Error'
        target: 'token'
        error: {}
      }
    ]
    customParameterValues: {}
    nonSecretParameterValues: {
      'token:clientId': tokenClientId
      'token:TenantId': '72f988bf-86f1-41af-91ab-2d7cd011db47'
      'token:grantType': 'client_credentials'
    }
    createdTime: '2024-01-23T06:10:46.1811688Z'
    changedTime: '2024-01-23T06:10:46.1811688Z'
    api: {
      name: apiConnectionName
      displayName: 'Azure Data Factory'
      description: 'Azure Data Factory is a hybrid data integration service that allows you to create, schedule and orchestrate your ETL/ELT workflows at scale wherever your data lives, in cloud or self-hosted network.'
      iconUri: 'https://connectoricons-prod.azureedge.net/releases/v1.0.1680/1.0.1680.3652/${apiConnectionName}/icon.png'
      brandColor: '#24A9E0'
      id: '/subscriptions/${subscriptionId}/providers/Microsoft.Web/locations/southcentralus/managedApis/${apiConnectionName}'
      type: 'Microsoft.Web/locations/managedApis'
    }
    testLinks: []
  }
}

output apiConnectionId string = apiConnectionModule.id
output apiConnectionName string = apiConnectionModule.name
