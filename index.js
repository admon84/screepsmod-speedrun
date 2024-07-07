const utils = require.main.require('@screeps/backend/lib/utils.js')

const MOD_NAME = '[screepsmod-speedrun]'

module.exports = config => {
  if (config.engine) {
    config.engine.on('init', async type => {
      if (type === 'main') {
        await removeBots(config)
      }
    })
  }

  if (config.cronjobs) {
    console.log(`${MOD_NAME} disabling strongholds and invaders`)
    delete config.cronjobs.genInvaders
    delete config.cronjobs.genStrongholds
    delete config.cronjobs.expandStrongholds
  }
}

async function removeBots(config) {
  const { db, env } = config.common.storage

  if (!db) {
    console.log(`${MOD_NAME} no database found, skipping`)
    return
  }

  if (!db.users) {
    console.log(`${MOD_NAME} no users collection found, skipping`)
    return
  }

  // Target NPC bots for removal
  const bots = await db.users.find({ bot: { $exists: true } })

  for (const { _id, username } of bots) {
    console.log(`${MOD_NAME} removing bot "${username}"`)
    // Respawn the bot user (removes creeps, structures, construction sites, etc.)
    await utils.respawnUser(_id)
    // Remove the bot user from the database
    await db.users.removeWhere({ _id })
    await db['users.code'].removeWhere({ user: _id })
    await env.del(env.keys.MEMORY + _id)
    await env.del(env.keys.MEMORY_SEGMENTS + _id)
  }
}
