import axios from 'axios'
import * as child from 'child_process'

export default class PostUpService {

    #instance = null

    constructor() {
        const ip = '127.0.0.1'
        const port = '8000'
        this.#instance = axios.create({
            baseURL: `http://${ip}:${port}`,
            timeout: 30000,
            headers: {'Content-Type': 'application/json'}
        })
    }

    async postUp() {
        logger.debug('postUp] strart')
        // const res = await this.#instance.request({
        //     method: 'get',
        //     url: '/btt'
        // })
        //
        // logger.debug('status:' + res.status+ ' ' + res.statusText)
        // console.dir(res.data)

        const res = await this.spawnChild()

        logger.debug(res)
        logger.debug('postUp] end 2ssddsa1' )

    }

    async spawnChild() {
        const {spawn} = require('child_process')
        const child = spawn('python3', ['yo3.py'])

        let data = ''
        for await (const chunk of child.stdout) {
            data += chunk
        }
        let error = ''
        for await (const chunk of child.stderr) {
            error += chunk
        }
        const exitCode = await new Promise((resolve, reject) => {
            child.on('close', resolve)
        })

        if (exitCode) {
            throw new Error(`subprocess error exit ${exitCode}, ${error}`)
        }
        return data
    }


}
