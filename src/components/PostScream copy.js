import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
//mui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import MyButton from "../util/MyButton";
//redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme
  // button: {
  //   float: "right"
  // }
});

class PostScream extends Component {
  state = {
    body: "",
    userHandle: "",
    open: false,
    errors: {}
  };
  //   componentDidMount() {
  //     const { credentials } = this.props;
  //     this.mapUserDetailsToState(credentials);
  //   }
  //   mapUserDetailsToState = credentials => {
  //     this.setState({
  //       bio: credentials.bio ? credentials.bio : "",
  //       website: credentials.website ? credentials.website : "",
  //       location: credentials.location ? credentials.location : ""
  //     });
  //   };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const newScreamData = {
      body: this.state.body,
      userHandle: this.props.user.credentials.handle
    };
    this.props.postScream(newScreamData);
    this.handleClose();
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    // this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false, body: "" });
  };
  render() {
    // const { classes } = this.props;
    const {
      classes,
      user: {
        credentials: { handle }
      },
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post Scream" placement="top">
          {/* <IconButton onClick={this.handleOpen} className={classes.button}> */}
          <AddIcon color="primary" />
          {/* </IconButton> */}
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Post New Scream</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="body"
                type="text"
                label="Body"
                multiline
                rows="3"
                placeholder="Scream body"
                className={classes.textField}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
              />
              {/* <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Your location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              /> */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials,
  UI: state.UI,
  user: state.user
});

export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
);
