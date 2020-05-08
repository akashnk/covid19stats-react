import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

export default function Statistics() {
    const classes = useStyles();
    const [age, setAge] = React.useState('10');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return(
        <>
        <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Charts
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          
          <MenuItem value={10}>Daily cases vs Total cases</MenuItem>
          
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
        </>
    )
}
// import React, { useState } from "react";
// import RacingBarChart from "./RacingBarChart";
// import useInterval from "./useInterval";


// const getRandomIndex = array => {
//   return Math.floor(array.length * Math.random());
// };

// function Statistics() {
//   const [iteration, setIteration] = useState(0);
//   const [start, setStart] = useState(false);
//   const [data, setData] = useState([
//     {
//       name: "alpha",
//       value: 10,
//       color: "#f4efd3"
//     },
//     {
//       name: "beta",
//       value: 15,
//       color: "#cccccc"
//     },
//     {
//       name: "charlie",
//       value: 20,
//       color: "#c2b0c9"
//     },
//     {
//       name: "delta",
//       value: 25,
//       color: "#9656a1"
//     },
//     {
//       name: "echo",
//       value: 30,
//       color: "#fa697c"
//     },
//     {
//       name: "foxtrot",
//       value: 35,
//       color: "#fcc169"
//     }
//   ]);

//   useInterval(() => {
//     if (start) {
//       const randomIndex = getRandomIndex(data);
//       setData(
//         data.map((entry, index) =>
//           index === randomIndex
//             ? {
//                 ...entry,
//                 value: entry.value + 10
//               }
//             : entry
//         )
//       );
//       setIteration(iteration + 1);
//     }
//   }, 500);

//   return (
//     <React.Fragment>
//       <h1>Racing Bar Chart</h1>
//       <RacingBarChart data={data} />
//       <button onClick={() => setStart(!start)}>
//         {start ? "Stop the race" : "Start the race!"}
//       </button>
//       <p>Iteration: {iteration}</p>
//     </React.Fragment>
//   );
// }

// export default Statistics;
