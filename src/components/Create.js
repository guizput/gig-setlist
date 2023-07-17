import { useState } from "react";

const Create = ({ songs, selection, setSelection, supabase, setCreate }) => {
	const [title, setTitle] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const list = await supabase.from("setlists").select();
		const exist = list.data.filter((x) => x.title === title);
		if (exist.length > 0) {
			setError("Already exists!");
			return;
		}
		if (selection.length === 0) {
			setError("No songs selected!");
			return;
		}
		const setlist = songs
			.filter((x) => selection.indexOf(x.id) !== -1)
			.map((x, i) => {
				x.id = i;
				return x;
			});
		const { error } = await supabase
			.from("setlists")
			.insert({ title: title, list: setlist });
		setCreate(false);
		setSelection([]);
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white">
			<div
				className="absolute right-4 top-4 cursor-pointer p-2"
				onClick={() => setCreate(false)}
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
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>

			<form className="space-y-6 " onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label className="block text-sm font-medium leading-6 text-gray-900">
						Setlist name
					</label>

					{error !== "" && (
						<label className="block text-sm font-medium leading-6 text-red-600">
							{error}
						</label>
					)}

					<div className="mt-2">
						<input
							required
							onChange={(e) => setTitle(e.target.value)}
							className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
					>
						Create Setlist
					</button>
				</div>
			</form>
		</div>
	);
};

export default Create;
