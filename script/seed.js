'use strict'

const db = require('../server/db')
const { Event } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const events = await Promise.all([
    Event.create({
      title: 'event1', 
      startYear: 2018,
      startMonth: 6,
      startDay: 22,
      startTime: '00:00',
      endYear: 2018,
      endMonth: 6,
      endDay: 22,
      endTime: '03:00',
      description: 'first event', 
      location: 'NY'
    }),
    Event.create({
      title: 'event2', 
      startYear: 2018,
      startMonth: 6,
      startDay: 22,
      startTime: '10:00',
      endYear: 2018,
      endMonth: 6,
      endDay: 22,
      endTime: '12:00',
      description: 'second event', 
      location: 'NY'
    }),
    Event.create({
      title: 'event3', 
      startYear: 2018,
      startMonth: 6,
      startDay: 23,
      startTime: '12:00',
      endYear: 2018,
      endMonth: 6,
      endDay: 23,
      endTime: '23:00',
      description: 'third event', 
      location: 'NY'
    }),
    Event.create({
      title: 'event4', 
      startYear: 2018,
      startMonth: 7,
      startDay: 10,
      startTime: '06:00',
      endYear: 2018,
      endMonth: 7,
      endDay: 10,
      endTime: '08:00',
      description: 'fourth event', 
      location: 'NY'
    }),
    Event.create({
      title: 'event5', 
      startYear: 2018,
      startMonth: 7,
      startDay: 31,
      startTime: '17:00',
      endYear: 2018,
      endMonth: 7,
      endDay: 31,
      endTime: '21:00',
      description: 'fifth event', 
      location: 'NY'
    }),
    Event.create({
      title: 'event6', 
      startYear: 2018,
      startMonth: 7,
      startDay: 31,
      startTime: '22:00',
      endYear: 2018,
      endMonth: 7,
      endDay: 31,
      endTime: '23:59',
      description: 'sixth event', 
      location: 'NY'
    })
  ])

  console.log(`seeded ${events.length} events, go to June 2018 and July 2018 to see them!`)
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
