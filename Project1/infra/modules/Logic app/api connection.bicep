param connections_office365_name string = 'office365'

resource connections_office365_name_resource 'Microsoft.Web/connections@2016-06-01' = {
  name: connections_office365_name
  location: 'southcentralus'
  kind: 'V1'
  properties: {
    displayName: 'v-neemondal@microsoft.com'
    statuses: [
      {
        status: 'Connected'
      }
    ]
    customParameterValues: {}
    nonSecretParameterValues: {}
    createdTime: '2024-02-20T10:31:25.9821995Z'
    changedTime: '2024-06-06T06:38:34.0044575Z'
    api: {
      name: connections_office365_name
      displayName: 'Office 365 Outlook'
      description: 'Microsoft Office 365 is a cloud-based service that is designed to help meet your organization\'s needs for robust security, reliability, and user productivity.'
      iconUri: 'https://connectoricons-prod.azureedge.net/releases/v1.0.1686/1.0.1686.3706/${connections_office365_name}/icon.png'
      brandColor: '#0078D4'
      id: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Web/locations/southcentralus/managedApis/${connections_office365_name}'
      type: 'Microsoft.Web/locations/managedApis'
    }
    testLinks: [
      {
        requestUri: 'https://subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/${connections_office365_name}/extensions/proxy/testconnection?api-version=2016-06-01'
        method: 'get'
      }
    ]
  }
}
