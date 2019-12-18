import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
//redux
import { logoutUser } from "../redux/actions/userActions";
//mui
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme,
  card: {
    maxWidth: 345
  }
});

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, email, imageUrl, createdAt }
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              @{handle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.props.logoutUser}>
            Logout
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
// export default connect(mapStateToProps)(Profile);

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Profile)
);
