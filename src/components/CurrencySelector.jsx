export default function CurrencySelector({ selectedValue, onChange, options }) {
  const handleChange = (e) => onChange(e.target.value);
  return (
    <select
      className="form-select"
      value={selectedValue}
      onChange={handleChange}
    >
      {options.map((currencie_iso, index) => (
        <option key={index} value={currencie_iso}>
          {currencie_iso}
        </option>
      ))}
    </select>
  );
}
