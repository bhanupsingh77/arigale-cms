import React from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Form } from "../FormElements";
import { getFormElement } from "../../utils.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "4px black solid",
    margin: "5px",
    marginTop: "30px",
    padding: "20px",
    textAlign: "center",
  },
  currentSchemaFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  currentSchemaElementContainer: {
    width: "80%",
    marginBottom: "20px",
    paddingLeft: "10px",
    border: "3px solid lavenderblush",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ContentSchemaView({
  contentRecord,
  mySky,
  contentSchemaNameList,
  contentSchemaNameListValue,
  handleContentSchemaViewRenderStop,
}) {
  const classes = useStyles();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="secondary"
          onClick={handleContentSchemaViewRenderStop}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {contentSchemaNameListValue.length >= 1 ? (
        <div className={classes.container}>
          <h1>{`${contentSchemaNameList} Content Schema`}</h1>
          <Form initialValues={{}}>
            <div className={classes.currentSchemaFormContainer}>
              {contentSchemaNameListValue.map((e, i) => {
                let key = Object.keys(e)[0];
                return (
                  <div
                    className={classes.currentSchemaElementContainer}
                    key={i}
                  >
                    {getFormElement(key, contentSchemaNameListValue[i][key])}
                  </div>
                );
              })}
            </div>
          </Form>
        </div>
      ) : null}
    </div>
  );
}
