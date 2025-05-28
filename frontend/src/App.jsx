import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 pb-[6rem] md:pb-[8rem] lg:pb-[10rem]">
        <Outlet />
      </main>
    </>
  );
};

export default App;
