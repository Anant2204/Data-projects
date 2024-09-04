import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';

const StatusTile = ({ status, count, iconName }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Open':
        return '#DFF6DD'; // Fluent UI primary color
      // case 'Cancelled':
      //   return '#FFDEE1'; // Fluent UI error color
      case 'Closed':
        return '#D7EBFF'; // Fluent UI success color
      default:
        return '#000000'; // Default color
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'Open':
        return '#114B2A'; // Fluent UI primary color
      // case 'Cancelled':
      //   return '#820015'; // Fluent UI error color
      case 'Closed':
        return '#00326B'; // Fluent UI success color
      default:
        return '#605E5C'; // Default color
    }
  };

  const getCircleStyle = () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40, // Adjust the size of the circle
      height: 40, // Adjust the size of the circle
      borderRadius: '50%',
      background: getStatusColor(),
    };
  };



  return (
    <Stack
      horizontal
      verticalAlign="center"
      tabIndex={0} 
      styles={{
        root: {
          width: 175,
          height: 73,
          border: 'white',
          borderRadius: 8,
          padding: 10,
          display: 'inline-block',
          background: 'white',
          margin: '0px 20px 15px 0px',
        },
      }}
    >
      <div className='status-circle' style={getCircleStyle()}>
        <Icon iconName={iconName || 'CircleFill'} styles={{ root: { fontSize: 20, color:  getIconColor() } }} />
      </div>
      <Stack className='status-inner-content' grow>
         <Text variant="xLarge" styles={{ root: { fontSize: 26, fontWeight: '600', color:'#242424', textAlign: 'left', lineHeight:28} }}>
          {count}
        </Text>
        <Text variant="medium" styles={{ root: { fontSize: 12, color: '#605E5C' ,fontWeight: '400', textAlign: 'left' } }}>
          {status}
        </Text>
      </Stack>
    </Stack>
  );
};

export default StatusTile;