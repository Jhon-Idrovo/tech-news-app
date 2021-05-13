import axios from "axios";

let postsIDs;
let currentSection;
const getIDs = async (section) => {
  const rawIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`
  );
  postsIDs = rawIDs.data;
};

export const getPost = async (args) => {
  const section = args.queryKey[0];
  const pageParam = args.pageParam ? args.pageParam : 0;

  if (!postsIDs || section != currentSection) {
    currentSection = section;
    const rawIDs = await axios
      .get(`https://hacker-news.firebaseio.com/v0/${section}.json`)
      .catch((err) => console.log);
    console.log(rawIDs.data);
    postsIDs = rawIDs.data;
  }
  const IDsForFetch = postsIDs.slice(
    pageParam,
    pageParam + 20 < postsIDs.length ? pageParam + 20 : postsIDs.length
  );
  const promises = IDsForFetch.map((id) => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  });
  const posts = await Promise.all(promises);
  const parsedPosts = posts.map((post) => post.data);
  return { data: parsedPosts, nextCursor: pageParam + 20 };
};
