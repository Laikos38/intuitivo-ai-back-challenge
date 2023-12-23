import Head from 'next/head';
import { useEffect, useState } from 'react';

import { userService } from '../services/user.service';

export default function HomePage() {
  const [me, setMe] = useState(null);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    userService.getUser().then(me => {
      setMe(me);
      setLoading(false);
    }
    );
  }, []);


  if (isLoading) return <p>Loading...</p>
  if (!me) return <p>No user data</p>

  return (
    <div>
      <Head>
        <title>IntuitivoAI Challenge | Home</title>
      </Head>

      <div className='mt-0 md:mt-5 flex justify-center content-center'>
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Hello there!</h2>
            <p><strong>Username: </strong>{me.username}</p>
            <p><strong>Email: </strong>{me.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
