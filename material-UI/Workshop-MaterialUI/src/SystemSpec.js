import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";

const convertToMb = number => {
  if (Number.isInteger(number)) {
    const mb = number / 1048576;
    const rounded = mb.toFixed(1);
    return `${rounded} mb`;
  } else {
    return "";
  }
};

const SystemSpecs = () => {
  const channels = [
    "type",
    "arch",
    "platform",
    "freemem",
    "totalmem",
    "hostname"
  ];
  const [specs, setSpecs] = useState({
    type: "",
    arch: "",
    platform: "",
    freemem: "",
    totalmem: "",
    hostname: ""
  });
  const [, refresh] = useState(0);

  const receiveSpecs = elements => {
    let object = {};
    elements.forEach(element => {
      window.ipcRenderer.on(element, (event, message) => {
        object[element] = message;
      });
    });
    setSpecs(object);
    console.log(object);
  };

  const handleRefresh = () => {
    refresh();
    console.log(specs);
  };

  useEffect(() => {
    receiveSpecs(channels);
  }, []);

  // console.log(specs);

  return (
    <Box color="#DDD" py="35%">
      <Grid container justify="center">
        <Grid item xs={12}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ChevronRightOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="OS:" />
              {specs.type}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChevronRightOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Architecture:" />
              {specs.arch}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChevronRightOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Plateforme:" />
              {specs.platform}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChevronRightOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Nom du PC:" />
              {specs.hostname}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChevronRightOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Mémoire totale:" />
              {convertToMb(specs.totalmem)}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChevronRightOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Mémoire restante:" />
              {convertToMb(specs.freemem)}
            </ListItem>
          </List>
        </Grid>
        <Button variant="contained" onClick={handleRefresh} color="primary">
          Refresh
        </Button>
      </Grid>
    </Box>
  );
};
export default SystemSpecs;
