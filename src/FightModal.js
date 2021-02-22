import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FightModal({ robots, robotId }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [opponent, setOpponent] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFight = () => {
    fetch(`http://localhost:3001/robot/${robotId}/fight`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ opponent }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.result);
        handleClose();
      });
  };
  return (
    <>
      <Button color="primary" onClick={handleClickOpen}>
        Fight
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose Opponent</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel>Opponent</InputLabel>
            <Select
              value={opponent}
              style={{ width: 300 }}
              onChange={(e) => setOpponent(e.target.value)}
            >
              {robots
                .filter((robot) => robot.id !== robotId)
                .map((robot) => (
                  <MenuItem value={robot.id}>{robot.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFight} color="primary">
            Fight
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
