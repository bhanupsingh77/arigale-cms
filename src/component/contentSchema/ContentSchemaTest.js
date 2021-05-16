import React, { useState } from "react";
import {
  Backdrop,
  Button,
  IconButton,
  CircularProgress,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import ContentSchemaName from "./ContentSchemaName";
import ContentSchemaCreation from "./ContentSchemaCreation";
import ContentSchemaTable from "./ContentSchemaTable";
import ContentSchemaView from "./ContentSchemaView";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function ContentSchemaTest({
  dataDomain,
  contentRecord,
  mySky,
  loadingContentSchemaTest,
  contentSchemaNameList,
  contentSchemaNameListValue,
  disableCreateSchemaButton,
  handleSnackbarOpen,
  handleUpdateDataOnSchemaCreation,
  handleLoadingContentSchemaTestStart,
}) {
  const classes = useStyles();
  const [contentSchemaName, setcontentSchemaName] = useState(null);
  const [contentSchemaNameRender, setcontentSchemaNameRender] = useState(false);
  const [
    contentSchemaCreationRender,
    setcontentSchemaCreationRender,
  ] = useState(false);
  const [contentSchemaViewRender, setcontentSchemaViewRender] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const contentSchemaFilePath = dataDomain + "/" + "contentSchema";

  const handleContentSchemaNameRender = () => {
    setcontentSchemaNameRender(true);
  };

  const handleContentSchemaNameRenderStop = () => {
    setcontentSchemaNameRender(false);
  };

  const handleContentSchemaCreationRender = (value) => {
    setcontentSchemaName(value.contentSchemaName);
    // console.log("val", value);
    setcontentSchemaCreationRender(true);
  };

  const handleContentSchemaCreationRenderClose = () => {
    setcontentSchemaCreationRender(false);
    setcontentSchemaNameRender(false);
  };

  const handleContentSchemaViewRender = () => {
    setcontentSchemaViewRender(true);
  };

  const handleContentSchemaViewRenderStop = () => {
    setcontentSchemaViewRender(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingContentSchemaTest}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={dialogOpen}
        // onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Congratulations on creating Content Schema!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            What now ? Head to create content section option on side bar and
            create your first content!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {contentSchemaViewRender ? (
        <ContentSchemaView
          contentRecord={contentRecord}
          mySky={mySky}
          contentSchemaNameList={contentSchemaNameList}
          contentSchemaNameListValue={contentSchemaNameListValue}
          handleContentSchemaViewRenderStop={handleContentSchemaViewRenderStop}
        />
      ) : contentSchemaCreationRender ? (
        <ContentSchemaCreation
          dataDomain={dataDomain}
          contentRecord={contentRecord}
          mySky={mySky}
          contentSchemaFilePath={contentSchemaFilePath}
          contentSchemaName={contentSchemaName}
          handleSnackbarOpen={handleSnackbarOpen}
          handleContentSchemaCreationRenderClose={
            handleContentSchemaCreationRenderClose
          }
          handleUpdateDataOnSchemaCreation={handleUpdateDataOnSchemaCreation}
          handleLoadingContentSchemaTestStart={
            handleLoadingContentSchemaTestStart
          }
          handleDialogOpen={handleDialogOpen}
        />
      ) : contentSchemaNameRender ? (
        <ContentSchemaName
          handleContentSchemaNameRenderStop={handleContentSchemaNameRenderStop}
          handleContentSchemaCreationRender={handleContentSchemaCreationRender}
        />
      ) : (
        <div>
          <h3>
            <strong>
              Note: We only support one schema for now and once created it can
              not be updated or deleted.
            </strong>
          </h3>
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
              Create Schema
            </Typography>
            <IconButton
              color="primary"
              style={{
                width: "45px",
                height: "45px",
                border: "1px #3f51b5 solid",
              }}
              disabled={disableCreateSchemaButton}
              onClick={handleContentSchemaNameRender}
            >
              <CreateIcon />
            </IconButton>
          </Paper>
          {
            <div style={{ marginTop: "50px" }}>
              <ContentSchemaTable
                contentSchemaNameList={contentSchemaNameList}
                handleContentSchemaViewRender={handleContentSchemaViewRender}
              />
            </div>
          }
        </div>
      )}
    </div>
  );
}
