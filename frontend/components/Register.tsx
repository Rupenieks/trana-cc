import React, { useState } from 'react'
import register from "../services/auth.service"
import AuthService from "../services/auth.service";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    function register(e){
        e.preventDefault();
        AuthService.register(email, password);

    }


    return (
        <div className="register-container">
            <form>
                <div className="label-container">
                    <label>
                    email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                </div>
                <div className="label-container">
                    <label>
                    password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
                <div className="label-container">
                    <label>
                    repeat password:
                    <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    </label>
                </div>
                <div className="label-container">
                     <input type="submit" value="Submit" onClick={register}  />
                </div>
            </form>

            <style jsx>
                {`
                .register-containter {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .label-container {
                    flex: 1;
                }`}
            </style>
        </div>
    )
}
