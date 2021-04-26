import React, { useState } from "react";
import { Form, TextField, SelectField, SubmitButton } from "./FormElements";

import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import JSONPretty from "react-json-pretty";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    border: "4px black solid",
    margin: "5px",
    marginTop: "30px",
    padding: "20px",
    textAlign: "center",
  },
}));

//JSONPretty theme
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

export default function ContentSchema({ mySky }) {
  const classes = useStyles();
  const [formSchema, setFormSchema] = useState([]);
  const [previewJsonData, setPreviewJsonData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingPreviewJsonData, setLoadingPreviewJsonData] = useState(false);
  const [loadingSaveJsonData, setLoadingSaveJsonData] = useState(false);

  const filePath = "localhost/formSchema";
  const formElementsButtonList = ["email", "title", "author"];

  const resetFormSchema = () => {
    // setLoadingSaveJsonData(false);
    setButtonDisabled(true);
    setFormSchema([]);
    setPreviewJsonData([]);
    // setLoadingSaveJsonData(false);
    setButtonDisabled(false);
  };

  const addElementToFormSchema = (element) => {
    let val;
    switch (element) {
      case "email":
        val = {
          email: {
            type: "email",
            label: "Email",
            required: true,
          },
        };
        break;
      case "title":
        val = {
          title: {
            type: "text",
            label: "Title",
            required: true,
          },
        };
        break;
      case "author":
        val = {
          author: {
            type: "text",
            label: "Author",
            required: true,
          },
        };
        break;
    }
    console.log(val);
    setFormSchema([...formSchema, val]);
    console.log(formSchema);
  };

  const getFormElement = (elementName, elementSchema) => {
    console.log("s", elementName, elementSchema);
    const props = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options,
    };

    if (elementSchema.type === "text" || elementSchema.type === "email") {
      return <TextField {...props} />;
    }

    if (elementSchema.type === "select") {
      return <SelectField {...props} />;
    }
  };

  const handleMySkyWrite = async (jsonData) => {
    // Use setJSON to save the user's information to MySky file
    try {
      setButtonDisabled(true);
      setLoadingSaveJsonData(true);
      console.log(jsonData);
      console.log("filePath", filePath);
      await mySky.setJSON(filePath, jsonData);
      setLoadingSaveJsonData(false);
      setButtonDisabled(false);
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
  };

  const handleMySkyRead = async (jsonData) => {
    // Use setJSON to save the user's information to MySky file
    try {
      setButtonDisabled(true);
      setLoadingPreviewJsonData(true);
      console.log("filePath", filePath);
      const { data } = await mySky.getJSON(filePath);
      console.log("dataget", data);
      console.log("dataget-type", typeof data);
      setLoadingPreviewJsonData(false);
      setButtonDisabled(false);
      setPreviewJsonData(data);
      alert("Scroll down to preview saved content schema");
    } catch (error) {
      console.log(`error with getJSON: ${error.message}`);
    }
  };

  console.log("cs-sky", mySky);
  console.log("ssss", JSON.stringify(formSchema));

  return (
    <div style={{ margin: "2px", textAlign: "center" }}>
      <div className={classes.formContainer}>
        <h1 style={{ textAlign: "center" }}>Content Schema</h1>
        <h1>Select content elements to create a content Schema</h1>
        <p>
          <strong>
            <elm>NOTE :</elm> Please Don't select one element more than once as
            it causes a bug.
          </strong>
        </p>
        {formElementsButtonList.map((e, i) => {
          return (
            <Button
              key={i}
              variant="contained"
              color="primary"
              style={{ border: "1px black solid", margin: "5px" }}
              onClick={() => addElementToFormSchema(e)}
            >
              {`Add ${e}`}
            </Button>
          );
        })}
      </div>
      {formSchema.length >= 1 ? (
        <div className={classes.formContainer}>
          <h1>Current Content Schema</h1>
          <Form
            // enableReinitialize
            initialValues={{}}
            // onSubmit={onSubmit}
          >
            {formSchema.map((e, i) => {
              let key = Object.keys(e)[0];
              console.log(typeof key);
              // console.log(formSchema[key]);
              // return <div>{formSchema[key]}</div>;
              return (
                <div style={{ margin: "8px" }} key={i}>
                  {getFormElement(key, formSchema[i][key])}
                </div>
              );
            })}
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
        <div className={classes.formContainer}>
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
