const express = require('express');
const mysql = require('mysql'); // Certifique-se de importar o mysql
const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: '',
    database: 'nodedb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');

    connection.query(`CREATE TABLE IF NOT EXISTS people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        PRIMARY KEY (id)
    )`, (err) => {
        if (err) throw err;
    });
});

// Define seu endpoint
app.get('/', (req, res) => {
    const names = ['Vinicius', 'Maria', 'João']; 
    const insertQueries = names.map(name => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO people (name) VALUES (?)', [name], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });

    Promise.all(insertQueries)
        .then(() => {
            connection.query('SELECT * FROM people', (err, results) => {
                if (err) throw err;
                let response = '<h1>Full Cycle Rocks!</h1><ul>';
                results.forEach(person => {
                    response += `<li>${person.name}</li>`;
                });
                response += '</ul>';
                res.send(response);
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error inserting names');
        });
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});
