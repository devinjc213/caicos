import styles from './Input.module.css';
import React from 'react';

interface InputInterface {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  invalid: boolean
}

const Input = ({ label, value, onChange, invalid }: InputInterface) => {
  return (
    <div className={styles.inputAndLabel}>
      <label style={{ fontSize: '0.75rem' }}>{label}:</label>
      <input type='text' value={value} onChange={onChange} style={{ border: invalid ? '2px  solid red' : 'none'}} />
    </div>
  );
}

export default Input;