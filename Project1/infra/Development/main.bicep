param Env string
param devASPlan string
param devUIApp string
param location string
param pSKUName string = (Env == 'dev') ? 'F1' : 'S1'
param pdevUIAppservice bool

//AFD param for DEV
param frontdoorName string
param devAFDEndpoint string
param devoriginGroup string
param devApiURL string
param devwafPolicyName string
param devwafMode string
param devSecurityPolicy string

param externalAPIEndpoint string
param extoriginGroup string
param extApiURL string
param extwafPolicyName string
param extwafMode string
param extSecurityPolicy string

param uatAFDEndpoint string
param uatoriginGroup string
param uatApiURL string
param uatwafPolicyName string
param uatwafMode string
param uatSecurityPolicy string

module devUIappServicePlan 'modules/uiDev.bicep' = {
  name: 'deploy-${devASPlan}&${devUIApp}'
  params: {
    devASPlan: devASPlan
    devUIApp: devUIApp
    location: location
    pSKUName: pSKUName
    pEnv: pdevUIAppservice

  }
}

@secure()
param devadministratorLoginPassword string
param ProdWebAPI string
param server_mcapshelp_name string
param serverfarms_ASP_RGMCAPSHELPPROD string
param vaults_MCAPSHELPKeyVaultDEV_name string

module apiDev 'modules/apiDev.bicep' = {
  name: 'deploy-${ProdWebAPI}&${server_mcapshelp_name}${vaults_MCAPSHELPKeyVaultDEV_name}'
  params: {
    devadministratorLoginPassword: devadministratorLoginPassword
    location: location
    ProdWebAPI: ProdWebAPI
    server_mcapshelp_name: server_mcapshelp_name
    serverfarms_ASP_RGMCAPSHELPPROD: serverfarms_ASP_RGMCAPSHELPPROD
    vaults_MCAPSHELPKeyVaultDEV_name: vaults_MCAPSHELPKeyVaultDEV_name
  }
}

module devAFD 'modules/devAFD.bicep' = {
  name: 'deploy-${frontdoorName}'
  params: {
    devAFDEndpoint: devAFDEndpoint
    devApiURL: devApiURL
    devoriginGroup: devoriginGroup
    devSecurityPolicy: devSecurityPolicy
    devwafMode: devwafMode
    devwafPolicyName: devwafPolicyName
    extApiURL: extApiURL
    externalAPIEndpoint: externalAPIEndpoint
    extoriginGroup: extoriginGroup
    extSecurityPolicy: extSecurityPolicy
    extwafMode: extwafMode
    extwafPolicyName: extwafPolicyName
    frontdoorName: frontdoorName
    uatAFDEndpoint: uatAFDEndpoint
    uatApiURL: uatApiURL
    uatoriginGroup: uatoriginGroup
    uatSecurityPolicy: uatSecurityPolicy
    uatwafMode: uatwafMode
    uatwafPolicyName: uatwafPolicyName
  }
}
