const INVADER_ID = '2';

module.exports = function engine(config) {
  if (config.engine) {
    config.engine.on('processRoom', function (roomId, roomInfo, roomObjects, roomTerrain, gameTime, objectsUpdate, usersUpdate, eventLog) {
      if (!roomObjects) return;
      for (const object of Object.values(roomObjects)) {
        if (object.user == INVADER_ID) {
          console.log(`Removing invader ${object.type} (${object._id}) from ${roomId} at ${gameTime}.`);
          objectsUpdate.remove(object._id);
        }
      }
    });
  }
};
