import React, { useState,useContext,useEffect } from 'react';
// import { SelectionState } from '@devexpress/dx-react-grid';
import { SearchState,
  SelectionState, 
  SortingState,
  IntegratedFiltering,
  IntegratedSorting,
  RowDetailState, } from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  VirtualTable,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  TableColumnResizing,
  TableSelection,
  TableRowDetail,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

import {pop} from './constants';
import {TableContext} from "./TableContext";

import Tablecollapsed from "./Tablecollapsed";



const Tables = (props) => {

    const [rows,setrows] =useState(props.rows);
    const [selection, setSelection] = useState([]);
    const context = useContext(TableContext);
    const [districts,setDistrictWiseData]=useState(props.districtWiseData);
    const [searchValue, setSearchState] = useState([]);
    const [expandedRowIds, setExpandedRowIds] = useState([]);

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
  title: "Recvrd",
  getCellValue:  (row,rowInfo) =>  {
  return(  <div>
 <span>  {row.recovered}</span>
 <br/>
 <span style={{color: row.deltarecovered > 0 ? "green": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltarecovered}]</span>
  </div>)}
},

{
name: "totaltested",
title: "Total Tested"
// width: 80
},

{
name: "positive",
title: "Positive rate",
getCellValue: (row) => {
  return( ((row.positive/row.totaltested)*100).toFixed(2))
}
// width: 80
},
{
name: "tests",
title: "Tests/ million",
getCellValue: (row) => {
  return((row.totaltested/pop[row.statecode]*1000000).toFixed(0))
}
// width: 80
}

  ]);

 
  // const [tableColumnExtensions] = useState([
  //   { columnName: 'state', width: 180 },
  //   { columnName: 'confirmed', width: 100 },
  //   { columnName: 'deaths', width: 100 },
  //   { columnName: 'active', width: 100 },
  //   { columnName: 'recovered', width: 100 },
  //   { columnName: 'totaltested',width: 100 },
  //   { columnName: 'positive',width: 100 },
  //   { columnName: 'Tests/million',width: 100 },

  // ]);

   const [tableColumnExtensions] = useState([
     { columnName: TableSelection.COLUMN_TYPE, wordWrapEnabled: true },
      {columnName: 'state', wordWrapEnabled: true},
     { columnName: 'confirmed', wordWrapEnabled: true },
    { columnName: 'deaths', wordWrapEnabled: true },
    { columnName: 'active', wordWrapEnabled: true },
    { columnName: 'recovered', wordWrapEnabled: true },
    { columnName: 'totaltested',wordWrapEnabled: true },
    { columnName: 'positive',wordWrapEnabled: true},
    { columnName: 'tests',wordWrapEnabled: true},

   ]);

   const [columnWidths, setColumnWidths] = useState([
     { columnName: TableRowDetail.COLUMN_TYPE,width:20},
    { columnName: TableSelection.COLUMN_TYPE, width:20},
    {columnName: 'state', width: 100},
    { columnName: 'confirmed', width: 90 },
   { columnName: 'deaths', width: 100 },
   { columnName: 'active', width: 100 },
   { columnName: 'recovered', width: 100 },
   { columnName: 'totaltested',width: 100 },
   { columnName: 'positive',width: 100 },
   { columnName: 'tests',width: 100 },

  ]);
  const [leftColumns] = useState([TableSelection.COLUMN_TYPE,TableRowDetail.COLUMN_TYPE,'state']);
  const RowDetail = ({ row }) => (
    <div>
<Tablecollapsed districts={districts[row.state].districtData}/>
    </div>
  );
 

 
console.log(districts)
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
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
       <SearchState value={searchValue}
          onValueChange={setSearchState} />
          <IntegratedFiltering/>
          <Toolbar />
        <SearchPanel />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
         <SortingState
          defaultSorting={[{ columnName: 'confirmed', direction: 'desc' }]}
        />
        <IntegratedSorting />
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <VirtualTable  columnExtensions={tableColumnExtensions}/>
       
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        />
        <TableHeaderRow showSortingControls />
      
        
        <TableSelection />
 
        <TableRowDetail
          contentComponent={RowDetail}
        /> 
               <TableFixedColumns
          leftColumns={leftColumns}/>
      </Grid>
    </Paper>
  );
};
export default Tables;
