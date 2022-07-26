import React, { useMemo, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
 
const MapHolder: React.FC<{location: string, latitude: number, longitude: number}> = (props) => {
    const [defaultCenter, SetDefaultCenter] = useState({ lat: props.latitude, lng: props.longitude });
    const AnyReactComponent = (lat:any, lng:any) => {
    return (<EnvironmentOutlined style={{ fontSize: '64px' }}/>);
    }

    useMemo(() => {
      if (props.latitude === 0 && props.longitude === 0) {
        axios.get('https://api.opencagedata.com/geocode/v1/json?key=' + process.env.REACT_APP_OPENCAGE_API_KEY + '&q=' + props.location)
            .then(async (response: any) => {
              SetDefaultCenter(response.data.results[0].geometry);
            });
      } else {
        SetDefaultCenter({ lat: props.latitude, lng: props.longitude });
      }
    }, [props.latitude, props.longitude, props.location, SetDefaultCenter])

    return (
      <div style={{ height: '30vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY! }}
          center={defaultCenter}
          defaultZoom={15}>
              <AnyReactComponent lat={defaultCenter.lat} lng={defaultCenter.lng}/>
        </GoogleMapReact>
      </div>
    );
  }
 
export default MapHolder;