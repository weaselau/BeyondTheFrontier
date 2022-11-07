//? Dependencies

import fs from "fs"



//? Interface

interface Model {
    discord: {
        id: string
        token: string
    }
    guild: string
}



//? Module

const Config: Model = JSON.parse(fs.readFileSync("./config.json", "utf8"))

export default Config