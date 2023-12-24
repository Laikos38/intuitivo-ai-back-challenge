export default function Annotation({ imageId, coordinates, text }) {
	function showAnnotation() {

	}
	return (
		<div 
			className="tooltip rounded-full bg-red-600 w-5 h-5 border-2 border-white absolute"
			data-tip={`${text}`}
			style={{
				top: `${coordinates.y}px`,
				left: `${coordinates.x}px`,
			}}
			onClick={showAnnotation}
		>
		</div>
	)
}