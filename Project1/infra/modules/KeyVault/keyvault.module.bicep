param keyVaultName string
param keyVaultLocation string
param skuFamily string 
param skuName string
param softDeleteRetentionInDays int
param enableSoftDelete bool

resource vaults_MCAPSHELPKeyVaultDEV_name_resource 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: keyVaultLocation
  properties: {
    sku: {
      family: skuFamily
      name: skuName
    }
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Deny'
      ipRules: [
        {
          value: '136.226.250.245/32'
        }
        {
          value: '165.225.124.248/32'
        }
        {
          value: '23.102.167.21/32'
        }
        {
          value: '23.102.164.125/32'
        }
        {
          value: '23.102.166.114/32'
        }
        {
          value: '23.102.162.188/32'
        }
        {
          value: '13.84.202.97/32'
        }
        {
          value: '104.210.215.22/32'
        }
        {
          value: '104.210.215.113/32'
        }
        {
          value: '20.118.104.67/32'
        }
        {
          value: '20.118.106.5/32'
        }
        {
          value: '20.118.109.161/32'
        }
        {
          value: '20.118.110.18/32'
        }
        {
          value: '20.118.110.34/32'
        }
        {
          value: '20.118.110.38/32'
        }
        {
          value: '20.118.110.94/32'
        }
        {
          value: '20.118.110.127/32'
        }
        {
          value: '20.118.108.230/32'
        }
        {
          value: '165.225.120.232/32'
        }
        {
          value: '136.226.232.112/32'
        }
        {
          value: '49.15.183.170/32'
        }
        {
          value: '152.58.16.38/32'
        }
        {
          value: '152.58.17.18/32'
        }
        {
          value: '49.205.250.251/32'
        }
        {
          value: '49.204.104.207/32'
        }
        {
          value: '136.226.245.17/32'
        }
        {
          value: '203.192.251.170/32'
        }
        {
          value: '110.227.52.183/32'
        }
        {
          value: '49.43.5.3/32'
        }
        {
          value: '52.152.99.174/32'
        }
        {
          value: '52.152.100.68/32'
        }
        {
          value: '52.152.100.129/32'
        }
        {
          value: '52.152.100.130/32'
        }
        {
          value: '52.185.210.142/32'
        }
        {
          value: '52.185.212.39/32'
        }
        {
          value: '52.255.87.17/32'
        }
        {
          value: '52.255.87.76/32'
        }
        {
          value: '52.255.87.132/32'
        }
        {
          value: '4.151.24.86/32'
        }
        {
          value: '4.151.24.117/32'
        }
        {
          value: '4.151.24.159/32'
        }
        {
          value: '4.151.24.167/32'
        }
        {
          value: '4.151.24.189/32'
        }
        {
          value: '4.151.24.190/32'
        }
        {
          value: '4.151.24.240/32'
        }
        {
          value: '4.151.24.243/32'
        }
        {
          value: '4.151.25.38/32'
        }
        {
          value: '52.185.212.161/32'
        }
        {
          value: '52.185.212.189/32'
        }
        {
          value: '52.185.213.88/32'
        }
        {
          value: '52.185.214.140/32'
        }
        {
          value: '52.185.215.73/32'
        }
        {
          value: '52.185.215.86/32'
        }
        {
          value: '52.185.215.92/32'
        }
        {
          value: '52.185.215.204/32'
        }
        {
          value: '52.255.80.23/32'
        }
        {
          value: '52.255.80.28/32'
        }
        {
          value: '52.255.80.254/32'
        }
        {
          value: '52.255.81.15/32'
        }
        {
          value: '52.255.81.117/32'
        }
        {
          value: '52.255.81.176/32'
        }
        {
          value: '52.255.86.8/32'
        }
        {
          value: '52.255.86.187/32'
        }
        {
          value: '4.151.26.147/32'
        }
        {
          value: '4.151.26.152/32'
        }
        {
          value: '4.151.26.167/32'
        }
        {
          value: '4.151.26.170/32'
        }
        {
          value: '4.151.26.173/32'
        }
        {
          value: '4.151.26.190/32'
        }
        {
          value: '182.68.159.132/32'
        }
        {
          value: '49.43.5.143/32'
        }
        {
          value: '49.204.111.227/32'
        }
        {
          value: '103.211.135.207/32'
        }
        {
          value: '103.175.62.41/32'
        }
        {
          value: '40.119.12.86/32'
        }
        {
          value: '49.204.106.96/32'
        }
        {
          value: '110.224.189.231/32'
        }
        {
          value: '49.43.5.116/32'
        }
        {
          value: '110.224.191.29/32'
        }
        {
          value: '152.58.25.73/32'
        }
        {
          value: '122.171.14.218/32'
        }
        {
          value: '157.48.156.201/32'
        }
        {
          value: '152.58.59.94/32'
        }
        {
          value: '182.68.172.36/32'
        }
        {
          value: '103.175.62.26/32'
        }
        {
          value: '117.222.86.222/32'
        }
        {
          value: '152.58.58.222/32'
        }
        {
          value: '152.58.58.136/32'
        }
        {
          value: '152.58.25.80/32'
        }
        {
          value: '117.223.57.229/32'
        }
        {
          value: '152.58.24.165/32'
        }
        {
          value: '152.58.24.215/32'
        }
        {
          value: '152.58.57.243/32'
        }
        {
          value: '152.58.24.148/32'
        }
        {
          value: '103.251.211.68/32'
        }
        {
          value: '152.58.57.43/32'
        }
        {
          value: '152.58.25.90/32'
        }
        {
          value: '152.58.59.47/32'
        }
        {
          value: '152.58.56.111/32'
        }
        {
          value: '152.58.25.124/32'
        }
        {
          value: '152.58.16.179/32'
        }
        {
          value: '103.170.183.117/32'
        }
        {
          value: '152.58.24.211/32'
        }
        {
          value: '20.118.109.37/32'
        }
        {
          value: '20.118.109.113/32'
        }
        {
          value: '20.118.104.118/32'
        }
        {
          value: '23.102.161.217/32'
        }
        {
          value: '110.227.50.152/32'
        }
        {
          value: '49.204.108.199/32'
        }
        {
          value: '49.43.225.68/32'
        }
        {
          value: '49.43.5.14/32'
        }
        {
          value: '103.175.63.204/32'
        }
        {
          value: '110.227.50.101/32'
        }
        {
          value: '110.227.59.9/32'
        }
        {
          value: '182.68.156.200/32'
        }
        {
          value: '171.61.24.109/32'
        }
        {
          value: '122.168.224.160/32'
        }
        {
          value: '103.211.134.29/32'
        }
        {
          value: '203.192.244.134/32'
        }
        {
          value: '223.237.238.4/32'
        }
        {
          value: '203.192.244.86/32'
        }
        {
          value: '43.241.64.98/32'
        }
        {
          value: '223.237.234.172/32'
        }
        {
          value: '203.192.253.234/32'
        }
        {
          value: '49.204.106.36/32'
        }
        {
          value: '20.37.155.74/32'
        }
        {
          value: '27.56.206.76/32'
        }
        {
          value: '49.43.155.62/32'
        }
        {
          value: '152.58.41.42/32'
        }
        {
          value: '152.58.41.83/32'
        }
        {
          value: '110.227.59.107/32'
        }
        {
          value: '49.43.155.247/32'
        }
        {
          value: '49.43.5.235/32'
        }
        {
          value: '20.40.230.49/32'
        }
        {
          value: '106.222.217.192/32'
        }
        {
          value: '103.171.247.205/32'
        }
        {
          value: '49.43.5.244/32'
        }
        {
          value: '203.192.204.110/32'
        }
        {
          value: '103.221.74.57/32'
        }
        {
          value: '117.241.244.77/32'
        }
        {
          value: '49.43.5.241/32'
        }
        {
          value: '203.192.253.143/32'
        }
        {
          value: '27.56.192.31/32'
        }
        {
          value: '101.0.62.41/32'
        }
        {
          value: '203.192.244.156/32'
        }
        {
          value: '203.192.244.210/32'
        }
        {
          value: '152.58.26.145/32'
        }
        {
          value: '122.164.182.100/32'
        }
        {
          value: '101.0.62.181/32'
        }
        {
          value: '49.43.153.169/32'
        }
        {
          value: '122.171.186.71/32'
        }
        {
          value: '49.43.5.212/32'
        }
        {
          value: '152.58.41.53/32'
        }
        {
          value: '152.58.27.120/32'
        }
        {
          value: '49.43.155.207/32'
        }
        {
          value: '152.58.196.14/32'
        }
        {
          value: '152.58.41.128/32'
        }
        {
          value: '152.58.27.239/32'
        }
        {
          value: '122.171.170.146/32'
        }
        {
          value: '157.40.65.224/32'
        }
        {
          value: '157.34.26.194/32'
        }
      ]
      virtualNetworkRules: []
    }
    accessPolicies: [
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '66bc6e37-78a6-425c-af72-e95b30d30530'
        permissions: {
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'ad0a8fa5-ed12-4084-900e-d7fc56f1c6c2'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '37f8da94-05e0-4f63-826a-7839092a0f8e'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'afe166c3-ab6a-4172-8e46-b77b610e0429'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '758905e7-06de-43a3-a53b-f251d97a6947'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '9be3bb09-3e5f-493d-a567-b147f17077d5'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '309ded77-35b3-494b-8dc4-3ed2cd160744'
        permissions: {
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '324d283b-4cc2-4275-b096-aeea04c3dfd1'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'a13a6457-2118-4b85-9f4d-9cc3436f43eb'
        permissions: {
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'b4c73788-2caa-410d-9541-d1503643db48'
        permissions: {
          keys: []
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: '8d7eed22-2498-496e-a24a-210adb278b3b'
        permissions: {
          keys: []
          secrets: [
            'Get'
            'List'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'a15ef59c-7625-4e64-802d-678bb82684fc'
        permissions: {
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
          ]
          certificates: []
        }
      }
      {
        tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47'
        objectId: 'ade43870-4ede-44d7-bb5e-b1e15f8e17e9'
        permissions: {
          certificates: []
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
        }
      }
    ]
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: true
    enableSoftDelete: enableSoftDelete
    softDeleteRetentionInDays: softDeleteRetentionInDays
    enableRbacAuthorization: false
    enablePurgeProtection: true
    vaultUri: 'https://${keyVaultName}.vault.azure.net/'
    provisioningState: 'Succeeded'
    publicNetworkAccess: 'Enabled'
  }
}
