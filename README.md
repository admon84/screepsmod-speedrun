# @admon-dev/screepsmod-speedrun

## Screeps mod to configure the server for a speedrun.

[![License](https://img.shields.io/npm/l/@admon-dev/screepsmod-speedrun.svg)](https://npmjs.com/package/@admon-dev/screepsmod-speedrun)
[![Version](https://img.shields.io/npm/v/@admon-dev/screepsmod-speedrun.svg)](https://npmjs.com/package/@admon-dev/screepsmod-speedrun)

## Features

- Disables NPC strongholds and invaders (cronjobs).
- Removes NPC bots when the world is wiped/reset with system.resetAllData().

## Installation

### Mods Config

For unofficial launchers like [Screepers/screeps-launcher](https://github.com/screepers/screeps-launcher) and [Jomik/screeps-server](https://github.com/Jomik/screeps-server), surround the mod in quotes and add it to the `mods` section of the config yaml:

```yml
mods:
- '@admon-dev/screepsmod-speedrun'
```

### Manual Install

1. `npm install @admon-dev/screepsmod-speedrun` in your mods folder.
2. That's it!
