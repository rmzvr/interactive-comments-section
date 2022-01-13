import "./styles/sass/components/App.scss";
import React, { useEffect, useState } from "react";
import { UserContext } from "./components/context";
import CommentsList from "./components/comments/CommentsList";
import UserService from "./components/API/UserService";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    image: {},
  });

  async function fetchCurrentUser() {
    const currentUser = await UserService.getCurrentUser();
    setCurrentUser(currentUser);
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
          <CommentsList />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
