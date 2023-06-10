import { useMemo, useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Options from "components/table/Options";
import { manageDefaultStringForTable } from "helpers/dataManagement";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(4),
}));

const StyledTableBody = styled(TableBody)({
  "&.noData": {
    //This equals to the height of ten rows
    height: "358px",
  },
  //This is for fixing the list position of the Options menu in the last row
  "& .body:last-child": {
    "& .options_list": {
      top: "unset",
      bottom: "0px",
    },
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& .MuiTableCell-root:last-child": {
    borderRight: 0,
  },
  "&.body": {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  borderRight: `1px solid ${theme.palette.grey[500]}`,
  "&.noData": {
    fontSize: "1.5rem",
  },
  "&.head": {
    fontWeight: "600",
    backgroundColor: theme.palette.secondary.medium,
    whiteSpace: "nowrap",
  },
}));

const TableBasic = ({
  head = [],
  data = [],
  selectSummary,
  openDeleteWarning,
}) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getItemAriaLabel = (type) => {
    if (type === "first") {
      return "Ir a la primera página";
    }
    if (type === "last") {
      return "Ir a la última página";
    }
    if (type === "next") {
      return "Ir a la página siguiente";
    }
    if (type === "previous") {
      return "Ir a la página anterior";
    }
    return "";
  };

  const labelDisplayedRows = ({ from, to, count }) => {
    return `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`;
  };

  const NO_DATA_CONDITION = data.length === 0;
  const ROWS_PER_PAGE = 10;

  const headCells = useMemo(
    () =>
      [...head, { label: "Opciones", key: "options" }].map((header, index) => (
        <StyledTableCell
          key={header.key}
          align={index !== 0 ? "right" : "left"}
          className='head'
        >
          {header.label}
        </StyledTableCell>
      )),
    [head]
  );

  const getRowCells = useCallback(
    (currentRow) => {
      const cells = head.map((header, index) => {
        if (index === 0) {
          return (
            <StyledTableCell key={header.key} component='th' scope='row'>
              {manageDefaultStringForTable(currentRow[header.key])}
            </StyledTableCell>
          );
        } else {
          return (
            <StyledTableCell key={header.key} align='right'>
              {manageDefaultStringForTable(currentRow[header.key])}
            </StyledTableCell>
          );
        }
      });
      return [
        ...cells,
        <StyledTableCell key={"settings"} align='center'>
          <Options
            handleSelect={() => selectSummary(currentRow.id)}
            handleDelete={() => openDeleteWarning(currentRow.id)}
          />
        </StyledTableCell>,
      ];
    },
    [head, selectSummary, openDeleteWarning]
  );

  //If table is used for rows with more than 2 cell, the following key could be get from the first and the second value
  const rows = useMemo(() => {
    if (NO_DATA_CONDITION) {
      return (
        <StyledTableRow>
          <StyledTableCell
            colSpan={head.length + 1}
            align='center'
            className='noData'
          >
            No hay datos
          </StyledTableCell>
        </StyledTableRow>
      );
    } else {
      const tableRows = data
        .map((row) => (
          <StyledTableRow key={row[head[0].key] + row.id} className='body'>
            {getRowCells(row)}
          </StyledTableRow>
        ))
        .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
      return tableRows;
    }
  }, [data, head, getRowCells, page, NO_DATA_CONDITION, ROWS_PER_PAGE]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - data.length) : 0;

  return (
    <StyledPaper square>
      <TableContainer>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <StyledTableRow>{headCells}</StyledTableRow>
          </TableHead>
          <StyledTableBody className={NO_DATA_CONDITION ? "noData" : ""}>
            {rows}
            {emptyRows > 0 && (
              <StyledTableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={headCells.length} />
              </StyledTableRow>
            )}
          </StyledTableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        component='div'
        count={data.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
        getItemAriaLabel={getItemAriaLabel}
        labelDisplayedRows={labelDisplayedRows}
      />
    </StyledPaper>
  );
};

export default TableBasic;
