
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



const generateRandomPassword = () => {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[{]}|;:,<.>/?';

    const allChars = uppercaseLetters + lowercaseLetters + numbers + specialChars;

    let password = '';
    password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length)); // At least 1 uppercase letter
    password += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length)); // At least 1 lowercase letter
    password += numbers.charAt(Math.floor(Math.random() * numbers.length)); // At least 1 number
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length)); // At least 1 special character

    for (let i = 0; i < 4; i++) { // Remaining 4 characters can be any from the combined set
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle the characters in the password to make it more random
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
};



export const googleOAuth = async (req, res, next) => {
    const { name, email, photo } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const { password, ...userWithoutPassword } = user._doc;

            console.log(user);

            res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }) // 1 hour
                .status(200)
                .json({ message: "User logged in successfully", success: true, data: userWithoutPassword });
        }
        else {
            const generatedPassword = generateRandomPassword();

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUserName = name.split(' ').join('').toLowerCase();
            let generatedUserName = newUserName;

            while (await User.findOne({ username: generatedUserName })) {
                generatedUserName = newUserName + Math.floor(Math.random() * 100);
            }


            const newUser = new User({ username: generatedUserName, email, password: hashedPassword, profilePicture: photo });

            await newUser.save();

            console.log(newUser);


            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            const { password, ...userWithoutPassword } = newUser._doc;

            res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }) // 1 hour
                .status(201)
                .json({ message: "User logged in successfully", success: true, data: userWithoutPassword });

        }

    } catch (error) {
        next(error);
    }
};
