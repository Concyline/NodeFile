
class Options{
    user= ''
    database= ''
    document= ''
    atrib = ''
    value = ''
    obj= {}

    setUser(params){
        this.user = params ? params.toString().concat('/') : 'default/'
    }

    setDatabase(params) {
        this.database = params ? params.concat('/') : 'default/'
    }

    setDocument(params) {
        this.document = params ? params.concat('.json') : 'default.json'
    }
}

module.exports = Options