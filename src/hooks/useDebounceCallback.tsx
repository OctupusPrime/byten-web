import { useEffect, useRef } from "react";

import debounce from "lodash.debounce";

const useDebounceCallback = <T extends any>(
  data: T,
  fn: (data: T) => void,
  delay: number
) => {
  const debouncedFn = useRef(debounce(fn, delay)).current;

  useEffect(() => {
    return () => {
      debouncedFn(data);
    };
  }, [data]);
};

export default useDebounceCallback;
