import React from 'react';
import GoogleMapReact from 'google-map-react';
import { EnvironmentOutlined } from '@ant-design/icons';
 
const MapHolder: React.FC<{location: string, latitude: string, longitude: string}> = (props) => {

    const AnyReactComponent = (lat:any, lng:any) => {
    return (<EnvironmentOutlined style={{ fontSize: '64px' }}/>);
    }

    const center = { lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) };

    return (
      <div style={{ height: '30vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY! }}
          center={center}
          defaultZoom={15}>
              <AnyReactComponent lat={props.latitude} lng={props.longitude}/>
        </GoogleMapReact>
      </div>
    );
  }
 
export default MapHolder;