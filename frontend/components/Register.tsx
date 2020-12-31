import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

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
                     <input type="submit" value="Submit" />
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
