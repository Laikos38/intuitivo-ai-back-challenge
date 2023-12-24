import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Annotation from '../components/Annotation';
import CreateAnnotationModal from '../components/CreateAnnotationModal';
import PreviousNextBtns from '../components/PreviousNextBtns';
import { imageService } from '../services/image.service';


export default function AnnotatePage() {
	const router = useRouter();
	const [image, setImage] = useState(null);
	const [annotations, setAnnotations] = useState([]);
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
			} else {
				setImage(null);
				setAnnotations([]);
			}
			setLoading(false);
		});
	}

	if (isLoading) return <div>Loading...</div>
	if (!image) return <div>Image not found!</div>

	function createAnnotation(e) {
		let x = imageRef.current.getBoundingClientRect().left;
		let y = imageRef.current.getBoundingClientRect().top;
		setSelectedCoordinates({ x: e.clientX - x, y: e.clientY - y });
		document.getElementById("createAnnotationModal").showModal();
	}

	return (
		<div>
			<Head>
				<title>IntuitivoAI Challenge | Images</title>
			</Head>
			
			{image &&
				<div className='flex justify-center'>
					<div className='relative border border-base-content cursor-pointer'
						style={{
							height: `${image.height}px`,
							width: `${image.width}px`
						}}>
						<img className='absolute'
							ref={imageRef}
							src={image.image_url}
							onMouseUp={() => createAnnotation(event)}
						/>
						{annotations && annotations.map(annotation =>
							<Annotation
								coordinates={annotation.coordinates_xy}
								imageId={image.id}
								text={annotation.text}
								key={annotation.id}
							>
							</Annotation>
						)}
					</div>
					<CreateAnnotationModal
						modalId={"createAnnotationModal"}
						imageId={image.id}
						coordinates={selectedCoordinates}
						callback={getImage}
					>
					</CreateAnnotationModal>
				</div>
			}
			<PreviousNextBtns previousNextCallback={nextPreviousImage}></PreviousNextBtns>
		</div>
	)
}