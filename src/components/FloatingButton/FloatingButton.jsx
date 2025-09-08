const FloatingButton = ({
  onClick,
  fillHeight = false,
  sticky = false,
  bottom = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`floating-button ${fillHeight ? "fill-height" : ""}${
        bottom ? "bottom" : ""
      } ${sticky ? "sticky" : ""}`}
    >
      {children}
    </button>
  );
};

export default FloatingButton;
