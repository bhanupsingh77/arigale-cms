import React, { useState } from "react";
// import { Form, SubmitButton, ResetButton } from "../FormElements";
// import { getFormElement } from "../../utils.js";
// import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CreateContentSchemaType from "./CreateContentSchemaType";
import CreateContentCreation from "./CreateContentCreation";
import CreateContentTable from "./CreateContentTable";
import CreateContentUpdateData from "./CreateContentUpdateData";
import CreateContentGetAllData from "./CreateContentGetAllData";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CreateContentTest({
  client,
  dataDomain,
  contentRecord,
  mySky,
  contentSchemaNameList,
  contentSchemaNameListValue,
  // formSchema,
  formInitialValues,
  entryNumber,
  initvalueForSavedContentEntry,
  loadingCreateContentTest,
  handleSnackbarOpen,
  handleUpdateSavedContentEntryNumber,
  handleLoadingCreateContentUpdateDataStart,
  loadingCreateContentUpdateData,
  handleSavedContentEntryNumberValueReset,
  savedContentEntryNumber,
  handleCreatedNewContent,
}) {
  const classes = useStyles();
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
  const [dialogOpen, setDialogOpen] = useState(false);

  // const [
  //   loadingContentCreationDataSaving,
  //   setLoadingContentCreationDataSaving,
  // ] = useState(false);

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

  // const handleLoadingContentCreationDataSaving = (v) => {
  //   setLoadingContentCreationDataSaving(v);
  // };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const createContentFilePath = dataDomain + "/" + "createContent";

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingCreateContentTest}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={dialogOpen}
        // onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Congratulations on creating your first content!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            What to do this with content ? Want to pubish it to a website, join
            our discord group by clicking the option on menu bar and get in
            touch with our team Arigale there, we will help you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {createContentUpdateDataRender ? (
        <CreateContentUpdateData
          contentRecord={contentRecord}
          mySky={mySky}
          createContentFilePath={createContentFilePath}
          savedContentEntryNumber={savedContentEntryNumber}
          contentSchemaNameList={contentSchemaNameList}
          contentSchemaNameListValue={contentSchemaNameListValue}
          handleCreateContentUpdateDataRenderStop={
            handleCreateContentUpdateDataRenderStop
          }
          handleSnackbarOpen={handleSnackbarOpen}
          initvalueForSavedContentEntry={initvalueForSavedContentEntry}
          loadingCreateContentUpdateData={loadingCreateContentUpdateData}
        />
      ) : createContentCreationRender ? (
        <CreateContentCreation
          dataDomain={dataDomain}
          contentRecord={contentRecord}
          mySky={mySky}
          createContentFilePath={createContentFilePath}
          contentSchemaNameList={contentSchemaNameList}
          contentSchemaNameListValue={contentSchemaNameListValue}
          handleSnackbarOpen={handleSnackbarOpen}
          // // formSchema={formSchema}
          formInitialValues={formInitialValues}
          handleCreateContentCreationRenderStop={
            handleCreateContentCreationRenderStop
          }
          // loadingContentCreationDataSaving={loadingContentCreationDataSaving}
          // handleLoadingContentCreationDataSaving={
          //   handleLoadingContentCreationDataSaving
          // }
          handleCreatedNewContent={handleCreatedNewContent}
          handleDialogOpen={handleDialogOpen}
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
              client={client}
              contentRecord={contentRecord}
              mySky={mySky}
              entryNumber={entryNumber}
              contentSchemaNameList={contentSchemaNameList}
              createContentFilePath={createContentFilePath}
              handleSnackbarOpen={handleSnackbarOpen}
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
