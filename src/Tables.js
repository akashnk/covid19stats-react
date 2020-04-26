import React, { useState,useContext,useEffect } from 'react';
import { SelectionState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {pop} from './constants';
import {TableContext} from "./TableContext";


const Tables = (props) => {

    const [rows,setrows] =useState(props.rows);
    const [selection, setSelection] = useState([]);
    const context = useContext(TableContext);
  const [columns] = useState([
    
    {
        name: "state",
        title: "State",
        
        
      },
      {
        name: "confirmed",
        title: "Total cases",
        getCellValue: (row,rowInfo) =>  {
        return(  <div>
       <span>  {row.confirmed}</span>
       <br/>
       <span style={{color: row.deltaconfirmed > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltaconfirmed}]</span>
        </div>)}
  
      },


                { 
                  name: "deaths",
                  title: "Deaths",
                  getCellValue: (row,rowInfo) =>  {
                  return(  <div>
                 <span>  {row.deaths}</span>
                 <br/>
                 <span style={{color: row.deltadeaths > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltadeaths}]</span>
                  </div>)}

                },


  {
    name: "active",
    title: "Active"
    // width: 80
  },

{
  name: "recovered",
  title: "Recovered",
  getCellValue:  (row,rowInfo) =>  {
  return(  <div>
 <span>  {row.recovered}</span>
 <br/>
 <span style={{color: row.deltarecovered > 0 ? "green": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltarecovered}]</span>
  </div>)}
},

{
name: "totaltested",
header: "Total Tested"
// width: 80
},

{
name: "positive",
title: "Positivity %",
getCellValue: (row) => {
  return( ((row.positive/row.totaltested)*100).toFixed(2))
}
// width: 80
},
{
name: "positive",
title: "Tests per million",
getCellValue: (row) => {
  return((row.totaltested/pop[row.statecode]*1000000).toFixed(0))
}
// width: 80
}

  ]);

 
  
 

 

 useEffect(()=>{
    if (selection.length > 0) {
        

        const statec = rows.map(d => d.statecode);
        const selstate = selection.map(d=>statec[d]);
  
  
    context.setStatecodes(selstate);}
    else {
      context.setStatecodes(["TT"]);
    }
},[selection,rows])

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
      >
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <Table />
        <TableHeaderRow />
        <TableSelection />
      </Grid>
    </div>
  );
};
export default Tables;
