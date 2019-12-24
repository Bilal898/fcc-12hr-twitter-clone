import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
//
import Scream from "../components/Scream";
import Profile from "../components/Profile";
//redux
import { getUserData } from "../redux/actions/dataActions";
import { connect } from "react-redux";

export class user extends Component {
  componentDidMount() {
    this.props.getUserData(this.props.match.params.handle);
    console.log("ok", this.props.data);
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams === null ? (
        <p>No screams yet</p>
      ) : (
        screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
      )
    ) : (
      <p>loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={8}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={8}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
export default connect(mapStateToProps, { getUserData })(user);
