import React from 'react';

interface Props {
  children: any
}

const Column: React.FC<Props> = ({ children }) => <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>{children}</div>

export default Column;