import React, { useState, useEffect } from "react";
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
import { SkynetClient } from "skynet-js";

import Login from "./component/Login.js";
import Dashboard from "./component/Dashboard.js";

//dev mode
const dev = true;

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = "https://siasky.net/"; // allow for developing on localhost
const client = dev ? new SkynetClient(portal) : new SkynetClient();
const contentRecord = new ContentRecordDAC();
const dataDomain = dev ? "localhost" : "arigale.hns";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loadingMySky, setLoadingMySky] = useState(true);

  // call async setup function\
  // On initial run, start initialization of MySky
  useEffect(() => {
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain);
        // console.log(mySky);

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

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard
          dataDomain={dataDomain}
          handleMySkyLogout={handleMySkyLogout}
          contentRecord={contentRecord}
          mySky={mySky}
        />
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
