import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { annotationService } from '../services/annotation.service';

export default function CreateAnnotationModal({ modalId, coordinates, imageId, callback }) {
	const validationSchema = Yup.object().shape({
		annotation: Yup.string().required('Annotation body is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, setError, formState, reset } = useForm(formOptions);
	const { errors } = formState;

	function onSubmit({ annotation }) {
		return annotationService.createAnnotation(imageId, coordinates, annotation)
			.then((r) => {
				reset();
				callback();
				document.getElementById("closeModalBtn").click();
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

	return (
		<dialog id={modalId} className="modal">
			<div className="modal-box">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-7 form-group mb-3">
						<textarea
							type="text" {...register('annotation')}
							placeholder="Body"
							name="annotation"
							className={`textarea w-full textarea-primary ${errors.annotation ? 'input-error' : ''}`} >
						</textarea>
						<div className="text-error">{errors.annotation?.message}</div>
					</div>
					<div className='flex justify-end'>
						<button disabled={formState.isSubmitting} className="btn btn-primary">
							{formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
							Create
						</button>
					</div>
				</form>
				{errors.apiError && 
					<div role="alert" className="mt-5 alert alert-error">
						<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<span>{errors.apiError?.message}</span>
					</div>}
			</div>
			<form method="dialog" className="modal-backdrop">
				<button id="closeModalBtn">close</button>
			</form>
		</dialog>
	)
}
