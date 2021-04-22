import React, { useState } from 'react';

import { Row, Typography, Tag} from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';

const { Title, Paragraph} = Typography;

const UserInfoHolder: React.FC<{info: any}> = (props) => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];


  if (selectedTags !== props.info.Interests)
    setSelectedTags(props.info.Interests);

  return (
    <Row>
      { props.info ? (
      <Typography>
          <Title>
              { props.info.Username + ' ' + props.info.Age}
          </Title>
          <Paragraph>
              Distance: { props.info.Distance } km
          </Paragraph>
          <Paragraph>
              Gender: { props.info.Gender }
          </Paragraph>
          <Paragraph>
              Looking for: { props.info.Sexo }
          </Paragraph>
          <Row>
            Interests: 
            <Tag>
            {tagsData.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
              >
                {tag}
              </CheckableTag>
        ))}
            </Tag>
          </Row>
          <Paragraph>
              { props.info.Bio }
          </Paragraph>
      </Typography>) : null }
    </Row>
  )
}

export default UserInfoHolder;