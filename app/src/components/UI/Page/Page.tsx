import React from 'react';

interface Props {
  children: any;
}

const Page: React.FC<Props> = ({ children }) => <div style={{
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
}}>{children}</div>
export default Page