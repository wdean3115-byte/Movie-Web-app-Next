import * as React from "react";
const GenreIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={5}
    fill="none"
    {...props}
  >
    <path
      stroke="#18181B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1 .5 4 4 4-4"
    />
  </svg>
);
export default GenreIcon;