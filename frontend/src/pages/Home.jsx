import Header from "./movies/Header";
import MoviesContainerPage from "./movies/MoviesContainerPage";

const Home = () => {
  return (
    <>
      <Header />

      <section className="mt-[10rem] pl-10">
        <MoviesContainerPage />
      </section>
    </>
  );
};

export default Home;
