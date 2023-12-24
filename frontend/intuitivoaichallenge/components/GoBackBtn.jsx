import { useRouter } from 'next/router'

export default function GoBackBtn({btnText}) {
  const router = useRouter()

  return (
    <button type="button" className='btn btn-ghost' onClick={() => router.back()}>
      <div className='text-lg'>
        &#8592; {btnText}
      </div>
    </button>
  )
}