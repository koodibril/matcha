import React from 'react';

interface Props {
  children: any;
  method?: 'post' | 'get';
}

const Form: React.FC<Props> = ({ method = '', children }) => {
  const props = { method };

  const handleOnClick = () => console.log('Hello!')

  return (
    <form action="" onClick={handleOnClick} {...props}>
      {children}
    </form>
  )
}

export default Form;