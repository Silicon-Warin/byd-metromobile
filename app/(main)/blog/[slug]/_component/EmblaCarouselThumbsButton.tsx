import React from "react";
import Image from "next/image";

type PropType = {
	selected: boolean;
	index: number;
	onClick: () => void;
	imageSrc: string;
};

export const Thumb: React.FC<PropType> = (props) => {
	const { selected, index, onClick, imageSrc } = props;

	return (
		<div
			className={"embla-thumbs__slide".concat(
				selected ? " embla-thumbs__slide--selected" : ""
			)}
		>
			<button
				onClick={onClick}
				type="button"
				className="embla-thumbs__slide__number"
			>
				{/* รูปเต็มขนาด button */}
				<Image
					src={imageSrc}
					alt={`Thumbnail ${index + 1}`}
					fill
					className="object-cover"
					sizes="96px"
				/>

				{/* Border overlay for selected state */}
				{selected && (
					<div className="absolute inset-0 border-2 border-primary rounded-2xl"></div>
				)}
			</button>
		</div>
	);
};
