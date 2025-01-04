import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [email_admin, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const role = 'admin';
  const navigate = useNavigate(); // Initialise useNavigate

  const login = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email_admin,
        password,
        role,
      };
      const response = await axios.post('http://localhost:3005/api/admin/login', data);
      localStorage.setItem('token',response.data.admin_token)
      if (response.status === 200) {
        navigate('/admin/dasboard'); 
      }
    } catch (err) {
      console.log(err.response || err);
    }
  };

  useEffect(()=>{
    localStorage.removeItem('token')
  },[])

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center my-5 vh-50">
        <div className="card p-4" style={{ width: '18rem' }}>
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                value={email_admin}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Password</label>
              <input
                type="password"
                id="pwd"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Dash</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
