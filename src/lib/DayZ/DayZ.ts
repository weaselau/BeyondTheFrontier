import GameDig from "gamedig"

export default async function DayZ(){
    const Query = await GameDig.query({ type: 'dayz', host: '127.0.0.1', port: 2304 }).catch(() => null) as GameDig.QueryResult

    console.log(Query)
}