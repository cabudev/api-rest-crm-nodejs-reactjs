const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req,res) => {
    //leer los datos del usuario
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.json({mensaje : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'El usuario no ha podido ser registrado'})
    }
}

exports.autenticarUsuario = async (req, res, next) => {
    //busca el usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if(!usuario) {
        //Si el usuario no existe
        await res.status(401).json({mensaje: 'Ese usuario no existe'});
        next();
    } else {
        //El usuario existe, valida password
        if(!bcrypt.compareSync(password, usuario.password)){
            //Si la contraseña es incorrecta
            await res.status(401).json({mensaje : 'Password Incorrecto'});
            next();
        } else {
            //password correcto, firma token
            const token = jwt.sign(
                {
                    //payload - datps con los que se firman el token
                    email : usuario.email,
                    nombre : usuario.nombre,
                    id : usuario._id
                },
                'LLAVESECRETA',
                {
                    expiresIn : '5h'
                }
            );
        
            //return del token
            res.json({ token });
        }
    }
}