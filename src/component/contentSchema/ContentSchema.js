import React, { useState } from "react";
import { Form } from "../FormElements";
import { getFormElement } from "../../utils.js";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import JSONPretty from "react-json-pretty";

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

//JSONPretty theme
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

export default function ContentSchema({
  dataDomain,
  contentRecord,
  mySky,
  updateFormSchema,
}) {
  const classes = useStyles();
  const [formSchema, setFormSchema] = useState([]);
  const [previewJsonData, setPreviewJsonData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingPreviewJsonData, setLoadingPreviewJsonData] = useState(false);
  const [loadingSaveJsonData, setLoadingSaveJsonData] = useState(false);
  const [currentFormSchemaElements, setCurrentFormSchemaElements] = useState(
    []
  );

  const filePath = dataDomain + "/" + "formSchema";
  const formElementsButtonList = [
    "email",
    "title",
    "author",
    "textarea",
    "date",
    "imageLink",
    "slug",
  ];

  const resetFormSchema = () => {
    // setLoadingSaveJsonData(false);
    setButtonDisabled(true);
    setFormSchema([]);
    setPreviewJsonData([]);
    setCurrentFormSchemaElements([]);
    // setLoadingSaveJsonData(false);
    setButtonDisabled(false);
  };

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
    // Use setJSON to save the user's information to MySky file
    setButtonDisabled(true);
    setLoadingSaveJsonData(true);
    try {
      // console.log(jsonData);
      // console.log("filePath", filePath);
      const { dataLink } = await mySky.setJSON(filePath, jsonData);
      // console.log("content recordes version ?", data);
      await contentRecord.recordNewContent({
        skylink: dataLink,
        metadata: { contentSchema: "New Content Schema created" },
      });

      updateFormSchema(dataLink);
      alert("Content Schema saved");
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
    setLoadingSaveJsonData(false);
    setButtonDisabled(false);
  };

  const handleMySkyRead = async (jsonData) => {
    // Use setJSON to save the user's information to MySky file
    try {
      setButtonDisabled(true);
      setLoadingPreviewJsonData(true);
      // console.log("filePath", filePath);
      const { data } = await mySky.getJSON(filePath);
      // const { data } = await mySky.getJSON(filePath);
      // console.log("dataTest", data);
      if (data !== null) {
        // console.log("dataget", data);
        // console.log("dataget-type", typeof data);

        setPreviewJsonData(data);
        alert("Scroll down to preview saved content schema");
      } else {
        alert("Save Data first to preview");
      }
      setLoadingPreviewJsonData(false);
      setButtonDisabled(false);
    } catch (error) {
      console.log(`error with getJSON: ${error.message}`);
    }
  };

  // console.log("cs-sky", mySky);
  // console.log("ssss", JSON.stringify(formSchema));

  return (
    <div style={{ margin: "2px", textAlign: "center" }}>
      <div className={classes.container}>
        <h1 style={{ textAlign: "center" }}>Content Schema</h1>
        <h1>Select content elements to create a content Schema</h1>
        {/* <p>
          <strong>
            <strong>NOTE :</strong> Please Don't select one element more than
            once as it causes a bug.
          </strong>
        </p> */}
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
          <Form
            // enableReinitialize
            initialValues={{}}
            // onSubmit={onSubmit}
          >
            <div className={classes.currentSchemaFormContainer}>
              {formSchema.map((e, i) => {
                let key = Object.keys(e)[0];
                // console.log(typeof key);
                // console.log(formSchema[key]);
                // return <div>{formSchema[key]}</div>;
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
            {/* <SubmitButton title="Submit" /> */}
            {/* <input type="submit" /> */}
          </Form>
          <Button
            variant="contained"
            color="primary"
            style={{ border: "1px red solid", margin: "8px" }}
            disabled={buttonDisabled ? true : false}
            onClick={() => resetFormSchema()}
          >
            Reset
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
          <Button
            variant="contained"
            color="primary"
            style={{ border: "1px red solid", margin: "8px" }}
            disabled={buttonDisabled ? true : false}
            startIcon={
              loadingPreviewJsonData ? <CircularProgress size={20} /> : null
            }
            onClick={() => handleMySkyRead()}
          >
            preview
          </Button>
        </div>
      ) : null}
      {previewJsonData.length >= 1 ? (
        <div className={classes.container}>
          <h1>Saved Content Schema Preview</h1>
          <JSONPretty
            id="json-pretty-PreviewJsonData"
            style={{
              fontSize: "1.3em",
              textAlign: "start",
              padding: "20px",
            }}
            mainStyle="padding:2em"
            valueStyle="font-size:1.5em"
            data={previewJsonData}
            theme={JSONPrettyMon}
            onJSONPrettyError={(e) => console.error(e)}
          ></JSONPretty>
        </div>
      ) : null}
    </div>
  );
}
