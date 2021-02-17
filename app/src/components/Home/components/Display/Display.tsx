import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import UserInfoHolderComponent from '../../../Profile/components/UserInfoHolder/UserInfoHolder';
import ImageHolder from '../../../Profile/components/ImageHolder/ImageHolder';

const Display: React.FC = () => {
    const userList = useSelector((state: any) => state.search);

    const handleUserList = () => {
      const List = userList.userResult;
      console.log(List);
      return (List.map((element: any) => (
         element.relationship.properties.Block  ? null : (
          <>
            <ImageHolder pictures={element.Pictures} reading={true}></ImageHolder>
            <UserInfoHolderComponent info={element}/>
          </>)
      )));
    }
      
  return (
    <Row justify="center" align="middle">
    { userList.userResult ? handleUserList() : null}
    </Row>
  );
};

export default Display;