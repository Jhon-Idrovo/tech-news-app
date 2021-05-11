import Head from "next/head";
import { useState, useEffect } from "react";

import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import { getFirstPosts, getRemainingPosts, cancelRequest } from "../lib/news";

export default function Home() {
  const [section, setSection] = useState("topstories");
  const [posts, setPosts] = useState({ posts: null, section: "topstories" });
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  useEffect(() => {
    updatePosts(posts.section);
  }, []);

  //in order to show the news fast to the user, the app does not
  //get all the publications in one go, instead, it only show 20 and then
  //gets the remaining as a  side process
  //the caveat of this approach is that if the user changes sections before
  // the app renders the remaining props (or even the first ones), when the new section
  // charges, the content of it is the content that was "queried" on the other section.
  // This happens because the async function is still running on the back.
  // An attempt was made trying to verify that the section state was the same as the
  // section from which we are retrieving the data. The problem is that react updates
  // the state in batches, so it waits until we update the posts state to set the current section
  // so we cannot use it on this last proccess

  const updatePosts = async (section) => {
    setIsSendingRequest(true);
    const firstPosts = await getFirstPosts(section);
    setPosts({ posts: firstPosts, section: section });
    const remainingPosts = await getRemainingPosts();
    //use the variable fisrtPosts since react does could not update the state yet
    setPosts({ posts: [...firstPosts, ...remainingPosts], section: section });
  };

  const changeSection = (newSec) => {
    // isSendingRequest ? cancelRequest() : null;
    setPosts({ posts: null, section: newSec });
  };

  console.log("outside", posts);
  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>

      <NavBar section={posts.section} changeSection={changeSection} />
      <main>
        {posts.posts ? (
          posts.posts.map((post, index) => {
            return <PostCard key={index} {...post} />;
          })
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
}
