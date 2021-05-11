import axios from "axios";
import { useState, useEffect } from "react";

import { testCancel, testRequest } from "../lib/tests";

export default function Tests() {
  const [posts, setPosts] = useState("initial");

  useEffect(() => {
    updatePosts();
    return () => {
      testCancel();
    };
  }, [posts]);

  const updatePosts = async () => {
    const newPosts = await testRequest();
    setPosts(newPosts);
  };

  return (
    <div>
      {posts}

      <button onClick={updatePosts}>change state</button>
    </div>
  );
}
