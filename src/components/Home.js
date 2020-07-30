import React from 'react';
import {Link} from 'react-router-dom'


function Home() {
  return (
    <div className="Home">
        <Link to="/reactjs">
            <h1>react js course</h1>
        </Link>
        <Link to="/nodejs">
            <h1>node js course</h1>
        </Link>
    </div>
  );
}

export default Home;
