import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

const Nav = ({ supabase, setAuth }) => {
  const [location, setLocation] = useState("");

  let loc = useLocation();

  useEffect(() => {
    setLocation(loc.pathname);
  });

  const logOut = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    setAuth(false);
  };

  return (
    <nav className="flex items-center justify-around p-4 shadow-md">
      <ul className="flex w-2/3 items-center justify-around">
        <li>
          <Link to="/" className={location === "/" ? "font-bold" : ""}>
            Songs
          </Link>
        </li>

        <li>
          <Link
            to="/setlists"
            className={location === "/setlists" ? "font-bold" : ""}
          >
            Setlists
          </Link>
        </li>
      </ul>
      <div>
        <button
          onClick={(e) => logOut(e)}
          className="flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm disabled:bg-gray-50 disabled:text-gray-600"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
