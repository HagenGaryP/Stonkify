'use strict'

const db = require('../server/db');

const {Stock} = require('../server/db/models');

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // await Promise.all([
  //   Stock.create({
  //     ticker: 'TSLA',
  //     company: "Tesla",
  //     price: 850.88,
  //     description: "It's Tesla.. do you really need a description?"
  //   }),
  // ]);
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

module.exports = seed;
