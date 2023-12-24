"use client"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from '../../components/Loading';
import { userService } from '../../services/user.service';


export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      userService.logout();
    } else {
      router.push('/');
    }
  }, []);

	return <div><Loading /></div>
}