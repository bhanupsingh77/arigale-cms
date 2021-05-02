import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { Form, SelectField } from "../FormElements";

export default function CreateContentSchemaType({
  contentSchemaNameList,
  handleCreateContentSchemaTypeRenderStop,
  handleCreateContentCreationRender,
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="secondary"
          onClick={handleCreateContentSchemaTypeRenderStop}
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
        <h1 style={{ marginBottom: "40px" }}>Create New Content</h1>
        <Form
          initialValues={{ createContentSchemaType: "" }}
          onSubmit={handleCreateContentCreationRender}
        >
          <SelectField
            name="createContentSchemaType"
            id="createContentSchemaType"
            label="Select Schema: "
            options={[{ value: `${contentSchemaNameList}` }]}
          ></SelectField>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ border: "1px red solid", marginTop: "80px" }}
          >
            Create New Content
          </Button>
        </Form>
      </div>
    </div>
  );
}
