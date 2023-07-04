import { useEffect, useState } from "react";

import { ReactSortable } from "react-sortablejs"; // https://github.com/SortableJS/react-sortablejs

import Create from "./Create";

const Songs = (props) => {
  const [songs, setSongs] = useState([]);

  const [selection, setSelection] = useState([]);

  const [totalDuration, setTotalDuration] = useState(0);

  const [create, setCreate] = useState(false);

  const supabase = props.supabase;

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = async (selection) => {
    const { data } = await supabase

      .from("songs")

      .select(selection)

      .order("title", { ascending: true });

    setSongs(data);

    getTotalDuration(data);
  };

  const getTotalDuration = (songs) => {
    let selectedSongs = songs.filter((x) => selection.indexOf(x.id) !== -1);

    const res = selectedSongs.reduce((acc, curr) => acc + curr.duration, 0);

    setTotalDuration(res);
  };

  const handleSelect = (e, index) => {
    let sel = selection;

    if (e.target.checked) {
      sel.push(index);
    } else {
      sel.splice(sel.indexOf(index), 1);
    }

    setSelection(sel);

    getTotalDuration(songs);
  };

  const handleSort = ({ oldIndex, newIndex }) => {
    let arr = songs;

    const curr = arr[oldIndex];

    arr.splice(oldIndex, 1);

    arr.splice(newIndex, 0, curr);

    setSongs(arr);
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
    <div className="flex">
      <ReactSortable
        list={songs}
        setList={setSongs}
        className="mb-20 w-[90%] p-4"
      >
        {songs.map((item) => (
          <div className="flex cursor-pointer border-b-2 border-dashed border-gray-300 py-2">
            <input
              type="checkbox"
              className="peer mr-4"
              onChange={(e) => handleSelect(e, item.id)}
              checked={selection.indexOf(item.id) !== -1 ? true : false}
            />

            <div className="flex w-full justify-between opacity-50 peer-checked:opacity-100">
              <b>{item.title}</b>

              <span>{timeDuration(item.duration)}</span>
            </div>
          </div>
        ))}
      </ReactSortable>
      <div className="w-[10%]"></div>

      <div className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t-2 border-gray-300 bg-white p-4">
        <div>
          <button
            disabled={selection.length === 0}
            onClick={() => setCreate(!create)}
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm disabled:bg-gray-50 disabled:text-gray-600"
          >
            Create Setlist
          </button>
        </div>

        <div>
          <b className="mr-4">Total</b>

          {timeDuration(totalDuration)}
        </div>
      </div>

      {create === true && (
        <Create
          songs={songs}
          selection={selection}
          setSelection={setSelection}
          supabase={supabase}
          setCreate={setCreate}
        />
      )}
    </div>
  );
};

export default Songs;
