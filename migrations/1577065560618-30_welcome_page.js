const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/wAVdioDB'

module.exports.up = async function () {
  console.log('Upgrading to 30_welcome_page')

  try {
    const db = await MongoClient.connect(url)
    const dbo = db.db('wAVdioDB')

    const museum = await dbo.collection('museums').findOne({})
    const logo = museum.logo

    await dbo.collection('museums').updateOne({}, {$unset: {'logo': null}})
    await dbo.collection('museums').updateOne({}, {$set: {'contents.$[].logo': null}})
    await dbo.collection('museums').updateOne({}, {$set: {'contents.$[].image': logo}})

    const museumCheck = await dbo.collection('museums').findOne({})

  } catch (error) {
    console.error(error)
  }
}

module.exports.down = async function (next) {
  console.log('Downgrading from 30_welcome_page')
}
