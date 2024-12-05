import styles from './form.module.css';

const Form = () => {
  return (
    <form action='' className={styles.form}>
      <label htmlFor='email' id='email' className='sr-only'>
        <input type='email' />
      </label>
      <button className={styles.btn} disabled >Subscribe</button>
    </form>
  );
};

export default Form;
