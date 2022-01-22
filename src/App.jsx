import "./styles/sass/components/App.scss";
import React, { useEffect, useMemo, useState } from "react";
import { UserContext } from "./components/context";
import CommentsList from "./components/comments/CommentsList";
import UserService from "./components/API/UserService";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    image: {},
  });

  async function fetchCurrentUser() {
    const fetchedUser = await UserService.getCurrentUser();
    setCurrentUser(fetchedUser);
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <div className="App">
        <div className="container">
          <main className="main">
            <CommentsList />
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
