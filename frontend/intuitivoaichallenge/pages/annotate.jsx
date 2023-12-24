import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Annotation from '../components/Annotation';
import AnnotationModal from '../components/AnnotationModal';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import PreviousNextBtns from '../components/PreviousNextBtns';
import { imageService } from '../services/image.service';


export default function AnnotatePage() {
	const router = useRouter();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [image, setImage] = useState(null);
	const [annotations, setAnnotations] = useState([]);
	const [selectedAnnotation, setSelectedAnnotation] = useState(null);
	const [selectedCoordinates, setSelectedCoordinates] = useState({ x: 0, y: 0 });
	const [isLoading, setLoading] = useState(true);
	const imageRef = useRef(null);
	let id = router.query.id;


	useEffect(() => {
		if (!id) return;
		getImage();
	}, [id]);

	function nextPreviousImage(next) {
		let id = router.query.id;
		let idParam = next ? +id+1 : +id-1;
		router.push({ query: { id: idParam } }, undefined, { shallow: true });
	}

	function getImage() {
		imageService.getImage(id).then(response => {
			if (response.ok) {
				setImage(response.data);
				setAnnotations(response.data.annotations);
				setShowCreateModal(false);
				setShowEditModal(false);
			} else {
				setImage(null);
				setAnnotations([]);
			}
			setLoading(false);
		});
	}

	if (isLoading) return <div><Loading /></div>
	if (!image) return <div><NotFound /></div>

	function createAnnotation(e) {
		let x = imageRef.current.getBoundingClientRect().left;
		let y = imageRef.current.getBoundingClientRect().top;
		setSelectedCoordinates({ x: e.clientX - x, y: e.clientY - y });
		setShowCreateModal(true);
	}

	function showAnnotation(annotation) {
		setSelectedAnnotation(annotation);
		setShowEditModal(true);
	}

	return (
		<div>
			<Head>
				<title>IntuitivoAI Challenge | Images</title>
			</Head>
			
			{image &&
				<div className='flex justify-center'>
					<div className='relative cursor-pointer'
						style={{
							height: `${image.height}px`,
							width: `${image.width}px`
						}}>
						<img className='absolute shadow-[10px_10px_21px_0px] shadow-black/70 rounded-2xl'
							ref={imageRef}
							src={image.image_url}
							onMouseUp={() => createAnnotation(event)}
						/>
						{annotations && annotations.map(annotation =>
							<Annotation
								coordinates={annotation.coordinates_xy}
								imageId={image.id}
								text={annotation.text}
								id={annotation.id}
								key={annotation.id}
								callback={getImage}
								onClick={() => {showAnnotation(annotation);}}
							>
							</Annotation>
						)}
					</div>
					<AnnotationModal
						show={showCreateModal}
						close={() => setShowCreateModal(false)}
						imageId={image.id}
						coordinates={selectedCoordinates}
						callback={getImage}
					>
					</AnnotationModal>
				
					<AnnotationModal
						show={showEditModal}
						close={() => setShowEditModal(false)}
						imageId={image.id}
						coordinates={selectedAnnotation?.coordinates_xy}
						annotation={selectedAnnotation?.text}
						annotationId={selectedAnnotation?.id}
						callback={getImage}
					>
					</AnnotationModal>
				</div>
			}
			<PreviousNextBtns previousNextCallback={nextPreviousImage}></PreviousNextBtns>
		</div>
	)
}