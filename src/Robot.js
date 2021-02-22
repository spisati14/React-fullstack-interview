import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { CREATE_MODE, VIEW_MODE } from './constant';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default function Robot({
  attack = true,
  defense = false,
  name = '',
  color = '',
  battles,
  health,
  onSubmit,
  mode,
}) {
  const classes = useStyles();
  const [robot, setRobot] = useState({ attack, defense, name, color, battles,health });

  useEffect(() => {
    setRobot({ attack, defense, name, color, battles,health  });
  }, [attack, defense, name, color, battles,health ]);

  const handleChange = (e) => {
    setRobot({ ...robot, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form noValidate className={classes.root} autoComplete="off">
        <TextField
          label="Robot name"
          name="name"
          variant="outlined"
          value={robot.name}
          onChange={handleChange}
          disabled={mode != CREATE_MODE}
        ></TextField>
        <TextField
          label="Robot color"
          variant="outlined"
          name="color"
          value={robot.color}
          onChange={handleChange}
          disabled={mode === VIEW_MODE}
        ></TextField>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="attack-select-outlined-label">Attack</InputLabel>
          <Select
            labelId="attack-select-outlined-label"
            value={robot.attack}
            name="attack"
            onChange={handleChange}
            disabled={mode === VIEW_MODE}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Defense</InputLabel>
          <Select
            disabled={mode === VIEW_MODE}
            name="defense"
            value={robot.defense}
            onChange={handleChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        {mode != VIEW_MODE && (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => onSubmit(robot)}
          >
            Save
          </Button>
        )}
      </form>
    </>
  );
}
