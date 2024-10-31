import { getGameSession } from '../../sessions/game.session.js';

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if (!gameSession) {
      console.error('게임 세션이 존재하지 않습니다.');
    }

    console.log(gameSession);

    const user = gameSession.getUser(userId);
    if (!user) {
      console.error('유저가 존재하지 않습니다.');
    }

    user.updatePosition(x, y);

    const locationData = gameSession.getAllLocation(userId);

    socket.write(locationData);
  } catch (err) {
    console.error(err);
  }
};

export default locationUpdateHandler;
