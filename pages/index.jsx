import Head from "next/head";
import { useState, useEffect } from "react";

import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";

import usePosts from "../hooks/usePosts";

export default function Home() {
  const [section, setSection] = useState("topstories");

  const { isLoading, isFetching, isError, error, data, fetchNextPage } =
    usePosts(section, 20);

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
          //on the first rendering the values of isLoading and isFetching are undefinied
          data &&
          data.pages.map((page) => {
            console.log(page);

            return page.posts.map((post, index) => {
              console.log(post);
              return <PostCard key={index} {...post} />;
            });
          })
        )}
        {data ? (
          <button
            className={`btn mx-auto block`}
            disabled={isFetching}
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
