const Menu = ({ color }: any) => (
  <svg
    fill="none"
    height="18"
    viewBox="0 0 24 18"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 9L23 9M1 1L23 1M1 17L23 17"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

export default Menu;
