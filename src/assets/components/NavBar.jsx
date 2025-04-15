import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <ul>
        <li>
            <Link to="/">Dashboard</Link>
        </li>
        <li>
            <Link to="/">Login</Link>
        </li>
        <li>
            <Link to="/">Register</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
