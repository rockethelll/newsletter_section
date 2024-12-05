import styles from './row.module.css';

const Row = ({ content }: { content: string }) => {
  return (
    <div className={styles.row}>
      <img src='img/check-fill.svg'></img>
      <p>{content}</p>
    </div>
  );
};

export default Row;
