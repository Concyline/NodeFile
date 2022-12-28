const fs = require('fs')

var db = []

module.exports = {

    post(obj){
        
        db = this.read()
        db.push(obj)

        return fs.writeFileSync('./content.json', JSON.stringify(db), {encoding:'utf-8'})
    },
    put(obj){
        
        db = this.read()

        const subArray = db.filter( (value, idx) => {
            return value.id != obj.id
        })

        subArray.push(obj)

        return fs.writeFileSync('./content.json', JSON.stringify(subArray), {encoding:'utf-8'})

    },
    delete(obj){
        
        db = this.read()

        const subArray = db.filter( (value, idx) => {
            return value.id != obj.id
        })

        return fs.writeFileSync('./content.json', JSON.stringify(subArray), {encoding:'utf-8'})

    },
    deleteAll(){
        db = []
        return fs.writeFileSync('./content.json', JSON.stringify(db), {encoding:'utf-8'})
    },
    find(atrib, value){

        db = this.read()
    
        return db.filter( (object) => {
            return object[atrib] == value;
        })
        
        return {}
    },
    read(){
        try{
            return JSON.parse(fs.readFileSync('./content.json', {encoding:'utf-8'}))
        }catch(e){
            console.log(e)
            return []
        }
    }
}