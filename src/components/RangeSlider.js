// React imports
import React, { useState } from 'react';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const useStyles = makeStyles(theme => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

function valuetext(value) {
    return `${value} EUR`;
}

const marks = [
  {
    value: 0,
    label: '0 EUR',
  },
  {
    value: 20,
    label: '20 EUR',
  },
  {
    value: 100,
    label: '100 EUR',
  },
];


export const RangeSlider = ({ onSelectPriceRange }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState([200, 600])

    const handleChange = (event, newValue) => {
        const [minPrice, maxPrice] = newValue;
        setValue(newValue);
        onSelectPriceRange(minPrice, maxPrice);
    }


    return(
        <Slider
            value = {value}
            onChange = {handleChange}
            valueLabelDisplay = "auto"
            aria-labelledby ="range-slider"
            getAriaValueText = {valuetext}
            step = {100}
            min = {0}
            max = {1000}
            marks
      />
    );
}