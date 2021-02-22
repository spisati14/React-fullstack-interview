import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';

export default function Battles({ robotId }) {
  const [battles, setBattles] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/battles/${robotId}`)
      .then((response) => response.json())
      .then((res) => setBattles(res));
  }, [robotId]);

  return (
    <>
      <h4>Battles</h4>
      <TableContainer component={Paper}>
        <Table aria-label="robots table">
          <TableHead>
            <TableRow>
              <TableCell>Opponent Id</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {battles.map((row) => (
              <TableRow key={row.opponent}>
                <TableCell component="th" scope="row">
                  {row.opponent}
                </TableCell>
                <TableCell>{row.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
