import React, { useState } from 'react';

import { Row, Typography} from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';

const { Title, Paragraph} = Typography;

const UserInfoHolder: React.FC<{info: any}> = (props) => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];


  if (selectedTags !== props.info.Interests)
    setSelectedTags(props.info.Interests);

  const ago = (date: number) => {
    const diff = Date.now() - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.ceil(diff / (1000 * 60));
    if (days === 1)
      return ("one day ago");
    else if (days >= 1)
      return (days + " days ago");
    else if (days === 0) {
      if (hours === 1)
        return ("one hour ago");
      else if (hours >= 1)
        return (hours + " hours ago");
      else if (hours === 0) {
        if (mins === 1)
          return ("one minute ago");
        else
          return (mins + " minutes ago");
      }
    }

  }


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
              Last connection: { props.info.Online ? ago(props.info.Online) : 'Never' }
          </Paragraph>
          <Paragraph>
              Gender: { props.info.Gender }
          </Paragraph>
          <Paragraph>
              Looking for: { props.info.Sexo }
          </Paragraph>
          <Row>
            Interests: 
            {tagsData.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
              >
                {tag}
              </CheckableTag>
        ))}
          </Row>
          <Paragraph>
              { props.info.Bio }
          </Paragraph>
      </Typography>) : null }
    </Row>
  )
}

export default UserInfoHolder;