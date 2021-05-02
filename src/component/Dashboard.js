import React, { useState, useEffect } from "react";
// import ContentSchema from "./contentSchema/ContentSchema.js";
// import ContentSchemaTest from "./contentSchema/ContentSchemaTest.js";

import CreateContent from "./createContent/CreateContent.js";
import CreateContentTest from "./createContent/CreateContentTest.js";

import ContentSchemaTest from "./contentSchema/ContentSchemaTest.js";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DescriptionIcon from "@material-ui/icons/Description";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontWeight: "800",
    letterSpacing: "2px",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard({
  dataDomain,
  handleMySkyLogout,
  contentRecord,
  mySky,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [contentSchemaNameList, setContentSchemaNameList] = useState(null);
  const [contentSchemaNameListValue, setContentSchemaNameListValue] = useState(
    null
  );

  const [formSchema, setFormSchema] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [updatedFormSchema, setupdatedFormSchema] = useState([]);
  const [loadingContentSchemaTest, setLoadingContentSchemaTest] = useState(
    true
  );

  //getting saved values for ContentSchema

  useEffect(() => {
    async function initContentSchema() {
      try {
        const filePath = dataDomain + "/" + "contentSchema";
        const { data } = await mySky.getJSON(filePath);
        console.log("data1", data);
        if (data !== null) {
          const filePath = dataDomain + "/" + "contentSchema";
          let { data } = await mySky.getJSON(filePath);
          setContentSchemaNameList(data[0]);
          const filePathSchema = filePath + "/" + data[0];
          data = await mySky.getJSON(filePathSchema);
          const contentSchemaValue = data.data;
          setContentSchemaNameListValue(contentSchemaValue);
          const initFormValue = {};
          const dataKeys = contentSchemaValue.map((obj) => {
            return Object.keys(obj)[0];
          });
          // console.log("datakeys init", dataKeys);
          dataKeys.map((key, i) => {
            const formKey = contentSchemaValue[i][key]["id"];
            // console.log("formkey", formKey);
            initFormValue[formKey] = "";
            return null;
          });
          console.log("new datakeys init val", initFormValue);
          setFormInitialValues(initFormValue);
          console.log("data2", data.data);
        }
      } catch (error) {
        console.log(`error with mySky methods: ${error.message}`);
      }
      setLoadingContentSchemaTest(false);
    }
    initContentSchema();
  }, []);

  // getting formSchema and formInitialValues, value to pass to component CreateContent
  // useEffect(() => {
  //   async function initCreateContent() {
  //     try {
  //       console.log("123");
  //       // console.log("enterd forminit");
  //       const filePath = dataDomain + "/" + "formSchema";
  //       // console.log("filePath", filePath);
  //       const { data } = await mySky.getJSON(filePath);
  //       // console.log("dataget", data);
  //       // console.log("dataget-type", typeof data);
  //       if (data !== null) {
  //         setFormSchema(data);
  //         const initFormValue = {};
  //         const dataKeys = data.map((obj) => {
  //           return Object.keys(obj)[0];
  //         });
  //         // console.log("datakeys init", dataKeys);
  //         dataKeys.map((key, i) => {
  //           const formKey = data[i][key]["id"];
  //           // console.log("formkey", formKey);
  //           initFormValue[formKey] = "";
  //           return null;
  //         });
  //         // console.log("new datakeys init val", initFormValue);
  //         // console.log("data init schema type", dataKeys);
  //         setFormInitialValues(initFormValue);
  //       }
  //       // setLoadinginitCreateContent(false);
  //     } catch (error) {
  //       console.log(`error with getJSON: ${error.message}`);
  //     }
  //   }

  //   initCreateContent();
  // }, [updatedFormSchema, dataDomain, mySky]);

  const updateFormSchema = (dataLink) => {
    setupdatedFormSchema(dataLink);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            ARIGALE
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Typography>
            <Link
              href="https://discord.gg/48E6esMuZZ"
              target="_blank"
              rel="noopener"
              color="secondary"
              style={{ marginRight: "15px" }}
            >
              JOIN DISCORD
            </Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ border: "1px white solid" }}
            onClick={handleMySkyLogout}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {["Content Schema", "Create Content"].map((text, index) => (
          <ListItem
            button
            selected={selectedIndex === index}
            key={index}
            onClick={(event) => handleListItemClick(index)}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <ViewQuiltIcon /> : <DescriptionIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main
        className={classes.content}
        // style={{ border: "10px red solid" }}
      >
        <div
          className={classes.appBarSpacer}
          // style={{ border: "10px black solid" }}
        />
        <Container
          maxWidth="lg"
          className={classes.container}
          // style={{ border: "10px blue solid" }}
        >
          {selectedIndex === 0 ? (
            <ContentSchemaTest
              dataDomain={dataDomain}
              contentRecord={contentRecord}
              mySky={mySky}
              loadingContentSchemaTest={loadingContentSchemaTest}
              contentSchemaNameList={contentSchemaNameList}
              contentSchemaNameListValue={contentSchemaNameListValue}
            />
          ) : (
            // <ContentSchema
            //   dataDomain={dataDomain}
            //   contentRecord={contentRecord}
            //   mySky={mySky}
            //   updateFormSchema={updateFormSchema}
            // />
            // <CreateContent
            //   dataDomain={dataDomain}
            //   contentRecord={contentRecord}
            //   mySky={mySky}
            //   formSchema={formSchema}
            //   formInitialValues={formInitialValues}
            // />
            <CreateContentTest
              dataDomain={dataDomain}
              contentRecord={contentRecord}
              mySky={mySky}
              contentSchemaNameList={contentSchemaNameList}
              contentSchemaNameListValue={contentSchemaNameListValue}
              // formSchema={formSchema}
              formInitialValues={formInitialValues}
            />
          )}
        </Container>
      </main>
    </div>
  );
}
