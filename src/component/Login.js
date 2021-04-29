import React from "react";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    textAlign: "center",
    border: "3px solid black",
    margin: "5px",
    padding: "10px",
  },
}));

export default function Login({ handleMySkyLogin, loadingMySky }) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingMySky}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.container}>
        <h1>ARIGALE</h1>
        <h2>Decentralized CMS</h2>
        <h2>The problem Arigale solves</h2>
        <h3>
          Allow user to manage their blog, poadcast etc. data without worring of
          leak or misuse of their data.
        </h3>
        <Button
          id="login-button"
          variant="contained"
          color="primary"
          style={{ border: "1px red solid" }}
          onClick={handleMySkyLogin}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
}
