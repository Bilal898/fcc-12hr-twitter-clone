import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//redux
import {
  logoutUser,
  uploadImage,
  getUserData
} from "../redux/actions/userActions";
//mui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: theme.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

class StaticProfile extends Component {
  componentDidMount() {
    // this.props.getUserData(this.props.userHandle);
    console.log("static", this.props);
  }
  handleImageChange = event => {
    const image = event.target.files[0];
    //send to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      profile: { handle, email, imageUrl, createdAt, bio, website, location }
    } = this.props;
    const { loading } = this.props.data;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/user/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    );
  }
}

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
const mapActionsToProps = {
  logoutUser,
  uploadImage,
  getUserData
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StaticProfile));
