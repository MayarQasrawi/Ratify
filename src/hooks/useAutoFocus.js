import { useEffect, useRef } from "react";

export default function useAutoFocus() {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
}