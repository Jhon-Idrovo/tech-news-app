import axios from "axios";

let postsIDs;

const getIDs = async (section) => {
  const rawIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`
  );
  postsIDs = rawIDs.data;
};

export const getPost = async (cursor = 0, section = null) => {
  console.log(postsIDs);
  if (!postsIDs) {
    const rawIDs = await axios
      .get(`https://hacker-news.firebaseio.com/v0/${section}.json`)
      .catch((err) => console.log);
    console.log(rawIDs.data);
    postsIDs = rawIDs.data;
  }
  console.log("awaiting?", cursor);
  const post = await axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${postsIDs[cursor]}.json`)
    .then((res) => res.data)
    .catch((err) => console.log);
  console.log(post);
  return { data: [post], nextCursor: cursor + 1 };
};
