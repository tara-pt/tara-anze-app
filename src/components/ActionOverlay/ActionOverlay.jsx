const ActionOverlay = ({ position, children }) => {
  //Position: left, right, fill
  return <div className={`action-overlay ${position}`}>{children}</div>;
};

export default ActionOverlay;
