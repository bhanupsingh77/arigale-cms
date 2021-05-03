import React, { useState } from "react";
import {
  Backdrop,
  Button,
  IconButton,
  CircularProgress,
  Paper,
  Typography,
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
}) {
  const classes = useStyles();
  const [contentSchemaName, setcontentSchemaName] = useState(null);
  const [contentSchemaNameRender, setcontentSchemaNameRender] = useState(false);
  const [
    contentSchemaCreationRender,
    setcontentSchemaCreationRender,
  ] = useState(false);
  const [contentSchemaViewRender, setcontentSchemaViewRender] = useState(false);

  const contentSchemaFilePath = dataDomain + "/" + "contentSchema";

  const handleContentSchemaNameRender = () => {
    setcontentSchemaNameRender(true);
  };

  const handleContentSchemaNameRenderStop = () => {
    setcontentSchemaNameRender(false);
  };

  const handleContentSchemaCreationRender = (value) => {
    setcontentSchemaName(value.contentSchemaName);
    console.log("val", value);
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

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingContentSchemaTest}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {contentSchemaViewRender ? (
        <ContentSchemaView
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
          handleContentSchemaCreationRenderClose={
            handleContentSchemaCreationRenderClose
          }
        />
      ) : contentSchemaNameRender ? (
        <ContentSchemaName
          handleContentSchemaNameRenderStop={handleContentSchemaNameRenderStop}
          handleContentSchemaCreationRender={handleContentSchemaCreationRender}
        />
      ) : (
        <div>
          <Paper
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
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
              Create Schema
            </Typography>
            <IconButton
              color="inherit"
              style={{
                width: "45px",
                height: "45px",
                border: "1px red solid",
                color: "#fff",
                backgroundColor: "#3f51b5",
              }}
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
