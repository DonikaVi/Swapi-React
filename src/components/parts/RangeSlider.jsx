import React from 'react';
import Slider from '@material-ui/core/Slider';

function RangeSlider({
  value, handleChange, min, max,
}) {
  return (
    <div className="filters-slider">
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

RangeSlider.displayName = 'RangeSlider';
export default RangeSlider;
