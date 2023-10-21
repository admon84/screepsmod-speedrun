const utils = require.main.require('@screeps/backend/lib/utils.js')

const INVADER_ID = '2';

module.exports = (config) => {
  if (config.engine) {
    // Remove bots
    config.engine.on('init', async type => {
      if (type === 'main') {
        const { db, env } = config.common.storage;
        const bots = await db.users.find({ bot: 'simplebot' });
        for (const { _id, rooms, username } of bots) {
          console.log(`Removing bot ${username} from ${rooms[0]}.`);
          await utils.respawnUser(_id);
          await db.users.removeWhere({ _id: _id });
          await db['users.code'].removeWhere({ user: _id });
          await env.del(env.keys.MEMORY + _id);
          await env.del(env.keys.MEMORY_SEGMENTS + _id);
        }
      }
    });

    // Remove invaders
    config.engine.on('processRoom', (roomId, roomInfo, roomObjects, roomTerrain, gameTime, objectsUpdate, usersUpdate, eventLog) => {
      if (!roomObjects) return;
      for (const object of Object.values(roomObjects)) {
        if (object.user === INVADER_ID) {
          console.log(`Removing invader ${object.type} (${object._id}) from ${roomId} at ${gameTime}.`);
          objectsUpdate.remove(object._id);
        }
      }
    });
  }
};
