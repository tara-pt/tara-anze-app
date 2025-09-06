const FloatingButton = ({
  onClick,
  fillHeight = false,
  sticky = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`floating-button ${fillHeight ? "fill-height" : ""} ${
        sticky ? "sticky" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default FloatingButton;
