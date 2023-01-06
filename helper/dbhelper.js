const fs = require('fs');
const { resolve } = require('path');

var db = [];

const read = options => {
    return new Promise((resolve, reject) => {
        try {
            let dir = './databases/'.concat(options.user).concat(options.database);
            let file = dir.concat(options.document)

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            if (!fs.existsSync(file)) {
                fs.writeFileSync(file,'','utf-8')
            }

            const buffer = fs.readFileSync(dir.concat(options.document), 'utf-8');
            
            const array = buffer.split(/\r?\n/);

            var result = [];

            array.map(line => {
                if (line) {
                    result.push(JSON.parse(line));
                }
            });

            resolve(result);
        } catch (e) {
            return reject(e);
        }
    });
};

const post = async options => {
    return new Promise(async (resolve, reject) => {
        try {
            let obj = options.obj;

            if(obj._id == undefined){
                obj._id = Date.now();
            }

            obj._createdAt = new Date();
            obj._updatedAt = new Date();

            if ((await saveStorage(options, obj)) == -1) {
                reject('Falha ao gravar');
            }

            resolve(obj);
        } catch (e) {
            reject(e);
        }
    });
};

const put = options => {
    return new Promise(async (resolve, reject) => {
        try {
            let obj = options.obj;

            let dir = './databases/'.concat(options.user).concat(options.database);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const buffer = fs.readFileSync(dir.concat(options.document), 'utf-8');
            const array = buffer.split(/\r?\n/);

            let achado;

            for (line of array) {
                if (JSON.parse(line)._id == obj._id) {
                    achado = line;
                    break;
                }
            }

            obj._updatedAt = new Date();

            const result = buffer.replace(achado, JSON.stringify(obj));

            fs.writeFileSync(dir.concat(options.document), result, 'utf8');

            resolve(obj);
        } catch (e) {
            reject(e);
        }
    });
};

const delet = options => {
    return new Promise(async (resolve, reject) => {
        try {
            let obj = options.obj;

            let dir = './databases/'.concat(options.user).concat(options.database);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const buffer = fs.readFileSync(dir.concat(options.document), 'utf-8');
            const array = buffer.split(/\r?\n/);

            let achado;

            for (line of array) {
                if (JSON.parse(line)._id == obj._id) {
                    achado = line;
                    break;
                }
            }

            const result = buffer.replace(achado, '');

            fs.writeFileSync(dir.concat(options.document), result, 'utf8');

            resolve('Success');
        } catch (e) {
            reject(e);
        }
    });
};

const find = options => {
    return new Promise(async (resolve, reject) => {
        try {
            db = await read(options);

            resolve(
                db.filter(object => {
                    return object[options.atrib] == options.value;
                })
            );
        } catch (e) {
            reject(e);
        }
    });
};

const deleteAll = options => {
    return new Promise(async (resolve, reject) => {
        try {
            let dir = './databases/'.concat(options.user).concat(options.database);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(dir.concat(options.document), '', 'utf8');

            resolve('Success');
        } catch (e) {
            reject(e);
        }
    });
};

const findAllData = () => {

    return new Promise( (resolve, reject) => {

        try{

            let dir = './databases/'

            if(!fs.existsSync(dir)){
                reject('Databases not found')
            }

            fs.readdir(dir, (err, files) => {

                if (err){
                    reject(err)
                }
                  
                resolve(files)
              })

        }catch(e){
            reject(e)
        }

    })
}

const findAllDatabases = options => {

    return new Promise( (resolve, reject) => {

        try{

            let dir = './databases/'.concat(options.user)

            if(!fs.existsSync(dir)){
                reject('Databases not found')
            }

            fs.readdir(dir, (err, files) => {

                if (err){
                    reject(err)
                }
                  
                resolve(files)
              })

        }catch(e){
            reject(e)
        }

    })
}

const findAllDocuments = options => {

    return new Promise( (resolve, reject) => {

        try{

            let dir = './databases/'.concat(options.user).concat(options.database)

            console.log(dir)

            if(!fs.existsSync(dir)){
                reject('Document not found')
            }

            fs.readdir(dir, (err, files) => {

                if (err){
                    reject(err)
                }
                  
                resolve(files)
              })

        }catch(e){
            reject(e)
        }

    })

}

async function saveStorage(options, obj) {
    const dir = './databases/'.concat(options.user).concat(options.database);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.appendFileSync(dir.concat(options.document), JSON.stringify(obj).concat('\n'), { encoding: 'utf-8' }, e => {
        if (e) {
            return -1;
        }

        return 1;
    });
}

module.exports = { read, post, put, delet, find, deleteAll, findAllDatabases, findAllDocuments, findAllData };
