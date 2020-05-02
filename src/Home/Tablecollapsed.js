import React, { useState,useEffect } from 'react';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';


import Paper from '@material-ui/core/Paper';

const Tablecollapsed=(props) => {

    const [districts, setDistricts] =useState([]);



useEffect(()=>
setDistricts(props.districts)
,[props.districts])



const array1 =[];
const array2=[];
const array3=[];
const array4=[];
const array5=[];
// const array3=[];

for (const x in districts)
{
  array1.push(x);
array2.push(districts[x].confirmed);
array3.push(districts[x].deceased);
array4.push(districts[x].recovered);
array5.push(districts[x].active);
}

const arr =([]);
for (var i = 0; i < array1.length; i++) {
    arr.push({
        District: array1[i],
        Confirmed: array2[i],
        Deaths: array3[i],
        Recovered: array4[i],
        Active: array5[i]
    });
}

console.log(districts);

const rows = arr.sort((a, b) => (b.Confirmed - a.Confirmed));

  const [columns] = useState([
   
    {
        name: "District",
       title: "District",
        
        
      },
    {
        name: "Confirmed",
      title: "Total Cases",
    },
    {
      name: "Deaths",
    title: "Deaths",
  },
  {
    name: "Recovered",
  title: "Recovered",
},
{
  name: "Active",
title: "Active",
}
      
  ]);
   const [tableColumnExtensions] = useState([
    { columnName: 'District', width: 200 }
   ])

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState
          defaultSorting={[{ columnName: 'Confirmed', direction: 'desc' }]}
        />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions}/>
        <TableHeaderRow showSortingControls />
      </Grid>
    </Paper>
  );
};



export default Tablecollapsed;