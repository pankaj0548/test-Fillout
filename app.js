const express = require('express');
require('dotenv').config();

const routes = require('./routes/fillout.routes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/', routes);

app.listen(port, (error) => {
    if(!error) 
        console.log(`Server is listening on port ${port}`);
    else 
        console.log('Error: ', error);
    
});