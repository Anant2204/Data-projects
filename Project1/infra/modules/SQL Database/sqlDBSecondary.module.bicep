param sqlDBName string
param location string
param skuName string
param skuTier string
param skuCapacity int
param dbMaxSize int
param secondaryType string


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
    secondaryType: secondaryType
    readScale: 'Disabled'
    requestedBackupStorageRedundancy: 'Local'
    maintenanceConfigurationId: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default'
    isLedgerOn: false
    availabilityZone: 'NoPreference'
  }
}

output secondaryDBID string = servers_mcapshelp_name_servers_mcapshelp_name_db.id
output secondaryDBName string = servers_mcapshelp_name_servers_mcapshelp_name_db.name
