import React, { useState,useContext,useEffect } from 'react';
// import { SelectionState } from '@devexpress/dx-react-grid';
import { SearchState,
  SelectionState, 
  SortingState,
  IntegratedFiltering,
  IntegratedSorting,
  RowDetailState, 
  PagingState,
  IntegratedPaging,
DataTypeProvider} from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  PagingPanel,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  TableSelection,
  TableRowDetail,
  TableFixedColumns,
  
} from '@devexpress/dx-react-grid-material-ui';

import {pop} from '../Common/constants';
import {TableContext} from "../TableContext";

import Tablecollapsed from "./Tablecollapsed";



const Tables = (props) => {

    const [rows,setrows] =useState(props.rows);
    const [selection, setSelection] = useState([]);
    const context = useContext(TableContext);
    const [districts,setDistrictWiseData]=useState(props.districtWiseData);
    const [searchValue, setSearchState] = useState([]);
    const [expandedRowIds, setExpandedRowIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(9);
    const [pageSizes] = useState([9, 18, 27]);

    rows.forEach((d,i)=> {
      d.confirmed= +d.confirmed
      d.active= +d.active
      d.recovered= +d.recovered
      d.deaths=+d.deaths
      d.totaltested= +d.totaltested
      d.deltadeaths=+d.deltadeaths
     
      });

      const Formatter = ({ value,row }) => (
        row.deltaconfirmed > 0 ? (<div>{value.toLocaleString()} <br/><span style={{ color: 'red' }}>
             [+ {row.deltaconfirmed.toLocaleString()}]</span> </div>
         ) : <div>{value.toLocaleString()}</div>
      );
      
      const TypeProvider = props => (
        <DataTypeProvider
          formatterComponent={Formatter}
          {...props}
        />
      );
      
      const Formatterx = ({ value,row }) => (
        row.deltarecovered > 0 ? (<div>{value.toLocaleString()} <br/><span style={{ color: 'green' }}>
             [+ {row.deltarecovered.toLocaleString()}]
        </span></div>) : (<div>{value.toLocaleString()}</div>)
      );
      
      const TypeProviderx = props => (
        <DataTypeProvider
          formatterComponent={Formatterx}
          {...props}
        />
      );
      
      const Formatterxx = ({ value,row }) => (
        row.deltadeaths > 0 ? (<div>{value} <br/><span style={{ color: 'red' }}>
             [+ {row.deltadeaths}]
        </span></div>) : (<div>{value}</div>)
      );
      
      const TypeProviderxx = props => (
        <DataTypeProvider
          formatterComponent={Formatterxx}
          {...props}
        />
      );

      const Formatterxxx = ({ value }) => (
        value.toLocaleString()
      );
      
      const TypeProviderxxx = props => (
        <DataTypeProvider
          formatterComponent={Formatterxxx}
          {...props}
        />
      );
      // const [integratedSortingColumnExtensions] = useState([
      //   { columnName: 'deaths', compare: comparedeath  },
      // ]);

   

  const [columns] = useState([
    
    {
        name: "state",
        title: "State",
        
        
      },
      {
        name: "confirmed",
        title: "Total cases",
      //   getCellValue: (row,rowInfo) =>  {
      //   return(  <div>
      //  <span>  {row.confirmed}</span>
      //  <br/>
      //  <span style={{color: row.deltaconfirmed > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltaconfirmed}]</span>
      //   </div>)}
  
      },


                { 
                  name: "deaths",
                  title: "Deaths",
                //   getCellValue: (row,rowInfo) =>  {
                //   return(  <div>
                //  <span>  {parseFloat(row.deaths)}</span>
                //  <br/>
                //  <span style={{color: row.deltadeaths > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltadeaths}]</span>
                //   </div>)}

                },


  {
    name: "active",
    title: "Active"

    // width: 80
  },

{
  name: "recovered",
  title: "Recovered",
//   getCellValue:  (row,rowInfo) =>  {
//   return(  <div>
//  <span>  {parseFloat(row.recovered)}</span>
//  <br/>
//  <span style={{color: row.deltarecovered > 0 ? "green": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {(row.deltarecovered).toString()}]</span>
//   </div>)}
},
{
name: "deathrate",
title: "Death rate",
getCellValue: (row) =>  {return(parseFloat( ((row.deaths/row.confirmed)*100).toFixed(2))) },
//   getCellValue:  (row,rowInfo) =>  {
//   return(  <div>
//  <span>  {parseFloat(row.recovered)}</span>
//  <br/>
//  <span style={{color: row.deltarecovered > 0 ? "green": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {(row.deltarecovered).toString()}]</span>
//   </div>)}
},


{
name: "totaltested",
title: "Total Tested"
,
getCellValue: (row) => { return (+(row.totaltested)) || 0
// width: 80
},
},
{
name: "positive",
title: "Positive rate",
getCellValue: (row) => {
  return(parseFloat( ((row.positive/row.totaltested)*100).toFixed(2)) || 0)
}
// width: 80
},
{
name: "tests",
title: "Tests/ million",
getCellValue: (row) => {
  return(parseFloat((row.totaltested/pop[row.statecode]*1000000).toFixed(0)) || 0)
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
     { columnName: TableSelection.COLUMN_TYPE, width:20, wordWrapEnabled: true },
      {columnName: 'state', width: 85, wordWrapEnabled: true},
     { columnName: 'confirmed', width: 80, wordWrapEnabled: true },
    { columnName: 'deaths', width: 80},
    { columnName: 'active', width: 80 },
    { columnName: 'recovered', width: 100 , wordWrapEnabled: true },
    { columnName: 'deathrate', width: 80 , wordWrapEnabled: true },
    { columnName: 'totaltested', width: 85 ,wordWrapEnabled: true },
    { columnName: 'positive', width: 86 ,wordWrapEnabled: true},
    { columnName: 'tests', width: 80 ,wordWrapEnabled: true},

   ]);

  //  const [columnWidths, setColumnWidths] = useState([
  //    { columnName: TableRowDetail.COLUMN_TYPE,width:20},
  //   { columnName: TableSelection.COLUMN_TYPE, width:20},
  //   {columnName: 'state', width: 90},
  //   { columnName: 'confirmed', width: 80 },
  //  { columnName: 'deaths', width: 84},
  //  { columnName: 'active', width: 100 },
  //  { columnName: 'recovered', width: 100 },
  //  { columnName: 'totaltested',width: 100 },
  //  { columnName: 'positive',width: 100 },
  //  { columnName: 'tests',width: 100 },

  // ]);
  const [leftColumns] = useState([TableSelection.COLUMN_TYPE,TableRowDetail.COLUMN_TYPE,'state']);
  const RowDetail = ({ row }) => (
    <div>
<Tablecollapsed districts={districts[row.state].districtData}/>
    </div>
  );
 
  const [sorting, setSorting] = useState([{ columnName: 'confirmed', direction: 'desc' }]);
  // const [sortingStateColumnExtensions] = useState([
  //   { columnName: 'recovered', sortingEnabled: true },
  //   { columnName: 'deaths', sortingEnabled: true },
  //   { columnName: 'totaltested', sortingEnabled: true },
  // ]);
 
  const [Columns] = useState(['confirmed']);
  const [Columnsx] = useState(['recovered']);
  const [Columnsxx] = useState(['deaths']);
  const [Columnsxxx] = useState(['active']);
  const [Columnsxxxx] = useState(['totaltested']);
 useEffect(()=>{
    if (selection.length > 0) {
        

        const statec = rows.map(d => d.statecode);
        const selstate = selection.map(d=>statec[d]);
        context.setStateselect(selection);
  
    context.setStatecodes(selstate);}
    else {
      context.setStatecodes(["TT"]);
      
    }
},[selection,rows])

useEffect(()=>
{
setSelection(context.stateselect)
},[context.stateselect])


  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
            <TypeProvider
          for={Columns}
        />
         
         <TypeProviderx
          for={Columnsx}
        />
          <TypeProviderxx
          for={Columnsxx}
        />
          <TypeProviderxxx
          for={Columnsxxx}
        />
          <TypeProviderxxx
          for={Columnsxxxx}
        />
       <SearchState value={searchValue}
          onValueChange={setSearchState} />
          <IntegratedFiltering/>
       
      
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
         
     
          <Toolbar />
        <SearchPanel />
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <SortingState
           sorting={sorting}
           onSortingChange={setSorting}
          
        />
        <IntegratedSorting />
        {/* <IntegratedSorting columnExtensions={integratedSortingColumnExtensions}/> */}
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
           <IntegratedPaging />

        <Table  columnExtensions={tableColumnExtensions}/>
{/*        
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        /> */}
        <TableHeaderRow showSortingControls />
      
      
        <TableSelection />
 
        <TableRowDetail
          contentComponent={RowDetail}
        /> 
               <TableFixedColumns
          leftColumns={leftColumns}/>
             <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </Paper>
  );
};
export default Tables;
