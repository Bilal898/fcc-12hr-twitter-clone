import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//mui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import MyButton from "../util/MyButton";
// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        {authenticated ? (
          <Fragment>
            <MyButton tip="Create a scream">
              <AddIcon />
            </MyButton>
            <Link to="/">
              <MyButton tip="home">
                <HomeIcon />
              </MyButton>
            </Link>
            <MyButton tip="notifications">
              <Notifications />
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Toolbar className="nav-container">
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Toolbar>
          </Fragment>
        )}
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(Navbar);
