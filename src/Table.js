import React, { useState,useEffect,forwardRef,useRef,useContext,useMemo } from "react";
import styled from 'styled-components';
import { useTable, useFilters, useSortBy,useRowSelect,useResizeColumns,
  useFlexLayout,useExpanded, useBlockLayout } from "react-table";
 import {TableContext} from "./TableContext";
import Tablecollapsed from "./Tablecollapsed";
import { useSticky } from "react-table-sticky";

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)


const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      size: 20,
      display: 'flex',
    },
  },
]

const Table = (props) => {
  const [filterInput, setFilterInput] = useState([]);
  // const [stateCode, setStatecode] = useState([]);
  const [data,setData] =useState(props.data);
  const [columns,setColumns]=useState(props.columns);
  const [districts,setDistrictWiseData]=useState(props.districtWiseData);
  const [totdata,setTotdata]=useState(props.totaldata);
  const [filt,setFilt]=useState([]);

const context = useContext(TableContext);

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;
 
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
 
    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;
 
      :last-child {
        border-right: 0;
      }
    }
 
    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }
 
      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }
 
      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }
 
      .body {
        position: relative;
        z-index: 0;
      }
 
      [data-sticky-td] {
        position: sticky;
      }
 
      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }
 
      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;
  

 


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    setFilter,
    selectedFlatRows,
    state: {selectedRowIds}
  } = useTable(
    {
      columns,
      data
    },

    useFilters,
    useSortBy,
    useExpanded,
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
    useBlockLayout,
    useSticky,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // Header: ({ getToggleAllRowsSelectedProps }) => (
          //   <div>
          //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          //   </div>
          // ),
         width: 60,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),

        },
        ...columns,
      ])
    }
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("state", value);
    setFilterInput(value);
  };
  // console.log(Object.keys(selectedRowIds));


// const [t,setT] = useState(false);
// if(selectedFlatRows) {

// setT(true);
// }


useEffect(()=>{
  if (selectedFlatRows.length > 0) {
 const sel = selectedFlatRows.map(d => {
   return d.original;
 });


  const stateode = sel.map(d => d.statecode);


  context.setStatecodes(stateode);}
  else {
    context.setStatecodes(["TT"]);
  }

},[selectedFlatRows])
{/* <div className="table">
<table className="one" {...getTableProps()}>
  <thead>
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <th
            {...column.getHeaderProps(column.getSortByToggleProps())}
            className={
              column.isSorted
                ? column.isSortedDesc
                  ? "sort-desc"
                  : "sort-asc"
                : ""
            }
          >
            {column.render("Header")}
          </th>
        ))}
      </tr>
    ))} */}




  return (
    <>
     <div> 
      <input align="left"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search State"}
      /><a>    Select Checkbox to compare.  Collapse ⨁ to see districts. </a>
     
      </div>
      <Styles>
      <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
    
        <div {...getTableBodyProps()} className="body">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
              {/*
                     If the row is in an expanded state, render a row with a
                     column that fills the entire length of the table.
                   */}
                 {row.isExpanded ? (
                   <div className="tr">
                     <div className="td" colSpan={visibleColumns.length}>
                       {/*
                           Inside it, call our renderRowSubComponent function. In reality,
                           you could pass whatever you want as props to
                           a component like this, including the entire
                           table instance. But for this example, we'll just
                           pass the row
                           {props.renderRowSubComponent({ row })}
                           {data.map((state, index) => {if (index !== 0 && state.confirmed > 0) {
                             return (
                           );
                                   }
                                   return null;
                                 )}
                         */}

                         <Tablecollapsed districts={districts[row.values.state].districtData}/>


                     </div>
                   </div>
                 ) : null}

            )

          })}
        </div>
      </Styles>

    </>
      // <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      // <pre>
      //   <code>
      //     {JSON.stringify(
      //       {
      //         selectedRowIds: selectedRowIds,
      //         'selectedFlatRows[].original': selectedFlatRows.map(
      //           d => d.original
      //         ),
      //       },
      //       null,
      //       2
      //     )}
      //   </code>
      // </pre>


  );

}
export default Table;
