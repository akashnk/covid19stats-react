import React, { useState, useEffect } from "react";
import axios from "axios";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { spacing } from '@material-ui/system';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Tables from "./Table";

import Today from "./Today";
import Dchart from "./Dchart";
// import Racechart from "./Racechart";
import "../App.css";




// import Utils from "./Utils";
import {

  preprocessTimeseries,
  parseStateTimeseries,
} from '../Common/common-functions';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Typography from '@material-ui/core/Typography';

import { createMuiTheme, ThemeProvider, createStyles } from '@material-ui/core/styles';



const items = [
  { name: 'home', label: 'Home' },
  { name: 'billing', label: 'Billing' },
  { name: 'settings', label: 'Settings' },
]

const theme = createMuiTheme({

    typography: {
      "fontSize": 12,
      "lineHeight":10,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      variantMapping: {
        
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
 
});

const styles = createStyles({
  formControlLabel: { fontSize: '0.6rem', 
  '& label': { fontSize: '0.6rem' } }
});





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(0.1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(0.2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Home() {
  const [data, setData] = useState([]);
  const [fetched,setFetched] = useState(false);
  const [districtWiseData, setDistrictWiseData] = useState([]);

  const [timeseries,setTimeseries] = useState([]);
  
   const [timeseriesMode, setTimeseriesMode] = useState(true)
   const [daysC,setDaysC] = useState('Month');
  

const [logMode, setLogMode] = useState(false);
const [panMode, setpanMode] = useState(false);
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
 
// console.log(context.statecodes);

useEffect(() => {
   document.title = "Covid 19 Interactive Dashboard -India "
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
console.log(totalTests)

const fdata = data.filter(d => d.confirmed > 0);
const kdata = fdata.filter(d => d.state !== "Total");
// const kgdata = kdata.sort((a, b) => (b.deaths - a.deaths));
// const kggdata = kgdata.sort((a, b) => (b.recovered - a.recovered));

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


const handleChange = e => {
   // console.log(e.target.value);
   setCase(e.target.value);
 };
 const handleChangelog = e => {
    // console.log(e.target.value);
    setLogMode(e.target.checked);
  };
  const handleChangepan = e => {
    // console.log(e.target.value);
    setpanMode(e.target.checked);
  };

  const handleTime = e => {
    // console.log(e.target.value);
    setDaysC(e.target.value);
  };
  
// console.log(JSON.stringify(timeseries["TT"])
// console.log(districtWiseData);
const classes = useStyles();

 
// console.log(districtWiseData)
  return (
<>
    {/* <CssBaseline /> */}
<ThemeProvider theme={theme}>
    
    <div className={classes.root}>
     <Grid container spacing={1}> 
 


<div >
      <Today data={data} tested={totalTests['totalsamplestested']} />
      </div>
     
 
       <Grid item xs={12} sm={12} md={6}>
       
      <Paper className={classes.paper} >
       
         {/* <input type="radio" name="case" value="totalconfirmed" defaultChecked onChange={handleChange}/>
         <label>Confirmed</label>
         <input type="radio" name="case" value="totaldeceased" onChange={handleChange}/>  <label>Deaths</label>

         <input type="radio" name="case" value="totalrecovered" onChange={handleChange}/>  <label>Recovered</label>

         <input type="radio" name="case" value="dailyconfirmed" onChange={handleChange}/>  <label>Daily cases</label> */}
         
         <RadioGroup row aria-label="case" name="case" value={value} onChange={handleChange}>
         <FormControlLabel value="totalconfirmed" control={<Radio />} label="Cases" />
    <FormControlLabel value="totaldeceased" control={<Radio />} label="Deaths" />
    <FormControlLabel value="totalrecovered" control={<Radio />} label="Recovered" />
    <FormControlLabel value="dailyconfirmed" control={<Radio />} label="Daily" />
    <FormControlLabel value="dailytotal" control={<Radio />} label="Daily/Total" />
    <FormControlLabel
        control={<Switch checked={logMode} onChange={handleChangelog} />}
        label={<Typography styles={styles.formControlLabel}>Logarithmic</Typography>}
      />
       {/* <FormControlLabel
        control={<Switch checked={panMode} onChange={handleChangepan} />}
        label={<Typography styles={styles.formControlLabel}>Zoom</Typography>}
      /> */}
     
</RadioGroup>


        {fetched && <Dchart timeseries={timeseries[activeStateCode]}
                totdata={timeseries}
                casetype={value}

               daysC ={daysC}
                mode={timeseriesMode}
                logMode={logMode}  panMode={panMode}/>
                }

                          <RadioGroup row aria-label="daysC" name="daysC"  value={daysC} onClick={handleTime}>
        
        <FormControlLabel value="Inf" control={<Radio />} label="Start" />
        <FormControlLabel value="Month" control={<Radio />} label="4 weeks" />
        <FormControlLabel value="Fortnight" control={<Radio />} label="2 weeks" />
      
         
    </RadioGroup>
                </Paper>

                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                <Paper className={classes.paper}>
      {fetched && <Tables  rows={merged}
            districtWiseData={districtWiseData}
            totaldata={timeseries}
      />}
  
</Paper>
    </Grid>
    </Grid> 
    </div>
    </ThemeProvider>
    </>
  )
}

export default Home;
