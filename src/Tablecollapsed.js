import React, { useState,useEffect } from 'react';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';



const Tablecollapsed=(props) => {

    const [districts, setDistricts] =useState([]);



useEffect(()=>
setDistricts(props.districts)
,[props.districts])


const array1 =[];
const array2=[];
// const array3=[];

for (const x in districts)
{
  array1.push(x);
array2.push(districts[x].confirmed);

}


const arr =([]);
for (var i = 0; i < array1.length; i++) {
    arr.push({
        District: array1[i],
        Confirmed: array2[i],
        
    });
}


const rows = arr.sort((a, b) => (b.Confirmed - a.Confirmed));

  const [columns] = useState([
   
    {
        name: "District",
       title: "District",
        
        
      },
    {
        name: "Confirmed",
      title: "Total Cases",
    }
      
  ]);
  

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState
          defaultSorting={[{ columnName: 'Confirmed', direction: 'desc' }]}
        />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow showSortingControls />
      </Grid>
    </div>
  );
};



export default Tablecollapsed;