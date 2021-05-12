import axios from "axios";

let postsIDs;

const getIDs = async (section) => {
  const rawIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`
  );
  postsIDs = rawIDs.data;
};

export const getPost = async ({ pageParam = 0, section }) => {
  console.log(postsIDs);
  if (!postsIDs) {
    const rawIDs = await axios
      .get(`https://hacker-news.firebaseio.com/v0/${section}.json`)
      .catch((err) => console.log);
    console.log(rawIDs.data);
    postsIDs = rawIDs.data;
  }
  console.log("awaiting?", pageParam);
  const post = await axios
    .get(
      `https://hacker-news.firebaseio.com/v0/item/${postsIDs[pageParam]}.json`
    )
    .then((res) => res.data)
    .catch((err) => console.log);
  console.log(post);
  return { data: [post], nextCursor: pageParam + 1 };
};
