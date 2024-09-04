param frontdoorName string = 'RG-MCAPSHELP-DEV-AFD-Resource'
param devAFDEndpoint string = 'mcapshelpdevapi'
param devoriginGroup string = 'mcapshelpdevapiorigingroup'
param devApiURL string
param devwafPolicyName string = 'WAFmcapshelpdev'
param devwafMode string = 'Detection'
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
// param location string



// Frontdoor
resource frontdoorProfile 'Microsoft.Cdn/profiles@2021-06-01' = {
  name: frontdoorName
  location: 'Global'
  sku: {
    name: 'Premium_AzureFrontDoor'
  }
}

resource devfrontdoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2021-06-01' = {
  name: devAFDEndpoint
  location: 'Global'
  parent: frontdoorProfile
  properties: {
    enabledState: 'Enabled'
  }
}

resource devfrontdoorOriginGroup 'Microsoft.Cdn/profiles/originGroups@2021-06-01' = {
  name: devoriginGroup
  parent: frontdoorProfile
  properties: {
    healthProbeSettings: {
      probePath: '/'
      probeIntervalInSeconds: 120
      probeProtocol: 'Https'
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
  name: devApiURL
  parent: devfrontdoorOriginGroup
  properties: {
    hostName: '${devApiURL}.azurewebsites.net'
    httpPort: 80
    httpsPort: 443
    originHostHeader: '${devApiURL}.azurewebsites.net'
    priority: 1
    weight: 1000
    enabledState: 'Enabled'
    enforceCertificateNameCheck: true
  }
}

resource devwafPolicy 'Microsoft.Network/FrontDoorWebApplicationFirewallPolicies@2022-05-01' = {
  name: devwafPolicyName
  sku: {
    name: 'Premium_AzureFrontDoor'
  }
  location: 'Global'
  properties: {
    policySettings: {
      mode: devwafMode
      requestBodyCheck: 'Enabled'
      enabledState: 'Enabled'
    }
    managedRules: {
      managedRuleSets: [
        {
          ruleSetType: 'Microsoft_DefaultRuleSet'
          ruleSetVersion: '2.0'
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
  name: devSecurityPolicy
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
  name: 'default'
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
    forwardingProtocol: 'MatchRequest'
    linkToDefaultDomain: 'Enabled'
  } 
}


//external AFD
resource extfrontdoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2021-06-01' = {
  name: externalAPIEndpoint
  location: 'Global'
  parent: frontdoorProfile
  properties: {
    enabledState: 'Enabled'
  }
}

resource extfrontdoorOriginGroup 'Microsoft.Cdn/profiles/originGroups@2021-06-01' = {
  name: extoriginGroup
  parent: frontdoorProfile
  properties: {
    healthProbeSettings: {
      probePath: '/'
      probeIntervalInSeconds: 120
      probeProtocol: 'Https'
      probeRequestType: 'HEAD'
    }
    loadBalancingSettings: {
      sampleSize: 4
      additionalLatencyInMilliseconds: 50
      successfulSamplesRequired: 3
    }
  }
}

resource extwebAppOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2021-06-01' = {
  name: extApiURL
  parent: extfrontdoorOriginGroup
  properties: {
    hostName: '${extApiURL}.azurewebsites.net'
    httpPort: 80
    httpsPort: 443
    originHostHeader: '${extApiURL}.azurewebsites.net'
    priority: 1
    weight: 1000
    enabledState: 'Enabled'
    enforceCertificateNameCheck: true
  }
}

resource extwafPolicy 'Microsoft.Network/FrontDoorWebApplicationFirewallPolicies@2022-05-01' = {
  name: extwafPolicyName
  sku: {
    name: 'Premium_AzureFrontDoor'
  }
  location: 'Global'
  properties: {
    policySettings: {
      mode: extwafMode
      requestBodyCheck: 'Enabled'
      enabledState: 'Enabled'
    }
    managedRules: {
      managedRuleSets: [
        {
          ruleSetType: 'Microsoft_DefaultRuleSet'
          ruleSetVersion: '2.0'
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

resource extwaf 'Microsoft.Cdn/profiles/securityPolicies@2021-06-01' = {
  name: extSecurityPolicy
  parent: frontdoorProfile
  properties: {
    parameters: {
      type: 'WebApplicationFirewall'
      wafPolicy: {
        id: extwafPolicy.id
      }
      associations: [
        {
          domains: [
            {
              id: extfrontdoorEndpoint.id
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

resource extfrontdoorRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2021-06-01' = {
  name: 'default'
  parent: extfrontdoorEndpoint
  dependsOn: [
    extwebAppOrigin
  ]
  properties: {
    originGroup: {
      id: extfrontdoorOriginGroup.id
    }
    supportedProtocols: [
      'Http' 
      'Https'
    ]
    patternsToMatch: [
      '/*'
    ]
    httpsRedirect: 'Enabled'
    forwardingProtocol: 'MatchRequest'
    linkToDefaultDomain: 'Enabled'
  } 
}

//UAT AFD Endpoint
resource uatfrontdoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2021-06-01' = {
  name: uatAFDEndpoint
  location: 'Global'
  parent: frontdoorProfile
  properties: {
    enabledState: 'Enabled'
  }
}

resource uatfrontdoorOriginGroup 'Microsoft.Cdn/profiles/originGroups@2021-06-01' = {
  name: uatoriginGroup
  parent: frontdoorProfile
  properties: {
    healthProbeSettings: {
      probePath: '/'
      probeIntervalInSeconds: 120
      probeProtocol: 'Https'
      probeRequestType: 'HEAD'
    }
    loadBalancingSettings: {
      sampleSize: 4
      additionalLatencyInMilliseconds: 50
      successfulSamplesRequired: 3
    }
  }
}

resource uatwebAppOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2021-06-01' = {
  name: uatApiURL
  parent: uatfrontdoorOriginGroup
  properties: {
    hostName: '${extApiURL}.azurewebsites.net'
    httpPort: 80
    httpsPort: 443
    originHostHeader: '${extApiURL}.azurewebsites.net'
    priority: 1
    weight: 1000
    enabledState: 'Enabled'
    enforceCertificateNameCheck: true
  }
}

resource uatwafPolicy 'Microsoft.Network/FrontDoorWebApplicationFirewallPolicies@2022-05-01' = {
  name: uatwafPolicyName
  sku: {
    name: 'Premium_AzureFrontDoor'
  }
  location: 'Global'
  properties: {
    policySettings: {
      mode: uatwafMode
      requestBodyCheck: 'Enabled'
      enabledState: 'Enabled'
    }
    managedRules: {
      managedRuleSets: [
        {
          ruleSetType: 'Microsoft_DefaultRuleSet'
          ruleSetVersion: '2.0'
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

resource uatwaf 'Microsoft.Cdn/profiles/securityPolicies@2021-06-01' = {
  name: uatSecurityPolicy
  parent: frontdoorProfile
  properties: {
    parameters: {
      type: 'WebApplicationFirewall'
      wafPolicy: {
        id: uatwafPolicy.id
      }
      associations: [
        {
          domains: [
            {
              id: uatfrontdoorEndpoint.id
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

resource uatfrontdoorRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2021-06-01' = {
  name: 'default'
  parent: uatfrontdoorEndpoint
  dependsOn: [
    uatwebAppOrigin
  ]
  properties: {
    originGroup: {
      id: uatfrontdoorOriginGroup.id
    }
    supportedProtocols: [
      'Http' 
      'Https'
    ]
    patternsToMatch: [
      '/*'
    ]
    httpsRedirect: 'Enabled'
    forwardingProtocol: 'MatchRequest'
    linkToDefaultDomain: 'Enabled'
  } 
}
