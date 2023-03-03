const userModel = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY
// const SECRET_KEY = "SHIVAM@1234"

const signUp = async (req, res) => {

    //Existing User Check
    //Hashed Password
    //Create User
    //Generate Token

    console.log("SignUp Request Body " + JSON.stringify(req.body))

   const {username, email, password}  = req.body
   try {
    
    const isExistingUser = await userModel.findOne({email: email});
    if(isExistingUser){
        return res.status(400).json({
            message : "User Already Exist",
            status : 400
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
        email: email,
        password: hashedPassword,
        username: username
    });

    const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY)

    res.status(200).json({
        user: result,
        token: token,
        status: 200,
    });

   } catch (error) {
        console.log("UserControllers " + error);
        res.status(500).json({
            message: "User Creation Failed. Please try after some time."
        });
   }
};

const signIn = async (req, res) => {

    //Check whether user exist or not
    //Match Password

    //UserName Exist

    try {
        
        const {email, password} = req.body

        const isUserExist = await userModel.findOne({
            email: email
        })

        if(!isUserExist){
            return res.status(400).json({
                message : "User Not Exist",
                status : 400
            })
         }
    
         console.log("User Exist")
         console.log(isUserExist.toString());

         const matchPassword = await bcrypt.compare(password, isUserExist.password);

         if(!matchPassword){
            return res.status(401).json({
                message : "Invalid Credential",
                status : 401
            })
         }

        const token = jwt.sign({email: isUserExist.email, id: isUserExist._id}, SECRET_KEY)

        res.status(200).json({
            user: isUserExist,
            token: token,
            status: 200,
        });


    } catch (error) {
         console.log("UserControllers " + error);
        res.status(500).json({
            message: "User SignIn Failed. Please try after some time."
        });
    }
    
}

module.exports = {signIn, signUp};