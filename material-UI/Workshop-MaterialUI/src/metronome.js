import React, { useState } from "react";
import useInterval from "./useInterval";

import soundFile1 from "./assets/click1.wav";
import soundFile2 from "./assets/click2.wav";
import play from "./assets/play.png";
import pause from "./assets/pause.png";

import { makeStyles } from "@material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { lightBlue } from "@material-ui/core/colors";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const Metronome = () => {
  const [beat, setBeat] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [measure, setMeasure] = useState({
    count: 0,
    pulse: 4
  });

  const click1 = new Audio(soundFile1);
  const click2 = new Audio(soundFile2);

  const handleSlider = (e, newValue) => {
    setMeasure({ count: 0, pulse: measure.pulse });
    setBeat(newValue);
  };
  const handleMinus = () => {
    setMeasure({ count: 0, pulse: measure.pulse });
    setBeat(beat - 1);
  };
  const handlePlus = () => {
    setMeasure({ count: 0, pulse: measure.pulse });
    setBeat(beat + 1);
  };

  const handlePulse = (e, pulse) => {
    document
      .querySelectorAll("button.active")
      .forEach(button => button.classList.remove(classes.active));
    e.target.classList.add(classes.active);
    setMeasure({ count: 0, pulse: pulse });
  };

  const startStop = () => {
    if (!playing) {
      setMeasure({ count: 0, pulse: measure.pulse });
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const playClick = () => {
    if (measure.count % measure.pulse === 0) {
      click1.currentTime = 0;
      click1.play();
    } else {
      click2.currentTime = 0;
      click2.play();
    }
    setMeasure({
      count: (measure.count + 1) % measure.pulse,
      pulse: measure.pulse
    });
  };

  useInterval(() => {
    if (playing) {
      playClick();
    }
  }, 60000 / beat);

  const useStyles = makeStyles({
    Slider: {
      width: "280px",
      color: "#D45D79"
    },
    divButtons: {
      margin: "0 2rem"
    },
    Buttons: {
      color: "#D45D79"
    },
    playButton: {
      borderRadius: "50%",
      background: "linear-gradient(180deg, #41419d, #373784)",
      boxShadow: "-7px 7px 14px #232355, 7px -7px 14px #5757d1",
      marginTop: "2rem"
    },
    BPMBeat: {
      border: "#D45D79 1px solid",
      borderRadius: "25%",
      fontSize: "1.5rem",
      fontFamily: "helvetica",
      color: "#ddd",
      padding: "1rem",
      marginBottom: "2rem"
    }
  });

  const classes = useStyles();

  return (
    <Box py={"20%"}>
      <Grid container justify={"center"}>
        <Grid className={classes.BPMBeat}>
          <Typography>{beat}</Typography>
          <span>BPM</span>
        </Grid>
        <Grid container justify={"center"} spacing={3}>
          <Grid item xs={12}>
            <Grid container justify={"center"}>
              <Slider
                className={classes.Slider}
                valueLabelDisplay="auto"
                value={beat}
                min={0}
                max={240}
                onChange={handleSlider}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify={"center"}>
              <IconButton
                className={classes.Buttons}
                aria-label="remove"
                onClick={handleMinus}
              >
                <RemoveCircleOutline />
              </IconButton>
              <IconButton
                className={classes.Buttons}
                aria-label="add"
                onClick={handlePlus}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={startStop}
            className={classes.playButton}
            color={"primary"}
          >
            <img
              src={playing ? pause : play}
              alt="play/pause"
              style={{ height: "70px", width: "70px" }}
            />
          </Button>
        </Grid>
        <Grid container justify={"center"}>
          <Box component={Typography} color={"#ddd"} mt={"20px"} variant={"h5"}>
            Mesure:
          </Box>
          <MuiThemeProvider theme={theme}>
            <ButtonGroup>
              <Button
                color="primary"
                onClick={e => {
                  handlePulse(e, 2);
                }}
              >
                DEUX
              </Button>
              <Button
                color="primary"
                onClick={e => {
                  handlePulse(e, 3);
                }}
              >
                TROIS
              </Button>
              <Button
                color="primary"
                onClick={e => {
                  handlePulse(e, 4);
                }}
              >
                QUATRE
              </Button>
            </ButtonGroup>
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </Box>
  );
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8B0000"
    },
    secondary: {
      main: "#3D3D93"
    }
  },
  typography: {
    fontSize: 20,
    fontFamily: "Arial, Helvetica"
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: "#d45d79",
        marginTop: "3rem"
      }
    }
  }
});

export default Metronome;
