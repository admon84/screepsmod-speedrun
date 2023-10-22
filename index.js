const utils = require.main.require('@screeps/backend/lib/utils.js')

module.exports = (config) => {
  // Remove bots on server init
  if (config.engine) {
    config.engine.on('init', async type => {
      if (type === 'main') {
        const { db, env } = config.common.storage;
        const bots = await db.users.find({ bot: 'simplebot' });
        for (const { _id, rooms, username } of bots) {
          console.log(`Removing bot ${username} from ${rooms[0]}.`);
          await utils.respawnUser(_id);
          await db.users.removeWhere({ _id });
          await db['users.code'].removeWhere({ user: _id });
          await env.del(env.keys.MEMORY + _id);
          await env.del(env.keys.MEMORY_SEGMENTS + _id);
        }
      }
    });
  }

  // Remove cronjobs
  if (config.cronjobs) {
    console.log(`Removing stronghold and invader cronjobs.`);
    delete config.cronjobs.genInvaders;
    delete config.cronjobs.genStrongholds;
    delete config.cronjobs.expandStrongholds;
  }
};
