
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email ,password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword});

    try{
        await newUser.save()

        res.status(201).json({message: "User  Created Successfully", success: true, data: newUser});
    }
    catch (error){
        next(error);
    }
};




export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(errorHandler(401, "User not found"));
        }

        const isPasswordValid = bcryptjs.compareSync(password, user.password);

        if (!isPasswordValid) {
            return next(errorHandler(401, "Wrong Credentials"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const { password: userPassword, ...userWithoutPassword } = user._doc;

        // Set the cookie and send response in one call
        res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }) // 1 hour
            .status(200)
            .json({ message: "User logged in successfully", success: true, data: userWithoutPassword });

            
    } catch (error) {
        next(error);
    }
};