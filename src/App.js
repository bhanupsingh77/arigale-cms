import React, { useState, useEffect } from "react";
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
import { SkynetClient } from "skynet-js";

import Login from "./component/Login.js";
import Dashboard from "./component/Dashboard.js";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loadingMySky, setLoadingMySky] = useState(true);

  // We'll define a portal to allow for developing on localhost.
  // When hosted on a skynet portal, SkynetClient doesn't need any arguments.
  const portal = "https://siasky.net/"; // allow for developing on localhost
  const client = new SkynetClient(portal);
  const contentRecord = new ContentRecordDAC();
  const dataDomain = "localhost";

  // call async setup function\
  // On initial run, start initialization of MySky
  useEffect(() => {
    async function initMySky() {
      try {
        console.log("787999999900");
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain);
        console.log(mySky);

        // load necessary DACs and permissions
        await mySky.loadDacs(contentRecord);

        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();

        setMySky(mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
        }
        setLoadingMySky(false);
      } catch (e) {
        alert(e);
        console.error(e);
      }
    }

    initMySky();
  }, []);

  const handleMySkyLogin = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();

    if (status) {
      setUserID(await mySky.userID());
    }
    setLoggedIn(status);
  };

  const handleMySkyLogout = async () => {
    // call logout to globally logout of mysky
    await mySky.logout();

    //set react state
    setLoggedIn(false);
    setUserID("");
  };
  console.log("user-id-a", userID);
  console.log("mySky", mySky);
  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard handleMySkyLogout={handleMySkyLogout} mySky={mySky} />
      ) : (
        <div>
          <Login
            handleMySkyLogin={handleMySkyLogin}
            loadingMySky={loadingMySky}
          />
        </div>
      )}
    </div>
  );
}
