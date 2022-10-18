//? Dependencies

import Gamedig from 'gamedig'



//? Query Game

export default function (game: 'przomboid' | 'minecraft', host: string, port: number) {
    return new Promise((resolve, reject) => {

        Gamedig.query({
            type: game,
            host: host,
            port: port
        }).then((state) => {
            console.log(state)
            resolve(state)
        }).catch((error) => {
            reject(error)
        })
        
    })
}