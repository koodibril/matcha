import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import UserInfoHolderComponent from '../../../Profile/components/UserInfoHolder/UserInfoHolder';

const Display: React.FC = () => {
    const userList = useSelector((state: any) => state.search);

    const handleUserList = () => {
      const List = userList.userResult
      console.log(List);
      return (List.map((element: any) => (
        <UserInfoHolderComponent info={element}/>
      )));
    }
      
  return (
    <>
    { userList.userResult ? handleUserList() : null}
    </>
  );
};

export default Display;