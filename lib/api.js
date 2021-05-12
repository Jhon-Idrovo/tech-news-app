import axios from "axios";

let postsIDs;

const getIDs = async (section) => {
  const rawIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`,
    { cancelToken: currentRequest.token }
  );
  postsIDs = rawIDs.data;
};

export const getPost = async (cursor = 0, section = null) => {
  !postsIDs ? getIDs(section) : null;
  const post = await axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${postsIDs[cursor]}.json`)
    .then((res) => res.data)
    .catch((err) => console.log);
  return { data: post, nextCursor: cursor + 1 };
};
