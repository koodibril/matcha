import React, { useEffect } from 'react';
import { Col, Divider, Row } from 'antd';
import ChangePasswordComponent from './components/Changepassword/ChangePassword';
import ChangeUsernameComponent from './components/ChangeUsername/ChangeUsername';
import ChangeSurnameComponent from './components/ChangeSurname/ChangeSurname';
import ChangeNameComponent from './components/ChangeName/ChangeName';
import ChangeEmailComponent from './components/ChangeEmail/ChangeEmail';
import FilterComponent from './components/Filter/Filter';
import { useNavigation } from 'src/ducks/navigation/navigation';
import { useFilter, useSearchActions } from 'src/ducks/search/actions/search';

const Settings: React.FC = () => {
    const user = localStorage.getItem('user');
    const { pushState } = useNavigation();
  
    if (!user) pushState('/auth');

    const filter = useFilter();
    const { getFilter } = useSearchActions();

    useEffect(() => {
      if (user) {
        getFilter(user);
      }
      }, [user, getFilter]);
    
  return (
        <Row justify="center" align="middle">
          <Col>
            <Divider plain>Filter</Divider>
            { filter.filter ? <FilterComponent filter={filter.filter}></FilterComponent> : null }
            <Divider plain></Divider>
            <ChangeUsernameComponent></ChangeUsernameComponent>
            <ChangeNameComponent></ChangeNameComponent>
            <ChangeSurnameComponent></ChangeSurnameComponent>
            <ChangeEmailComponent></ChangeEmailComponent>
            <ChangePasswordComponent></ChangePasswordComponent>
          </Col>
        </Row>
  )
}

export default Settings;