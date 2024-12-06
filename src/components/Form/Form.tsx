import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import axios from 'axios';

const Form = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    email: string;
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        'https://www.greatfrontend.com/api/projects/challenges/newsletter',
        data,
      );
      console.log('response', response);
      reset();
    } catch (error) {
      console.error('error', error);
    }
  };

  const getErrorMessage = () => {
    if (errors.email?.type === 'required') return 'Email address is required';
    if (errors.email?.type === 'pattern') return 'Please enter a valid email address';
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor='email' id='email' className='sr-only'>
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
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      </label>
      <button className={styles.btn} type='submit'>
        Subscribe
      </button>
    </form>
  );
};

export default Form;
