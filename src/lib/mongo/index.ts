import * as Mongo from 'mongodb'
import * as Config from '@lib/config'

export const Collections: {
    Tickets?: Mongo.Collection,
} = {}

export async function connect() {

    console.log('Mongo Database Connecting')

    const client: Mongo.MongoClient = new Mongo.MongoClient(Config.default.discord.mongourl)
    await client.connect()

    const db: Mongo.Db = client.db('BTF')

    const Tickets: Mongo.Collection = db.collection('tickets')

    Collections.Tickets = Tickets

    console.log(`Successfully connected to database: ${db.databaseName}`)
}