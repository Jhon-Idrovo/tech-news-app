import Head from "next/head";
import { useState, useEffect } from "react";

import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import { getFirstPosts, getRemainingPosts } from "../lib/news";

export default function Home() {
  const [section, setSection] = useState("topstories");
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    updatePosts(section);
  }, [section]);

  //in order to show the news fast to the user, the app does not
  //get all the publications in one go, instead, it only show 20 and then
  //gets the remaining as a  side process
  const updatePosts = async (section) => {
    const firstPosts = await getFirstPosts(section);
    setPosts(firstPosts);
    const remainingPosts = await getRemainingPosts();
    console.log(posts); //this gives null
    setPosts([...firstPosts, ...remainingPosts]);
  };

  const changeSection = (newSec) => {
    setSection(newSec);
  };

  console.log("outside", posts);
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
      </main>
    </>
  );
}
