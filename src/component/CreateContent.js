import React, { useState } from "react";
import { Form, SubmitButton, ResetButton } from "./FormElements";
import { getFormElement } from "../utils.js";
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

function CreateContent({
  dataDomain,
  contentRecord,
  mySky,
  formSchema,
  formInitialValues,
}) {
  const classes = useStyles();
  const [loadinginitFormSchema, setLoadinginitFormSchema] = useState(false);
  const [formData, setFormData] = useState([]);
  const [previewJsonData, setPreviewJsonData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingPreviewJsonData, setLoadingPreviewJsonData] = useState(false);
  const [loadingSaveJsonData, setLoadingSaveJsonData] = useState(false);
  const [
    loadingAddToExistingJsonData,
    setLoadingAddToExistingJsonData,
  ] = useState(false);
  const [skyLink, setSkyLink] = useState(null);
  const [loadingSkyLink, setLoadingSkyLink] = useState(false);

  //file path for CreateContent
  const filePath = dataDomain + "/" + "blogContent";

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

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    // console.log("init val form ", formInitialValues);
    let val = [];
    val.push(values);
    setFormData(val);
    setSubmitting(false);
    // resetForm({ title: "" });
  };

  const handleMySkyWrite = async (jsonData) => {
    // Use setJSON to save the user's information to MySky file
    try {
      setButtonDisabled(true);
      setLoadingSaveJsonData(true);
      // console.log(jsonData);
      // console.log("filePath", filePath);
      const { dataLink } = await mySky.setJSON(filePath, jsonData);
      await contentRecord.recordInteraction({
        skylink: dataLink,
        metadata: { content: "created" },
      });
      setLoadingSaveJsonData(false);
      setButtonDisabled(false);
      alert("Data saved");
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
  };

  const handleMySkyWriteToExistingFile = async (jsonData) => {
    try {
      setButtonDisabled(true);
      setLoadingAddToExistingJsonData(true);
      const { data } = await mySky.getJSON(filePath);
      if (data !== null) {
        let val = [];
        // console.log("filePath", filePath);
        // const { data } = await mySky.getJSON(filePath);
        data.push(jsonData[0]);
        const { dataLink } = await mySky.setJSON(filePath, data);
        await contentRecord.recordInteraction({
          skylink: dataLink,
          metadata: { content: "updated" },
        });
        alert("Data added to existing file");
      } else {
        alert("Save Data for first time to add further");
      }
      setLoadingAddToExistingJsonData(false);
      setButtonDisabled(false);
    } catch (error) {
      console.log(`error with getJSON: ${error.message}`);
    }
  };

  const handleMySkyRead = async () => {
    // Use setJSON to save the user's information to MySky file
    try {
      setButtonDisabled(true);
      setLoadingPreviewJsonData(true);
      const { data } = await mySky.getJSON(filePath);
      // console.log("dataTest", data);
      if (data !== null) {
        // console.log("filePath", filePath);
        // const { data } = await mySky.getJSON(filePath);
        // console.log("dataget", data);
        // console.log("dataget-type", typeof data);
        setPreviewJsonData(data);
        alert("Scroll down to preview saved data to DataBase");
      } else {
        alert("Save Data first to preview");
      }
      setLoadingPreviewJsonData(false);
      setButtonDisabled(false);
    } catch (error) {
      console.log(`error with getJSON: ${error.message}`);
    }
  };

  const handleMySkySkyLink = async () => {
    try {
      setButtonDisabled(true);
      setLoadingSkyLink(true);
      const { dataLink } = await mySky.getJSON(filePath);
      // console.log("dataTest", dataLink);
      if (dataLink !== null) {
        // console.log("filePath", filePath);
        // const { dataLink } = await mySky.getJSON(filePath);
        // console.log("dataget", dataLink);
        // console.log("dataget-type", typeof dataLink);
        setSkyLink(dataLink);
        alert("Scroll down to preview dataLink");
      } else {
        alert("Save Data first to preview dataLink");
      }
      setLoadingSkyLink(false);
      setButtonDisabled(false);
    } catch (error) {
      console.log(`error with getJSON: ${error.message}`);
    }
  };

  const copyFileLink = async () => {
    // console.log("l2", document.getElementById("fileLink").innerText);
    const text = document.getElementById("skylink-blog").innerText;
    await navigator.clipboard.writeText(text);
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
              initialValues={formInitialValues}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
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
                <SubmitButton className={classes.button} title="Submit" />
                <ResetButton className={classes.button} title="Reset" />
              </div>
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
              <Button
                variant="contained"
                color="primary"
                style={{ border: "1px red solid", margin: "8px" }}
                disabled={buttonDisabled ? true : false}
                startIcon={
                  loadingSkyLink ? <CircularProgress size={20} /> : null
                }
                onClick={handleMySkySkyLink}
              >
                Get dataLink
              </Button>
            </div>
          ) : null}
          {skyLink !== null ? (
            <div className={classes.container}>
              <h1>DataLink</h1>
              <a
                id="skylink-blog"
                href={`https://siasky.net/${skyLink}`}
                target="blank"
              >{`https://siasky.net/${skyLink}`}</a>
              <br />
              {/* <h1>{`skylink: ${skyLink}`}</h1> */}
              <Button
                variant="contained"
                color="primary"
                style={{ border: "1px red solid", margin: "8px" }}
                onClick={copyFileLink}
              >
                Copy DataLink
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
