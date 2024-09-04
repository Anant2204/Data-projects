param name string
param location string
param kind string

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: name
  location: location
  kind: kind
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaWebAppExtensionCreate'
    RetentionInDays: 90
    // WorkspaceResourceId: workspaces_DefaultWorkspace_dbe10480_e093_4f44_a29c_e69c0f44c583_EUS_externalid
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

output applicationInsightsName string = applicationInsights.name
output applicationInsightId string = applicationInsights.id 
