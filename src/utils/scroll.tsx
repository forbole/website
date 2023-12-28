export const scrollBottom = (e: any, ref: any) => {
  e.preventDefault();

  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: ref.current.offsetTop - 100,
  });
};
