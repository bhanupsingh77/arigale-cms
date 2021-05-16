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
import { Form, CustomField } from "../FormElements";
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
}));

export default function ContentSchemaCreation({
  dataDomain,
  contentRecord,
  mySky,
  contentSchemaFilePath,
  contentSchemaName,
  handleSnackbarOpen,
  handleContentSchemaCreationRenderClose,
  handleUpdateDataOnSchemaCreation,
  handleLoadingContentSchemaTestStart,
}) {
  const classes = useStyles();
  const [formSchema, setFormSchema] = useState([]);
  const [currentFormSchemaElements, setCurrentFormSchemaElements] = useState(
    []
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingSaveJsonData, setLoadingSaveJsonData] = useState(false);

  const contentSchemaCreationFilePath =
    contentSchemaFilePath + "/" + contentSchemaName;

  const formElementsButtonList = [
    "email",
    "title",
    "author",
    "textarea",
    "date",
    "month",
    "imageLink",
    "slug",
    "audioLink",
  ];

  const addElementToFormSchema = async (element) => {
    const result = await currentFormSchemaElements.filter(
      (formElement) => formElement === element
    );
    const id = await String(result.length + 1);
    const updatedcurrentFormSchemaElements = [
      ...currentFormSchemaElements,
      element,
    ];
    setCurrentFormSchemaElements(updatedcurrentFormSchemaElements);
    let val;

    switch (element) {
      case "email":
        val = {
          email: {
            id: `${element}-${id}`,
            type: "email",
            label: "Email",
            required: true,
          },
        };
        break;
      case "slug":
        val = {
          slug: {
            id: `${element}-${id}`,
            type: "text",
            label: "Slug",
            required: true,
          },
        };
        break;
      case "imageLink":
        val = {
          imageLink: {
            id: `${element}-${id}`,
            type: "url",
            label: "ImageLink",
            required: true,
          },
        };
        break;
      case "audioLink":
        val = {
          audioLink: {
            id: `${element}-${id}`,
            type: "url",
            label: "AudioLink",
            required: true,
          },
        };
        break;
      case "date":
        val = {
          date: {
            id: `${element}-${id}`,
            type: "date",
            label: "Date",
            required: true,
          },
        };
        break;
      case "month":
        val = {
          month: {
            id: `${element}-${id}`,
            type: "month",
            label: "Month",
            required: true,
          },
        };
        break;
      case "textarea":
        val = {
          textarea: {
            id: `${element}-${id}`,
            type: "textarea",
            label: "TextArea",
            required: true,
          },
        };
        break;
      case "title":
        val = {
          title: {
            id: `${element}-${id}`,
            type: "text",
            label: "Title",
            required: true,
          },
        };
        break;
      case "author":
        val = {
          author: {
            id: `${element}-${id}`,
            type: "text",
            label: "Author",
            required: true,
          },
        };
        break;
    }
    setFormSchema([...formSchema, val]);
  };

  const handleMySkyWrite = async (jsonData) => {
    try {
      setButtonDisabled(true);
      setLoadingSaveJsonData(true);
      // write form schema at given name
      const { dataLink } = await mySky.setJSON(
        contentSchemaCreationFilePath,
        jsonData
      );
      // check if there is Schema name list empty or not
      const { data } = await mySky.getJSON(contentSchemaFilePath);
      if (data !== null) {
        const val = {};
        val["name"] = contentSchemaName;
        val["_setting"] = {};
        val["_setting"]["created_at"] = new Date().toISOString();
        data.push(val);
        const jsonData = data;
        const { dataLink } = await mySky.setJSON(
          contentSchemaFilePath,
          jsonData
        );
      } else {
        const jsonData = [];
        const val = {};
        val["name"] = contentSchemaName;
        val["_setting"] = {};
        val["_setting"]["created_at"] = new Date().toISOString();
        jsonData.push(val);
        const { dataLink } = await mySky.setJSON(
          contentSchemaFilePath,
          jsonData
        );
      }

      await contentRecord.recordNewContent({
        skylink: dataLink,
        metadata: {
          contentSchema: `New Content Schema created: ${contentSchemaName}`,
        },
      });
      handleUpdateDataOnSchemaCreation(dataLink);
      handleLoadingContentSchemaTestStart();
      setButtonDisabled(false);
      setLoadingSaveJsonData(false);
      handleContentSchemaCreationRenderClose();
      handleSnackbarOpen(
        `Content Schema ${contentSchemaName} created.`,
        "success"
      );
    } catch (error) {
      console.log(`error with setJSON or getJSON: ${error.message}`);
      setButtonDisabled(false);
      setLoadingSaveJsonData(false);
      handleSnackbarOpen(`Failed to create Content Schema.Try again.`, "error");
    }
  };

  const resetFormSchema = () => {
    setButtonDisabled(true);
    setFormSchema([]);
    setCurrentFormSchemaElements([]);
    setButtonDisabled(false);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingSaveJsonData}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="secondary"
          onClick={handleContentSchemaCreationRenderClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div
        style={{
          border: "4px black solid",
          margin: "5px",
          marginTop: "30px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Content Schema</h1>
        <h1>{`Name: ${contentSchemaName}`}</h1>
        <h1>Select content elements to create a content Schema</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {formElementsButtonList.map((element, i) => {
            return (
              <Button
                key={i}
                variant="contained"
                color="primary"
                style={{ border: "1px black solid", margin: "5px" }}
                onClick={() => addElementToFormSchema(element)}
              >
                {`Add ${element}`}
              </Button>
            );
          })}
        </div>
        {formSchema.length >= 1 ? (
          <div className={classes.container}>
            <h1>Current Content Schema</h1>
            <Form initialValues={{}}>
              <div className={classes.currentSchemaFormContainer}>
                {formSchema.map((e, i) => {
                  let key = Object.keys(e)[0];
                  return (
                    <div
                      className={classes.currentSchemaElementContainer}
                      key={i}
                    >
                      {getFormElement(key, formSchema[i][key])}
                    </div>
                  );
                })}
              </div>
            </Form>
            <Button
              variant="contained"
              color="primary"
              style={{ border: "1px red solid", margin: "8px" }}
              disabled={buttonDisabled ? true : false}
              onClick={() => resetFormSchema()}
            >
              Rebuild Schema
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ border: "1px red solid", margin: "8px" }}
              disabled={buttonDisabled ? true : false}
              onClick={() => handleMySkyWrite(formSchema)}
            >
              Save
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
