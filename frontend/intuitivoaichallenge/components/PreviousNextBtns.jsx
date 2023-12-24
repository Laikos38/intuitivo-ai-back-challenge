export default function PreviousNextBtns({ previousNextCallback}) {

    return (
        <div className='flex justify-around mx-auto'>
            <button className='btn btn-outline btn-md text-lg'
                onClick={() => { previousNextCallback(true) }}>&#8592;</button>
            <button className='btn btn-outline btn-md text-lg'
                onClick={() => { previousNextCallback(false) }}>&#10132;</button>
        </div>
    )
}