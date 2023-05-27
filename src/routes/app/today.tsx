import { Route, useNavigate } from "@tanstack/router";
import { appRoute } from ".";
import Button from "@components/Button";
import dayjs from "@lib/dayjs";

export const appTodayRoute = new Route({
  getParentRoute: () => appRoute,
  path: "today",
  component: Today,
});

function Today() {
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <Button.Icon
          icon="navigate_before"
          onClick={() =>
            navigate({
              to: "/app",
            })
          }
        />
      </div>
      <section className="mt-3 relative">
        <div className="absolute z-[-1] left-1/2 -translate-x-1/2 top-2 w-32 h-32 gradient-test"></div>

        <h2 className="line-clamp-3 text-2xl font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          exercitationem qui magni, optio sapiente dolorum.
        </h2>

        <div className="grid grid-cols-2 gap-1 mt-1.5">
          <p>Created at</p>
          <p className="text-right">Updated at</p>
          <p className="text-gray-400 font-medium">
            {dayjs("04-20-2002").format("MMM DD YYYY")}
          </p>
          <p className="text-gray-400 font-medium text-right">
            {dayjs("04-20-2002").format("MMM DD YYYY")}
          </p>
        </div>
      </section>
    </>
  );
}
