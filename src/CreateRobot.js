import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CREATE_MODE } from './constant';
import Robot from './Robot';

export default function CreateRobot() {
  const history = useHistory();

  const handleSubmit = (robot) => {
    fetch('http://localhost:3001/robot', {
      method: 'POST',
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
      <Robot onSubmit={handleSubmit} mode={CREATE_MODE} />
    </Container>
  );
}
