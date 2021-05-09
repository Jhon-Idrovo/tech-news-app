import axios from "axios";

const dummie = {
  by: "dhouston",
  descendants: 71,
  id: 8863,
  kids: [
    8952,
    9224,
    8917,
    8884,
    8887,
    8943,
    8869,
    8958,
    9005,
    9671,
    8940,
    9067,
    8908,
    9055,
    8865,
    8881,
    8872,
    8873,
    8955,
    10403,
    8903,
    8928,
    9125,
    8998,
    8901,
    8902,
    8907,
    8894,
    8878,
    8870,
    8980,
    8934,
    8876,
  ],
  score: 111,
  time: 1175714200,
  title: "My YC app: Dropbox - Throw away your USB drive",
  type: "story",
  url: "http://www.getdropbox.com/u/2/screencast.html",
};

let postsIDs;

export const getFirstPosts = async (section) => {
  const rawPostsIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`
  );
  postsIDs = rawPostsIDs.data;
  const first = postsIDs.slice(0, 20);
  const posts = getPosts(first);
  console.log(posts);
  return posts;
  return getPosts(first);
};

export const getRemainingPosts = () => {
  const reamainingIDs = postsIDs.slice(20);
  const posts = getPosts(reamainingIDs);
  console.log(posts);
  return posts;
};

const getPosts = async (IDsList) => {
  const promises = IDsList.map((id) => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    //what is the difference with
    //return await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  });
  const posts = await Promise.all(promises);
  return posts.map((post) => post.data);

  // IDs.data.map(async (id) => {
  //   const post = await axios.get(
  //     `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  //   );
  //   console.log(post.data);
  //   setPosts((posts) => {
  //     posts ? [...posts, post.data] : [post.data];
  //   });
  //   console.log("last line");
  // });
};
