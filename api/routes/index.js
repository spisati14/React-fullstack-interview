var express = require('express');
var router = express.Router();
const {
  getRobotById,
  isRobotValid,
  updateRobot,
  createRobot,
  fightBattle,
  updateBattles,
  getRobots,
  deletRobot,
  getBattlesByRobotId,
} = require('../controller');

router.get('/', function (req, res, next) {
  res.send('ok!');
});

router.get('/robots', function (req, res, next) {
  res.send(getRobots());
});

router.get('/robot/:id', function (req, res, next) {
  const robot = getRobotById(req.params.id);
  if (!robot) {
    res.status(404).send('Invalid robot id!');
  }
  res.send(robot);
});

router.post('/robot', function (req, res, next) {
  if (!isRobotValid(req.body)) {
    res.status(400).send('Invalid Robot Object');
  }
  const robot = createRobot(req.body);

  res.send(robot);
});

router.put('/robot/:id', function (req, res, next) {
  const robot = getRobotById(req.params.id);

  if (!robot) {
    res.status(404).send('Invalid robot id!');
  }
  if (!isRobotValid(req.body)) {
    res.status(400).send('Invalid Robot Object');
  }
  const updatedRobot = updateRobot(req.params.id, req.body);

  res.send(updatedRobot);
});

router.delete('/robot/:id', function (req, res, next) {
  const robot = getRobotById(req.params.id);
  if (!robot) {
    res.status(404).send('Invalid robot id!');
  }
  deletRobot(robot.id);

  res.send(robot);
});

router.post('/robot/:id/fight', function (req, res, next) {
  const robot = getRobotById(req.params.id);
  if (!robot) {
    res.status(404).send('Invalid robot id!');
  }
  const opponent = getRobotById(req.body.opponent);
  const robotWon = fightBattle(robot, opponent);

  updateBattles(robot.id, {
    opponent: opponent.id,
    result: robotWon ? 'WON' : 'LOST',
  });

  updateBattles(opponent.id, {
    opponent: robot.id,
    result: !robotWon ? 'WON' : 'LOST',
  });

  res.send(robotWon ? { result: 'WON' } : { result: 'LOST' });
});

router.get('/battles/:id', function (req, res, next) {
  res.send(getBattlesByRobotId(req.params.id));
});

module.exports = router;
