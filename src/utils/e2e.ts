export const IS_E2E = (() => {
  if (typeof window === "undefined") {
    return false;
  }

  return document.cookie.includes("is_e2e_test=true");
})();
