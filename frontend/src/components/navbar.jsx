import React from 'react'
import Logo from './logo'

function navbar() {
  return (
    <div>
      
<nav>
    <div className="navcont">
        <div className="nav">
     <Logo/>
     <div className="link">
      <a href="#" class="active">HOME</a>
    <a id='hid' href="#">BOOK NOW</a>
    <a id='hid' href="#">ABOUT US</a>
    <a id='hid' href="#">TESTIMONIALS</a>
     </div>
     <a className='btn12' href="#" class="signup-button">Sign Up</a>
        </div>
    </div>
</nav>
      
    </div>
  )
}

export default navbar
