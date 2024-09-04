param frontdoorName string
param AFDEndpoint string
param originGroup string
param ApiURL string
param wafPolicyName string
param wafMode string
param SecurityPolicy string
param AFDRoute string


// Frontdoor
resource frontdoorProfile 'Microsoft.Cdn/profiles@2021-06-01' = {
  name: frontdoorName
  location: 'Global'
  sku: {
    name: 'Premium_AzureFrontDoor'
  }
}

resource devfrontdoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2021-06-01' = {
  name: AFDEndpoint
  location: 'Global'
  parent: frontdoorProfile
  properties: {
    enabledState: 'Enabled'
  }
}

resource devfrontdoorOriginGroup 'Microsoft.Cdn/profiles/originGroups@2021-06-01' = {
  name: originGroup
  parent: frontdoorProfile
  properties: {
    healthProbeSettings: {
      probePath: '/'
      probeIntervalInSeconds: 100
      probeProtocol: 'Http'
      probeRequestType: 'HEAD'
    }
    loadBalancingSettings: {
      sampleSize: 4
      additionalLatencyInMilliseconds: 50
      successfulSamplesRequired: 3
    }
  }
}

resource devwebAppOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2021-06-01' = {
  name: ApiURL
  parent: devfrontdoorOriginGroup
  properties: {
    hostName: '${ApiURL}.azurewebsites.net'
    httpPort: 80
    httpsPort: 443
    originHostHeader: '${ApiURL}.azurewebsites.net'
    priority: 1
    weight: 1000
    enabledState: 'Enabled'
    enforceCertificateNameCheck: true
  }
}

resource devwafPolicy 'Microsoft.Network/FrontDoorWebApplicationFirewallPolicies@2022-05-01' = {
  name: wafPolicyName
  sku: {
    name: 'Premium_AzureFrontDoor'
  }
  location: 'Global'
  properties: {
    policySettings: {
      mode: wafMode
      requestBodyCheck: 'Enabled'
      enabledState: 'Enabled'
    }
    managedRules: {
      managedRuleSets: [
        {
          ruleSetType: 'Microsoft_DefaultRuleSet'
          ruleSetVersion: '2.1'
          ruleSetAction: 'Block'
          ruleGroupOverrides: [
            {
              ruleGroupName: 'PROTOCOL-ENFORCEMENT'
              rules: [
                {
                  ruleId: '920440'
                  enabledState: 'Enabled'
                  action: 'AnomalyScoring'
                  exclusions: []
                }
              ]
              exclusions: []
            }
            {
              ruleGroupName: 'General'
              rules: [
                {
                  ruleId: '200002'
                  enabledState: 'Disabled'
                  action: 'AnomalyScoring'
                  exclusions: []
                }
                {
                  ruleId: '200003'
                  enabledState: 'Disabled'
                  action: 'AnomalyScoring'
                  exclusions: []
                }
              ]
              exclusions: []
            }
          ]
          exclusions: []
        }
        {
          ruleSetType: 'Microsoft_BotManagerRuleSet'
          ruleSetVersion: '1.0'
          ruleGroupOverrides: []
          exclusions: []
        }
      ]
    }
  }
}

resource devwaf 'Microsoft.Cdn/profiles/securityPolicies@2021-06-01' = {
  name: SecurityPolicy
  parent: frontdoorProfile
  properties: {
    parameters: {
      type: 'WebApplicationFirewall'
      wafPolicy: {
        id: devwafPolicy.id
      }
      associations: [
        {
          domains: [
            {
              id: devfrontdoorEndpoint.id
            }
          ]
          patternsToMatch: [
             '/*'
          ]
        }
      ]
    }
  }
}

resource devfrontdoorRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2021-06-01' = {
  name: AFDRoute
  parent: devfrontdoorEndpoint
  dependsOn: [
    devwebAppOrigin
  ]
  properties: {
    originGroup: {
      id: devfrontdoorOriginGroup.id
    }
    supportedProtocols: [
      'Http' 
      'Https'
    ]
    patternsToMatch: [
      '/*'
    ]
    httpsRedirect: 'Enabled'
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
  } 
}
