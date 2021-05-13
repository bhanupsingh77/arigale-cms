import React, { useState } from "react";
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
  container: { marginTop: "50px" },
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

export default function CreateContentTable({
  mySky,
  contentSchemaNameList,
  createContentFilePath,
  entryNumber,
  handleCreateContentUpdateDataRender,
}) {
  const classes = useStyles();
  // const [entryNumber, setEntryNumber] = useState();

  function createData(entry, schema) {
    const arr = Array(entry).fill(entry);
    const dataArray = arr.map((e, i) => {
      return { entry: i + 1, schema: schema };
    });
    return dataArray;
  }

  const rows = createData(entryNumber, contentSchemaNameList);

  // console.log("rows", rows, "xxxxx", entryNumber);

  return (
    <div>
      {entryNumber ? (
        <div className={classes.container}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Entry</TableCell>
                  <TableCell align="left">Schema</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.entry}
                    className={classes.tableRow}
                    onClick={() =>
                      handleCreateContentUpdateDataRender(row.entry)
                    }
                  >
                    <TableCell component="th" scope="row">
                      {row.entry}
                    </TableCell>
                    <TableCell align="left">{row.schema}</TableCell>
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
