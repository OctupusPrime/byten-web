import { Button } from "@mantine/core";

interface NotFoundProps {
  onClick?: () => void;
}

const NotFound = ({ onClick }: NotFoundProps) => {
  return (
    <section className="w-full text-center">
      <h2 className="mb-9 mt-[15vh] text-9xl font-black text-gray-600 dark:text-gray-400 md:text-[12rem]">
        404
      </h2>
      <p className="text-3xl font-black sm:text-4xl">
        You have found a secret place.
      </p>
      <p className="mx-auto mb-3 mt-5 max-w-lg text-lg font-medium text-gray-500">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </p>
      <Button variant="subtle" size="md" onClick={onClick}>
        Take me back to home page
      </Button>
    </section>
  );
};

export default NotFound;
