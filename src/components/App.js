import React, { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <>
        <AppRouter isLoggedIn={isLoggedIn} />
        <footer>&copy;{new Date().getFullYear()} Twitter-clone</footer>
      </>
    </div>
  );
}

export default App;