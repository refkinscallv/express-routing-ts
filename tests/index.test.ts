import request from 'supertest'
import express, { Router } from 'express'
import { Routes } from '../src'
import '../example/routes/register'

describe('Express App', () => {
    let app: express.Express

    beforeAll(() => {
        app = express()
        const router = Router()
        Routes.apply(router)
        app.use(router)
    })

    it('should return 200 on GET /', async () => {
        const res = await request(app).get('/directly')
        expect(res.statusCode).toBe(200)
        expect(res.text || res.body).toBeDefined()
    })
})
