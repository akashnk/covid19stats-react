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

 const colors = {
  black: "#2D3E4B",
  darkBlue: "#25343F",
  mediumBlue: "#2D3E4B",
  primaryBlue: "#419BDA",
  highlight: "#E9F7FE",
  highlightLight: "#F3F7FA",
  background: "#FAFBFD",
  white: "#FFFFFF",
  green: "#1F8E3F",
  darkGrey: "#828282",
  mediumGrey: "#BDBDBD",
  lightGrey: "#F2F2F2",
  yellow: "#F7DF94",
  grey: "#828282",
  backdropColor: "#000000b3",
  errorColor: "#EB5757"
};
const Styles = styled.div`
  padding: 2.75rem;
  > div {
    width: 100%;
    height: 50vh;
    overflow: auto;
  }
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid ${colors.lightGrey};

    thead > tr {
      position: sticky;
      left: 0;
      top: 0;
      z-index: 50;
      height: auto;
      display: block;
      th:first-child {
        background-color: ${colors.white};
        text-align: center;
      }
    }

    tbody {
      display: block;
    }

    tr {
      height: 5.375rem;
      cursor: pointer;
      :nth-child(even) {
        background-color: ${colors.lightGrey};
      }
      :nth-child(odd) {
        background-color: ${colors.background};
      }
      th:first-child {
        text-align: left;
        font-weight: normal;
        position: sticky;
        left: 0px;
        z-index: 40;
        background-color: inherit;
      }
      &:hover {
        background-color: ${colors.highlightLight};
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      min-width: 16rem;
      max-width: 16rem;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid ${colors.lightGrey};
      border-right: 1px solid ${colors.darkGrey};
    }
    td#selected {
      background-color: ${colors.primaryBlue};
    }
    th {
      font-size: 1rem;
      cursor: default;
      :not(:first-child) {
        border-left: 8px solid ${colors.black};
        background-color: ${colors.highlightLight};
        text-align: left;
        font-size: 2.25rem;
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
    // useSticky,
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
          sticky: "left",
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

// const handleClick = e => {
//   context.setStatecodes(["TT"])
// }

// const toggle = () => {
//
//   context.setStatecodes(stateode);
//
// }


const footerGroups = headerGroups.slice().reverse();

return (
  <>
 
   <div> 
    <input align="left"
      value={filterInput}
      onChange={handleFilterChange}
      placeholder={"Search State"}
    /><a>    Select Checkbox to compare.  Collapse ⨁ to see districts. </a>
   
    </div>
    <div className="table">
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
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {

          prepareRow(row)


            return (
<>
<tr {...row.getRowProps()} key={i}>
                      {row.cells.map((cell, j) => {
                        if (j === 0) {
                          return <th key={j}>{cell.render("Cell")}</th>;
                        }
                        return (
                          <td {...cell.getCellProps()} key={j}>
                            {cell.render("Cell")}</td>
                  );
                })}
              </tr>
              {/*
                     If the row is in an expanded state, render a row with a
                     column that fills the entire length of the table.
                   */}
                 {row.isExpanded ? (
                   <tr>
                     <td colSpan={visibleColumns.length}>
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


                     </td>
                   </tr>
                 ) : null}
</>
            )

          })}
        </tbody>
      </table>
</div>

    </>
      


  );
}



export default Table;
