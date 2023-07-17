import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const List = ({ supabase }) => {
	const [setlists, setSetlists] = useState([]);

	useEffect(() => {
		getSetlists();
	}, []);

	const getSetlists = async () => {
		let setlists = [];
		if (navigator.onLine) {
			const { data } = await supabase
				.from("setlists")
				.select()
				.order("title", { ascending: true });
			setlists = data;
			localStorage.setItem("setlists", JSON.stringify(data));
		} else {
			setlists = JSON.parse(localStorage.getItem("setlists"));
		}
		setSetlists(setlists);
	};

	const getTotalDuration = (list) => {
		return list.reduce((acc, curr) => acc + curr.duration, 0);
	};

	const timeDuration = (seconds) => {
		let hours = 0;
		while (seconds - 3600 >= 0) {
			hours++;
			seconds -= 3600;
		}
		let minutes = 0;
		while (seconds - 60 >= 0) {
			minutes++;
			seconds -= 60;
		}
		String(hours).length < 2 ? (hours = "0" + hours) : hours;
		String(minutes).length < 2 ? (minutes = "0" + minutes) : minutes;
		String(seconds).length < 2 ? (seconds = "0" + seconds) : seconds;
		return `${hours !== "00" ? hours + ":" : ""}${minutes}:${seconds}`;
	};

	return (
		<ul className="mb-20 p-4">
			{setlists.map((item, index) => (
				<li
					key={index}
					className="ml-4 flex cursor-pointer border-b-2 border-gray-200 py-3"
				>
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
							d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>

					<Link
						className="ml-4 flex w-full items-center justify-between font-medium"
						to={`/setlists/${item.id}`}
					>
						<span>{item.title}</span>

						<div className="flex items-center">
							{timeDuration(getTotalDuration(item.list))}

							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="ml-4 h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default List;
