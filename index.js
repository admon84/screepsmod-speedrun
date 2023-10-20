const INVADER_ID = '2';

module.exports = function engine(config) {
  if (config.engine) {
    config.engine.on('processObject', function(object, roomObjects, roomTerrain, gameTime, roomInfo, objectsUpdate, usersUpdate) {
      if(object.type == 'invaderCore' || (object.type == 'creep' && object.user == INVADER_ID)) {
        object._skip = true;
      }
    });
  }
};