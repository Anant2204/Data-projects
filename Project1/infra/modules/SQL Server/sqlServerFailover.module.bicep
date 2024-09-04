param sqlServerFailOverGroupName string
param sqlTargetServerID string
param sqlPartnerServerID string
param primaryDBName string


resource servers_mcapshelp_name_servers_mcapshelp_name_devsecondaryservergroup 'Microsoft.Sql/servers/failoverGroups@2023-08-01-preview' = {
  name: sqlServerFailOverGroupName
  // location: location
  properties: {
    readWriteEndpoint: {
      failoverPolicy: 'Automatic'
      failoverWithDataLossGracePeriodMinutes: 60
    }
    readOnlyEndpoint: {
      failoverPolicy: 'Enabled'
      targetServer: sqlTargetServerID
    }
    partnerServers: [
      {
        id: sqlPartnerServerID
      }
    ]
    databases: [
      primaryDBName
    ]
  }
}


