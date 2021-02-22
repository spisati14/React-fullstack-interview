import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Battles from './Battles';
import { VIEW_MODE } from './constant';
import Robot from './Robot';

export default function ViewRobot() {
  const { robotId } = useParams();
  const [robot, setRobot] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/robot/${robotId}`)
      .then((response) => response.json())
      .then((res) => setRobot(res));
  }, [robotId]);

  return (
    <Container maxWidth="lg">
      <Robot {...robot} mode={VIEW_MODE} />
      <Battles robotId={robotId} />
    </Container>
  );
}
