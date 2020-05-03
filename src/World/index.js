import React,{useState,useEffect} from "react";
import axios from "axios";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider, createStyles } from '@material-ui/core/styles';
import Worldtable from './worldtable';
import Update from './Update';
import Worldchart from './worldchart';

const styles = createStyles({
    formControlLabel: { fontSize: '0.6rem', 
    '& label': { fontSize: '0.6rem' } }
  });

export default function World() {
    const [datax, setDatax] = useState([]);
    const [dataw, setDataw] = useState([]);
  const [fetched,setFetched] = useState(false);

  const [value,setCase] =useState('confirmed');
  const apiURL1 = 'https://disease.sh/v2/countries';
  const apiURL2 = 'https://disease.sh/v2/all';
  const [daysC,setDaysC] = useState('Month');
  

  const [logMode, setLogMode] = useState(false);

  const fetchData = async () => {
    try {
      const [
        datad,
        dataw

    //    {data: statesDailyResponse},
    //   {data: stateTestData}
     ] =
     await Promise.all([
      axios.get(apiURL1),
      axios.get(apiURL2),
    //   axios.get(apiURL2),
   
   ]);

     
       setDatax(datad.data);
       setDataw(dataw.data);

      
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




console.log(datax);
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

    return (

        <>
    
        {fetched &&  <Update dataw={dataw} />}
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

 logMode={logMode} />}
   <RadioGroup row aria-label="daysC" name="daysC"  value={daysC} onClick={handleTime}>
        
        <FormControlLabel value="Inf" control={<Radio />} label="Start" />
        <FormControlLabel value="Month" control={<Radio />} label="4 weeks" />
        <FormControlLabel value="Fortnight" control={<Radio />} label="2 weeks" />
      
         
    </RadioGroup>
       {fetched &&  <Worldtable rows={datax}/>}

        </>
    );
  }