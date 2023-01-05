const db = require('../helper/dbhelper');
const Options = require('../helper/options');

let options;

module.exports.get = (req, res) => {
    options = new Options();
    options.setUser(req.user._id)
    options.setDatabase(req.params.database);
    options.setDocument(req.params.document);

    db.read(options)
        .then(values => {
            res.status(200).send(values);
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });
};

module.exports.post = (req, res) => {
    options = new Options();
    options.setUser(req.user._id)
    options.setDatabase(req.params.database);
    options.setDocument(req.params.document);
    options.obj = req.body;

    db.post(options)
        .then(value => {
            res.status(200).send(value);
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });
};

module.exports.put = (req, res) => {
    options = new Options();
    options.setUser(req.user._id)
    options.setDatabase(req.params.database);
    options.setDocument(req.params.document);
    options.obj = req.body;

    db.put(options)
        .then(value => {
            res.status(200).send(value);
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });
};

module.exports.delete = (req, res) => {
    options = new Options();
    options.setUser(req.user._id)
    options.setDatabase(req.params.database);
    options.setDocument(req.params.document);
    options.obj = req.body;

    db.delet(options)
        .then(value => {
            res.status(200).send(value);
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });
};

module.exports.find = (req, res) => {
    options = new Options();
    options.setUser(req.user._id)
    options.setDatabase(req.params.database);
    options.setDocument(req.params.document);
    options.atrib = req.params.atrib;
    options.value = req.params.value;

    db.find(options)
        .then(value => {
            res.status(200).send(value);
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });
};

module.exports.deleteAll = (req, res) => {

    options = new Options();
    options.setUser(req.user._id)
    options.setDatabase(req.params.database);
    options.setDocument(req.params.document);

    db.deleteAll(options)
        .then(value => {
            res.status(200).send(value);
        })
        .catch(e => {
            res.status(400).send(`Erro: ${e}`);
        });
};
