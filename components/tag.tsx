type TagProps = {
	label: string;
	color: string;
	bgColor: string;
};

export function Tag({ label, color, bgColor }: TagProps) {
	return (
		<div className="flex items-center gap-2">
			<span
				className="rounded-full px-2 py-1.5 text-[0.75rem]"
				style={{
					color,
					backgroundColor: bgColor,
				}}
			>
				{label}
			</span>
		</div>
	);
}
