import React from 'react';
import UserInterface from '../components/UserInterface';
import LandingPage from '../components/LandingPage';

const Home: React.FC = () => {
  return (
    <div>
      {/* <UserInterface backendName="flask" /> */}
      <LandingPage backendName='flask'/>
    </div>
  );
}

export default Home;