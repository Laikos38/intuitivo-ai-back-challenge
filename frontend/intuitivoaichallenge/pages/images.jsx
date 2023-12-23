'use client'

  import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { imageService } from '../services/image.service';

export default function ImagesPage() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true)
  let page = router.query.page || 1;
  
  useEffect(() => {
    if (!page) return;
    imageService.getImages(page).then(images => {
      setImages(images);
      setLoading(false);
    });
  }, [page]);

  function next() {
    let page = images.next.split("?page=")[1] || 1;
    setLoading(true);
    imageService.getImages(page).then(images => {
      setImages(images);
      setLoading(false);
    })
  }

  function previous() {
    let page = images.previous.split("?page=")[1] || 1;
    setLoading(true);
    imageService.getImages(page).then(images => {
      setImages(images);
      setLoading(false);
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (!images) return <div>No images founded!</div>

  return (
    <div>
      <Head>
        <title>IntuitivoAI Challenge | Images</title>
      </Head>

      <div className='flex justify-center'>
        <div class="mt-1 md:mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.results.map(image =>
            <div className='w-64 h-64 border border-base-content hover:scale-110 transition duration-300 cursor-pointer'>
              <img src={image.image_url} alt={image.image_name} />
            </div>  
          )}
        </div>

      </div>
      {images && <div className='mt-5 flex justify-center'>
        <div className="join">
          <button disabled={isLoading || !images.previous} onClick={previous} className="join-item btn">« Previous</button>
          <button disabled={isLoading || !images.next} onClick={next} className="join-item btn">Next »</button>
        </div>
      </div>}
    </div>
  )
}
