import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#d3d3d32e",
      cursor: "pointer",
    },
  },
});

export default function ContentSchemaTable({
  contentSchemaNameList,
  handleContentSchemaViewRender,
}) {
  const classes = useStyles();

  function createData(name, id) {
    return { name, id };
  }

  const rows = [createData(contentSchemaNameList, contentSchemaNameList)];

  return (
    <div>
      {contentSchemaNameList ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    className={classes.tableRow}
                    onClick={handleContentSchemaViewRender}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </div>
  );
}
