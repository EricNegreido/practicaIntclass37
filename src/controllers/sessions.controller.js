import { UserDto } from "../DTOs/dto.js";
import { generateToken } from "../utils.js";


//LOGIN
const authLogin =  async (req, res) => {
    
    if(!req.user)
        return res.status(401).send({status: 'error', message: 'incorrect credentials'});

    const user = new UserDto(req.user);
    req.session.user = user;
    req.logger.info("successfully auth user");
    res.send({status: 'success', message: 'login success'});
};

const failLogin = async (req, res) => {
    req.logger.error("error authenticating user");
    res.status(500).send({status: 'error', message:'login fail'})
 };


const logout = (req, res) =>{
    req.session.destroy(error => {
        if(error) return res.status(500).send({status:'error', error});
        res.redirect('/');
    })
};


//GIT HUB AUTH
const githubAuth = async(req, res) =>{
    req.logger.info("successfully auth user form GitHub");
    res.send({status: 'success', message: 'user registered'});
};
const githubLogin = async(req, res) =>{
    const user = new UserDto(req.user);
    req.session.user = user;
    res.redirect('/');
};

const users = [
    {
        first_name: 'prueba',
        email: 'prueba@ok',
        password: '123'
    }
];

//REGISTER
const register = async (req, res) => {
    // req.logger.info("successfully registered user ");
    // res.send({ status: 'success', message:' user registered'})

    try {
        const {first_name, email, password} = req.body;

         //OBTENGO MIS DATOS DE MI PESISTENCIA CORRESPONDIENTE
        const exist = users.find(user => user.email == email);

        if(exist) {
        res.status(400).send({status: 'error', message:'user already exist'}) 
        }

        const user = {
            first_name,
            email,
            password
        };

        users.push(user);
        console.log('RegisterUsers',users)

        const accesToken = generateToken(user);
        console.log('RegisterToken',accesToken)

        res.send({status: 'success', access_token: accesToken}) 
        
    } catch (error) {
        res.status(500).send({status: 'error', message:'register fail'}) 
    }
};

const login = async(req, res) =>{
    try {

    console.log('loginUsers',users)
    
    const {email, password} = req.body;

    console.log('email', email);
    console.log('password', password);


    const user= users.find(user => user.email === email && user.password === password);

    console.log('user', user)
    if(!user) return res.status(400).send({status: 'error', message: 'invalid credentials'});
    const accesToken = generateToken(user);

    res.cookie('CookieToken', accesToken, { maxAge: 60 * 60 * 1000}).send({status: 'success'}) 

    }catch(error){
        res.status(500).send({status: 'error', message:'register fail'}) 

    }

}
const failRegister =  async (req, res) => {
    req.logger.error("error registering user");

    res.status(500).send({status: 'error', message:'register fail'})
 };


export{
    authLogin,
    logout,
    failLogin,
    githubAuth,
    githubLogin,
    register,
    failRegister,
    login
}

