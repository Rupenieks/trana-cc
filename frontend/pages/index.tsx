import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from '../components/Login';
import Register from "../components/Register";
import authService from "../services/auth.service";


export default function Home() {
  const router = useRouter();
  const [authType, setAuthType] = useState(true);

  useEffect(() => {
		if (authService.checkAuthenticated()) {
			router.push('/notes');
		} 
		
	}, [])

  return (
    <div className="container">
      <div id="auth-component" className="styled-container">
        <div className="tab-container">
          <div className="styled-container" id="tab" onClick={() => {setAuthType(true)}}>
              Login
          </div>
          <div className="styled-container" id="tab" onClick={() => {setAuthType(false)}}>
              Register
          </div>
        </div>

        {authType ? <Login></Login> : <Register></Register>}
      </div>

      <style jsx>{`
        
        .container {
          width: 100%;
          height: 100%;
        }

        .tab-container {
          display: flex;
          flex-direction: row;
        }

        #tab {
          padding: 0.5em;
          flex: 1;
          text-align: center;
          border: 1px solid black;
        }

        #auth-component {
			border: dashed 2px #41403E;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 30em;
			width: 30em;
        }
        
        `}</style>
    </div>
  )
}
