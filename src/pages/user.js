import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
//
import Scream from "../components/Scream";
import StaticProfile from "../components/StaticProfile";
//redux
import { getUserData } from "../redux/actions/dataActions";
import { connect } from "react-redux";

export class user extends Component {
  state = {
    profile: {}
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);

    axios
      .get(`/user/${handle}`)
      .then(res => {
        console.log("res", res.data.user);
        this.setState(
          {
            profile: res.data.user
          },
          () => {
            console.log("res1", this.state.profile);
          }
        );
      })
      .catch(err => console.log(err));
    // console.log("newdata", this.getState);
  }

  render() {
    const { screams, loading } = this.props.data;
    // const { profile } = this.state;
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
          {this.state.profile === null ? (
            <p>loading profile</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
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
