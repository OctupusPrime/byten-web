import { Link } from "@tanstack/router";

const AppNavBar = () => {
  return (
    <div className="w-60 fixed inset-y-0 left-0 border-r-2 border-slate-600">
      <p>ewq</p>
      <Link
        to={"/app"}
        className={`block py-2 px-3 text-blue-700`}
        // Make "active" links bold
        activeProps={{ className: `font-bold` }}
      >
        App
      </Link>
      <Link
        to={"/app/settings"}
        className={`block py-2 px-3 text-blue-700`}
        // Make "active" links bold
        activeProps={{ className: `font-bold` }}
      >
        Settings
      </Link>
    </div>
  );
};

export default AppNavBar;
