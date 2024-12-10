import Form from '../Form/Form';
import Row from '../Row/Row';
import styles from './text.module.css';

const rowContent = [
  { id: 1, content: 'Exclusive access to new abstract images and collections' },
  { id: 2, content: 'Unlock speciall promotions only for subscribers' },
  { id: 3, content: 'Regular doses of artistic inspiration' },
];

const Text = () => {
  return (
    <section className={styles.container}>
      <h1>Get the finest curated abstracts delivered weekly to your inbox</h1>
      <div className={styles.content}>
        {rowContent.map((row) => (
          <Row key={row.id} content={row.content} />
        ))}
      </div>
      <Form />
      <p>We only send you the best! No spam.</p>
    </section>
  );
};

export default Text;
