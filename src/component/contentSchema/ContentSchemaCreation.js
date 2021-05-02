import React, { useState } from "react";
import {
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
}));

export default function ContentSchemaCreation({
  dataDomain,
  contentRecord,
  mySky,
  contentSchemaFilePath,
  contentSchemaName,
  handleContentSchemaCreationRenderClose,
}) {
  const classes = useStyles();
  const [formSchema, setFormSchema] = useState([]);
  const [currentFormSchemaElements, setCurrentFormSchemaElements] = useState(
    []
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingPreviewJsonData, setLoadingPreviewJsonData] = useState(false);
  const [loadingSaveJsonData, setLoadingSaveJsonData] = useState(false);

  const contentSchemaCreationFilePath =
    contentSchemaFilePath + "/" + contentSchemaName;

  const formElementsButtonList = [
    "email",
    "title",
    "author",
    "textarea",
    "date",
    "imageLink",
    "slug",
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
    // console.log("val", val);
    setFormSchema([...formSchema, val]);
  };

  const handleMySkyWrite = async (jsonData) => {
    setButtonDisabled(true);
    setLoadingSaveJsonData(true);
    try {
      const { data } = await mySky.getJSON(contentSchemaFilePath);
      if (data !== null) {
        const { datalink } = await mySky.setJSON(
          contentSchemaFilePath,
          data.push(contentSchemaName)
        );
        console.log("test1", dataLink);
      } else {
        let arr = [];
        arr.push(contentSchemaName);
        const { datalink } = await mySky.setJSON(contentSchemaFilePath, arr);
        console.log("test2", dataLink);
      }

      const { dataLink } = await mySky.setJSON(
        contentSchemaCreationFilePath,
        jsonData
      );
      // throw "bhanu";
      // console.log("content recordes version ?", data);
      await contentRecord.recordNewContent({
        skylink: dataLink,
        metadata: {
          contentSchema: `New Content Schema created: ${contentSchemaName}`,
        },
      });
      console.log("datalink", dataLink);
      //   updateFormSchema(dataLink);
      handleContentSchemaCreationRenderClose();
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
    setLoadingSaveJsonData(false);
    setButtonDisabled(false);
  };

  const resetFormSchema = () => {
    setButtonDisabled(true);
    setFormSchema([]);
    setCurrentFormSchemaElements([]);
    setButtonDisabled(false);
  };

  return (
    <div>
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
              startIcon={
                loadingSaveJsonData ? <CircularProgress size={20} /> : null
              }
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
