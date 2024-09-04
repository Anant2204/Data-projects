param workflows_ECIFGetAllCasesList_Dev_name string = 'ECIFGetAllCasesList-UAT'
// param connections_sql_4_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/sql-4'

resource workflows_ECIFGetAllCasesList_Dev_name_resource 'Microsoft.Logic/workflows@2017-07-01' = {
  name: workflows_ECIFGetAllCasesList_Dev_name
  location: 'southcentralus'
  properties: {
    state: 'Enabled'
    definition: {
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      contentVersion: '1.0.0.0'
      parameters: {
        '$connections': {
          defaultValue: {}
          type: 'Object'
        }
      }
      triggers: {
        manual: {
          type: 'Request'
          kind: 'Http'
          inputs: {
            schema: {
              properties: {
                FirstName: {
                  type: 'string'
                }
                LastName: {
                  type: 'string'
                }
              }
              required: [
                'FirstName'
                'LastName'
              ]
              type: 'object'
            }
          }
        }
      }
      actions: {
        Condition: {
          actions: {
            Response: {
              runAfter: {}
              type: 'Response'
              kind: 'Http'
              inputs: {
                body: '@outputs(\'Query_OneAskDB\')[\'body\'][\'ResultSets\'][\'Table1\']'
                statusCode: 200
              }
            }
          }
          runAfter: {
            Query_OneAskDB: [
              'Succeeded'
            ]
          }
          else: {
            actions: {
              Response_2: {
                runAfter: {}
                type: 'Response'
                kind: 'Http'
                inputs: {
                  body: 'You have no ECIF cases \nPlease use the +Get started button on the right to request support'
                  statusCode: 404
                }
              }
            }
          }
          expression: {
            and: [
              {
                not: {
                  equals: [
                    '@equals(string(outputs(\'Query_OneAskDB\')?[\'body\'][\'ResultSets\']),\'{}\')'
                    '@true'
                  ]
                }
              }
            ]
          }
          type: 'If'
        }
        Initialize_variable: {
          runAfter: {}
          type: 'InitializeVariable'
          inputs: {
            variables: [
              {
                name: 'FullName'
                type: 'string'
                value: '@{concat(triggerBody()[\'FirstName\'],\' \',triggerBody()[\'LastName\'])}'
              }
            ]
          }
        }
        Query_OneAskDB: {
          runAfter: {
            Initialize_variable: [
              'Succeeded'
            ]
          }
          type: 'ApiConnection'
          inputs: {
            body: {
              query: 'select [Case Request Id], [Status], [Requester], [Delivery Start Date], [Delivery End Date] from [dbo].[Case Details] where [Requester]=\'@{variables(\'FullName\')}\' order by [Delivery Start Date] desc '
            }
            host: {
              connection: {
                name: '@parameters(\'$connections\')[\'sql\'][\'connectionId\']'
              }
            }
            method: 'post'
            path: '/v2/datasets/@{encodeURIComponent(encodeURIComponent(\'opsbiuatsecondary.database.windows.net\'))},@{encodeURIComponent(encodeURIComponent(\'oneaskuat\'))}/query/sql'
          }
        }
      }
      outputs: {}
    }
    parameters: {
      // '$connections': {
      //   value: {
      //     sql: {
      //       connectionId: connections_sql_4_externalid
      //       connectionName: 'sql-4'
      //       id: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Web/locations/southcentralus/managedApis/sql'
      //     }
      //   }
      // }
    }
  }
}


param workflows_ECIFGetAllECIFProgramsList_Dev_name string = 'ECIFGetAllECIFProgramsList-UAT'
// param connections_sql_4_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/sql-4'

