import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import registerRouter from './router/authentication';
// import router from './router';
const app=express();

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use('/api', registerRouter);  // No need to wrap it in a function, directly attach it

server.listen(8080,()=>{
    console.log('Server running on http://localhost:8080/');
});

const MONGO_URL='mongodb+srv://venkateshknr01:venkat@demoment-cluster.zr6mw.mongodb.net/menttest?retryWrites=true&w=majority&appName=DemoMENT-Cluster'

mongoose.Promise=Promise;
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();
mongoose.connection.on('error',(error:Error)=>{
    console.log(error);
});

app.use('/',(req,res,next)=>{
    res.send('Hello venkat')
    next();
});
// app.use('/',router());