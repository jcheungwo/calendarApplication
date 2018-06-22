'use strict'

const db = require('../server/db')
const { Event } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const events = await Promise.all([
    Event.create({title: 'event1', timeStart: '2018-07-22T00:00', timeEnd: '2018-07-22T01:00', description: 'description', location: 'NY'}),
    Event.create({title: 'event2', timeStart: '2018-07-22T12:00', timeEnd: '2018-07-23T03:00', description: 'description', location: 'NY'})
  ])

  console.log(`seeded ${events.length} events`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
