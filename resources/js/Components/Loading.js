import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStylesFacebook = makeStyles((theme) => ({
    root: {
      position: 'relative',
      top: 200,
      left: '50%',
      transform: 'translate(50% -50%)',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: '#ff5122',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));

  function FacebookCircularProgress(props) {
    const classes = useStylesFacebook();
  
    return (
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </div>
    );
  }
  
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  export default function CustomizedProgressBars() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <FacebookCircularProgress />
      </div>
    );
  }
  