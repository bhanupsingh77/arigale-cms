import React, { useState } from "react";
// import { Form, SubmitButton, ResetButton } from "../FormElements";
// import { getFormElement } from "../../utils.js";
// import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CreateContentSchemaType from "./CreateContentSchemaType";
import CreateContentCreation from "./CreateContentCreation";
import CreateContentTable from "./CreateContentTable";
import CreateContentUpdateData from "./CreateContentUpdateData";
import CreateContentGetAllData from "./CreateContentGetAllData";

export default function CreateContentTest({
  dataDomain,
  contentRecord,
  mySky,
  contentSchemaNameList,
  contentSchemaNameListValue,
  // formSchema,
  formInitialValues,
  entryNumber,
  initvalueForSavedContentEntry,
  handleUpdateSavedContentEntryNumber,
  handleLoadingCreateContentUpdateDataStart,
  loadingCreateContentUpdateData,
  handleSavedContentEntryNumberValueReset,
  savedContentEntryNumber,
  handleCreatedNewContent,
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
    createContentUpdateDataRender,
    setCreateContentUpdateDataRender,
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

  const handleCreateContentUpdateDataRender = (entry) => {
    // console.log("current entry number", entry);
    setCreateContentUpdateDataRender(true);
    handleUpdateSavedContentEntryNumber(entry);
    handleLoadingCreateContentUpdateDataStart();
  };

  const handleCreateContentUpdateDataRenderStop = () => {
    setCreateContentUpdateDataRender(false);
    handleSavedContentEntryNumberValueReset();
  };

  const handleLoadingContentCreationDataSaving = (v) => {
    setLoadingContentCreationDataSaving(v);
  };

  const createContentFilePath = dataDomain + "/" + "createContent";

  return (
    <div>
      {createContentUpdateDataRender ? (
        <CreateContentUpdateData
          contentSchemaNameList={contentSchemaNameList}
          contentSchemaNameListValue={contentSchemaNameListValue}
          handleCreateContentUpdateDataRenderStop={
            handleCreateContentUpdateDataRenderStop
          }
          initvalueForSavedContentEntry={initvalueForSavedContentEntry}
          loadingCreateContentUpdateData={loadingCreateContentUpdateData}
          savedContentEntryNumber={savedContentEntryNumber}
          createContentFilePath={createContentFilePath}
          contentRecord={contentRecord}
          mySky={mySky}
        />
      ) : createContentCreationRender ? (
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
          handleCreatedNewContent={handleCreatedNewContent}
        />
      ) : createContentSchemaTypeRender ? (
        <CreateContentSchemaType
          contentSchemaNameList={contentSchemaNameList}
          handleCreateContentSchemaTypeRenderStop={
            handleCreateContentSchemaTypeRenderStop
          }
          handleCreateContentCreationRender={handleCreateContentCreationRender}
        />
      ) : contentSchemaNameList ? (
        <div>
          <Paper
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 30px",
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
            <IconButton
              color="primary"
              style={{
                width: "45px",
                height: "45px",
                border: "1px #3f51b5 solid",
              }}
              onClick={handleCreateContentSchemaTypeRender}
            >
              <CreateIcon />
            </IconButton>
          </Paper>
          {entryNumber ? (
            <CreateContentGetAllData
              mySky={mySky}
              contentSchemaNameList={contentSchemaNameList}
              createContentFilePath={createContentFilePath}
              entryNumber={entryNumber}
            />
          ) : null}
          {
            <CreateContentTable
              mySky={mySky}
              contentSchemaNameList={contentSchemaNameList}
              createContentFilePath={createContentFilePath}
              entryNumber={entryNumber}
              handleCreateContentUpdateDataRender={
                handleCreateContentUpdateDataRender
              }
            />
          }
        </div>
      ) : (
        <div>
          <h1>Create Content Schema first to Create Content</h1>
        </div>
      )}
    </div>
  );
}
