import * as dotenv from "dotenv"
import next from "next"
import express from "express"
import WebSocket from "ws"
import cors from 'cors'
import axios from 'axios'
import cookieParser from 'cookie-parser'

dotenv.config()


if(!process.env.PORT){
    console.log('No PORT Found...');
    process.exit(1)
}

const PORT = process.env.PORT || 3303

const dev = process.env.NODE_ENV !== "production"


const app = next({ dev })

const handle = app.getRequestHandler()

const AUTH_ADMIN_TYPE = "authenticated"

const AUTH_USER_TYPE = "authenticated"

const COOKIE_SECRET = "MMjjKKyyUUkkmmnnKK"

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !dev,
    signed: true
}


const authenticateAdmin = async (email, password) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/admins/loginadmin', {
            email,
            hashedPassword: password,
        });

        const foundUser = response.data;
        console.log('foundUser', foundUser)

        if (!foundUser) {
            return null; // Or handle the case where no user is found
        }

        return foundUser;

    } catch (error) {
        console.error('Error during authentication:', error);
        return null; // Or handle the error case
    }
};
const authenticateUser = async (email, password) => {

    console.log('email', email)
    console.log('password', password)

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/admins/loginadmin', {
            email,
            hashedPassword: password,
        });

        const foundUser = response.data;
        console.log('foundUser', foundUser)

        if (!foundUser) {
            return null; // Or handle the case where no user is found
        }

        return foundUser;

    } catch (error) {
        console.error('Error during authentication:', error);
        return null; // Or handle the error case
    }
};




app.prepare().then(() => {

    const expressApp = express()
    expressApp.use(express.json());
    expressApp.use(cookieParser(COOKIE_SECRET));
    //expressApp.use(cors());

    

    expressApp.post('/api/adminlogin', async (req, res) => {
        // Handle your registration logic here
        const {email, hashedPassword} = req.body;

        
        // res.json({
        //     email,
        //     hashedPassword,
        //     success: true,
        // })

        const user = await authenticateAdmin(email, hashedPassword)

        if(!user){
            return res.status(403).send("Invalid email or password")
        }

        const userData = {
            firstName: user.firstName,
            lastname: user.lastName,
            email: user.email,
            type: AUTH_ADMIN_TYPE
        }

        console.log('userData Before Admin cookie', userData);

        // we now wanna save as a cookie
        res.cookie('admintoken', userData, COOKIE_OPTIONS)

        // we now wanna return the data to the client
        res.json(userData)

        

        

    });

    expressApp.post('/api/userlogin', async (req, res) => {
        // Handle your registration logic here
        const {email, hashedPassword} = req.body;

        
        // res.json({
        //     email,
        //     hashedPassword,
        //     success: true,
        // })

        const user = await authenticateUser(email, hashedPassword)
        
        console.log('user authenticateUser', user)

        if(!user){
            return res.status(403).send("Invalid email or password")
        }

        const userData = {
            firstName: user.firstName,
            lastname: user.lastName,
            email: user.email,
            type: AUTH_USER_TYPE
        }

        console.log('userData Before User cookie', userData);
        
        // we now wanna save as a cookie
        res.cookie('usertoken', userData, COOKIE_OPTIONS)

        // we now wanna return the data to the client
        res.json(userData)

        

        

    });
    
    expressApp.get('/api/userProfile', async (req, res) => {
       
        const { signedCookies = {} } = req
        const { usertoken } = signedCookies

        console.log('`${process.env.NEXT_PUBLIC_API_URL}/${usertoken.email}`',  `${process.env.NEXT_PUBLIC_API_URL}/${usertoken.email}`)
        
        if(usertoken && usertoken.email){
            const url =  process.env.NEXT_PUBLIC_API_URL+'/api/users/email/'+usertoken.email
            
            const response = await axios.get(url)

            const userProfile = response.data

            //console.log('found userProfile', userProfile)

            return res.json({ user: userProfile})
        }


        return sendStatus(404)
    });
    
    expressApp.get('/api/adminProfile', async (req, res) => {
        
        const { signedCookies = {} } = req
        const { admintoken } = signedCookies

        if(admintoken && admintoken.email){
            const url =  process.env.NEXT_PUBLIC_API_URL+'/api/admins/email/'+admintoken.email
            
            const response = await axios.get(url)

            const adminProfile = response.data

            //console.log('found adminProfile', adminProfile)

            return res.json({ user: adminProfile})
        }


        return sendStatus(404)
    });

    expressApp.get('*', (req, res) => {
        return handle(req, res)
    })

    expressApp.listen(PORT, () => {
        
        console.log(`PORT Listening on http://localhost:${PORT}`);
    });

    //const wss = new WebSocket.Server({ server })
    

})