import { useState } from "react";

const Play = ({ setPlaying, list }) => {
	const [current, setCurrent] = useState(0);
	const [textSize, setTextSize] = useState(1);

	const handleClick = (e, val) => {
		e.preventDefault();
		val === "min" ? setTextSize(textSize - 0.1) : setTextSize(textSize + 0.1);
	};

	return (
		<>
			<div className="fixed bottom-0 left-0 right-0 top-0 bg-white p-4">
				<div className="flex justify-end">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="z-10 h-6 w-6"
						onClick={() => setPlaying(false)}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>

				<ul>
					{list.map((item, index) => (
						<li
							key={index}
							className={
								index === current
									? "absolute left-0 top-0 z-0 block h-[calc(100%-3rem)] w-full overflow-scroll p-4"
									: "absolute left-0 top-0 z-0 hidden h-[calc(100%-3rem)] w-full overflow-scroll p-4"
							}
						>
							<div className="mb-4 flex items-center justify-center space-x-4">
								<button
									className="flex h-7 w-7 items-center justify-center rounded-lg border-2 p-2 text-lg active:bg-gray-200"
									onClick={(e) => handleClick(e, "min")}
								>
									-
								</button>
								<h1 className="text-normal text-center font-medium">
									{item.title}
								</h1>
								<button
									className="flex h-7 w-7 items-center justify-center rounded-lg border-2 p-2 text-lg active:bg-gray-200"
									onClick={(e) => handleClick(e, "plus")}
								>
									+
								</button>
							</div>

							<div
								className="flex h-full flex-col justify-start space-y-4"
								dangerouslySetInnerHTML={{ __html: item.lyrics }}
								style={{ fontSize: textSize + "rem" }}
							></div>
						</li>
					))}
				</ul>

				<div className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t-2 border-gray-300 bg-white px-4 py-2 text-xs">
					<div
						className="flex w-1/2 items-center justify-start space-x-2 overflow-hidden"
						onClick={() => setCurrent((current) => current - 1)}
					>
						{current > 0 && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						)}

						<span className="ml-4 font-medium">
							{list[current - 1] && list[current - 1].title}
						</span>
					</div>

					<div
						className="flex w-1/2 items-center justify-end space-x-2 overflow-hidden"
						onClick={() => setCurrent((current) => current + 1)}
					>
						<span className="ml-4 font-medium">
							{list[current + 1] && list[current + 1].title}
						</span>

						{current < list.length - 1 && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Play;
