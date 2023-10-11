const db = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtExpiresIn = '1s'; // Token expiration time

const data = {};

const AuthController = {
    register: async (req, res) => {
        try {
            const connection = await db.getConnection();
            // console.log('req.body',req.body);


            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const passwordMatch = await bcrypt.compare(req.body.password, hashedPassword);


            const [result] = await db.execute('INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, now())', [
                req.body.username, req.body.email, hashedPassword
            ]);
            // const [rows] = await connection.execute('SELECT * FROM users');

            connection.release();

            data.user_id = result.insertId 
            data.passwordMatch = passwordMatch;

            res.status(200).json({
                success: true,
                data: data,
                message: 'Register successfully'
            });

        } catch (error) {
            console.log('error', error)
            res.status(500).json({ 
                success: false,
                error: error,
                message: 'Error in server' 
            });
        }
    },

    login: async (req, res) => {
        try {
            const connection = await db.getConnection();
            var user;
            // Logic to fetch user by username from the database

            if ( req.body.username) {
                user = await db.execute('SELECT * FROM users WHERE username = ?', [req.body.username]);
    
                if (user.length === 0) {
                    return res.status(404).json({ 
                        success: false,
                        message: `User with username ${req.body.username} not found` 
                    });
                }

                user = user[0];

                console.log('user[0]', user[0])
            } else {
                user = await db.execute('SELECT * FROM users WHERE email = ?', [req.body.email]);
    
                if (user.length === 0) {
                    return res.status(404).json({ 
                        success: false,
                        message: `User with email ${req.body.email} not found` 
                    });
                }

                console.log('user[0]', user[0])
                user = user[0];

            }


            // Check if the password matches
            const isPasswordMatch = await bcrypt.compare(req.body.password, user[0].password);

            if (!isPasswordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Create a JWT token
            data.token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: jwtExpiresIn });


            connection.release();
            // Return the token in the response
            res.status(200).json({
                success: true,
                data: data,
                message: 'successfully'
            });
        } catch (error) {
            console.log('error', error)
            res.status(500).json({ 
                success: false,
                error: error.message,
                message: 'Error in server' 
            });
        }
    },
    
    
};

module.exports = AuthController;
