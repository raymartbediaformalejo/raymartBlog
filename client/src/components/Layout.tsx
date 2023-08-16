import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { Facebook, Github, Linkedin } from "lucide-react";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
const Layout = () => {
  const [sendLogout] = useSendLogoutMutation();
  return (
    <Fragment>
      <header
        className="absolute top-0 left-0 z-40 w-full bg-local bg-top bg-no-repeat hero"
        // style={{ backgroundImage: 'url("/grid.png")' }}
      >
        <div className="flex items-center justify-between px-4 py-6 ">
          <Link to="/">
            <img src="/logo-light.png" alt="logo" />
          </Link>
          <button title="Logout" onClick={sendLogout}>
            Logout
          </button>
        </div>
      </header>
      <Outlet />
      <footer className="flex flex-col gap-16 px-4 pt-16 pb-4 mt-40 text-center text-white bg-blue">
        <div className="">
          <h3 className="mb-3 text-2xl font-medium">
            Never miss out on what I'm up to?
          </h3>
          <p className="mb-6">
            If you never want to miss out on my articles here on my site,
            subscribe to my newsletter!
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="text-dark-blue2"
            />
            <button className="bg-dark-blue2 hover:bg-dark-blue2/80 focus:bg-dark-blue2/80">
              Subscribe
            </button>
          </div>
        </div>
        <div>
          <p>Find me elsewhere on the web as well:</p>
          <div className="flex justify-center gap-4 mt-3">
            <button>
              <Facebook className="w-4 h-4" />
            </button>
            <button>
              <Github className="w-4 h-4" />
            </button>
            <button>
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-sm">
          {/* <Separator decorative className="bg-white/40 " /> */}
          <p className="mt-2">
            &copy;Raymart Formalejo 2023 All rights reserved.
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
