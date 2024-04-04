import { useMemo, useState } from "react";
import "./App.css";

const countries = ["India", "USA", "France"];

const App = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const onSelectAll = () => {
    setChecked((prev) =>
      prev.size < countries.length ? new Set(countries) : new Set()
    );
  };

  const onCheck = (country: string) => {
    setChecked((prev) => {
      const newChecked = new Set(prev);

      if (newChecked.has(country)) {
        newChecked.delete(country);
      } else {
        newChecked.add(country);
      }

      return newChecked;
    });
  };

  const allChecked = useMemo(
    () => checked.size === countries.length,
    [checked]
  );

  const renderCheckbox = useMemo(
    () =>
      countries.map((country) => (
        <label key={country}>
          <input
            type="checkbox"
            onChange={() => onCheck(country)}
            checked={checked.has(country)}
          />
          {country}
        </label>
      )),
    [checked]
  );

  return (
    <div className="checkbox-container">
      <label>
        <input type="checkbox" onClick={onSelectAll} checked={allChecked} />
        Select All
      </label>
      {renderCheckbox}
    </div>
  );
};

export default App;
