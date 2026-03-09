import dotenv from 'dotenv'

const NODE_ENV = process.env.NODE_ENV || "development"
const PORT = process.env.PORT || 8000
const ALLOWED_ORIGINS = ['http://localhost:3000', process.env.FRONTEND_URL]

export {
    NODE_ENV,
    PORT,
    ALLOWED_ORIGINS
}