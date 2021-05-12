import Head from "next/head";
import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";

import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import { getPost } from "../lib/api";
export default function Home() {
  const [section, setSection] = useState("topstories");

  const queryClient = useQueryClient();

  const {
    isError,
    isLoading: loadingInitial,
    data: posts,
    error,
  } = useQuery(section, () => getFirstPosts(section));

  const { isLoading: loadingRemaining, data: remainingPosts } = useQuery(
    "remaining",
    getRemainingPosts
  );
  const changeSection = (newSec) => {
    setSection(newSec);
  };

  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>

      <NavBar section={section} changeSection={changeSection} />
      <main>
        {loadingInitial ? (
          <Loading />
        ) : isError ? (
          <div>an error has ocurred{error}</div>
        ) : (
          posts.map((post, index) => {
            return <PostCard key={index} {...post} />;
          })
        )}
        {loadingRemaining ? (
          <Loading />
        ) : (
          console.log(remainingPosts) &&
          remainingPosts.map((post, index) => {
            return <PostCard key={index + 20} {...post} />;
          })
        )}
      </main>
    </>
  );
}
