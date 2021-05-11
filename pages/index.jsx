import Head from "next/head";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import { getFirstPosts, getRemainingPosts, cancelRequest } from "../lib/news";

export default function Home() {
  const [section, setSection] = useState("topstories");

  const queryClient = useQueryClient();

  const {
    isError,
    //isLoading:loadingInitial,
    data: posts,
    error,
  } = useQuery(section, () => getFirstPosts(section));
  let sectionContinue = section;
  const { isLoading: loadingRemaining, data: remainingPosts } = useQuery(
    sectionContinue,
    getRemainingPosts
  );

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
        <>
          {loadingRemaining ? (
            <div>is loading</div>
          ) : (
            remainingPosts.map((post, index) => {
              <PostCard key={index} {...post} />;
            })
          )}
        </>
      </main>
    </>
  );
}
