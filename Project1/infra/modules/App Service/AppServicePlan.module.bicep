
param ASPlan string
param location string
param pSKUName string
param appServicePlanTier string
param appServicePlanSize string
param appServicePlanFamily string
param appServicePlanKind string
param appServicePlanElasticScale bool
param appServicePlanMinWorkerCount int

resource appService 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: ASPlan
  location: location
  sku: {
    name: pSKUName
    tier: appServicePlanTier
    size: appServicePlanSize
    family: appServicePlanFamily
    capacity: 1
  }
  kind: appServicePlanKind
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: appServicePlanElasticScale
    maximumElasticWorkerCount: appServicePlanMinWorkerCount
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

output appServicePlanId string = appService.id
