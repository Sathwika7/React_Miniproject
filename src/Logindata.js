import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom"; // Make sure this import is present
import { useUser } from './UserContext';
function Login() {
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const { setUser } = useUser(); 
  const navigate=useNavigate();
  const handlelogin=async(e)=>
  {
    const userlogindetails = {
      email,
      password,
    };
    e.preventDefault();
      try 
      {
        const response = await axios.post("http://localhost:8080/api/Logindata", {userlogindetails});
        console.log(response.data);
        if (response.status === 200) 
        {
          const user = response.data.user;
          setUser(user);
          navigate('/dashboard');
        } 
        else if (response.status === 401) 
        {
          alert("Invalid Authentication Credentials");
        } 
        else 
        {
          alert("Login Error");
        }
      }
      catch(error) 
      {
        alert("Invalid Credentials");
      }  
    }
    return (
    <div class="main-div">
      <h3>LogIn page</h3>
        <form>
            <table className="signup-table">
              <tr>
                  <td>Email id: </td>
                  <td>
                  <input type="email"  placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
                  </td>
                  </tr>
                  <tr>
                    <td>Password: </td>
                    <td>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                    <button onClick={handlelogin}>Submit</button>
                    </td>
                  </tr>
                </table>
            </form>
            <p>Not a registered user?&nbsp;
            <Link to="/signup">Sign up</Link></p>
        </div>
  );
}
export default Login;
