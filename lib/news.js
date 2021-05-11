import axios from "axios";

const dummie = {
  by: "dhouston",
  descendants: 71,
  id: 8863,
  kids: [8952, 9224, 8917],
  score: 111,
  time: 1175714200,
  title: "My YC app: Dropbox - Throw away your USB drive",
  type: "story",
  url: "http://www.getdropbox.com/u/2/screencast.html",
};

let postsIDs;
const currentRequest = axios.CancelToken.source();

export const getFirstPosts = async (section) => {
  const rawPostsIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`,
    { cancelToken: currentRequest.token }
  );
  postsIDs = rawPostsIDs.data;
  const first = postsIDs.slice(0, 20);
  return getPosts(first);
};

export const getRemainingPosts = () => {
  const reamainingIDs = postsIDs.slice(20);
  return getPosts(reamainingIDs);
};

const getPosts = async (IDsList) => {
  const promises = IDsList.map((id) => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
      cancelToken: currentRequest.token,
    });
    //what is the difference with
    //return await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  });
  const posts = await Promise.all(promises);
  return posts.map((post) => post.data);
};

export const cancelRequest = () => {
  try {
    currentRequest.cancel();
  } catch (e) {
    console.log("no request to cancel", e);
  }
};
