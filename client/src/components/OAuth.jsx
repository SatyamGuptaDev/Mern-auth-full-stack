// OAuth.jsx
// code starts for google authentication here


import React from 'react';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { app } from '../firebase.js';
import {useDispatch} from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'

function OAuth() {

    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        
        try {
            dispatch(signInStart());
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();

            dispatch(signInSuccess(data));

        } catch (err) {
            console.log(err);
            dispatch(signInFailure(err));
        }
    }

    

    return (
        <>
            <button type='button' onClick={handleGoogleClick} className="w-80 bg-red-600 text-white rounded-lg p-3 uppercase opacity-90 hover:opacity-100">
                Continue with Google
            </button>
        </>
    );
}

export default OAuth;

