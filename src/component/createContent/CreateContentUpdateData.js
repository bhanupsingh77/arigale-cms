import React, { useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Form, SubmitButton } from "../FormElements";
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
}));

export default function CreateContentUpdateData({
  contentRecord,
  mySky,
  contentSchemaNameList,
  contentSchemaNameListValue,
  handleCreateContentUpdateDataRenderStop,
  initvalueForSavedContentEntry,
  loadingCreateContentUpdateData,
  savedContentEntryNumber,
  createContentFilePath,
}) {
  const classes = useStyles();
  const [updatingData, setUpdatingData] = useState(false);

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    setUpdatingData(true);
    console.log("init val form ", values);
    console.log("entry on submit", savedContentEntryNumber);
    try {
      const jsonData = values;
      const filePath =
        createContentFilePath +
        "/" +
        contentSchemaNameList +
        "/" +
        savedContentEntryNumber;
      const { data, dataLink } = await mySky.setJSON(filePath, jsonData);
      console.log("updated data", data);
      await contentRecord.recordInteraction({
        skylink: dataLink,
        metadata: { content: "updated" },
      });
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }

    setSubmitting(false);
    setUpdatingData(false);
    handleCreateContentUpdateDataRenderStop();
  };

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={loadingCreateContentUpdateData || updatingData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loadingCreateContentUpdateData ? (
        <div>
          {" "}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              color="secondary"
              onClick={handleCreateContentUpdateDataRenderStop}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {contentSchemaNameListValue.length >= 1 ? (
            <div className={classes.container}>
              <h1>Update Content</h1>
              <Form
                initialValues={initvalueForSavedContentEntry}
                onSubmit={onSubmit}
              >
                <div className={classes.currentSchemaFormContainer}>
                  {contentSchemaNameListValue.map((e, i) => {
                    let key = Object.keys(e)[0];
                    return (
                      <div
                        className={classes.currentSchemaElementContainer}
                        key={i}
                      >
                        {getFormElement(
                          key,
                          contentSchemaNameListValue[i][key]
                        )}
                      </div>
                    );
                  })}
                </div>
                <SubmitButton className={classes.button} title="Update" />
              </Form>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
