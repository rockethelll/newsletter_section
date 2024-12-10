import { StatusProps } from '../Form/Form';
import styles from './success.module.css';

const Success = ({ status }: { status: StatusProps }) => {
  return (
    <div className={styles.error}>
      <span>Error</span>
      {status.message}
    </div>
  );
};

export default Success;
