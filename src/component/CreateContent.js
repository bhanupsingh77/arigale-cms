import React, { useState, useEffect } from "react";
import { Form, TextField, SelectField, SubmitButton } from "./FormElements";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import JSONPretty from "react-json-pretty";

// import * as Yup from "yup";

// const FormSchema = Yup.object().shape({
//   name: Yup.string().required("Required").min(5, "Required"),
//   email: Yup.string().email().required("Required").min(1, "Required"),
//   role: Yup.string()
//     .oneOf(["admin", "user"])
//     .required("Required")
//     .min(1, "Required"),
// });

//JSONPretty theme
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    border: "4px black solid",
    margin: "5px",
    marginTop: "30px",
    padding: "20px",
    textAlign: "center",
  },
  button: {
    width: "90px",
    height: "36px",
    borderRadius: "5px",
    color: "#fff",
    backgroundColor: "#222f65",
    margin: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textTransform: "uppercase",
  },
}));

function CreateContent({ mySky }) {
  const classes = useStyles();
  const [formSchema, setFormSchema] = useState([]);
  const [formData, setFormData] = useState([]);
  const [previewJsonData, setPreviewJsonData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingPreviewJsonData, setLoadingPreviewJsonData] = useState(false);
  const [loadingSaveJsonData, setLoadingSaveJsonData] = useState(false);
  const [
    loadingAddToExistingJsonData,
    setLoadingAddToExistingJsonData,
  ] = useState(false);
  const [loadinginitFormSchema, setLoadinginitFormSchema] = useState(true);
  const filePath = "localhost/blogContent";

  useEffect(() => {
    async function initFormSchema() {
      try {
        const filePath = "localhost/formSchema";
        console.log("filePath", filePath);
        const { data } = await mySky.getJSON(filePath);
        console.log("dataget", data);
        console.log("dataget-type", typeof data);
        if (data !== null) {
          setFormSchema(data);
        }
        setLoadinginitFormSchema(false);
      } catch (error) {
        console.log(`error with getJSON: ${error.message}`);
      }
    }

    initFormSchema();
  }, []);

  //   const [validationSchema, setValidationSchema] = useState({});

  //   useEffect(() => {
  //     initForm(formSchema);
  //   }, []);

  //   const initForm = (formSchema) => {
  //     let _formData = {};
  //     let _validationSchema = {};

  //     for (var key of Object.keys(formSchema)) {
  //       _formData[key] = "";

  //       if (formSchema[key].type === "text") {
  //         _validationSchema[key] = Yup.string();
  //       } else if (formSchema[key].type === "email") {
  //         _validationSchema[key] = Yup.string().email();
  //       } else if (formSchema[key].type === "select") {
  //         _validationSchema[key] = Yup.string().oneOf(
  //           formSchema[key].options.map((o) => o.value)
  //         );
  //       }

  //       if (formSchema[key].required) {
  //         _validationSchema[key] = _validationSchema[key].required("Required");
  //       }
  //     }

  //     setFormData(_formData);
  //     setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  //   };

  const getFormElement = (elementName, elementSchema) => {
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

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log("form-data-values", values);
    let val = [];
    val.push(values);
    setFormData(val);
    setSubmitting(false);
    // resetForm();
  };

  // const onReset = ({ resetForm }) => {
  //   console.log("reset-val", resetForm);
  // };

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

  const handleMySkyWriteToExistingFile = async (jsonData) => {
    const { dataTest } = await mySky.getJSON(filePath);
    if (dataTest !== null) {
      try {
        let val = [];
        setButtonDisabled(true);
        setLoadingAddToExistingJsonData(true);
        console.log("filePath", filePath);
        const { data } = await mySky.getJSON(filePath);
        data.push(jsonData[0]);
        await mySky.setJSON(filePath, data);
        setLoadingAddToExistingJsonData(false);
        setButtonDisabled(false);
      } catch (error) {
        console.log(`error with getJSON: ${error.message}`);
      }
    } else {
      alert("Save Data for first time to add further");
    }
  };

  const handleMySkyRead = async () => {
    // Use setJSON to save the user's information to MySky file
    const { dataTest } = await mySky.getJSON(filePath);
    if (dataTest !== null) {
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
    } else {
      alert("Save Data first to preview");
    }
  };

  return (
    <div>
      {loadinginitFormSchema ? (
        <Backdrop className={classes.backdrop} open={loadinginitFormSchema}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      {formSchema.length >= 1 ? (
        <div>
          <div className={classes.container}>
            <h1>Input data and Submit to preview Data</h1>
            <Form
              // enableReinitialize
              initialValues={{}}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {formSchema.map((e, i) => {
                let key = Object.keys(e)[0];
                console.log(typeof key);
                return (
                  <div style={{ margin: "8px" }} key={i}>
                    {getFormElement(key, formSchema[i][key])}
                  </div>
                );
              })}
              <SubmitButton className={classes.button} title="Submit" />
              {/* <ResetButton className={classes.button} title="Reset" /> */}
              {/* <button className={classes.button} type="reset">
              Reset
            </button> */}
            </Form>
          </div>
          {formData.length >= 1 ? (
            <div className={classes.container}>
              <h1>Preview of submited data</h1>
              <JSONPretty
                id="json-pretty-formData"
                style={{
                  fontSize: "1.3em",
                  textAlign: "start",
                  padding: "20px",
                }}
                mainStyle="padding:2em"
                valueStyle="font-size:1.5em"
                data={formData}
                theme={JSONPrettyMon}
                onJSONPrettyError={(e) => console.error(e)}
              ></JSONPretty>
              <Button
                variant="contained"
                color="primary"
                style={{ border: "1px red solid", margin: "8px" }}
                disabled={buttonDisabled ? true : false}
                startIcon={
                  loadingSaveJsonData ? <CircularProgress size={20} /> : null
                }
                onClick={() => handleMySkyWrite(formData)}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ border: "1px red solid", margin: "8px" }}
                disabled={buttonDisabled ? true : false}
                startIcon={
                  loadingAddToExistingJsonData ? (
                    <CircularProgress size={20} />
                  ) : null
                }
                onClick={() => handleMySkyWriteToExistingFile(formData)}
              >
                Add to existing file
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
              <h1>Data saved on DataBase</h1>
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
      ) : (
        <div className={classes.container}>
          <h1>Create Content Schema first to create content</h1>
          <h2>(Select Content Schema button from side bar)</h2>
        </div>
      )}
    </div>
  );
}

export default CreateContent;
