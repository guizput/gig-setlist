import Songs from "../components/Songs";

const Home = ({ supabase }) => {
  return <Songs supabase={supabase} />;
};

export default Home;
