import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import UserInfoHolderComponent from '../../../Profile/components/UserInfoHolder/UserInfoHolder';
import ImageHolder from '../../../Profile/components/ImageHolder/ImageHolder';

const Display: React.FC = () => {
    const userList = useSelector((state: any) => state.search);

    const handleUserList = () => {
      const List = userList.userResult;
      return (List.map((element: any, index: number) => (
         element.relationship.properties && element.relationship.properties.Block  ? null : (
          <Row key={index}>
            <ImageHolder pictures={element.Pictures} reading={true}></ImageHolder>
            <UserInfoHolderComponent info={element}/>
          </Row>)
      )));
    }
      
  return (
    <Row justify="center" align="middle">
    { userList.userResult ? handleUserList() : null}
    </Row>
  );
};

export default Display;