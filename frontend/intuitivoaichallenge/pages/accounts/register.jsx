import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { userService } from '../../services/user.service';
import { getApiErrorStr } from '../../utils/helpers';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    if (userService.userValue) {
      router.push('/');
    }
  }, []);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    password_match: Yup.string().required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, email, password, password_match }) {
    return userService.register(username, email, password, password_match)
      .then((response) => {
        if (response.ok) {
          router.push('/accounts/login?registered=ok');
        } else if (response.data) {
          const errorStr = getApiErrorStr(response);
          setError('apiError', {
            message: errorStr
          });
        }
        else {
          setError('apiError', {
            message: "Error"
          });
        }
      });
  }
  return (
    <div>
      <Head>
        <title>IntuitivoAI Challenge | Register</title>
      </Head>

      <div className='mt-0 md:mt-5 flex justify-center content-center'>
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <input
                  type="text" {...register('username')}
                  placeholder="Username"
                  name="username"
                  className={`input input-bordered w-full max-w-xs ${errors.username ? 'input-error' : ''}`} />
                <div className="text-error ">{errors.username?.message}</div>
              </div>
              <div className="form-group mb-3">
                <input
                  type="email" {...register('email')}
                  placeholder="Email"
                  name="email"
                  className={`input input-bordered w-full max-w-xs ${errors.email ? 'input-error' : ''}`} />
                <div className="text-error ">{errors.email?.message}</div>
              </div>
              <div className="form-group mb-3">
                <input
                  type="password" {...register('password')}
                  placeholder="Password"
                  name="password"
                  className={`input input-bordered w-full max-w-xs ${errors.password ? 'input-error' : ''}`} />
                <div className="text-error ">{errors.password?.message}</div>
              </div>
              <div className="form-group mb-3">
                <input
                  type="password" {...register('password_match')}
                  placeholder="Password confirmation"
                  name="password_match"
                  className={`input input-bordered w-full max-w-xs ${errors.password_match ? 'input-error' : ''}`} />
                <div className="text-error ">{errors.password_match?.message}</div>
              </div>
              <button disabled={formState.isSubmitting} className="btn btn-primary btn-block">
                {formState.isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                Register
              </button>
            </form>
            {errors.apiError && 
              <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errors.apiError?.message}</span>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}
