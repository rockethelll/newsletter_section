import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { StatusProps } from '../Form/Form';
import styles from './toast.module.css';
import Success from './Success';
import Error from './Error';

const Toast = ({ status }: { status: StatusProps }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (status && (status.message || status.error)) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!isVisible || !status || (!status.message && !status.error)) return null;

  const toastContainer = document.getElementById('toast');
  if (!toastContainer) {
    return null;
  }

  const content = (
    <div className={`${styles.toast} ${status.error ? styles.error : styles.success}`}>
      {status.error ? <Error status={status} /> : <Success status={status} />}
    </div>
  );

  return createPortal(content, toastContainer);
};

export default Toast;
