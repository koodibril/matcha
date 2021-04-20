import React from 'react';
import { Card, Col, Row } from 'antd';
import UserInfoHolderComponent from '../../../Profile/components/UserInfoHolder/UserInfoHolder';
import ImageHolder from '../../../Profile/components/ImageHolder/ImageHolder';
import { useSearch } from 'src/ducks/search/actions/search';

const Display: React.FC = () => {
    const userList = useSearch();

    const handleUserList = () => {
      const List = userList.userResult;
      return (List.map((element: any, index: number) => (
         element.relationship.properties && element.relationship.properties.Block  ? null : (
          <Row key={index} style={{ margin: 20}}>
            <Card hoverable >
              <ImageHolder pictures={element.Pictures} reading={true}></ImageHolder>
              <UserInfoHolderComponent info={element}/>
            </Card>
          </Row>)
      )));
    }
      
  return (
    <Row>
      <Col>
        { userList.userResult ? handleUserList() : null }
      </Col>
    </Row>
  );
};

export default Display;