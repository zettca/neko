import React from 'react';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Arrow from '@material-ui/icons/ArrowForwardIos';

function handleChange(name) {
  //console.log(name);
}

const CreateForm = ({ classes }) => {
  return (
    <Paper className={classes.paperino}>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          placeholder="Event title"
          className={classes.textField}
          onChange={handleChange('title')}
          margin="normal"
        />
        <TextField
          id="description"
          label="Description"
          placeholder="Event description"
          className={classes.textField}
          onChange={handleChange('description')}
          margin="normal"
        />
        <TextField
          id="date"
          label="Date"
          placeholder="Your Date"
          className={classes.textField}
          onChange={handleChange('name')}
          margin="normal"
        />
        <Fab variant="extended" aria-label="submit" className={classes.fab} onClick={() => alert('oi')}>
          Submit
          <Arrow className={classes.extendedIcon} />
        </Fab>
      </form>
    </Paper>
  );
}

export default CreateForm;