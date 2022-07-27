import React, { useEffect } from 'react';
import { Col, Divider, Row } from 'antd';
import ChangePasswordComponent from './components/Changepassword/ChangePassword';
import FilterComponent from './components/Filter/Filter';
import { useNavigation } from 'src/ducks/navigation/navigation';
import { useFilter, useSearchActions } from 'src/ducks/search/actions/search';
import UpdateInfo from './components/UpdateInfo/UpdateInfo';

const Settings: React.FC = () => {
    const user = localStorage.getItem('user');
    const { pushState } = useNavigation();

    const filter = useFilter();
    const { getFilter } = useSearchActions();

    useEffect(() => {
      if (user) {
        getFilter(user);
      } else {
        pushState('/auth/login');
      }
      }, [user, getFilter, pushState]);
    
  return (
        <Row justify="center" align="middle">
          <Col>
            <Divider plain>Filter</Divider>
            { filter.filter ? <FilterComponent filter={filter.filter}></FilterComponent> : null }
            <Divider plain></Divider>
            <UpdateInfo></UpdateInfo>
            <ChangePasswordComponent></ChangePasswordComponent>
          </Col>
        </Row>
  )
}

export default Settings;