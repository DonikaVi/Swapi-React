import React, { useState } from 'react';
import { COST_CREDITS, CREW, MGLT } from '../redux/constants';

const options = [
  { value: COST_CREDITS, text: 'BY COST IN CREDITS' },
  { value: CREW, text: 'BY CREW SIZE' },
  { value: MGLT, text: 'BY MGLT NUMBER' },
];
function Dropdown({ filterBy, changeFilterBy }) {
  const [showDropdown, setShow] = useState(false);
  const handleChange = (value) => {
    changeFilterBy(value);
  };

  const Option = ({ value, text }) => {
    const className = filterBy === value ? 'option option-selected' : 'option';
    return (
      <div onClick={() => handleChange(value)} className={className}>
        {text}
      </div>
    );
  };

  const selectedOption = options.find((item) => item.value === filterBy);

  return (
    <div className={`dropdown ${showDropdown ? 'dropdown-opened' : ''}`}>
      <div onClick={() => setShow(!showDropdown)} className="dropdown-select">
        {selectedOption.text}
      </div>
      <div
        className={`dropdown-options ${
          !showDropdown ? 'dropdown-options-hide' : ''
        }`}
      >
        {options.map((item) => (
          <Option key={item.value} value={item.value} text={item.text} />
        ))}
      </div>
    </div>
  );
}
Dropdown.displayName = 'Dropdown';
export default Dropdown;
