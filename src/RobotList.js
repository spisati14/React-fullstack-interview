import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FightModal from './FightModal';

export default function RobotList() {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/robots')
      .then((res) => res.json())
      .then((response) => {
        setRobots(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (robot) => {
    fetch(`http://localhost:3001/robot/${robot.id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((response) => {
        setRobots(robots.filter((r) => r.id !== response.id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table aria-label="robots table">
          <TableHead>
            <TableRow>
              <TableCell>Robot name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell align="right">Attack</TableCell>
              <TableCell align="right">Defense</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {robots.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell align="right">{row.attack ? 'yes' : 'no'}</TableCell>
                <TableCell align="right">
                  {row.defense ? 'yes' : 'no'}
                </TableCell>
                <TableCell align="right">
                  <Link to={`/view/${row.id}`}>
                    <Button>View</Button>
                  </Link>
                  <Link to={`/update/${row.id}`}>
                    <Button>Modify</Button>
                  </Link>
                  <FightModal robots={robots} robotId={row.id} />
                  <Button color="secondary" onClick={(e) => handleDelete(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
