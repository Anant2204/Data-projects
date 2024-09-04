// param serverfarms_ASP_RGMCAPSHELPDEV_9132_name string = 'ASP-RGMCAPSHELPPROD-9132'
// param location string = 'South Central US'


// resource serverfarms_ASP_RGMCAPSHELPDEV_9132_name_resource 'Microsoft.Web/serverfarms@2023-01-01' = {
//   name: serverfarms_ASP_RGMCAPSHELPDEV_9132_name
//   location: 'South Central US'
//   sku: {
//     name: 'WS1'
//     tier: 'WorkflowStandard'
//     size: 'WS1'
//     family: 'WS'
//     capacity: 1
//   }
//   kind: 'elastic'
//   properties: {
//     perSiteScaling: false
//     elasticScaleEnabled: true
//     maximumElasticWorkerCount: 20
//     isSpot: false
//     reserved: false
//     isXenon: false
//     hyperV: false
//     targetWorkerCount: 0
//     targetWorkerSizeId: 0
//     zoneRedundant: false
//   }
// }


// resource workflows_MCAPSHelpFeedbackReportProblemToSupport_Dev_name_resource 'Microsoft.Logic/workflows@2017-07-01' = {
//   name: 'MCAPSHelpFeedbackReportProblemToSupport-Prod'
//   location: 'South Central US'
//   identity: {
//     type: 'SystemAssigned'
//   }
//   properties: {
//     state: 'Enabled'
//     definition: {
//       '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
//       contentVersion: '1.0.0.0'
//       parameters: {
//         '$connections': {
//           defaultValue: {}
//           type: 'Object'
//         }
//       }
//   }
// }
// }
// //Logic App (ChangeTriggerServiceRequestSync-PROD)

// param sites_ChangeTriggerServiceRequestSync_PROD_name string = 'ChangeTriggerServiceRequestSync-PROD'
// param serverfarms_ASP_RGMCAPSHELPDEV_9132_externalid string = '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-PROD/providers/Microsoft.Web/serverfarms/ASP-RGMCAPSHELPPROD-9132'

// resource sites_ChangeTriggerServiceRequestSync_UAT_name_resource 'Microsoft.Web/sites@2023-01-01' = {
//   name: sites_ChangeTriggerServiceRequestSync_PROD_name
//   location: location
//   tags: {
//     'hidden-link: /app-insights-resource-id': '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-PROD/providers/Microsoft.Insights/components/ChangeTriggerServiceRequestSync-PROD'
//   }
//   kind: 'functionapp,workflowapp'
//   identity: {
//     type: 'SystemAssigned'
//   }
//   properties: {
//     enabled: true
//     hostNameSslStates: [
//       {
//         name: 'changetriggerservicerequestsync-prod.azurewebsites.net'
//         sslState: 'Disabled'
//         hostType: 'Standard'
//       }
//       {
//         name: 'changetriggerservicerequestsync-prod.scm.azurewebsites.net'
//         sslState: 'Disabled'
//         hostType: 'Repository'
//       }
//     ]
//     serverFarmId: serverfarms_ASP_RGMCAPSHELPDEV_9132_externalid
//     reserved: false
//     isXenon: false
//     hyperV: false
//     vnetRouteAllEnabled: false
//     vnetImagePullEnabled: false
//     vnetContentShareEnabled: false
//     scmSiteAlsoStopped: false
//     clientAffinityEnabled: false
//     clientCertEnabled: false
//     clientCertMode: 'Required'
//     hostNamesDisabled: false
//     customDomainVerificationId: '9F9107B169DA2736F547049B0B61BFF109F9FBBD2279E5832E4F1160286751EE'
//     containerSize: 1536
//     dailyMemoryTimeQuota: 0
//     httpsOnly: true
//     redundancyMode: 'None'
//     publicNetworkAccess: 'Enabled'
//     storageAccountRequired: false
//     keyVaultReferenceIdentity: 'SystemAssigned'
//   }
// }

// resource sites_ChangeTriggerServiceRequestSync_UAT_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
//   parent: sites_ChangeTriggerServiceRequestSync_UAT_name_resource
//   name: 'ftp'
//   location: location
//   tags: {
//     'hidden-link: /app-insights-resource-id': '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-PROD/providers/Microsoft.Insights/components/ChangeTriggerServiceRequestSync-PROD'
//   }
//   properties: {
//     allow: false
//   }
// }

// resource sites_ChangeTriggerServiceRequestSync_UAT_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
//   parent: sites_ChangeTriggerServiceRequestSync_UAT_name_resource
//   name: 'scm'
//   location: location
//   tags: {
//     'hidden-link: /app-insights-resource-id': '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-PROD/providers/Microsoft.Insights/components/ChangeTriggerServiceRequestSync-PROD'
//   }
//   properties: {
//     allow: false
//   }
// }

