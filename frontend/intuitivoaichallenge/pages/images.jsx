'use client'

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import { imageService } from '../services/image.service';


export default function ImagesPage() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true)
  let page = router.query.page || 1;

  useEffect(() => {
    if (!page) return;
    getImages(page);
  }, [page]);
  
  function getImages(page) {
    imageService.getImages(page).then(response => {
      if (response.ok) {
        setImages(response.data);
      } else {
        setImages([]);
      }
      setLoading(false);
    });
  }

  function nextPreviousImage(next) {
		let page = router.query.page || 1;
		let pageParam = next ? +page+1 : +page-1;
		router.push({ query: { page: pageParam } }, undefined, { shallow: true });
	}

  function goToAnnotatePage(id) {
    router.push(`/annotate?id=${id}&previousPage=${router.query.page || 1}`)
  }

  if (isLoading) return <div><Loading /></div>
  if (!images.results) return <div><NotFound /></div>

  return (
    <div>
      <Head>
        <title>IntuitivoAI Challenge | Images</title>
      </Head>

      <div className='flex justify-center'>
        <div className="mt-1 md:mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {images.results.map(image =>
            <div key={image.id} className='w-64 h-64 hover:scale-110 transition duration-300 cursor-pointer'
              onClick={() => goToAnnotatePage(image.id)}
            >
              <img src={image.image_url} alt={image.image_name}
                className='shadow-[10px_10px_21px_0px] shadow-black/50 rounded-2xl'/>
            </div>  
          )}
        </div>
      </div>
      {images && <div className='mt-5 flex justify-center'>
        <div className="join">
          <button disabled={isLoading || !images.previous} 
            onClick={() => {nextPreviousImage(false)}} className="join-item btn">« Previous</button>
          <button disabled={isLoading || !images.next}
            onClick={() => {nextPreviousImage(true)}} className="join-item btn">Next »</button>
        </div>
      </div>}
    </div>
  )
}
