import GoBackBtn from './GoBackBtn';

export default function NotFound() {
    return (
        <div className='flex justify-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-4xl">
                        404 - Page not found!
                    </h1>
                    <div className="card-actions justify-end">
                        <GoBackBtn btnText={"Go back"}></GoBackBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}