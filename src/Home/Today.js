import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider, createStyles } from '@material-ui/core/styles';
// import { Container } from '@material-ui/core';
// import Box from '@material-ui/core/Box';


const theme = createMuiTheme({

  typography: {
    "fontSize": 11.8,
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




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit*2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(0.2),
  },
  title: {
    flexGrow: 1,
  },
  thx: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    border: '1px solid red',
  },
}));

const Today= (props) => {
    const [data, setData] = useState(props.data);
    const [confirmed, setConfirmed] = useState(0);
    const [active, setActive] = useState(0);
    const [recoveries, setRecoveries] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [deltas, setDeltas] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        setData(props.data);
      }, [props.data]);
      useEffect(() => {
        const parseData = () => {
          let confirmed = 0;
          let active = 0;
          let recoveries = 0;
          let deaths = 0;
          let deltas = {};
          data.forEach((state, index) => {
            if (index !== 0) {
              confirmed += parseInt(state.confirmed);
              active += parseInt(state.active);
              recoveries += parseInt(state.recovered);
              deaths += parseInt(state.deaths);
            } else {
              deltas = {
                confirmed: parseInt(state.deltaconfirmed),
                deaths: parseInt(state.deltadeaths),
                recovered: parseInt(state.deltarecovered),
              };
            }
          });
          setConfirmed(confirmed);
          setActive(active);
          setRecoveries(recoveries);
          setDeaths(deaths);
          setDeltas(deltas);
        };
        parseData();
      }, [data]);

    return(
      <>
      <ThemeProvider theme={theme}>
    
    <div className={classes.root}>
     <Grid container spacing={0}> 
       <Grid xs={12} sm={12} md={6}>
<Paper className="classes.paper">


      <table className="tablex">
  <tr>
    <th  className="thx" style={{color: "#FF5F31"}}><h5>India Cases</h5>
    
    <h4 >{confirmed.toLocaleString()}</h4>
      {deltas
        ? deltas.confirmed > 0
          ? <h6> New+ {deltas.confirmed.toLocaleString()}</h6>
          : <h6 >+0</h6>
        : ''}
      
  
</th>
    <th className="thx" style={{color: "#5CB8E7"}}><h5 >Active</h5>
    
    <h4 >{active.toLocaleString()}</h4> 
      {deltas
        ? deltas.active > 0
          ? <h6> New+ {deltas.active.toLocaleString()}</h6>
         : <h6 style={{color: "white"}}>+0</h6>
        : ''}
      
    </th>
    <th className="thx" style={{color: "#78CC5A"}}><h5 >Recovered</h5>
    <h4 >
     {recoveries.toLocaleString()} </h4>
      {deltas
        ? deltas.recovered > 0
          ?<h6> New+ {deltas.recovered.toLocaleString()}</h6>
          : <h6>+0</h6>
        : ''}
      
   </th>
    <th className="thx" style={{color: "#A4B265"}}><h5 >Deaths</h5>
    <h4>
      {deaths.toLocaleString()}</h4> 

      {deltas
        ? deltas.deaths > 0
          ? <h6> New+ {deltas.deaths}</h6>
          : <h6>+0</h6>
        : ''}
    

    </th>
    </tr>
    </table>
    </Paper>
    </Grid>
    <Grid xs={12} sm={12} md={6}>
    <Paper className="classes.paper">
    <table className="tablex">
      <tr>
    <th className="thx" style={{color: "#FF5F31"}}><h3 >Death rate</h3>
    <h2>
      {((deaths/confirmed*100).toFixed(2))} %
      

    </h2></th>
   
    <th className="thx" style={{color: "#A4B265"}}><h5 >Death rate</h5>
    <h5 >(resolved)</h5>
    <h4>
      {((deaths/(recoveries+deaths)*100).toFixed(2))} %
      

    </h4></th>

    <th className="thx" style={{color: "#78CC5A"}}><h3 >Recovery rate</h3>
    <h2>
      {((recoveries/confirmed*100).toFixed(2))} % 
      

    </h2></th>

    <th className="thx" style={{color: "#5CB8E7"}}><h3 >Tests/million</h3>
    <h2>
      {((props.tested/1371360350*1000000).toFixed(0))} 
      

    </h2></th>
  </tr>
  </table>
  </Paper>
  </Grid>
  </Grid>
  </div>
  </ThemeProvider>



</>
    )
}


export default Today;
