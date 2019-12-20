import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";

import { axiosWithAuth } from "./util/axiosWithAuth";

function Jokes(props) {
  const [jokes, setJokes] = useState(null);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:3300/api/jokes")
      .then((res) => {
        setJokes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!window.localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  if (!jokes) return <div>Loading hilarious dad jokes...</div>;

  return (
    <div className="jokes">
      {jokes.map((joke) => (
        <div className="joke" key={joke.id}>
          <p>{joke.joke}</p>
        </div>
      ))}
    </div>
  );
}

export default Jokes;