resource workflows_ECIFGetAllECIFProgramsList_Dev_name_resource 'Microsoft.Logic/workflows@2017-07-01' = {
  name: workflows_ECIFGetAllECIFProgramsList_Dev_name
  location: 'southcentralus'
  properties: {
    state: 'Enabled'
    definition: {
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      contentVersion: '1.0.0.0'
      parameters: {
        '$connections': {
          defaultValue: {}
          type: 'Object'
        }
      }
      triggers: {
        manual: {
          type: 'Request'
          kind: 'Http'
          inputs: {
            method: 'GET'
            schema: {}
          }
        }
      }
      actions: {
        Check_If_SQL_returned_empty_list: {
          actions: {
            Response: {
              runAfter: {}
              type: 'Response'
              kind: 'Http'
              inputs: {
                body: '@outputs(\'Get_All_ECIF_Programs\')[\'body\'][\'ResultSets\'][\'Table1\']'
                statusCode: 200
              }
            }
          }
          runAfter: {
            Get_All_ECIF_Programs: [
              'Succeeded'
            ]
          }
          else: {
            actions: {
              Response_2: {
                runAfter: {}
                type: 'Response'
                kind: 'Http'
                inputs: {
                  body: 'There are no ECIF Programs available\nPlease use the +Get started button on the right to request support'
                  statusCode: 404
                }
              }
            }
          }
          expression: {
            and: [
              {
                not: {
                  equals: [
                    '@equals(string(outputs(\'Get_All_ECIF_Programs\')?[\'body\'][\'ResultSets\']), \'{}\')'
                    '@true'
                  ]
                }
              }
            ]
          }
          type: 'If'
        }
        Check_which_YY_to_use: {
          actions: {
            Set_variable: {
              runAfter: {}
              type: 'SetVariable'
              inputs: {
                name: 'FiscalYear'
                value: '@{substring(string(add(int(formatDateTime(utcNow(), \'yyyy\')), 1)), 2, 2)}'
              }
            }
          }
          runAfter: {
            FiscalYearEndDay: [
              'Succeeded'
            ]
          }
          else: {
            actions: {
              Set_variable_2: {
                runAfter: {}
                type: 'SetVariable'
                inputs: {
                  name: 'FiscalYear'
                  value: '@{substring(string(int(formatDateTime(utcNow(), \'yyyy\'))), 2, 2)}'
                }
              }
            }
          }
          expression: {
            and: [
              {
                greaterOrEquals: [
                  '@utcNow()'
                  '@outputs(\'FiscalYearStartDay\')'
                ]
              }
              {
                lessOrEquals: [
                  '@utcNow()'
                  '@outputs(\'FiscalYearEndDay\')'
                ]
              }
            ]
          }
          type: 'If'
        }
        FiscalYearEndDay: {
          runAfter: {
            FiscalYearStartDay: [
              'Succeeded'
            ]
          }
          type: 'Compose'
          inputs: '@concat(add(int(string(add(int(formatDateTime(utcNow(), \'yyyy\')), 1))), 0), \'-06-30\')'
        }
        FiscalYearStartDay: {
          runAfter: {
            Initialize_Fiscal_Year_Variable: [
              'Succeeded'
            ]
          }
          type: 'Compose'
          inputs: '@concat(formatDateTime(utcNow(), \'yyyy\'), \'-07-01\')'
        }
        Get_All_ECIF_Programs: {
          runAfter: {
            Check_which_YY_to_use: [
              'Succeeded'
            ]
          }
          type: 'ApiConnection'
          inputs: {
            body: {
              query: 'select distinct [Program Name], [ProgramIDtext], [Area Name], [Owner], [Program Type] from dbo.[Program Details] where [Program Fiscal Year] = \'FY@{variables(\'FiscalYear\')}\' AND [Program Status] = \'Published\' AND [Program Type] != \'Azure Credit Offer\' AND [Program Type] != \'Azure Credit Offer - PIR\'AND [ProgramIDtext] != \'2132\'AND [ProgramIDtext] != \'2158\'AND [ProgramIDtext] != \'2157\'order by [Program Name] asc  '
            }
            host: {
              connection: {
                name: '@parameters(\'$connections\')[\'sql_1\'][\'connectionId\']'
              }
            }
            method: 'post'
            path: '/v2/datasets/@{encodeURIComponent(encodeURIComponent(\'opsbiuatsecondary.database.windows.net\'))},@{encodeURIComponent(encodeURIComponent(\'oneaskuat\'))}/query/sql'
          }
        }
        Initialize_Fiscal_Year_Variable: {
          runAfter: {}
          type: 'InitializeVariable'
          inputs: {
            variables: [
              {
                name: 'FiscalYear'
                type: 'string'
                value: '@{substring(string(add(int(formatDateTime(utcNow(), \'yyyy\')), 1)), 2, 2)}'
              }
            ]
          }
        }
      }
      outputs: {}
    }
    parameters: {
      // '$connections': {
      //   value: {
      //     sql_1: {
      //       connectionId: connections_sql_4_externalid
      //       connectionName: 'sql-4'
      //       id: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Web/locations/southcentralus/managedApis/sql'
      //     }
      //   }
      // }
    }
  }
}

param workflows_ECIFGetPOStatus_Dev_name string = 'ECIFGetPOStatus-UAT'
// param connections_sql_4_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/sql-4'

