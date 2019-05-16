const app = require('./config/custom-express')();

app.listen(3000, function () {
    console.log('Servidor NodeJS rodando na porta: 3000');
});
