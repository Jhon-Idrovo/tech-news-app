import axios from "axios";
import { useEffect, useState } from "react";

import { useInfiniteQuery } from "react-query";

let postsIDs;
let currentSection;

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

function usePosts(section, quantity) {
  const [IDs, setIDs] = useState([]);

  useEffect(() => {
    fetchIDs(section);
    return () => {};
  }, []);

  const fetchIDs = async (section) => {
    try {
      const fetchedIDs = await axios
        .get(`https://hacker-news.firebaseio.com/v0/${section}.json`)
        .then((res) => res.data);
      setIDs(fetchedIDs);
    } catch (error) {
      console.log("An error occurred fetching the IDs", error);
    }
  };

  const { isLoading, isFetching, isError, error, data, fetchNextPage } =
    useInfiniteQuery([section, quantity], fetchPosts, {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const fetchPosts = async (args) => {
    console.log(args);
    try {
      const { pageParam, queryKey } = args;
      const end =
        pageParam + 20 < postsIDs.length ? pageParam + 20 : postsIDs.length;
      const IDsForFetch = IDs.slice(pageParam, end);
      const promises = IDsForFetch.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );
      const posts = await Promise.all(promises).then((post) => post.data);
      return { data: posts, nextCursor: end };
    } catch (error) {
      console.log("Error while fetching the posts", error);
    }
  };

  return { isLoading, isFetching, isError, error, data, fetchNextPage };
}

export default usePosts;
