import type {
  ReactNode, SetStateAction
} from 'react';
import React, { useEffect, useRef, useState, useCallback,
} from 'react';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { usePreventScroll } from '../hooks/usePreventScroll';
import styles from './MobileMenuDropdown.module.css';
import { useRouter } from 'next/router';

interface MobileMenuDropdownProps {
  label: ReactNode
  children: ReactNode
  setShowParent: React.Dispatch<SetStateAction<boolean>>
}

export function MobileMenuDropdown({ children, label, setShowParent }: MobileMenuDropdownProps) {
  const [show, setShow] = useState(false);
  const menuContainer = useRef(null);
  const icon = useRef(null);
  const [allowScroll] = usePreventScroll();
  const router = useRouter();

  useEffect(() => {
    if (show) allowScroll!(false);
    else allowScroll!(true);
    
    setShowParent(show);
  }, [allowScroll, setShowParent, show]);

  useEffect(() => {
    setShow(false);
  }, [router]);

  const clickOutsideHandler = useCallback(() => setShow(false), [show, setShow]);

  const toggleShow = useCallback(() => setShow(prev => !prev), [setShow]);

  useOnClickOutside([menuContainer, icon], clickOutsideHandler);

  return (
    <>
      <span
        className={styles.toggle}
        ref={icon}
        onClick={toggleShow}
        onKeyPress={toggleShow}
        role='button'
        tabIndex={0}
      >
        {label}
      </span>
      {show
        && (
          <div className={styles.navMenuContainer}>
            <div className={styles.backdrop}>
              <div className={styles.navMenu} ref={menuContainer}>
                {children}
              </div>
            </div>
          </div>
        )}
    </>
  );
}
