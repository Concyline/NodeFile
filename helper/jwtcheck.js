const jwt = require('jsonwebtoken')

module.exports = {


    jwtcheck: function(req, res, next){

        const auth = req.headers.authorization

        if(!auth){
            res.status(401).json({
                status:401,
                message:"Token não encontrado em authorization"
            })
        }

        const [bearer, token] = auth.split(' ')

        jwt.verify(token, process.env.JWT_SECRET, (er, decoded) => {

            if(er){
                return res.status(401).json(
                    {
                        status: 401,
                        message:"Token invalido",
                        er,
                        token
                    }
                )
            }

            req.user = decoded

            next()

        })

    }

}