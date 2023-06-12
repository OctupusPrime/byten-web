import { useEffect, useRef } from "react";

import debounce from "lodash.debounce";

const useDebounceCallback = <T extends any>(
  data: T,
  fn: (data: T) => void,
  delay: number
) => {
  const debouncedFn = useRef(
    debounce(() => fn(dataRef.current), delay)
  ).current;
  const dataRef = useRef<T>(data);

  useEffect(() => {
    dataRef.current = data;
    return () => {
      debouncedFn();
    };
  }, [data]);
};

export default useDebounceCallback;
