param serverfarms_RGMCAPSHELPUAT_name string = 'RGMCAPSHELPUAT'

resource serverfarms_RGMCAPSHELPUAT_name_resource 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: serverfarms_RGMCAPSHELPUAT_name
  location: 'South Central US'
  sku: {
    name: 'S1'
    tier: 'Standard'
    size: 'S1'
    family: 'S'
    capacity: 1
  }
  kind: 'windows'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}




param sites_mcapshelpuat_name string = 'mcapshelpuat'
param serverfarms_RGMCAPSHELPUAT_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-UAT/providers/Microsoft.Web/serverfarms/RGMCAPSHELPUAT'
param virtualNetworks_vnet_wybduynw_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-UAT/providers/Microsoft.Network/virtualNetworks/vnet-wybduynw'

resource sites_mcapshelpuat_name_resource 'Microsoft.Web/sites@2023-01-01' = {
  name: sites_mcapshelpuat_name
  location: 'South Central US'
  kind: 'app'
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${sites_mcapshelpuat_name}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${sites_mcapshelpuat_name}.microsoft.com'
        sslState: 'SniEnabled'
        thumbprint: '75D2D8F89E360AE21E0E565B1D2311CE941C086D'
        hostType: 'Standard'
      }
      {
        name: '${sites_mcapshelpuat_name}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: serverfarms_RGMCAPSHELPUAT_externalid
    reserved: false
    isXenon: false
    hyperV: false
    vnetRouteAllEnabled: true
    vnetImagePullEnabled: false
    vnetContentShareEnabled: false
    siteConfig: {
      numberOfWorkers: 1
      windowsFxVersion: 'DOTNET|6'
      acrUseManagedIdentityCreds: false
      alwaysOn: true
      http20Enabled: false
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: true
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    customDomainVerificationId: '9F9107B169DA2736F547049B0B61BFF109F9FBBD2279E5832E4F1160286751EE'
    containerSize: 0
    dailyMemoryTimeQuota: 0
    httpsOnly: true
    redundancyMode: 'None'
    storageAccountRequired: false
    virtualNetworkSubnetId: '${virtualNetworks_vnet_wybduynw_externalid}/subnets/subnet-geemfhht'
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

resource sites_mcapshelpuat_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: 'ftp'
  location: 'South Central US'
  properties: {
    allow: false
  }
}

resource sites_mcapshelpuat_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: 'scm'
  location: 'South Central US'
  properties: {
    allow: false
  }
}

resource sites_mcapshelpuat_name_web 'Microsoft.Web/sites/config@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: 'web'
  location: 'South Central US'
  properties: {
    numberOfWorkers: 1
    defaultDocuments: [
      'Default.htm'
      'Default.html'
      'Default.asp'
      'index.htm'
      'index.html'
      'iisstart.htm'
      'default.aspx'
      'index.php'
      'hostingstart.html'
    ]
    netFrameworkVersion: 'v6.0'
    windowsFxVersion: 'DOTNET|6'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    remoteDebuggingVersion: 'VS2019'
    httpLoggingEnabled: false
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: false
    publishingUsername: '$mcapshelpuat'
    scmType: 'VSTSRM'
    use32BitWorkerProcess: true
    webSocketsEnabled: false
    alwaysOn: true
    managedPipelineMode: 'Integrated'
    virtualApplications: [
      {
        virtualPath: '/'
        physicalPath: 'site\\wwwroot'
        preloadEnabled: true
      }
    ]
    loadBalancing: 'LeastRequests'
    experiments: {
      rampUpRules: []
    }
    autoHealEnabled: false
    vnetName: 'a865690d-4cb3-4407-bd34-d9f15db36ba8_subnet-geemfhht'
    vnetRouteAllEnabled: true
    vnetPrivatePortsCount: 0
    cors: {
      allowedOrigins: [
        '*'
        'https://iris-api-dev.azurewebsites.net'
        'https://localhost:3000'
      ]
      supportCredentials: false
    }
    localMySqlEnabled: false
    ipSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 2147483647
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 2147483647
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictionsUseMain: false
    http20Enabled: false
    minTlsVersion: '1.2'
    scmMinTlsVersion: '1.2'
    ftpsState: 'FtpsOnly'
    preWarmedInstanceCount: 0
    elasticWebAppScaleLimit: 0
    functionsRuntimeScaleMonitoringEnabled: false
    minimumElasticInstanceCount: 0
    azureStorageAccounts: {}
  }
}

