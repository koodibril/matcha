import React, {useEffect, useMemo, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
 
const MapHolder: React.FC<{location: string, latitude: string, longitude: string}> = (props) => {
    const [defaultCenter, SetDefaultCenter] = useState({ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) });
    const AnyReactComponent = (lat:any, lng:any) => {
    return (<EnvironmentOutlined style={{ fontSize: '64px' }}/>);
    }

    useMemo(() => {
      if (parseFloat(props.latitude) === 0 && parseFloat(props.longitude) === 0) {
        axios.get('https://api.opencagedata.com/geocode/v1/json?key=d13332d873e349199048bcc0a6b2c25d&q=' + props.location)
            .then(async (response: any) => {
              SetDefaultCenter(response.data.results[0].geometry);
            });
      } else {
        console.log(props.latitude, props.longitude)
        SetDefaultCenter({ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) });
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