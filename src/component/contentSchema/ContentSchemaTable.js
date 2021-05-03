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
                  {/* placeholder */}
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ border: "1px red solid" }}
                        onClick={handleContentSchemaViewRender}
                      >
                        view schema
                      </Button>
                    </TableCell>
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
