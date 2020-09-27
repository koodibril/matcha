import React from 'react';

import styles from './Button.module.scss'

interface Props {
  label: string;
  onClick: any;
  type: string;
}

const Button: React.FC<Props> = ({ type, label, onClick }) => {
  return (
    <div className={styles.view}>
      <button className={styles.button} onClick={onClick}>{label}</button>
    </div>
  )
};

export default Button;