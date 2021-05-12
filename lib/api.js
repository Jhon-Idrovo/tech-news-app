export const getIDs = async (section) => {
  const rawIDs = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${section}.json`,
    { cancelToken: currentRequest.token }
  );
  return rawIDs.data;
};