resource sites_mcapshelpuat_name_0419d5cb39454e53acda8dca2d729aee 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '0419d5cb39454e53acda8dca2d729aee'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-02-05T16:35:50.9381424Z'
    end_time: '2024-02-05T16:35:51.3133658Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_43cfc38884914c90a429c89b03c5c01f 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '43cfc38884914c90a429c89b03c5c01f'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-02-02T06:59:53.7202782Z'
    end_time: '2024-02-02T06:59:54.1734086Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_5a9b1d42aa4946e38d2487743b37621e 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '5a9b1d42aa4946e38d2487743b37621e'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-02-06T10:58:16.6520944Z'
    end_time: '2024-02-06T10:58:17.022712Z'
    active: true
  }
}

resource sites_mcapshelpuat_name_6926ac57e45a4477a2e9e8473e33259b 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '6926ac57e45a4477a2e9e8473e33259b'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-01-30T06:52:25.9578893Z'
    end_time: '2024-01-30T06:52:26.4263369Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_6f648cbe657f4f2c822f05d24fad16b7 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '6f648cbe657f4f2c822f05d24fad16b7'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-01-24T10:58:24.6158099Z'
    end_time: '2024-01-24T10:58:25.0244804Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_7fa49078e1b640108c4576f76509f769 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '7fa49078e1b640108c4576f76509f769'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'N/A'
    deployer: 'VSTS'
    message: '{"type":"deployment","commitId":"00a2f4ee841836c6166b9dbcb337a898b7859c02","buildId":"797690","buildNumber":"MCAPSHelp_UI_20240201.6","repoProvider":"TfsGit","repoName":"MCAPSHelp Vnext","collectionUrl":"https://vsogd.visualstudio.com/","teamProject":"8a0d7512-60c1-4a34-b059-27d622ba0f08","buildProjectUrl":"https://vsogd.visualstudio.com/8a0d7512-60c1-4a34-b059-27d622ba0f08","repositoryUrl":"https://vsogd.visualstudio.com/MCAPSHelp/_git/MCAPSHelp%20Vnext","branch":"PreMain_UAT","teamProjectName":"MCAPSHelp","slotName":"production"}'
    start_time: '2024-02-01T09:16:39.752253Z'
    end_time: '2024-02-01T09:16:40.1650232Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_925647df53084562a890d6be6d6ebe10 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '925647df53084562a890d6be6d6ebe10'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-02-05T16:15:47.7502956Z'
    end_time: '2024-02-05T16:15:48.1721805Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_c6bf4c6a84144f83b86ad3fa4f49c6e6 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: 'c6bf4c6a84144f83b86ad3fa4f49c6e6'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-01-24T08:00:05.0011337Z'
    end_time: '2024-01-24T08:00:05.3625825Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_ce5cd2c9c49b42fe9448bcecff3da97f 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: 'ce5cd2c9c49b42fe9448bcecff3da97f'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-01-25T16:38:05.1159925Z'
    end_time: '2024-01-25T16:38:05.5222542Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_f2a85886925d47928836bec59ea6f315 'Microsoft.Web/sites/deployments@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: 'f2a85886925d47928836bec59ea6f315'
  location: 'South Central US'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'ms-azuretools-vscode'
    deployer: 'ms-azuretools-vscode'
    message: 'Created via a push deployment'
    start_time: '2024-02-05T18:12:22.3515176Z'
    end_time: '2024-02-05T18:12:22.6483974Z'
    active: false
  }
}

resource sites_mcapshelpuat_name_sites_mcapshelpuat_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '${sites_mcapshelpuat_name}.azurewebsites.net'
  location: 'South Central US'
  properties: {
    siteName: 'mcapshelpuat'
    hostNameType: 'Verified'
  }
}

resource sites_mcapshelpuat_name_sites_mcapshelpuat_name_microsoft_com 'Microsoft.Web/sites/hostNameBindings@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: '${sites_mcapshelpuat_name}.microsoft.com'
  location: 'South Central US'
  properties: {
    siteName: 'mcapshelpuat'
    hostNameType: 'Verified'
    sslState: 'SniEnabled'
    thumbprint: '75D2D8F89E360AE21E0E565B1D2311CE941C086D'
  }
}

resource sites_mcapshelpuat_name_a865690d_4cb3_4407_bd34_d9f15db36ba8_subnet_geemfhht 'Microsoft.Web/sites/virtualNetworkConnections@2023-01-01' = {
  parent: sites_mcapshelpuat_name_resource
  name: 'a865690d-4cb3-4407-bd34-d9f15db36ba8_subnet-geemfhht'
  location: 'South Central US'
  properties: {
    vnetResourceId: '${virtualNetworks_vnet_wybduynw_externalid}/subnets/subnet-geemfhht'
    isSwift: true
  }
}
