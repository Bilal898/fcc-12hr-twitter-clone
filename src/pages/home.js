import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//
import Scream from "../components/Scream";
import Profile from "../components/Profile";
//
import Grid from "@material-ui/core/Grid";
//redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
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

home.propTypes = {
  getScreams: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
export default connect(mapStateToProps, { getScreams })(home);
