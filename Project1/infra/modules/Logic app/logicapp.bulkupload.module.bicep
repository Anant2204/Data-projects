// param logicAppName string
// param connections_office365groups_2_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/office365groups-2'
// param connections_sql_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/sql'
// param connections_office365_1_externalid string = '/subscriptions/dbe10480-e093-4f44-a29c-e69c0f44c583/resourceGroups/RG-MCAPSHELP-DEV/providers/Microsoft.Web/connections/office365-1'

// param subscriptionId string
param logicAppRGName string = 'bulkUserIDAdd'
// param apiConnectionName string
// param connectionId string = '/subscriptions/${subscriptionId}/resourceGroups/${logicAppRGName}/providers/Microsoft.Web/connections/${apiConnectionName}'
// param apiConnectionId string

resource office365 'Microsoft.Web/connections@2016-06-01' existing = {
  name: 'office365'
}




resource office3651 'Microsoft.Web/connections@2016-06-01' existing = {
  name: 'office365-1'
}


resource sql 'Microsoft.Web/connections@2016-06-01' existing = {
  name:'sql-1'
}






resource workflows_bulkUserIDAdd_name_resource 'Microsoft.Logic/workflows@2017-07-01' = {
  name: logicAppRGName
  location: 'southcentralus'
  properties: {
    state: 'Enabled'
    definition: {
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      contentVersion: '1.0.0.0'
      parameters: {
        'Server Name': {
          defaultValue: 'mcapshelpuat-server.database.windows.net'
          type: 'String'
        }
        'DataBase Name': {
          defaultValue: 'mcapshelpuat'
          type: 'String'
        }
        ToEmail: {
          defaultValue: 'v-jainank@microsoft.com'
          type: 'String'
        }
        FromEmail: {
          defaultValue: 'v-jainank@microsoft.com'
          type: 'String'
        }
        'Subject of Success': {
          defaultValue: 'Successful  User update for security  Group  '
          type: 'String'
        }
        'Subject of Failure ': {
          defaultValue: 'Error has been accrues  for user\'s update '
          type: 'String'
        }
        'Message of Failure ': {
          defaultValue: 'We would like to inform you about the User Update for security Group . Please find the details below: User Update :Failed.'
          type: 'String'
        }
        'Message of Success part2': {
          defaultValue: ' user has been Updated'
          type: 'String'
        }
        'Message of Success part1': {
          defaultValue: 'Total :'
          type: 'String'
        }
        '$connections': {
          defaultValue: {}
          type: 'Object'
        }
      }
      triggers: {
        Recurrence: {
          recurrence: {
            interval: 60
            frequency: 'Minute'
            timeZone: 'India Standard Time'
            startTime: '2024-06-3T01:30:00Z'
          }
          evaluatedRecurrence: {
            interval: 60
            frequency: 'Minute'
            timeZone: 'India Standard Time'
            startTime: '2024-06-3T01:30:00Z'
          }
          type: 'Recurrence'
        }
      }
      actions: {
        Try: {
          actions: {
            For_each_Group_ID: {
              foreach: '@outputs(\'Parse_GroupID_JSON\')[\'body\']'
              actions: {
                List_group_members: {
                  type: 'ApiConnection'
                  inputs: {
                    host: {
                      connection: {
                        name: '@parameters(\'$connections\')[\'office365-1\'][\'connectionId\']'
                      }
                    }
                    method: 'get'
                    path: '/v1.0/groups/@{encodeURIComponent(items(\'For_each_Group_ID\')[\'GroupID\'])}/members'
                    retryPolicy: {
                      type: 'fixed'
                      count: 3
                      interval: 'PT10S'
                    }
                  }
                  runtimeConfiguration: {
                    paginationPolicy: {
                      minimumItemCount: 50000
                    }
                  }
                }
                Parse_User_Details_JSON: {
                  runAfter: {
                    List_group_members: [
                      'Succeeded'
                    ]
                  }
                  type: 'ParseJson'
                  inputs: {
                    content: '@body(\'List_group_members\')?[\'value\']'
                    schema: {
                      type: 'array'
                      items: {
                        type: 'object'
                        properties: {
                          id: {
                            type: 'string'
                          }
                          userPrincipalName: {
                            type: 'string'
                          }
                        }
                        required: [
                          'id'
                          'userPrincipalName'
                        ]
                      }
                    }
                  }
                }
                Modify_User_details_json_: {
                  runAfter: {
                    Parse_User_Details_JSON: [
                      'Succeeded'
                    ]
                  }
                  type: 'Select'
                  inputs: {
                    from: '@body(\'Parse_User_Details_JSON\')'
                    select: {
                      UserID: '@item()[\'id\']'
                      UPN: '@item()[\'userPrincipalName\']'
                    }
                  }
                }
                Execute_SP_for_Add__user__and_Gourp_mapping_in_temp_table: {
                  runAfter: {
                    Modify_User_details_json_: [
                      'Succeeded'
                    ]
                  }
                  type: 'ApiConnection'
                  inputs: {
                    host: {
                      connection: {
                        name: '@parameters(\'$connections\')[\'sql-1\'][\'connectionId\']'
                      }
                    }
                    method: 'post'
                    body: {
                      groupID: '@item()[\'GroupID\']'
                      json: '@{string(body(\'Modify_User_details_json_\'))}'
                    }
                    path: '/v2/datasets/@{encodeURIComponent(encodeURIComponent(parameters(\'Server Name\')))},@{encodeURIComponent(encodeURIComponent(parameters(\'DataBase Name\')))}/procedures/@{encodeURIComponent(encodeURIComponent(\'[BSO].[AddSTGUserBySecurityGroupData]\'))}'
                  }
                }
                Compose: {
                  runAfter: {
                    Execute_SP_for_Add__user__and_Gourp_mapping_in_temp_table: [
                      'Succeeded'
                    ]
                  }
                  type: 'Compose'
                  inputs: '@length(body(\'Modify_User_details_json_\'))'
                }
                Total_user_count: {
                  runAfter: {
                    Compose: [
                      'Succeeded'
                    ]
                  }
                  type: 'IncrementVariable'
                  inputs: {
                    name: 'Total User'
                    value: '@outputs(\'Compose\')'
                  }
                }
              }
              runAfter: {
                Parse_GroupID_JSON: [
                  'Succeeded'
                ]
              }
              type: 'Foreach'
            }
            Execute_SP_for_Add__user__and_Gourp_mapping_in__table: {
              runAfter: {
                For_each_Group_ID: [
                  'Succeeded'
                ]
              }
              type: 'ApiConnection'
              inputs: {
                host: {
                  connection: {
                    name: '@parameters(\'$connections\')[\'sql-1\'][\'connectionId\']'
                  }
                }
                method: 'post'
                body: {}
                path: '/v2/datasets/@{encodeURIComponent(encodeURIComponent(parameters(\'Server Name\')))},@{encodeURIComponent(encodeURIComponent(parameters(\'DataBase Name\')))}/procedures/@{encodeURIComponent(encodeURIComponent(\'[BSO].[AddUserBySTGUser]\'))}'
              }
              operationOptions: 'DisableAsyncPattern'
            }
            Parse_GroupID_JSON: {
              runAfter: {
                Execute_SP_for_Get_ALL_Group_ID: [
                  'Succeeded'
                ]
              }
              type: 'ParseJson'
              inputs: {
                content: '@body(\'Execute_SP_for_Get_ALL_Group_ID\')?[\'resultsets\']?[\'Table1\']'
                schema: {
                  type: 'array'
                  items: {
                    type: 'object'
                    properties: {
                      GroupID: {
                        type: 'string'
                      }
                    }
                    required: [
                      'GroupID'
                    ]
                  }
                }
              }
            }
            Execute_SP_for_Get_ALL_Group_ID: {
              type: 'ApiConnection'
              inputs: {
                host: {
                  connection: {
                    name: '@parameters(\'$connections\')[\'sql-1\'][\'connectionId\']'
                  }
                }
                method: 'post'
                body: {}
                path: '/v2/datasets/@{encodeURIComponent(encodeURIComponent(parameters(\'Server Name\')))},@{encodeURIComponent(encodeURIComponent(parameters(\'DataBase Name\')))}/procedures/@{encodeURIComponent(encodeURIComponent(\'[BSO].[GetAllUserADGroup]\'))}'
              }
            }
            Send_an_email_user_Update: {
              runAfter: {
                Execute_SP_for_Add__user__and_Gourp_mapping_in__table: [
                  'Succeeded'
                ]
              }
              type: 'ApiConnection'
        
              inputs: {
                host: {
                  connection: {
                    name: '@parameters(\'$connections\')[\'office365-1\'][\'connectionId\']'
                  }
                }
                method: 'post'
                body: {
                  To: '@parameters(\'ToEmail\')'
                  Subject: '@parameters(\'Subject of Success\')'
                  Body: '<p>@{parameters(\'Message of Success part1\')} @{variables(\'Total User\')} @{parameters(\'Message of Success part2\')}</p>'
                  Importance: 'Normal'
                }
                path: '/v2/Mail'
              }
            }
          }
          runAfter: {
            Initialize_variable: [
              'Succeeded'
            ]
          }
          type: 'Scope'
        }
        Catch: {
          actions: {
            Send_an_email_for_Error: {
              type: 'ApiConnection'
              inputs: {
                host: {
                  connection: {
                    name: '@parameters(\'$connections\')[\'office365-1\'][\'connectionId\']'
                  }
                }
                method: 'post'
                body: {
                  To: '@parameters(\'ToEmail\')'
                  Subject: '@parameters(\'Subject of Failure \')'
                  Body: '<p>@{parameters(\'Message of Failure \')}</p>'
                  Importance: 'Normal'
                }
                path: '/v2/Mail'
              }
            }
          }
          runAfter: {
            Try: [
              'TimedOut'
              'Skipped'
              'Failed'
            ]
          }
          type: 'Scope'
        }
        Initialize_variable: {
          runAfter: {}
          type: 'InitializeVariable'
          inputs: {
            variables: [
              {
                name: 'Total User'
                type: 'integer'
                value: 0
              }
            ]
          }
        }
      }
      outputs: {}
    }
    parameters: {
      '$connections': {
        value: {
          office365: {
            id: office365.properties.api.id
            connectionId: office365.id
            connectionName: 'office365'
          }
          'sql-1': {
            id: sql.properties.api.id
            connectionId: sql.id
            connectionName: 'sql-1'
            connectionProperties: {
              authentication: {
                type: 'ManagedServiceIdentity'
              }
            }
          }
          'office365-1': {
            id: office3651.properties.api.id
            connectionId: office3651.id
            connectionName: 'office365-1'
          }
        }
      }
    }
  }
}
