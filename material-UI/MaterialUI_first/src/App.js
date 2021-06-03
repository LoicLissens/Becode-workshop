import React from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Metronome from "./metronome";
import SystemSpecs from "./systemspecs";
import { makeStyles } from "@material-ui/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import metronomeImg from "./assets/metronome.svg";
import systemeImg from "./assets/systeme.svg";
import loveImg from "./assets/love.svg";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#af460f"
    },
    secondary: {
      main: "#c400c6"
    }
  }
});
const useStyle = makeStyles({
  PaperApp: {
    color: "#ddd",
    width: "99vw",
    height: "97vh",
    margin: "10px auto",
    backgroundColor: "#2E344C"
  },
  headerTitle: {}
});
function App() {
  const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Grid container>
          <Grid item>
            <AppBar color="secondary" className={classes.headerTitle}>
              <Grid container justify="center">
                <Typography variant="h1">REACT + Electron + Material UI = </Typography>
                <img src={loveImg} alt="Spread the love" />
                <img src={loveImg} alt="Spread the love" />
              </Grid>
            </AppBar>
          </Grid>
          <Grid item xs={12}>
            <Box component="main" display="flex" mt="80px" justifyContent="center" height="80vh">
              <Router>
                <nav>
                  <div>
                    <Link to="/metronome">
                      Metronome
                      <img src={metronomeImg} alt="this looks cool," />
                    </Link>
                  </div>
                  <div>
                    <Link to="/systemespec">
                      Systemespecs
                      <img src={systemeImg} alt="doesn't it?" />
                    </Link>
                  </div>
                </nav>
                <Route path="/metronome">
                  <Metronome />
                </Route>
                <Route path="/systemespec">
                  <SystemSpecs />
                </Route>
              </Router>
            </Box>
          </Grid>

          <div className="App">
            <header className="App-header">
              <h1>
                React + Electron = <img src={loveImg} alt="Spread the love" />
              </h1>
            </header>
            <main></main>
          </div>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
