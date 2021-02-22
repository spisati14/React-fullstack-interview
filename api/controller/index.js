var { v4 } = require('uuid');

let robots = [];

const isRobotValid = ({ name, color, attack, defense }) => {
  return name && color && attack != null && defense != null;
};

const getRobotById = (id) => robots.find((robot) => robot.id === id);

const deletRobot = (id) => {
  robots = robots.filter((robot) => robot.id !== id);
};

const createRobot = (robot) => {
  // adding random value for health, which will be used in battles
  const newRobot = {
    ...robot,
    id: v4(),
    health: Math.random() * 100,
    battles: [],
  };
  robots = [...robots, newRobot];
  return newRobot;
};

const updateRobot = (id, robot) => {
  const updatedRobot = { ...robot, id: id };
  robots = robots.map((obj) => {
    if (obj.id === id) {
      return updatedRobot;
    }
    return obj;
  });
  return updatedRobot;
};

const updateBattles = (robotId, battle) => {
  robots = robots.map((robot) => {
    if (robot.id === robotId) {
      return { ...robot, battles: [...robot.battles, battle] };
    }
    return robot;
  });
};

const fightBattle = (robot, opponent) => {
  return robot.health > opponent.health;
};

const getRobots = () => robots;

const getBattlesByRobotId = (robotId) => {
  const robot = getRobotById(robotId);
  return robot.battles;
};

module.exports = {
  isRobotValid: isRobotValid,
  getRobotById: getRobotById,
  updateRobot: updateRobot,
  createRobot: createRobot,
  deletRobot: deletRobot,
  updateBattles: updateBattles,
  fightBattle: fightBattle,
  getRobots: getRobots,
  getBattlesByRobotId: getBattlesByRobotId,
};
