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
    data: posts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  } = useInfiniteQuery(
    section,
    () => {
      getPost((section = section));
    },
    {
      getNextPageParam: (lastPage, pages) => {
        lastPage.nextCursor;
      },
    }
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
        {posts ? (
          posts.map((post, index) => {
            return <PostCard key={index} {...post} />;
          })
        ) : (
          <Loading />
        )}
        <button
          onClick={() => {
            fetchNextPage();
          }}
        >
          Load more
        </button>
      </main>
    </>
  );
}
