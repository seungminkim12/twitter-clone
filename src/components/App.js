import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { auth } from "firebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      <>
        {init ? (
          <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
        ) : (
          "Initializing..."
        )}
        <footer>&copy;{new Date().getFullYear()} Twitter-clone</footer>
      </>
    </div>
  );
}

export default App;
