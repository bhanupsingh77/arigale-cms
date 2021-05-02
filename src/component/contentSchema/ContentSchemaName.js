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

export default function ContentSchemaName({
  handleContentSchemaNameRenderStop,
  handleContentSchemaCreationRender,
}) {
  const valueTest = (value) => {
    console.log("val", value);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="secondary"
          onClick={handleContentSchemaNameRenderStop}
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
        <h1>Create new custom Schema</h1>
        <Form
          initialValues={{ contentSchemaName: "" }}
          onSubmit={handleContentSchemaCreationRender}
        >
          <CustomField
            name="contentSchemaName"
            id="contentSchemaName"
            type="text"
            label="Enter Schema Name:"
            placeholder="eg. blogPost, poadcast..."
            required
          />
          {/* <button type="submit">submit</button> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ border: "1px red solid", marginTop: "80px" }}
            // onClick={handleContentSchemaCreationRender}
          >
            Create new custom Schema
          </Button>
        </Form>
      </div>
    </div>
  );
}
