import React, { useState,useEffect } from 'react';
import {
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

// import { fade } from '@material-ui/core/styles/colorManipulator';
// import { withStyles } from '@material-ui/core/styles';


import Paper from '@material-ui/core/Paper';

// const styles = theme => ({
//   tableStriped: {
//     '& tbody tr:nth-of-type(odd)': {
//       backgroundColor: fade(theme.palette.primary.main, 0.15),
//     },
//   },
// });

// const TableComponentBase = ({ classes, ...restProps }) => (
//   <Table.Table
//     {...restProps}
//     className={classes.tableStriped}
//   />
// );

// export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);


const Tablecollapsed=(props) => {

    const [districts, setDistricts] =useState([]);



useEffect(()=>
setDistricts(props.districts)
,[props.districts])

const CurrencyFormatter = ({ value,row }) => (
  row.deltaconf > 0 ? (<div>{value} <span style={{ color: 'red' }}>
       [+ {row.deltaconf}]</span> </div>
   ) : <div>{value}</div>
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

const CurrencyFormatterx = ({ value,row }) => (
  row.deltarec > 0 ? (<div>{value} <span style={{ color: 'green' }}>
       [+ {row.deltarec}]
  </span></div>) : (<div>{value}</div>)
);

const CurrencyTypeProviderx = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatterx}
    {...props}
  />
);

const CurrencyFormatterxx = ({ value,row }) => (
  row.deltadeaths > 0 ? (<div>{value} <span style={{ color: 'red' }}>
       [+ {row.deltadeaths}]
  </span></div>) : (<div>{value}</div>)
);

const CurrencyTypeProviderxx = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatterxx}
    {...props}
  />
);

// const array1 =[];
// const array2=[];
// const array3=[];
// const array4=[];
// const array5=[];
// // const array3=[];
// // const vgfh = Object.keys(districts).reduce(function (r, k) {
// //   return r.concat( k,districts[k]);
// // }, []);

// for (const x in districts)
// {
//   array1.push(x);
// array2.push(districts[x].confirmed);
// array3.push(districts[x].deceased);
// array4.push(districts[x].recovered);
// array5.push(districts[x].active);
// }

// const arr =([]);
// var arrr=([]);
// // arrr.District = Object.keys(districts)
// // arrr.Confirmed = Object.keys(districts).map(function(item,k) {
// //   return item.confirmed;
// // });

// for (var i = 0; i < array1.length; i++) {
//     arr.push({
//         District: array1[i],
//         Confirmed: array2[i],
//         Deaths: array3[i],
//         Recovered: array4[i],
//         Active: array5[i]
//     });
// }
 
let ned = Object.values(districts).map((newKeyValue,k) => {
  newKeyValue.District = Object.keys(districts)[k]
   newKeyValue.deltaconf = Object.values(districts)[k].delta.confirmed
   newKeyValue.deltadeaths = Object.values(districts)[k].delta.deceased
   newKeyValue.deltarec = Object.values(districts)[k].delta.recovered
  //  delete Object.values(districts)[k].delta
   return newKeyValue
})

const vgfh = Object.keys(ned).reduce(function (r, k) {
  return r.concat( ned[k]);
}, []);

const rows = vgfh.sort((a, b) => (b.confirmed - a.confirmed));

  const [columns] = useState([
   
    {
        name: "District",
       title: "District",
        
        
      },
    {
        name: "confirmed",
      title: "Total Cases",
    },
    {
      name: "deceased",
    title: "Deaths",
  },
{
  name: "active",
title: "Active",
},
  {
    name: "recovered",
  title: "Recovered",
}
      
  ]);
   const [tableColumnExtensions] = useState([
    { columnName: 'District', width: 120, wordWrapEnabled: true },
    { columnName: 'confirmed', width: 120, wordWrapEnabled: true },
    { columnName: 'deceased', width: 120, wordWrapEnabled: true },
    { columnName: 'active', width: 120, wordWrapEnabled: true },
    { columnName: 'recovered', width: 120, wordWrapEnabled: true },
   ])
   const [leftColumns] = useState(['District'])
   const [currencyColumns] = useState(['confirmed']);
   const [currencyColumnsx] = useState(['recovered']);
   const [currencyColumnsxx] = useState(['deceased']);
  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
         <CurrencyTypeProvider
          for={currencyColumns}
        />
         >
         <CurrencyTypeProviderx
          for={currencyColumnsx}
        />
          <CurrencyTypeProviderxx
          for={currencyColumnsxx}
        />
        <SortingState
          defaultSorting={[{ columnName: 'Confirmed', direction: 'desc' }]}
        />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow showSortingControls />
        <TableFixedColumns
          leftColumns={leftColumns}/>
      </Grid>
    </Paper>
  );
};



export default Tablecollapsed;