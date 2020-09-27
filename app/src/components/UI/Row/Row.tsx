import React from 'react';

interface Props {
  children: any;
}

const Row: React.FC = ({ children }) => <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>{children}</div>

export default Row;