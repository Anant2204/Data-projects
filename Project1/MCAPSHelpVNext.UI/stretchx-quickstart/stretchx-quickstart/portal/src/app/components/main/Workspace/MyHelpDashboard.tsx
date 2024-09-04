import React, { useContext, useState, useEffect } from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import './Dashboard.css';

const MyHelpDashboard = ({ totalTickets, openTickets, actionRequiredTickets, closedTickets, setIsTicketDetailVisible,setTicketStatus }) => {

  const [allowParentClick, setAllowParentClick] = useState(true);


  const gotoTicketDetails = (e,isVisible)=>{

    setIsTicketDetailVisible(isVisible);
    if (e.target.className.toLowerCase().indexOf("activetickets") != -1) {
        e.stopPropagation();
        setTicketStatus("NonClosed");
        setAllowParentClick(true);
    }
    else if(e.target.className.toLowerCase().indexOf("closedtickets") != -1) {
      e.stopPropagation();
      setTicketStatus("Closed");
      setAllowParentClick(true);
    }
    else{
      if (allowParentClick) {
        setTicketStatus("All");
      }
      setAllowParentClick(false);
    }   
  }

  const getIconColor = (status) => {
    switch (status) {
      case 'Active':
        return '#114B2A'; // Fluent UI primary color
      case 'Cancelled':
        return '#820015'; // Fluent UI error color
      case 'Closed':
        return '#00326B'; // Fluent UI success color
      default:
        return '#605E5C'; // Default color
    }
  };


  const getCircleStyle = (status) => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16, // Adjust the size of the circle
      height: 16, // Adjust the size of the circle
      borderRadius: '50%',
      background: getStatusColor(status),
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#DFF6DD'; // Fluent UI primary color
      case 'Cancelled':
        return '#FFDEE1'; // Fluent UI error color
      case 'Closed':
        return '#D7EBFF'; // Fluent UI success color
      default:
        return '#000000'; // Default color
    }
  };

  return (
    // <div style={{ borderRadius: '5px',marginLeft:10,height:246}}> {/* Add border */}
    //   <Stack tokens={{ childrenGap: 20 }} className="container1">
    //     <h5 style={{color: 'black', fontWeight: 'bold'}} tabIndex={0} >My Help Dashboard</h5>
    //     <Stack className="container1 totalTicket">
    //       <Text variant="mega" className="ticketNumber">{totalTickets}</Text> {/* Add total tickets */}
    //       <Text variant="medium" tabIndex={0} ><label className="hideElement">{totalTickets}</label>Total Tickets</Text>
    //     </Stack>
    //     <Stack horizontal tokens={{ childrenGap: 20 }}>
    //       <Stack className="container1">
    //         <Text variant="mega" className="ticketNumber">{openTickets}</Text>
    //         <Text variant="medium" tabIndex={0} ><label className="hideElement">{openTickets}</label>Open</Text>
    //       </Stack>
    //       <Stack className="container1">
    //         <Text variant="mega" className="ticketNumber">{actionRequiredTickets}</Text>
    //         <Text variant="medium" tabIndex={0}><label className="hideElement">{actionRequiredTickets}</label>Action required</Text>
    //       </Stack>
    //       <Stack className="container1">
    //         <Text variant="mega" className="ticketNumber">{closedTickets}</Text>
    //         <Text variant="medium" tabIndex={0}><label className="hideElement">{closedTickets}</label>Closed</Text>
    //       </Stack>
    //     </Stack>
    //   </Stack>
    // </div>
    <div className='myhelpdashboard'
      style={{
        width: '230px',  
        height: '200px', 
        top: '168px',
        left: '60px',
        background:'#FFF',
        borderRadius: '4px',   
       /* padding: '24px, 75.04px, 25px, 24px',  */      
        fontFamily: 'Segoe UI', 
        fontSize: '28px', 
        fontWeight: '600', 
        lineHeight: '36px', 
        letterSpacing: '0px', 
        textAlign: 'left',
        border: '2px solid #ffffff',
        //marginLeft: '10px',
        /*boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',*/
        boxSizing: 'border-box',
        marginRight: '18px',
        cursor:'pointer'
      }}
      onClick={(event)=> gotoTicketDetails(event,true)} 
    >
      <Stack tokens={{ childrenGap: 20 }} className="container1">
        <h5 className='headerDashboard'
          tabIndex={0} >My Help Dashboard</h5>
        {/* <Stack className="container1 totalTicket" onClick={()=> gotoTicketDetails(true,'All')} >
          <Text variant="mega" className="ticketNumber" tabIndex={0}><label className="hideElement" >{totalTickets}</label>{totalTickets}</Text>
        </Stack> */}
        <Stack horizontal tokens={{ childrenGap: 0 }} style={{height:65,width:200,marginTop:55, marginBottom:20}}>
          <Stack  >
            <Text variant="mega" className="ticketNumberopen activeTickets" >{openTickets}</Text>
            <Text variant="medium"  className="activeTickets" tabIndex={0}
              styles={{
                root: {
                  width: '130px',
                  // height: '18px',
                  // top: '366px',
                  // left: '104.21px',
                  fontFamily: 'Segoe UI',
                  fontSize: '12px',
                  fontWeight: '600',
                  lineHeight: '16px',
                  letterSpacing: '0.01em',
                  //textAlign: 'left'
                  marginLeft: '1px'


                }
              }}
            >
            {/* <div className='status'></div> */}
            <div style={{ marginLeft: '10px' }} className='activeTickets'  onClick={(event)=> gotoTicketDetails(event,true)}>
              <div className='status-circle-summary activeTickets' style={getCircleStyle("Active")}>
                <Icon iconName={'CircleRing'} className='activeTickets' styles={{ root: { fontSize: 8, color: getIconColor("Active") } }} />
              </div>
              <span className='open activeTickets' style={{ float: 'left', marginLeft: '5px' }}>Open</span>
             </div><label className="hideElement">{openTickets}</label>
              </Text>
          </Stack>
          {/* Now only two status for the ticket Open and Closed so commenting for Cancelled Status */}
          {/* <Stack className="container1" onClick={()=> gotoTicketDetails(true,'Cancelled')} > 
            <Text variant="mega" className="ticketNumberactionRequired">{actionRequiredTickets}</Text>
            <Text variant="medium" tabIndex={0}
              styles={{
                root: {
                  width: '104.07px',
                  height: '18px',
                  top: '366px',
                  left: '205.72px',
                  fontFamily: 'Segoe UI',
                  fontSize: '12px',
                  fontWeight: '600',
                  lineHeight: '17px',
                  letterSpacing: '0.01em',
                  textAlign: 'left'
                }
              }}
            ><label className="hideElement">{actionRequiredTickets}</label><div className='status'><span className='cancelled'>Cancelled</span></div></Text>
          </Stack> */} 
          <Stack >
            <Text variant="mega" className="ticketNumberclosed closedTickets">{closedTickets}</Text>
            <Text variant="medium" className="closedTickets"  tabIndex={0}
              styles={{
                root: {
                  // width: '48.86px',
                  // height: '18px',
                  // top: '366px',
                  // left: '340.71px',
                  fontFamily: 'Segoe UI',
                  fontSize: '12px',
                  fontWeight: '600',
                  lineHeight: '16px',
                  letterSpacing: '0.01em',
                  marginLeft: '1px'

                }
              }}
            >
              
              {/* <div className='status'></div> */}
              <div  className="closedTickets" onClick={(event)=> gotoTicketDetails(event,true)} >
              <div className='status-circle-summary closedTickets' style={getCircleStyle("Closed")}>
                <Icon iconName={'Completed'} className='closedTickets' styles={{ root: { fontSize: 8, color:  getIconColor("Closed") } }} />
              </div>
              <span className='closed closedTickets' style={{ float: 'left', marginLeft: '5px' }}>Closed</span></div>
              <label className="hideElement">{closedTickets}</label>
              </Text>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default MyHelpDashboard;
