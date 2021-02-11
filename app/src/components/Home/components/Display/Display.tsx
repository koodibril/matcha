import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';

const Display: React.FC = () => {
    const userList = useSelector((state: any) => state.search);
      
  return (
      <Row>
          
      </Row>
  );
};

export default Display;