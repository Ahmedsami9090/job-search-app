import connection from "./db/connectionDb.js"
import dotenv from 'dotenv'
import authRouter from "./modules/auth/auth.controller.js"
import cors from 'cors'
import cron from 'node-cron'
import {deleteExpiredOtps} from "./utils/index.js"
import userRouter from './modules/users/user.controller.js';
import companyRouter from "./modules/company/company.controller.js"
import jobRouter from "./modules/job/job.controller.js"
import { createHandler } from 'graphql-http/lib/use/express';
import schema from "./modules/admin/schema.js"
dotenv.config()

const bootstrap = async (app, express, server)=>{
    await connection()
    app.use(cors({
        origin : "*"
    }))
    cron.schedule('0 */6 * * *', () => {
        console.log('Running OTP cleanup job...');
        deleteExpiredOtps();
    })
    app.use(express.json())
    app.get('/', (req,res,next)=>{
        res.send({message : 'Welcome to Job search app.'})
    })
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/company', companyRouter)
    app.use('/jobs', jobRouter)
    app.all('/admin', createHandler({schema : schema}))
    app.use('*', (req,res,next)=>{
        next(new Error('path not found', {cause : 404}))
    })
    app.use((err,req,res,next)=>{
        return res.status(err['cause'] || 500).json({
            message : 'Server Error',
            error : err.message,
            stack : process.env.MODE === 'DEV' ? err.stack : ''
        })
    })
}
export default bootstrap