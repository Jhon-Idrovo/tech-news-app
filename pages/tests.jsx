import axios from "axios";
import { useState, useEffect } from "react";

import { testCancel, testRequest } from "../lib/tests";
import usePosts from "../lib/api";

export default function Tests() {
  const [section, setSection] = useState("topstories");

  const { isLoading, isFetching, posts, updatePosts } = usePosts(section, 20);

  return (
    <div>
      {posts}
      <button onClick={updatePosts}>get more</button>
    </div>
  );
}
