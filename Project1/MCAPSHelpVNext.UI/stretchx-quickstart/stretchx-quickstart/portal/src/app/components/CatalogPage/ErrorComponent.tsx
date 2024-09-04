
import { MessageBar, MessageBarType } from '@fluentui/react'
import React from 'react'

const ErrorComponent = (errorData, isWorkspaceValueError = false) => {
  return (
//     <div role="alert" aria-label="Error message" style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
//     <p>Status Code: {errorData.errorData.Code}</p>
//     <p>Correlation ID: {errorData.errorData.CorrelationId}</p>
//     <p>Message:  {errorData.errorData.Message}</p>
//   </div>
    <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    truncated={true}
    overflowButtonAriaLabel="See more"
    dismissButtonAriaLabel="Close"
    styles={{
      root: {
        width: '100%',
        // maxWidth: '30%',
        justifyContent:'center'
      },
    }}
  >

    { !errorData.isWorkspaceValueError?( <>
       <strong>Status Code:</strong> {errorData.errorData.Code} <br />
      <strong>Correlation ID:</strong> {errorData.errorData.CorrelationId} <br />
      <strong>Message:</strong> {errorData.errorData.Message} </>):(
      <><strong>Message:</strong> {errorData.errorData}</>
      )
    }
  
  </MessageBar>
  )
}

export default ErrorComponent