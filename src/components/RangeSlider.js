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

export default function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState([20, 40])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }


    return(
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
      />
    );
}