import axios from 'axios'

export default class PostUpService {

    #instance = null

    constructor() {
        this.#instance = axios.create({
            baseURL: 'http://172.30.1.42:8000',
            timeout: 5000,
            headers: {'Content-Type': 'application/json'}
        })
    }

    async postUp() {
        logger.debug('postUp] strart')
        const res = await this.#instance.request({
            method: 'get',
            url: '/btt'
        })

        logger.debug('status:' + res.status + ' ' + res.statusMessage)
        console.dir(res.data)

    }
}
