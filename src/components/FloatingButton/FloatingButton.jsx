const FloatingButton = ({ onClick, fillHeight = false, children }) => {
  return (
    <button
      onClick={onClick}
      className={`floating-button ${fillHeight ? "fill-height" : ""}`}
    >
      {children}
    </button>
  );
};

export default FloatingButton;
