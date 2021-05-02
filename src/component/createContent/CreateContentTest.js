import React, { useState } from "react";
// import { Form, SubmitButton, ResetButton } from "../FormElements";
// import { getFormElement } from "../../utils.js";
// import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Paper, Typography } from "@material-ui/core";
import CreateContentSchemaType from "./CreateContentSchemaType";
import CreateContentCreation from "./CreateContentCreation";
import CreateContentTable from "./CreateContentTable";

export default function CreateContentTest({
  dataDomain,
  contentRecord,
  mySky,
  contentSchemaNameList,
  contentSchemaNameListValue,
  // formSchema,
  formInitialValues,
}) {
  const [
    createContentSchemaTypeRender,
    setCreateContentSchemaTypeRender,
  ] = useState(false);
  const [
    createContentCreationRender,
    setCreateContentCreationRender,
  ] = useState(false);

  const [
    loadingContentCreationDataSaving,
    setLoadingContentCreationDataSaving,
  ] = useState(false);

  const handleCreateContentSchemaTypeRender = () => {
    setCreateContentSchemaTypeRender(true);
  };

  const handleCreateContentSchemaTypeRenderStop = () => {
    setCreateContentSchemaTypeRender(false);
  };

  const handleCreateContentCreationRender = () => {
    setCreateContentCreationRender(true);
  };

  const handleCreateContentCreationRenderStop = () => {
    setCreateContentCreationRender(false);
    setCreateContentSchemaTypeRender(false);
  };

  const handleLoadingContentCreationDataSaving = (v) => {
    setLoadingContentCreationDataSaving(v);
  };

  const createContentFilePath = dataDomain + "/" + "createContent";

  return (
    <div>
      {createContentCreationRender ? (
        <CreateContentCreation
          dataDomain={dataDomain}
          contentRecord={contentRecord}
          mySky={mySky}
          createContentFilePath={createContentFilePath}
          contentSchemaNameList={contentSchemaNameList}
          contentSchemaNameListValue={contentSchemaNameListValue}
          // // formSchema={formSchema}
          formInitialValues={formInitialValues}
          handleCreateContentCreationRenderStop={
            handleCreateContentCreationRenderStop
          }
          loadingContentCreationDataSaving={loadingContentCreationDataSaving}
          handleLoadingContentCreationDataSaving={
            handleLoadingContentCreationDataSaving
          }
        />
      ) : createContentSchemaTypeRender ? (
        <CreateContentSchemaType
          contentSchemaNameList={contentSchemaNameList}
          handleCreateContentSchemaTypeRenderStop={
            handleCreateContentSchemaTypeRenderStop
          }
          handleCreateContentCreationRender={handleCreateContentCreationRender}
        />
      ) : (
        <div>
          <Paper
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
            }}
          >
            <Typography
              component="h1"
              display="inline"
              variant="button"
              color="inherit"
              style={{
                alignSelf: "center",
                fontSize: "22px",
                fontWeight: "800",
              }}
            >
              Create Content
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ border: "1px red solid", margin: "8px" }}
              onClick={handleCreateContentSchemaTypeRender}
            >
              Create Content
            </Button>
          </Paper>
          {<CreateContentTable />}
        </div>
      )}
    </div>
  );
}
