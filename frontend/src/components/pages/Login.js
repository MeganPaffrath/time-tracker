import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  

  // called when user clicks login
  const submit = async (e) => {

  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Login:</h1>
        <form onSubmit={submit}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            placeholder="email@email.com"
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <input 
            type="submit" 
            value="Submit" 
          />
        </form>
      </div>
    </div>
  )
}
