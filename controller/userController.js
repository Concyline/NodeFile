const bcrypt = require('bcryptjs');
const dbhelper = require('../helper/dbhelper');
const Options = require('../helper/options');
const jwt = require('jsonwebtoken');
const moment = require('moment');

let options = new Options();
options.setDatabase('__security');
options.setDocument('users');

module.exports.post = (req, res) => {
    let newUser = req.body;

    options.atrib = 'email';
    options.value = newUser.email;

    dbhelper
        .find(options)
        .then(value => {
            if (value.length > 0) {
                return res.status(400).send('Usuário já cadastrado');
            }

            bcrypt.genSalt(10, (er, salt) => {
                bcrypt.hash(newUser.password, salt, (erro, hash) => {
                    newUser.password = hash;
                    options.obj = newUser;

                    dbhelper
                        .post(options)
                        .then(value => {
                            res.status(200).send(value);
                        })
                        .catch(e => {
                            res.status(400).send(`Erro: ${e}`);
                        });
                });
            });
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });

    /*
   
    */
};

module.exports.login = (req, res) => {
    options.atrib = 'email';
    options.value = req.body.email;

    dbhelper
        .find(options)
        .then(array => {
            let user = array[0];

            if (!user) {
                return res.status(401).json({
                    status: 401,
                    message: 'Usuario não encontrado',
                    token: '',
                });
            }

            bcrypt.compare(req.body.password, user.password, (er, isOk) => {
                if (!isOk) {
                    return res.status(401).json({
                        status: 401,
                        message: 'Senha incorreta',
                        token: '',
                    });
                }

                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

                const { iat, exp } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

                return res.status(200).json({
                    status: 200,
                    created: moment(parseInt(iat * 1000)),
                    expiration: moment(parseInt(exp * 1000)),
                    message: 'Login realizado com sucesso',
                    token,
                });
            });
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });
};
