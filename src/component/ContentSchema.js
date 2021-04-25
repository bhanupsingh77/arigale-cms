import React, { useState } from "react";
import { Form, TextField, SelectField, SubmitButton } from "./FormElements";

import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    border: "4px black solid",
    margin: "5px 300px",
    padding: "20px",
    textAlign: "centre",
  },
}));

export default function ContentSchema({ mySky, userID }) {
  const classes = useStyles();
  const [formSchema, setFormSchema] = useState([]);
  const filePath = "localhost/formSchema";
  const formElementsButtonList = ["email", "title", "author"];

  const resetFormSchema = () => {
    setFormSchema([]);
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
      console.log(jsonData);
      const convertedJsonData = JSON.stringify(jsonData);

      const u = await mySky.userID();
      console.log("userID", u);
      // console.log("userID", userID);
      console.log("filePath", filePath);
      await mySky.setJSON("localhost/formSchema", convertedJsonData);
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
  };

  const handleMySkyRead = async (jsonData) => {
    // Use setJSON to save the user's information to MySky file
    try {
      console.log("filePath", filePath);
      const { data } = await mySky.getJSON(filePath);
      console.log("dataget", data);
    } catch (error) {
      console.log(`error with getJSON: ${error.message}`);
    }
  };
  console.log("userID", userID);
  console.log("cs-sky", mySky);
  console.log("ssss", JSON.stringify(formSchema));
  return (
    <div style={{ margin: "2px" }}>
      {formElementsButtonList.map((e) => {
        return (
          <Button
            variant="contained"
            color="primary"
            style={{ border: "1px red solid" }}
            onClick={() => addElementToFormSchema(e)}
          >
            {`Add ${e}`}
          </Button>
        );
      })}

      {formSchema.length >= 1 ? (
        <div className={classes.formContainer}>
          <h1>Content Schema</h1>
          <Form

          // enableReinitialize
          // initialValues={formData}
          // onSubmit={onSubmit}
          >
            {formSchema.map((e, i) => {
              let key = Object.keys(e)[0];
              console.log(typeof key);
              // console.log(formSchema[key]);
              // return <div>{formSchema[key]}</div>;
              return (
                <div key={key}>{getFormElement(key, formSchema[i][key])}</div>
              );
            })}
            {/* <SubmitButton title="Submit" /> */}
            {/* <input type="submit" /> */}
          </Form>
          <Button
            variant="contained"
            color="primary"
            style={{ border: "1px red solid" }}
            onClick={() => resetFormSchema()}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ border: "1px red solid" }}
            onClick={() => handleMySkyWrite(formSchema)}
          >
            write
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ border: "1px red solid" }}
            onClick={() => handleMySkyRead()}
          >
            read
          </Button>
        </div>
      ) : null}
    </div>
  );
}
