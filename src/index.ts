import {app} from "./app";
import {runDb} from "./db-mongo";

const port = process.env.port || 3000

const startApp = async ()=>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
