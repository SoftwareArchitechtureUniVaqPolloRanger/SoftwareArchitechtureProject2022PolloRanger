import express from 'express';
import { login, signup } from './auth'
 

const app = express();

app.listen(5174, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on 5174");
});

app.post('/login', login);
app.post('/signup', signup);

