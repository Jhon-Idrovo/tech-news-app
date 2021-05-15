import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

const fetchIDs = async ({ queryKey }) => {
  const [section] = queryKey;
  try {
    const fetchedIDs = await axios
      .get(`https://hacker-news.firebaseio.com/v0/${section}.json`)
      .then((res) => res.data);
    return { data: fetchedIDs };
  } catch (error) {
    console.log("An error occurred fetching the IDs", error);
  }
};

function usePosts(section, quantity) {
  const { data: IDsData } = useQuery(section, fetchIDs);

  const IDs = IDsData?.data;

  const fetchPosts = async (args) => {
    console.log(args, IDs);
    try {
      const { pageParam = 0, queryKey } = args;
      console.log(pageParam);

      const end = pageParam + 20 < IDs.length ? pageParam + 20 : IDs.length - 1;
      const IDsForFetch = IDs.slice(pageParam, end);
      const promises = IDsForFetch.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );
      const fetchedPosts = await Promise.all(promises);
      const posts = fetchedPosts.map((post) => post.data);
      console.log(fetchedPosts, posts);
      return { posts: posts, nextCursor: end };
    } catch (error) {
      console.log("Error while fetching the posts", error);
    }
  };

  const { isLoading, isFetching, isError, error, data, fetchNextPage } =
    useInfiniteQuery([section, quantity], fetchPosts, {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!IDs,
    });
  const postsPages = data ? data.pages : null;

  return { isLoading, isFetching, isError, error, data, fetchNextPage };
}

export default usePosts;
