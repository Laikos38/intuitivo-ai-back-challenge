// import AnnotationModal from '../components/AnnotationModal';

export default function Annotation({ imageId, coordinates, text, id, callback, onClick }) {
	return (
		<div 
			className="tooltip rounded-full bg-red-600 w-5 h-5 border-2 border-white absolute origin-center"
			data-tip={`${text}`}
			style={{
				top: `${+coordinates.y-10}px`,
				left: `${+coordinates.x-10}px`,
			}}
			onClick={onClick}
		>
		</div>
	)
}