const CustomCheckBox = () => {
  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        id="checkbox"
        className="hidden-checkbox"
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <span className="checkbox-custom"></span>
        <span className="checkbox-text">Remember me</span>
      </label>
    </div>
  );
};

export default CustomCheckBox;
