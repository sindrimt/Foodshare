import React, { useState } from "react";

export default function useDebounce() {
  const [typingTimeout, setTypingTimeout] = useState("");

  function debounce(func, wait) {
    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      func();
    }, wait);
    setTypingTimeout(timeout);
  }
  return debounce;
}
