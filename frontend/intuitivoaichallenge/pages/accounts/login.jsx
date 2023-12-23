import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { userService } from '../../services/user.service';

export default function LoginPage() {
  const router = useRouter();

  let registered = router.query.registered == "ok";

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push('/');
    }
  }, []);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return userService.login(username, password)
      .then(() => {
        router.push('/');
      })
      .catch(error => {
        let errorListStr = "";
        Object.entries(error.data)
            .forEach(([field, errors]) => { 
              errorListStr = errorListStr + `${field}:\n`; errors.forEach(err => errorListStr = errorListStr + `  - ${err}`)
            })
        setError('apiError', {
          message: errorListStr
        });
      });
  }

  function goToRegister() {
    router.push('/accounts/register');
  }

  return (
    <div>
      <Head>
        <title>IntuitivoAI Challenge | Login</title>
      </Head>

      {
        registered &&
        <div role="alert" className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Registration successful!</span>
        </div>
      }

      <div className='mt-0 md:mt-5 flex justify-center content-center'>
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <input
                  type="text" {...register('username')}
                  placeholder="Username"
                  name="username"
                  className={`input input-bordered w-full max-w-xs ${errors.username ? 'is-invalid' : ''}`} />
                <div className="text-error">{errors.username?.message}</div>
              </div>
              <div className="form-group mb-3">
                <input
                  type="password" {...register('password')}
                  placeholder="Password"
                  name="password"
                  className={`input input-bordered w-full max-w-xs ${errors.password ? 'is-invalid' : ''}`} />
                <div className="text-error">{errors.password?.message}</div>
              </div>
              <button disabled={formState.isSubmitting} className="btn btn-block btn-primary">
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Login
              </button>
              <button disabled={formState.isSubmitting} onClick={goToRegister} className="mt-3 btn btn-block btn-ghost">
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
