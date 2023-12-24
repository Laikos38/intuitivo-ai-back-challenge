import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { annotationService } from '../services/annotation.service';


export default function AnnotationModal({ show, close, coordinates, imageId, callback = null, annotation = "", annotationId = null }) {
	const ref = useRef();

	const validationSchema = Yup.object().shape({
		annotation: Yup.string().required('Annotation body is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, setError, formState, reset, setFocus, setValue } = useForm(formOptions);
	const { errors } = formState;

	useEffect(() => {
		if (show) {
			ref.current?.showModal();
			setFocus("annotation");
		} else {
			ref.current?.close();
		}
		annotation ? setValue("annotation", annotation) : setValue("annotation", "");
	}, [show]);

	function onSubmit(e) {
		e.preventDefault();
		const buttonName = e.nativeEvent.submitter.name;
		if (buttonName === "createBtn") saveAnnotation(e.target.annotation.value);
		if (buttonName === "deleteBtn") deleteAnnotation();
	}

	function saveAnnotation(annotation) {
		if (annotationId)
			editAnnotation(annotation);
		else
			createAnnotation(annotation);
	}

	function createAnnotation(annotation) {
		return annotationService.createAnnotation(imageId, coordinates, annotation)
			.then((r) => {
				reset();
				if (callback) {
					callback();
				}
				close()
			});
	}

	function editAnnotation(annotation) {
		return annotationService.editAnnotation(annotationId, imageId, coordinates, annotation)
			.then((r) => {
				reset();
				if (callback) {
					callback();
				}
				close()
			});
	}

	function deleteAnnotation() {
		return annotationService.deleteAnnotation(annotationId)
			.then((r) => {
				reset();
				if (callback) {
					callback();
				}
				close()
			});
	}

	return (
		<dialog ref={ref} className="modal" onCancel={close}>
			<div className="modal-box">
				<button id="closeModalBtn" onClick={close}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

				{annotation && <h2 className='text-start'>Edit annotation</h2>}
				{!annotation && <h2 className='text-start'>New annotation</h2>}

				<form onSubmit={onSubmit}>
					<div className="mt-7 form-group mb-3">
						<textarea
							type="text" {...register('annotation')}
							placeholder="Body"
							name="annotation"
							className={`textarea w-full textarea-primary ${errors.annotation ? 'input-error' : ''}`}
						>
						</textarea>
						<div className="text-error">{errors.annotation?.message}</div>
					</div>
					<div className='flex justify-between'>
						<small className='text-start'>
							Coordinates:
							<br />
							<strong>{`X: ${coordinates?.x}`}</strong>
							<br />
							<strong>{`Y: ${coordinates?.y}`}</strong>
						</small>
						<div>
							{annotation &&
								<button disabled={formState.isSubmitting} className="btn btn-error mr-2" name='deleteBtn'>
									{formState.isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
									Delete
								</button>
							}
							<button disabled={formState.isSubmitting} className="btn btn-primary" name='createBtn'>
								{formState.isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
			<form onSubmit={(event) => event.preventDefault()} className="modal-backdrop">
				<button onClick={close}>close</button>
			</form>
		</dialog>
	)
}
