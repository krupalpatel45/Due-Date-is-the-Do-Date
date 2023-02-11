import React, { Component } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import {
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  Pagination,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@material-ui/lab";
import {
  faEdit,
  faTrashAlt,
  faRupeeSign,
  faSpinner,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from "query-string";
import {
  Avatar,
  Button,
  Paper,
  TextField,
  Grid,
  InputAdornment,
  InputLabel,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  Input,
  Chip,
  FormHelperText,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Step,
  StepLabel,
  Stepper,
  MuiThemeProvider,
  ThemeProvider,
  Fab,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import {
  AccountCircle,
  Cached,
  Delete,
  Edit,
  Security,
  Visibility,
} from "@material-ui/icons";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import FilterPanel from "./filterPanel";

// example - > http://localhost:3000/result/-MKsYTEzyfsPle5P35UO

class Result extends Component {
  state = {
    key: this.props.match.params.id,
    cand: "",
  };
  async componentDidMount() {
    let resp = await axios.get(
      "https://bharti-quiz.firebaseio.com/candidates/" +
        this.state.key +
        ".json"
    );

    this.setState({ cand: resp.data });
  }
  getListColor = (ind, opt) => {
    let correct = this.state.cand.result.answerData[ind].correct;
    let yourAns = this.state.cand.result.answerData[ind].you;

    if (yourAns === "") {
      if (correct === opt) return "";
    }
    if (yourAns === opt) {
      if (opt === correct) return "mediumseagreen";
      return "salmon";
    }

    if (correct === opt) return "mediumseagreen";
  };
  render() {
    let questionData = [];
    if (this.state.cand.hasOwnProperty("result"))
      questionData = this.state.cand.result.questionData;
    return (
      <div className="m-2">
        <Paper elevation={5} style={{ borderRadius: "10px", padding: "10px" }}>
          <center>
            <Grid container spacing={1} justify="center">
              <Grid item xs={11}>
                <center>
                  <FontAwesomeIcon icon={faInfinity} className="fa fa-2x" />
                  {"  "}
                  <h5>
                    {" "}
                    <b>Evaluation Portal</b>
                  </h5>
                </center>
              </Grid>
              <Grid item xs={1}>
                <h6>
                  <b>{new Date().toLocaleString()}</b>
                </h6>
              </Grid>
            </Grid>
            {this.state.cand === "" ? (
              <center>
                <CircularProgress disableShrink />
              </center>
            ) : (
              <div>
                <Grid container spacing={1} justify="center">
                  <Grid item xs={2}>
                    Name : <b>{this.state.cand.name}</b>
                  </Grid>
                  <Grid item xs={2}>
                    Phone : +91-<b>{this.state.cand.phone}</b>
                  </Grid>
                  <Grid item xs={2}>
                    Subject : <b>{this.state.cand.subject}</b>
                  </Grid>
                  <Grid item xs={2}>
                    Test-Category : <b>{this.state.cand.testCategory}</b>
                  </Grid>
                  <Grid item xs={2}>
                    Guardian-Name : <b>{this.state.cand.guardian}</b>
                  </Grid>
                </Grid>
                <Divider />
                <b>Test Overview</b>
                <Grid container spacing={1} justify="center">
                  <Grid item xs={2}>
                    Correct : <b>{this.state.cand.result.correct}</b>
                  </Grid>
                  <Grid item xs={2}>
                    Wrong : <b>{this.state.cand.result.wrong}</b>
                  </Grid>
                  <Grid item xs={2}>
                    Skipped : <b>{this.state.cand.result.unattempt}</b>
                  </Grid>
                  <Grid item xs={2}>
                    Score: <b>{this.state.cand.result.percent}%</b>
                  </Grid>
                </Grid>

                <Divider />
                <br></br>
                <br></br>
                <b>Question and Answer-Key</b>
                <Grid container spacing={2}>
                  {questionData.map((q, ind) => (
                    <Grid item xs={4}>
                      <Card elevation={5}>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>
                            <Avatar style={{ height: "20px", width: "20px" }}>
                              <b>{ind + 1}</b>
                            </Avatar>
                            <b>{q.question}</b>
                          </Typography>

                          <Typography color="textSecondary">
                            <List
                              component="nav"
                              aria-label="main mailbox folders"
                            >
                              <ListItem
                                style={{
                                  backgroundColor: this.getListColor(ind, "A"),
                                }}
                              >
                                <ListItemIcon>
                                  <Avatar
                                    style={{ height: "20px", width: "20px" }}
                                  >
                                    <b>A</b>
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText>
                                  {"  "}
                                  {q.options[0]}
                                </ListItemText>
                              </ListItem>
                              <Divider />
                              <ListItem
                                style={{
                                  backgroundColor: this.getListColor(ind, "B"),
                                }}
                              >
                                <ListItemIcon>
                                  <Avatar
                                    style={{ height: "20px", width: "20px" }}
                                  >
                                    <b>B</b>
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText>
                                  {"  "}
                                  {q.options[1]}
                                </ListItemText>
                              </ListItem>
                              <Divider />
                              <ListItem
                                style={{
                                  backgroundColor: this.getListColor(ind, "C"),
                                }}
                              >
                                <ListItemIcon>
                                  <Avatar
                                    style={{ height: "20px", width: "20px" }}
                                  >
                                    <b>C</b>
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText>
                                  {"  "}
                                  {q.options[2]}
                                </ListItemText>
                              </ListItem>
                              <Divider />
                              <ListItem
                                style={{
                                  backgroundColor: this.getListColor(ind, "D"),
                                }}
                              >
                                <ListItemIcon>
                                  <Avatar
                                    style={{ height: "20px", width: "20px" }}
                                  >
                                    <b>D</b>
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText>
                                  {"  "}
                                  {q.options[3]}
                                </ListItemText>
                              </ListItem>
                            </List>
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              Your Answer :{" "}
                              <b>
                                {this.state.cand.result.answerData[ind].you ===
                                ""
                                  ? "SKIPPED"
                                  : this.state.cand.result.answerData[ind].you}
                              </b>
                            </Grid>
                            <Grid item xs={6}>
                              Correct Answer:{" "}
                              <b>
                                {this.state.cand.result.answerData[ind].correct}
                              </b>
                            </Grid>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <br></br>
                <Divider />
                <br></br>
                <br></br>
                <br></br>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <b>Superviser's Signature</b>
                  </Grid>
                  <Grid item xs={6}>
                    <b>Guardian's Signature</b>
                  </Grid>
                </Grid>
              </div>
            )}
          </center>
        </Paper>
      </div>
    );
  }
}

export default Result;
