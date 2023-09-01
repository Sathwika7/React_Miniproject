import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081", {
                username, 
                email,
                password,
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div class="main-div">
            <h3>SignUp</h3>
            <form onSubmit={handleSubmit}>
                <table className="signup-table">
                    <tbody>
                        <tr>
                            <td>Username: </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email id: </td>
                            <td>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password: </td>
                            <td>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit">Sign Up</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <p>Already registered?&nbsp;
            <Link to="/login">Login here</Link></p>
        </div>
    );
}

export default SignupForm;
