import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UPDATE_MODE } from './constant';
import Robot from './Robot';

export default function UpdateRobot() {
  const { robotId } = useParams();
  const history = useHistory();
  const [robot, setRobot] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/robot/${robotId}`)
      .then((response) => response.json())
      .then((res) => setRobot(res));
  }, [robotId]);

  const handleSubmit = (robot) => {
    fetch(`http://localhost:3001/robot/${robotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(robot),
    })
      .then((res) => history.push('/'))
      .catch((err) => console.error(err));
  };
  return (
    <Container maxWidth="lg">
      <Robot onSubmit={handleSubmit} {...robot} mode={UPDATE_MODE} />
    </Container>
  );
}