resource workflows_ECIFGetPOStatus_Dev_name_resource 'Microsoft.Logic/workflows@2017-07-01' = {
  name: workflows_ECIFGetPOStatus_Dev_name
  location: 'southcentralus'
  properties: {
    state: 'Enabled'
    definition: {
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      contentVersion: '1.0.0.0'
      parameters: {
        '$connections': {
          defaultValue: {}
          type: 'Object'
        }
      }
      triggers: {
        manual: {
          type: 'Request'
          kind: 'Http'
          inputs: {
            method: 'POST'
            schema: {
              properties: {
                PO_Number: {
                  type: 'string'
                }
              }
              required: [
                'PO_Number'
              ]
              type: 'object'
            }
          }
        }
      }
      actions: {
        Check_If_SQL_returned_empty_list: {
          actions: {
            Response: {
              runAfter: {}
              type: 'Response'
              kind: 'Http'
              inputs: {
                body: '@outputs(\'Query_OneAskDB\')[\'body\'][\'ResultSets\'][\'Table1\']'
                statusCode: 200
              }
            }
          }
          runAfter: {
            Query_OneAskDB: [
              'Succeeded'
            ]
          }
          else: {
            actions: {
              Response_2: {
                runAfter: {}
                type: 'Response'
                kind: 'Http'
                inputs: {
                  body: 'No details were found for PO number: @{triggerBody()[\'PO_Number\']}\nPlease use the +Get started button on the right to request support'
                  statusCode: 200
                }
              }
            }
          }
          expression: {
            and: [
              {
                not: {
                  equals: [
                    '@equals(string(outputs(\'Query_OneAskDB\')?[\'body\'][\'ResultSets\']), \'{}\')'
                    '@true'
                  ]
                }
              }
            ]
          }
          type: 'If'
        }
        Query_OneAskDB: {
          runAfter: {}
          type: 'ApiConnection'
          inputs: {
            body: {
              query: 'Select PONumber, StatusCode, POSubmittedDate, POApprovedDate from PurchaseOrder where PONumber = \'@{triggerBody()[\'PO_Number\']}\''
            }
            host: {
              connection: {
                name: '@parameters(\'$connections\')[\'sql\'][\'connectionId\']'
              }
            }
            method: 'post'
            path: '/v2/datasets/@{encodeURIComponent(encodeURIComponent(\'opsbiuatsecondary.database.windows.net\'))},@{encodeURIComponent(encodeURIComponent(\'oneaskuat\'))}/query/sql'
          }
        }
      }
      outputs: {}
    }
    parameters: {
      // '$connections': {
      //   value: {
      //     sql: {
      //       connectionId: connections_sql_4_externalid
      //       connectionName: 'sql-4'
      //       id: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Web/locations/southcentralus/managedApis/sql'
      //     }
      //   }
      // }
    }
  }
}

param workflows_ECIFGetSpecificCaseStatus_Dev_name string = 'ECIFGetSpecificCaseStatus-UAT'
// param connections_sql_4_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/sql-4'

resource workflows_ECIFGetSpecificCaseStatus_Dev_name_resource 'Microsoft.Logic/workflows@2017-07-01' = {
  name: workflows_ECIFGetSpecificCaseStatus_Dev_name
  location: 'southcentralus'
  properties: {
    state: 'Enabled'
    definition: {
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      contentVersion: '1.0.0.0'
      parameters: {
        '$connections': {
          defaultValue: {}
          type: 'Object'
        }
      }
      triggers: {
        manual: {
          type: 'Request'
          kind: 'Http'
          inputs: {
            method: 'POST'
            schema: {
              properties: {
                Case_Number: {
                  type: 'string'
                }
              }
              required: [
                'Case_Number'
              ]
              type: 'object'
            }
          }
        }
      }
      actions: {
        Check_If_SQL_returned_empty_list: {
          actions: {
            Response: {
              runAfter: {}
              type: 'Response'
              kind: 'Http'
              inputs: {
                body: '@outputs(\'Query_OneAskDB\')[\'body\'][\'ResultSets\'][\'Table1\']'
                statusCode: 200
              }
            }
          }
          runAfter: {
            Query_OneAskDB: [
              'Succeeded'
            ]
          }
          else: {
            actions: {
              Response_2: {
                runAfter: {}
                type: 'Response'
                kind: 'Http'
                inputs: {
                  body: 'No details were found for case ID @{triggerBody()[\'Case_Number\']}\nPlease use the +Get started button on the right to request support'
                  statusCode: 404
                }
              }
            }
          }
          expression: {
            and: [
              {
                not: {
                  equals: [
                    '@equals(string(outputs(\'Query_OneAskDB\')?[\'body\'][\'ResultSets\']), \'{}\')'
                    '@true'
                  ]
                }
              }
            ]
          }
          type: 'If'
        }
        Query_OneAskDB: {
          runAfter: {}
          type: 'ApiConnection'
          inputs: {
            body: {
              query: 'select [Case Request Id], [Status], [Status Detail], [Requester], [Delivery Start Date], [Delivery End Date] from  [dbo].[Case Details]  where [Case Request Id]= \'@{triggerBody()[\'Case_Number\']}\''
            }
            host: {
              connection: {
                name: '@parameters(\'$connections\')[\'sql\'][\'connectionId\']'
              }
            }
            method: 'post'
            path: '/v2/datasets/@{encodeURIComponent(encodeURIComponent(\'opsbiuatsecondary.database.windows.net\'))},@{encodeURIComponent(encodeURIComponent(\'oneaskuat\'))}/query/sql'
          }
        }
      }
      outputs: {}
    }
    parameters: {
      // '$connections': {
      //   value: {
      //     sql: {
      //       connectionId: connections_sql_4_externalid
      //       connectionName: 'sql-4'
      //       id: '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/providers/Microsoft.Web/locations/southcentralus/managedApis/sql'
      //     }
      //   }
      // }
    }
  }
}

