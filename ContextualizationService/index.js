const express = require('express');

const app = express();

const port = 3001;

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})


app.listen(port, () => {
    `Server running on port ${port}`
})


