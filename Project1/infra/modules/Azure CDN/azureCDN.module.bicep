param cdnProfileName string
param skuName string = 'Standard_Microsoft'
param originUrl string
param prodcdnEndpoint string

resource cdnProfile 'Microsoft.Cdn/profiles@2024-02-01' = {
  name: cdnProfileName
  location: 'Global'
  sku: {
    name: skuName
  }
  properties: {}
}

resource profiles_mcaphelpnonprod_name_mcapshelpdevhome 'Microsoft.Cdn/profiles/endpoints@2024-02-01' = {
  parent: cdnProfile
  name: 'mcapshelpprodhome'
  location: 'Global'
  properties: {
    originHostHeader: originUrl
    contentTypesToCompress: [
      'application/eot'
      'application/font'
      'application/font-sfnt'
      'application/javascript'
      'application/json'
      'application/opentype'
      'application/otf'
      'application/pkcs7-mime'
      'application/truetype'
      'application/ttf'
      'application/vnd.ms-fontobject'
      'application/xhtml+xml'
      'application/xml'
      'application/xml+rss'
      'application/x-font-opentype'
      'application/x-font-truetype'
      'application/x-font-ttf'
      'application/x-httpd-cgi'
      'application/x-javascript'
      'application/x-mpegurl'
      'application/x-opentype'
      'application/x-otf'
      'application/x-perl'
      'application/x-ttf'
      'font/eot'
      'font/ttf'
      'font/otf'
      'font/opentype'
      'image/svg+xml'
      'text/css'
      'text/csv'
      'text/html'
      'text/javascript'
      'text/js'
      'text/plain'
      'text/richtext'
      'text/tab-separated-values'
      'text/xml'
      'text/x-script'
      'text/x-component'
      'text/x-java-source'
    ]
    isCompressionEnabled: true
    isHttpAllowed: true
    isHttpsAllowed: true
    queryStringCachingBehavior: 'IgnoreQueryString'
    origins: [
      {
        name: prodcdnEndpoint
        properties: {
          hostName: originUrl
          httpPort: 80
          httpsPort: 443
          originHostHeader: originUrl
          priority: 1
          weight: 1000
          enabled: true
        }
      }
    ]
    originGroups: []
    geoFilters: []
  }
}
