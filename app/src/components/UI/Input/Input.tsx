import React from 'react';
import { UIInputProps } from '../../../types/UI/UIInput';

import styles from './Input.module.scss';

const Input: React.FC<UIInputProps> = () => {
  return (
    <div className={styles.view}>
      <input className={styles.input} type="text" />
    </div>
  )
};

export default Input;