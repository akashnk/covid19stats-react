import React,{useState,useEffect,useContext} from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider, createStyles } from '@material-ui/core/styles';
import {TableContext} from "../TableContext";
import Worldtable from './worldtable';
import Update from './Update';
import Worldchart from './worldchart';


const theme = createMuiTheme({

  typography: {
    "fontSize": 12.5,
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


export default function World() {
    const [datax, setDatax] = useState([]);
    const [dataw, setDataw] = useState([]);
    const [datap, setDatap] = useState([]);
    const [countryd,setcountry] = useState([]);
  const [fetched,setFetched] = useState(false);
  const [activeCountryCode,setActiveCountryCode] = useState(["World"])

  const [value,setCase] =useState('confirmed');
  const apiURL1 = 'https://disease.sh/v2/countries';
  const apiURL2 = 'https://disease.sh/v2/all';
  const apiURL3 = 'https://pomber.github.io/covid19/timeseries.json'
  const [daysC,setDaysC] = useState('Month');
  

  const [logMode, setLogMode] = useState(false);

  useEffect(() => {
    document.title = "Covid 19 Interactive Dashboard -World "
 }, []);

  const fetchData = async () => {
    try {
      const [
        datad,
        dataw,
        datap,

    //    {data: statesDailyResponse},
    //   {data: stateTestData}
     ] =
     await Promise.all([
      axios.get(apiURL1),
      axios.get(apiURL2),
      axios.get(apiURL3),
    //   axios.get(apiURL2),
   
   ]);

     
       setDatax(datad.data);
       setDataw(dataw.data);
       setDatap(datap.data);

      
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

     const gdata = datax.sort((a, b) => (b.cases - a.cases));
    

     useEffect(()=>{
      
      var countryArr = Object.keys(datap)
     var worldChart = [];
      countryArr.forEach((country) => {
         let countryData = datap[country];
          
          countryData.forEach((dailyData, index) => {
              if (worldChart[index] === undefined) {
                  var worldStats = { date: dailyData.date, confirmed: dailyData.confirmed, recovered: dailyData.recovered, deaths: dailyData.deaths };
                  worldChart.push(worldStats);
              } else {
                  worldChart[index].confirmed += dailyData.confirmed;
                  worldChart[index].recovered += dailyData.recovered;
                  worldChart[index].deaths += dailyData.deaths;
                  
              }
          });
        });
        datap["World"] = worldChart;
        setcountry(datap)

      },[datap])
 
 

  function ObjKeyRename2(src, map) {
    var dst = {};
    // src --> dst
    for(var key in src){
        if(key in map)
            // rename key
            dst[map[key]] = src[key];
        else
            // same key
            dst[key] = src[key];
    }
    // clear src
    for(var key in src){
        delete src[key];
    }
    // dst --> src
    for(var key in dst){
        src[key] = dst[key];
    }
}


    const o = countryd
ObjKeyRename2(o, {"US":"USA"});
ObjKeyRename2(o, {"United Kingdom":"UK"});
ObjKeyRename2(o, {"United Arab Emirates":"UAE"});
ObjKeyRename2(o, {"Korea, South":"S. Korea"});
ObjKeyRename2(o, {"Taiwan*":"Taiwan"});

const context = useContext(TableContext)
// console.log(datax);
const handleChange = e => {
    // console.log(e.target.value);
    setCase(e.target.value);
  };
  const handleChangelog = e => {
     // console.log(e.target.value);
     setLogMode(e.target.checked);
   };
 
   const handleTime = e => {
     // console.log(e.target.value);
     setDaysC(e.target.value);
   };

   const handleButton = () => {
    // console.log(e.target.value);
    setActiveCountryCode(['World']);
    
    setLogMode(false);
    setCase('confirmed');
  };



 useEffect(()=>{
  context.setCountrycodes(activeCountryCode);
  context.setCountryselect([]);;
  setDaysC('Month');
 },[activeCountryCode])
   const classes = useStyles();
    return (

        <>
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
    <Grid container spacing={1.5}>
    <Grid item xs={12} >
<Paper className={classes.paper}>
        {fetched &&  <Update dataw={dataw} />}
        </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Paper className={classes.paper}>
        <RadioGroup row aria-label="case" name="case" value={value} onChange={handleChange}>
         <FormControlLabel value="confirmed" control={<Radio />} label="Confirmed" />
    <FormControlLabel value="deaths" control={<Radio />} label="Deaths" />
    <FormControlLabel value="recovered" control={<Radio />} label="Recovered" />
    
    <FormControlLabel
        control={<Switch checked={logMode} onChange={handleChangelog} />}
        label={<Typography styles={styles.formControlLabel}>Logarithmic</Typography>}
      />
      </RadioGroup>
    
        {fetched && <Worldchart dataw={datax} casetype={value}

daysC ={daysC} 
totdata={o}

 logMode={logMode} />}
   <RadioGroup row aria-label="daysC" name="daysC"  value={daysC} onClick={handleTime}>
        
        <FormControlLabel value="Inf" control={<Radio />} label="Start" />
        <FormControlLabel value="Month" control={<Radio />} label="4 weeks" />
        <FormControlLabel value="Fortnight" control={<Radio />} label="2 weeks" />
        <Button variant="outlined" color="primary" onClick={handleButton}>
  Reset all
</Button> 
         
    </RadioGroup>
    </Paper>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
    <Paper className={classes.paper}>
       {fetched &&  <Worldtable rows={gdata}/>}
       </Paper>
</Grid>
</Grid>
</div>
</ThemeProvider>
        </>
    );
  }