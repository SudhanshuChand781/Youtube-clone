import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const handleSubmit = async(event) => {
      event.preventDefault();
      const email = document.getElementById('exampleInputEmail1').value;
      const password = document.getElementById('exampleInputPassword1').value;

      const url = "http://localhost:2000/auth/login";
      const data = {
          email: email, password: password
      }

      console.log("body data", data)

      fetch(url, {method: 'POST', 
          headers:{'Content-Type': 'application/json'}, 
          body: JSON.stringify(data)})
      .then(response => {
          console.log(response)
          if(response.ok){
              return response.json();
          }else{
              throw new Error(response.message)
          }
      })
      .then(data => {
          if(data.success){
              console.log("Success", data)
              localStorage.setItem('token', data.token)
              localStorage.setItem('email', data.email)
              localStorage.setItem('userId', data._id)
              localStorage.setItem('name', data.name);

              window.location.href = "http://localhost:2000/"
          }else{
              alert(data.message)
          }
          console.log(data)
      })
      .catch(error => {
          console.log(error)
      })
  }
  return (
    <div className="Signin">
      <form>
        <div class="form-group white">

          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group white">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required

          />
        </div>

        <div class="signin-actions">
                <Link to={'/'}>
                    <button class="signin-action-buttons btn btn-secondary">Back</button>
                </Link>
                <button type="submit" onClick={(event) => handleSubmit(event)} class="signin-action-buttons btn btn-primary">Submit</button>
            </div>
        {/* <button type="submit" class="btn btn-primary">
          Submit
        </button> */}
      </form>
    </div>
  );
}

export default SignIn;
