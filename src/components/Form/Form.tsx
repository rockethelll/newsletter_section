import { useForm } from 'react-hook-form';
import styles from './form.module.css';

type FormData = {
  email: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label htmlFor='email' id='email' className='sr-only'>
        {/* <div className={styles.input}> */}
        <div className={`${styles.input} ${errors.email ? styles.errorFocus : ''}`}>
          <input
            type='email'
            {...register('email', { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
            placeholder='name@email.com'
          />
          <button className={styles.helpBtn}>
            <img src='img/question-line.svg' alt='' />
          </button>
        </div>
        <div className={styles.error}>
          {errors.email?.type === 'required' && <span>Email address is required</span>}
        </div>
        <div className={styles.error}>
          {errors.email?.type === 'pattern' && <span>Please enter a valid email address</span>}
        </div>
      </label>
      <button className={styles.btn} type='submit'>
        Subscribe
      </button>
    </form>
  );
};

export default Form;
