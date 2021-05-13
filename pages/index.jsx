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
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(section, getPost, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

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
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>an error has ocurred{error}</div>
        ) : (
          data.pages.map((page) => {
            console.log(page);

            return page.data.map((post, index) => {
              console.log(post);
              return <PostCard key={index} {...post} />;
            });
          })
        )}

        {data ? (
          <button
            className="btn mx-auto block"
            onClick={() => {
              fetchNextPage();
            }}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        ) : null}
      </main>
    </>
  );
}