// resource sites_ChangeTriggerServiceRequestSync_UAT_name_web 'Microsoft.Web/sites/config@2023-01-01' = {
//   parent: sites_ChangeTriggerServiceRequestSync_UAT_name_resource
//   name: 'web'
//   location: 'South Central US'
//   tags: {
//     'hidden-link: /app-insights-resource-id': '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/resourceGroups/RG-MCAPSHELP-PROD/providers/Microsoft.Insights/components/ChangeTriggerServiceRequestSync-PROD'
//   }
//   properties: {
//     numberOfWorkers: 1
//     defaultDocuments: [
//       'Default.htm'
//       'Default.html'
//       'Default.asp'
//       'index.htm'
//       'index.html'
//       'iisstart.htm'
//       'default.aspx'
//       'index.php'
//     ]
//     netFrameworkVersion: 'v6.0'
//     requestTracingEnabled: false
//     remoteDebuggingEnabled: false
//     httpLoggingEnabled: false
//     acrUseManagedIdentityCreds: false
//     logsDirectorySizeLimit: 35
//     detailedErrorLoggingEnabled: false
//     publishingUsername: '$ChangeTriggerServiceRequestSync-UAT'
//     scmType: 'None'
//     use32BitWorkerProcess: false
//     webSocketsEnabled: false
//     alwaysOn: false
//     managedPipelineMode: 'Integrated'
//     virtualApplications: [
//       {
//         virtualPath: '/'
//         physicalPath: 'site\\wwwroot'
//         preloadEnabled: false
//       }
//     ]
//     loadBalancing: 'LeastRequests'
//     experiments: {
//       rampUpRules: []
//     }
//     autoHealEnabled: false
//     vnetRouteAllEnabled: false
//     vnetPrivatePortsCount: 0
//     publicNetworkAccess: 'Enabled'
//     cors: {
//       supportCredentials: false
//     }
//     localMySqlEnabled: false
//     managedServiceIdentityId: 30127
//     ipSecurityRestrictions: [
//       {
//         ipAddress: 'Any'
//         action: 'Allow'
//         priority: 2147483647
//         name: 'Allow all'
//         description: 'Allow all access'
//       }
//     ]
//     scmIpSecurityRestrictions: [
//       {
//         ipAddress: 'Any'
//         action: 'Allow'
//         priority: 2147483647
//         name: 'Allow all'
//         description: 'Allow all access'
//       }
//     ]
//     scmIpSecurityRestrictionsUseMain: false
//     http20Enabled: false
//     minTlsVersion: '1.2'
//     scmMinTlsVersion: '1.2'
//     ftpsState: 'FtpsOnly'
//     preWarmedInstanceCount: 1
//     functionAppScaleLimit: 0
//     // functionsRuntimeScaleMonitoringEnabled: false
//     minimumElasticInstanceCount: 1
//     azureStorageAccounts: {}
//   }
// }

// resource sites_ChangeTriggerServiceRequestSync_UAT_name_sites_ChangeTriggerServiceRequestSync_UAT_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
//   parent: sites_ChangeTriggerServiceRequestSync_UAT_name_resource
//   name: '${sites_ChangeTriggerServiceRequestSync_PROD_name}.azurewebsites.net'
//   location: 'South Central US'
//   properties: {
//     siteName: 'ChangeTriggerServiceRequestSync-PROD'
//     hostNameType: 'Verified'
//   }
// }

// //storage account
// param storageAccounts_rgmcapshelpuat878e_name string = 'rgmcapshelpprod878e'

// resource storageAccounts_rgmcapshelpuat878e_name_resource 'Microsoft.Storage/storageAccounts@2023-01-01' = {
//   name: storageAccounts_rgmcapshelpuat878e_name
//   location: 'southcentralus'
//   sku: {
//     name: 'Standard_LRS'
//     tier: 'Standard'
//   }
//   kind: 'Storage'
//   properties: {
//     defaultToOAuthAuthentication: true
//     allowCrossTenantReplication: false
//     minimumTlsVersion: 'TLS1_2'
//     allowBlobPublicAccess: false
//     networkAcls: {
//       resourceAccessRules: [
//         {
//           tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
//           resourceId: '/subscriptions/28367f8b-80f4-4eb1-a833-88a7108ea20e/providers/Microsoft.Security/datascanners/StorageDataScanner'
//         }
//       ]
//       bypass: 'AzureServices'
//       virtualNetworkRules: []
//       ipRules: []
//       defaultAction: 'Allow'
//     }
//     supportsHttpsTrafficOnly: true
//     encryption: {
//       services: {
//         file: {
//           keyType: 'Account'
//           enabled: true
//         }
//         blob: {
//           keyType: 'Account'
//           enabled: true
//         }
//       }
//       keySource: 'Microsoft.Storage'
//     }
//   }
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
//   parent: storageAccounts_rgmcapshelpuat878e_name_resource
//   name: 'default'
//   sku: {
//     name: 'Standard_LRS'
//     tier: 'Standard'
//   }
//   properties: {
//     cors: {
//       corsRules: []
//     }
//     deleteRetentionPolicy: {
//       allowPermanentDelete: false
//       enabled: false
//     }
//   }
// }

// resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/fileServices@2023-01-01' = {
//   parent: storageAccounts_rgmcapshelpuat878e_name_resource
//   name: 'default'
//   sku: {
//     name: 'Standard_LRS'
//     tier: 'Standard'
//   }
//   properties: {
//     protocolSettings: {
//       smb: {}
//     }
//     cors: {
//       corsRules: []
//     }
//     shareDeleteRetentionPolicy: {
//       enabled: true
//       days: 7
//     }
//   }
// }

// resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/queueServices@2023-01-01' = {
//   parent: storageAccounts_rgmcapshelpuat878e_name_resource
//   name: 'default'
//   properties: {
//     cors: {
//       corsRules: []
//     }
//   }
// }

// resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default 'Microsoft.Storage/storageAccounts/tableServices@2023-01-01' = {
//   parent: storageAccounts_rgmcapshelpuat878e_name_resource
//   name: 'default'
//   properties: {
//     cors: {
//       corsRules: []
//     }
//   }
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_azure_webjobs_hosts 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
//   parent: storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'azure-webjobs-hosts'
//   properties: {
//     immutableStorageWithVersioning: {
//       enabled: false
//     }
//     defaultEncryptionScope: '$account-encryption-key'
//     denyEncryptionScopeOverride: false
//     publicAccess: 'None'
//   }
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_azure_webjobs_secrets 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
//   parent: storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'azure-webjobs-secrets'
//   properties: {
//     immutableStorageWithVersioning: {
//       enabled: false
//     }
//     defaultEncryptionScope: '$account-encryption-key'
//     denyEncryptionScopeOverride: false
//     publicAccess: 'None'
//   }
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_sql_db_backup 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
//   parent: storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'sql-db-backup'
//   properties: {
//     immutableStorageWithVersioning: {
//       enabled: false
//     }
//     defaultEncryptionScope: '$account-encryption-key'
//     denyEncryptionScopeOverride: false
//     publicAccess: 'None'
//   }
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// // resource storageAccounts_rgmcapshelpuat878e_name_default_changetriggerservicerequestsync_uat9e82 'Microsoft.Storage/storageAccounts/fileServices/shares@2023-01-01' = {
// //   parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_rgmcapshelpuat878e_name_default
// //   name: 'changetriggerservicerequestsync-uat9e82'
// //   properties: {
// //     accessTier: 'TransactionOptimized'
// //     shareQuota: 5120
// //     enabledProtocols: 'SMB'
// //   }
// //   dependsOn: [

// //     storageAccounts_rgmcapshelpuat878e_name_resource
// //   ]
// // }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7jobtriggers00 'Microsoft.Storage/storageAccounts/queueServices/queues@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_queueServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7jobtriggers00'
//   properties: {
//     metadata: {}
//   }
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_AzureFunctionsDiagnosticEvents202401 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'AzureFunctionsDiagnosticEvents202401'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_AzureFunctionsScaleMetrics202402 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'AzureFunctionsScaleMetrics202402'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240125t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f920240125t000000zactions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240129t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f920240129t000000zactions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240207t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f920240207t000000zactions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240209t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f920240209t000000zactions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240215t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f920240215t000000zactions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f920240216t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f920240216t000000zactions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f9flows 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f9flows'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f9histories 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f9histories'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e725010deb347f3f9runs 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e725010deb347f3f9runs'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3ac20240123t000000zactions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7fb0cf3486beb3ac20240123t000000zactions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3acflows 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7fb0cf3486beb3acflows'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3achistories 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7fb0cf3486beb3achistories'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7fb0cf3486beb3acruns 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7fb0cf3486beb3acruns'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowaccesskeys 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7flowaccesskeys'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowruntimecontext 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7flowruntimecontext'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flows 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7flows'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowsubscriptions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7flowsubscriptions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7flowsubscriptionsummary 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7flowsubscriptionsummary'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

// resource storageAccounts_rgmcapshelpuat878e_name_default_flowfb76df7234c57e7jobdefinitions 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
//   parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_rgmcapshelpuat878e_name_default
//   name: 'flowfb76df7234c57e7jobdefinitions'
//   properties: {}
//   dependsOn: [

//     storageAccounts_rgmcapshelpuat878e_name_resource
//   ]
// }

//DataFactory
resource azureDataFactory 'Microsoft.DataFactory/factories@2018-06-01' = {
  name: 'MCAPSHELP-ADF-ConfigApp-PROD'
  location: 'South Central US'
  identity: {
    type: 'SystemAssigned'
    // userAssignedIdentities: {}
  }
}
