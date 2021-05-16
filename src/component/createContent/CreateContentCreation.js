import React, { useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Form, SubmitButton, ResetButton } from "../FormElements";
import { getFormElement } from "../../utils.js";

import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "4px black solid",
    margin: "5px",
    marginTop: "30px",
    padding: "20px",
    textAlign: "center",
  },
  button: {
    width: "95px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid red",
    color: "#fff",
    backgroundColor: "#3f51b5",
    margin: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textTransform: "uppercase",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CreateContentCreation({
  dataDomain,
  contentRecord,
  mySky,
  createContentFilePath,
  contentSchemaNameList,
  contentSchemaNameListValue,
  formInitialValues,
  handleSnackbarOpen,
  handleCreateContentCreationRenderStop,
  handleCreatedNewContent,
  handleDialogOpen,
}) {
  const classes = useStyles();
  const [loadingContentCreation, setLoadingContentCreation] = useState(false);
  const createContentCreationFilePath =
    createContentFilePath + "/" + contentSchemaNameList;

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      setLoadingContentCreation(true);
      values["_setting"] = {};
      values["_setting"]["created_at"] = new Date().toISOString();
      const jsonData = values;
      const entryFilePath = createContentCreationFilePath + "/" + "entry";
      const { data } = await mySky.getJSON(entryFilePath);
      if (data !== null) {
        data["entry"] = data["entry"] + 1;
        jsonData["_setting"]["entry"] = data["entry"];
        const filePath = createContentCreationFilePath + "/" + data["entry"];
        //write data at entry number
        const { dataLink } = await mySky.setJSON(filePath, jsonData);
        await contentRecord.recordInteraction({
          skylink: dataLink,
          metadata: { content: "created" },
        });
        //update entry number
        await mySky.setJSON(entryFilePath, data);
        handleCreatedNewContent(data["entry"]);
      } else {
        const entry = { entry: 1 };
        jsonData["_setting"]["entry"] = entry["entry"];
        const filePath = createContentCreationFilePath + "/" + entry["entry"];
        //write data at entry number
        const { dataLink } = await mySky.setJSON(filePath, jsonData);
        await contentRecord.recordInteraction({
          skylink: dataLink,
          metadata: { content: "created" },
        });
        //update entry number
        await mySky.setJSON(entryFilePath, entry);
        handleCreatedNewContent(entry["entry"]);
        handleDialogOpen();
      }
      setSubmitting(false);
      setLoadingContentCreation(false);
      handleSnackbarOpen("Content data saved.", "success");
      handleCreateContentCreationRenderStop();
    } catch (error) {
      console.log(`error with setJSON or getJSON: ${error.message}`);
      setSubmitting(false);
      setLoadingContentCreation(false);
      handleSnackbarOpen("Failed to save content data.Try again.", "error");
    }
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingContentCreation}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="secondary"
          onClick={handleCreateContentCreationRenderStop}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {contentSchemaNameListValue.length >= 1 ? (
        <div className={classes.container}>
          <h1>Input data and Save</h1>
          <Form initialValues={formInitialValues} onSubmit={onSubmit}>
            <div className={classes.currentSchemaFormContainer}>
              {contentSchemaNameListValue.map((e, i) => {
                let key = Object.keys(e)[0];
                return (
                  <div
                    key={i}
                    className={classes.currentSchemaElementContainer}
                  >
                    {getFormElement(key, contentSchemaNameListValue[i][key])}
                  </div>
                );
              })}
              <div style={{ display: "flex" }}>
                <ResetButton className={classes.button} title="Reset" />
                <SubmitButton className={classes.button} title="Save" />
              </div>
            </div>
          </Form>
        </div>
      ) : null}
    </div>
  );
}
