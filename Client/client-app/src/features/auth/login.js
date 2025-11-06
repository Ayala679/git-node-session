import { useEffect, useState } from "react";
import "./Register.css"; // Assuming you have a CSS file for styling
import {useLoginMutation} from "./authApiSlice"
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {setToken} from "./authSlice"

const Login = () => {

  const [login,{isError,isSuccess,error,data}] =useLoginMutation();
  const navigate=useNavigate();
  const dispatch=useDispatch();

 
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  useEffect(()=>{
    if(isSuccess)
      {
      console.log("token:",data)
      dispatch(setToken(data))
      navigate("/my-blogs");
      }
  },[isSuccess])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

   const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);

  }

  return (
    <div className="register-container">
      <h2>Login</h2>
      {isError&&JSON.stringify(error)}
      <form onSubmit={(e)=>handleSubmit(e)} className="register-form">
        <div className="form-group">
          <label htmlFor="username">userName:</label>
          <input onChange={(e)=>handleChange(e)} id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input onChange={(e)=>handleChange(e)} type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;