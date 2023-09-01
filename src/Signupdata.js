import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Signup() {
  const [empid, setEmpId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate=useNavigate();
  const handleSignup = async() => {
    const userdetails= {
      empid,
      username,
      password,
      email
    };
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    /*Password should contain minimum 8 characters and should contain one uppercase, one lowercase and one special character*/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.*\d).{8,}$/;
    if(emailRegex.test(email) && passwordRegex.test(password))
    {
      try {
        const response=await axios.post("http://localhost:8080/api/Signupdata", userdetails); 
        if(response.status === 201)
        {
          alert("Successfully registered");
        }
        else
        {
          alert("Signup error");
        }
        // alert("Registration Successful");
        navigate("/");
      } 
      catch(error) 
      {
        alert("Please enter valid details");
      }
    }
    else if(emailRegex.test(email) === false)
    {
      alert("Please enter a valid email");
    }
    else
    {
      alert("Password should contain minimum 8 characters and should contain one uppercase letter, one lowercase letter and one special character");
    }
  };
  return (
 <div class="main-div">
 <h3>SignUp</h3>
 <form>
     <table className="signup-table">
         <tbody>
              <tr>
                <td>Employee Id</td>
                <td>
                <input type="text" id="empid" placeholder="Employee Id" value={empid} onChange={(e) => setEmpId(e.target.value)} required/>
                </td>
             </tr>
             <tr>
                <td>Username: </td>
                <td>
                <input type="text" id="username" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </td>
             </tr>
             <tr>
                <td>Email id: </td>
                <td>
                  <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </td>
             </tr>
             <tr>
                <td>Password: </td>
                <td>
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </td>
             </tr>
             <tr>
                <td colspan="3">
                  <button type="button" onClick={handleSignup}>Signup</button>
                </td>
             </tr>
         </tbody>
     </table>
 </form>
 <p>Already registered?&nbsp;
 <Link to="/">Login here</Link></p>
</div>
);
}
export default Signup;
