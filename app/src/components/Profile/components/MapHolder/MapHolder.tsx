import React from 'react';
import GoogleMapReact from 'google-map-react';
import { EnvironmentOutlined } from '@ant-design/icons';
 
const MapHolder: React.FC<{location: string, latitude: number, longitude: number}> = (props) => {

    const AnyReactComponent = (lat:any, lng:any) => {
    return (<EnvironmentOutlined style={{ fontSize: '64px' }}/>);
    }

    return (
      <div style={{ height: '30vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCY56vVBpkxVWrQMeL0EC2M6w6VSpXeTS8' }}
          center={{lat: props.latitude, lng: props.longitude}}
          defaultZoom={15}>
              <AnyReactComponent lat={props.latitude} lng={props.longitude}/>
        </GoogleMapReact>
      </div>
    );
  }
 
export default MapHolder;