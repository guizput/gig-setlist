import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

import Nav from "./components/Nav";

import Home from "./pages/Home";

import List from "./pages/List";

import Setlist from "./pages/Setlist";

const supabase = createClient(
  "https://weljlectgfiojrteianr.supabase.co",

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlbGpsZWN0Z2Zpb2pydGVpYW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NTE5MzQsImV4cCI6MjAwMzQyNzkzNH0.FvhRcJJkI0KsHtbqTwcyk1Vf8QCw_EVzvCqnAknDTEo"
);

const App = () => {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/" element={<Home supabase={supabase} />}></Route>

          <Route
            path="/setlists"
            element={<List supabase={supabase} />}
          ></Route>

          <Route
            path="/setlists/:id"
            element={<Setlist supabase={supabase} />}
          ></Route>

          <Route path="*" element={<Home supabase={supabase} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
