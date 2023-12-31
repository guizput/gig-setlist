import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Play from "../components/Play";

const Setlist = ({ supabase }) => {
	const [setlist, setSetlist] = useState({});
	const { id } = useParams();
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		getSetlist();
	}, []);

	const getSetlist = async () => {
		let setlist = [];
		if (navigator.onLine) {
			const { data } = await supabase.from("setlists").select().eq("id", id);
			setlist = data[0];
			localStorage.setItem(id, JSON.stringify(data[0]));
		} else {
			setlist = JSON.parse(localStorage.getItem(id));
		}
		setSetlist(setlist);
	};

	const getTotalDuration = (list) => {
		list ? list : (list = []);
		return list.reduce((acc, curr) => acc + curr.duration, 0);
	};

	const handleClick = (e) => {
		console.log(e.target);
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
		<>
			<div className="mb-20 px-4 py-8">
				{setlist.title && (
					<div className="flex flex-col items-center justify-center">
						<h2 className="mb-4 text-center text-2xl font-medium">
							{setlist.title}
						</h2>

						<button onClick={() => setPlaying(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-20 w-20 text-gray-400"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>

								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
								/>
							</svg>
						</button>
					</div>
				)}

				<ul className="py-4 ">
					{setlist.list &&
						setlist.list.map((item, index) => (
							<li
								className="flex items-center justify-between border-b-2 border-gray-200 py-2"
								key={index}
							>
								<div className="flex">
									<div className="mr-4 flex h-5 w-5 items-center justify-center rounded-sm bg-gray-400 text-sm text-white">
										{index + 1}
									</div>

									<div>{item.title}</div>
								</div>

								<div>{timeDuration(item.duration)}</div>
							</li>
						))}

					{setlist.id && (
						<li className="flex items-center justify-end py-2">
							<b className="mr-4 text-lg">Total</b>

							<b className="text-lg">
								{timeDuration(getTotalDuration(setlist.list))}
							</b>
						</li>
					)}
				</ul>
			</div>

			{playing && <Play setPlaying={setPlaying} list={setlist.list} />}
		</>
	);
};

export default Setlist;
