export default function PreviousNextBtns({ previousNextCallback}) {

    return (
        <div className='flex justify-between mx-auto'>
            <button className='btn btn-ghost'
                onClick={() => { previousNextCallback(true) }}>&#8592;</button>
            <button className='btn btn-ghost'
                onClick={() => { previousNextCallback(false) }}>&#10132;</button>
        </div>
    )
}