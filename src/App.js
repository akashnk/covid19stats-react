import React, { useMemo, useState,forwardRef, useEffect,useReducer,useContext } from "react";
import axios from "axios";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import Tables from "./Tables";
import {getColumnWidth} from "./common-functions.js"
import Today from "./Today";
import Dchart from "./Dchart";
import Racechart from "./Racechart";
import "./App.css";
import {TableContext} from './TableContext';
import {STATES,pop} from './constants';


// import Utils from "./Utils";
import {
  formatDate,
  formatDateAbsolute,
  preprocessTimeseries,
  parseStateTimeseries,
} from './common-functions';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme, ThemeProvider, createStyles } from '@material-ui/core/styles';


const theme = createMuiTheme({
  props: {
    MuiTypography: {
      "fontSize": 14,
      variantMapping: {
        fontsize: 12,
        h1: 'h3',
        h2: 'h4',
        h3: 'h5',
        h4: 'h6',
        h5: 'h7',
        h6: 'h8',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});

const styles = createStyles({
  formControlLabel: { fontSize: '0.6rem', 
  '& label': { fontSize: '0.6rem' } }
});





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0.2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [data, setData] = useState([]);
  const [fetched,setFetched] = useState(false);
  const [districtWiseData, setDistrictWiseData] = useState([]);
  const [statesDailyResponse,setStatesDailyResponse] = useState([]);
  const [stateTestData, setStateTestData] = useState({});
  const [timeseries,setTimeseries] = useState([]);
   const [graphOption, setGraphOption] = useState(1);
   const [timeseriesMode, setTimeseriesMode] = useState(true)
    const [timeMode, setTimeMode] = useState([]);

const [logMode, setLogMode] = useState(false);
 const [activeStateCode, setActiveStateCode] = useState('TT');
 const [value,setCase] =useState('totalconfirmed');
  const [testData, setTestData] = useState([]);
  const [totalTests,setTotaltests] =useState([]);

  //const apiURL1 = 'https://corona.lmao.ninja/v2/countries';
  const apiURL1 = 'https://api.covid19india.org/state_district_wise.json';
  const apiURL2 = 'https://api.covid19india.org/data.json';
   const apiURL3 = 'https://api.covid19india.org/states_daily.json';
   const apiURL4 = 'https://api.covid19india.org/state_test_data.json';
//   const apiURL4
 const context = useContext(TableContext);
// console.log(context.statecodes);

useEffect(() => {
   document.title = "Covid 19 Interactive Dashboard"
}, []);

   const fetchData = async () => {
    try {
      const [resone,
        {data},

       {data: statesDailyResponse},
      {data: stateTestData}
     ] =
     await Promise.all([
      axios.get(apiURL1),
      axios.get(apiURL2),
     axios.get(apiURL3),
    axios.get(apiURL4),
   ]);

       //console.log(resone.data);
       setDistrictWiseData(resone.data);
       setData(data.statewise);

       // setStatesDailyResponse(resthree.data);
       const ts = parseStateTimeseries(statesDailyResponse);
       ts['TT'] = preprocessTimeseries(data.cases_time_series); // TT -> India
       setTimeseries(ts);
       setTestData(stateTestData.states_tested_data.reverse());
       setTotaltests(data.tested[data.tested.length-1])
      //  testData.push({
      //   updatedon: totalTests.updatetimestamp,
      //   totaltested: totalTests.totalindividualstested,
      //   source: totalTests.source,
      //   state: 'Total',
      // });
    //  testData.push({
      //  updatedon: totalTest.updatetimestamp.split(' ')[0],
      //  totaltested: totalTest.totalindividualstested,
      //  source: totalTest.source,
      //  state: 'Total', // India
    //  });
        // setStateTestData(testData);
       
       setFetched(true);

    } catch (err) {
       console.log(err);
     }
   };

   useEffect(() => {
       if (fetched === false) {
         fetchData();
       }
     }, [fetched]);
   // function getMapKeyValueByIndex(testData, idx) {
   //    var key = Object.keys(obj)[idx];
   //    return { key: , value: obj[key] };
   // }

// const testkData = testData.reverse();
// const totalTest = data.tested[data.tested.length - 1];
// var arrayv=[];
//  for (var i=0;i < STATES.length; i++)
//  {
//    var st = [];
//    var j = [];
// st = Object.values(STATES)[i];
// j = testData.find(d => d.state === st);


const fdata = data.filter(d => d.confirmed > 0);
const kdata = fdata.filter(d => d.state !== "Total");
const gdata = kdata.sort((a, b) => (b.confirmed - a.confirmed));
const filtTest=testData.filter((v,i,a)=> a.findIndex(t=>(t.state===v.state && t.totaltested>0))===i);

let merged = [];

 for(let i=0; i<gdata.length; i++) {
// gdata.forEach(function(i) {
  merged.push({
   ...gdata[i], 
   ...(filtTest.find((itmInner) => itmInner.state === gdata[i].state))}
  );
};



// console.log(gdata.map((, i) => Object.assign({}, item, filtTest[i]));
// const ddata= [...gdata,...filtTest,]
// let set = new Set();
// let unionArray = ddata.filter(item => {
//   if (!set.has(item.state)) {
//     set.add(item.state);
//     return true;
//   }
//   return false;
// }, set);

// function mergeArrayObjects(arr1,arr2){
//   return arr1.map((item,i)=>{
//      if(item.state === arr2[i].state){
//          //merging two objects
//        return Object.assign({},item,arr2[i])
//      }
//   })
// }
// useEffect(()=>{
// setTimeMode(mergeArrayObjects(gdata,filtTest));
// }
// ,[gdata,filtTest])



// console.log(merged);
// console.log(testData)
// arrayv.push(j)


const handleChange = e => {
   // console.log(e.target.value);
   setCase(e.target.value);
 };
 const handleChangelog = e => {
    // console.log(e.target.value);
    setLogMode(e.target.checked);
  };


// console.log(JSON.stringify(timeseries["TT"])
// console.log(districtWiseData);
const classes = useStyles();

// console.log(logMode);
// console.log(districtWiseData)
  return (


<ThemeProvider theme={theme}>
    
    <div className={classes.root}>
    <Grid container spacing={1}>
    <Grid item xs={12}>
    <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
            Covid 19 Interactive Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>
</Grid>
<Grid item xs={12}>
<Paper className={classes.paper}>
<div className="box">
      <Today data={data} />
      </div>
      </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
       
         {/* <input type="radio" name="case" value="totalconfirmed" defaultChecked onChange={handleChange}/>
         <label>Confirmed</label>
         <input type="radio" name="case" value="totaldeceased" onChange={handleChange}/>  <label>Deaths</label>

         <input type="radio" name="case" value="totalrecovered" onChange={handleChange}/>  <label>Recovered</label>

         <input type="radio" name="case" value="dailyconfirmed" onChange={handleChange}/>  <label>Daily cases</label> */}
         
         <RadioGroup row aria-label="case" name="case" value={value} onChange={handleChange}>
         <FormControlLabel value="totalconfirmed" control={<Radio />} label="Confirmed" />
    <FormControlLabel value="totaldeceased" control={<Radio />} label="Deaths" />
    <FormControlLabel value="totalrecovered" control={<Radio />} label="Recovered" />
    <FormControlLabel value="dailyconfirmed" control={<Radio />} label="Daily cases" />
    <FormControlLabel
        control={<Switch checked={logMode} onChange={handleChangelog} />}
        label={<Typography styles={styles.formControlLabel}>Logarithmic</Typography>}
      />
     
</RadioGroup>

</Paper>

      </Grid>
       <Grid item xs={12}>
        {fetched && <Dchart timeseries={timeseries[activeStateCode]}
                totdata={timeseries}
                casetype={value}

                type={graphOption}
                mode={timeseriesMode}
                logMode={logMode} />}
                </Grid>
                <Grid item xs={12} sm={10}>
                <Paper className={classes.paper}>
      {fetched && <Tables  rows={merged}
            districtWiseData={districtWiseData}
            totaldata={timeseries}
      />}
</Paper>
    </Grid>
    {/* <Grid item xs={12} sm={6}>
    <Paper className={classes.paper}>{fetched && <Racechart timeseries={timeseries} />} </Paper></Grid> */}
    </Grid>
    </div>
    </ThemeProvider>
  )
}

export default App;
