import "./../styles.css";

export const ArrowIcon = ({ isOpen }) => (
  <span className="arrow">
    {isOpen ? (
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        style={{
          width: "1em",
          height: "1em",
          fill: "currentColor",
          display: "inline-block",
          position: "relative",
        }}
      >
        <path d="M7 14l5-5 5 5z"></path> {/* Up Arrow */}
      </svg>
    ) : (
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        style={{
          width: "1em",
          height: "1em",
          fill: "currentColor",
          display: "inline-block",
          position: "relative",
        }}
      >
        <path d="M7 10l5 5 5-5z"></path> {/* Down Arrow */}
      </svg>
    )}
  </span>
);
