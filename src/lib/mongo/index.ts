import * as Mongo from 'mongodb'
import * as Config from '@lib/config'

export const Collections: {
    Tickets?: Mongo.Collection,
    Bans?: Mongo.Collection,
} = {}

export async function connect() {

    console.log('Mongo Database Connecting')

    const client: Mongo.MongoClient = new Mongo.MongoClient(Config.default.discord.mongourl)
    await client.connect()

    const db: Mongo.Db = client.db('BTF')

    const Tickets: Mongo.Collection = db.collection('tickets')
    const Bans: Mongo.Collection = db.collection('bans')

    Collections.Tickets = Tickets
    Collections.Bans = Bans

    console.log(`Successfully connected to database: ${db.databaseName}`)
}