import { useRouter } from 'next/router';
import React, { useState } from 'react'
import authService from '../services/auth.service';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function login(e){
        e.preventDefault();
		if (authService.login(email, password)) {
			setTimeout(routeToNotes, 1500)
        }
	}
	
	function routeToNotes() {
		// Delayed routing due to delay in making localstorage item
		router.push('/notes');
	}

    return (
        <div className="login-container">
            <form>
                <div id="label-container">
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
                     <input type="submit" value="Submit" onClick={login} />
                </div>
            </form>

            <style jsx>
                {`
                    .login-containter {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }

                    .label-container {
                        flex: 1;
						height: 100%;
                    }
                    `}
            </style>
        </div>
    )
}
