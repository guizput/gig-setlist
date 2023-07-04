import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const [location, setLocation] = useState("");

  let loc = useLocation();

  useEffect(() => {
    setLocation(loc.pathname);
  });

  return (
    <nav className="p-4 shadow-md">
      <ul className="flex items-center justify-around">
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
    </nav>
  );
};

export default Nav;
