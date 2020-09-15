const express = require('express');

const app = express();
const userRoutes = require('./routes/user');



app.use('/api/auth', userRoutes);

app.use('/api/login', (req, res, next) => {
	res.json({ message: 'Votre requete a bien ete recue !' });
});

module.exports = app;
