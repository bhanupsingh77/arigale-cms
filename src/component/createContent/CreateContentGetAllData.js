import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Paper,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CreateContentGetAllData({
  mySky,
  contentSchemaNameList,
  createContentFilePath,
  entryNumber,
}) {
  const classes = useStyles();
  const [allContentDataLink, setAllContentDataLink] = useState(null);
  const [loadingAllContentDataLink, setLoadingAllContentDataLink] = useState(
    false
  );

  const handleGetAllDataDataLink = async () => {
    // console.log("started");
    setLoadingAllContentDataLink(true);
    const filePath = createContentFilePath + "/" + contentSchemaNameList;
    const arr = Array(entryNumber).fill(entryNumber);
    const dataArr = await Promise.all(
      arr.map(async (e, i) => {
        const currentFilePath = filePath + "/" + (i + 1);
        //   console.log(currentFilePath);
        const { data } = await mySky.getJSON(currentFilePath);
        return data;
      })
    );
    const allDataFilePath = filePath + "/" + "allContentData";
    const { dataLink } = await mySky.setJSON(allDataFilePath, dataArr);
    setAllContentDataLink(dataLink.replace("sia:", ""));
    setLoadingAllContentDataLink(false);
  };

  const handleCopyDataLink = async () => {
    const text = document.getElementById("all-content-data").innerText;
    await navigator.clipboard.writeText(text);
  };

  // console.log("arr", allContentDataLink);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingAllContentDataLink}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
          padding: "10px",
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
          Data
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ border: "1px red solid" }}
          onClick={handleGetAllDataDataLink}
        >
          Get Data Link
        </Button>
      </Paper>
      <Paper
        style={{
          marginTop: "4px",
        }}
      >
        {allContentDataLink ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              DataLink
            </Typography>
            <a
              id="all-content-data"
              href={`https://siasky.net/${allContentDataLink}`}
              target="blank"
            >{`https://siasky.net/${allContentDataLink}`}</a>
            <br />

            <Button
              variant="contained"
              color="primary"
              style={{ border: "1px red solid", margin: "8px" }}
              onClick={handleCopyDataLink}
            >
              Copy DataLink
            </Button>
          </div>
        ) : null}
      </Paper>
    </div>
  );
}
