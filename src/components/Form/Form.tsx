import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import axios from 'axios';
import { useState } from 'react';
import Toast from '../Toast/Toast';

export type StatusProps = {
  message?: string | undefined;
  error?: string | undefined;
};

const Form = () => {
  const [status, setStatus] = useState<StatusProps>({});
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
      if (response.status === 200) {
        setStatus({ message: response.data.message });
      } else {
        setStatus({ error: response.data.error });
        console.error('error', response.data);
      }
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
    <>
      <Toast status={status} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor='email' id='email' className='sr-only'>
          <div className={`${styles.input} ${errors.email ? styles.errorFocus : ''}`}>
            <input
              type='email'
              {...register('email', {
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
              })}
              placeholder='name@email.com'
            />
            <div className={styles.helpBtn}>
              <img src='img/question-line.svg' alt='Question mark icon' />
            </div>
          </div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </label>
        <button className={styles.btn} type='submit'>
          Subscribe
        </button>
      </form>
    </>
  );
};

export default Form;
