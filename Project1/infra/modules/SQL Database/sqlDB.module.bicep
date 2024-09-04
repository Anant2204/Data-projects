param sqlDBName string
param location string
param skuName string
param skuTier string
param skuCapacity int
param dbMaxSize int


resource servers_mcapshelp_name_servers_mcapshelp_name_db 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  name: sqlDBName
  location: location
  sku: {
    name: skuName
    tier: skuTier
    capacity: skuCapacity
  }
  kind: 'v12.0,user'
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: dbMaxSize
    catalogCollation: 'SQL_Latin1_General_CP1_CI_AS'
    zoneRedundant: false
    readScale: 'Disabled'
    requestedBackupStorageRedundancy: 'Local'
    maintenanceConfigurationId: '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default'
    isLedgerOn: false
    availabilityZone: 'NoPreference'
  }
}

output primaryDBID string = servers_mcapshelp_name_servers_mcapshelp_name_db.id
output primaryDBName string = servers_mcapshelp_name_servers_mcapshelp_name_db.name
