export const scrollBottom = (e: any, ref: any) => {
  e.preventDefault();

  window.scrollTo({
    left: 0,
    top: ref.current.offsetTop - 100,
    behavior: "smooth",
  });
};
