import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
// import NativeSelect from '@material-ui/core/NativeSelect';
import Zone from './zone';
import Tabledistrict from "./Tabledistrict";
import Statemap from "./Statemap";


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

export default function Zones() {
    const classes = useStyles();
    const [districtWiseData, setDistrictWiseData] = useState([]);
    const [stateData, setStateData] =useState([]);
    const [testData, setTestData] = useState([]);
    const [maped, setMaped] = React.useState(10);
    const [fetched,setFetched] = useState(false);
    
    

   
    


   
  
   const apiURL1 = 'https://api.covid19india.org/state_district_wise.json';
   const apiURL2 = 'https://api.covid19india.org/data.json';
   const apiURL3 = 'https://api.covid19india.org/state_test_data.json'
  
 
   const fetchData = async () => {
      try {
        const [resone, restwo, resthree
       ] =
       await Promise.all([
        axios.get(apiURL1),
        axios.get(apiURL2),
        axios.get(apiURL3)]);
  
      
         setDistrictWiseData(resone.data);
         setStateData(restwo.data.statewise);
          setTestData(resthree.data.states_tested_data.reverse())
         
         setFetched(true);
       
      
  
      } catch (err) {
         console.log(err);
       }
     };
   
    // 

      

      useEffect(() => {
             if (fetched === false) {
               fetchData();
             }
           }, [fetched]);

     

 const filtTest=testData.filter((v,i,a)=> a.findIndex(t=>(t.state===v.state && t.totaltested>0))===i);
console.log(filtTest)
 
    // let dist = [];
    // dist=objt(districtWiseData)
    const handleChange = (event) => {
      setMaped(event.target.value);
    };
         
  
    return(
        <>
        <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Select Map
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={maped}
          onChange={handleChange}
          
        >
          <MenuItem value={10}>
            Zone Map
          </MenuItem>
          <MenuItem value={20}>India- Confirmed Cases</MenuItem>
          <MenuItem value={30}>India- Test per million</MenuItem>
        </Select>
        <FormHelperText>Hover & zoom on region for details</FormHelperText>
      </FormControl>
      {(maped===10) ? (
        <div>
      {fetched  && <Zone districtWiseData={districtWiseData} maped={maped}/>}
      
      {fetched && <Tabledistrict districtWiseData={districtWiseData}/>}
      </div> ) : (maped===20) ? <div>{fetched && <Statemap statedata={stateData} maped={maped}/>}</div> :<div>{fetched && <Statemap statedata={filtTest} maped={maped}/>}</div>}
        </>
    )
}