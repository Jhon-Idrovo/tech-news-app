import axios from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const testRequest = async () => {
  let section = "newstories";
  const rawPostsIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`,
    { cancelToken: source.token }
  );
  const postsIDs = rawPostsIDs.data;
  return postsIDs;
};

export const testCancel = () => {
  source.cancel("cancelled");
};
