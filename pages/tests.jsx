import axios from "axios";
import { useState, useEffect } from "react";

export default function Tests() {
  //   const [pubs, setPubs] = useState(["initial"]);
  //   useEffect(() => {
  //     console.log("getting pubs");
  //     getPubs().then((r) => console.log("done d"));
  //   }, []);
  //   useEffect(() => {
  //     console.log("re-rendering", pubs);
  //   });

  //   const getPubs = async () => {
  //     console.log("running getPubs");
  //     const IDs = await axios.get(
  //       "https://hacker-news.firebaseio.com/v0/topstories.json"
  //     );
  //     const choppedIDs = IDs.data.slice(0, 5);
  //     console.log(choppedIDs);
  //     const getPubsInLoop = async () => {
  //       console.log("running loop");
  //       for (let id of choppedIDs) {
  //         const pub = await axios.get(
  //           `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  //         );
  //         console.log("setting pubs");
  //         setPubs((pubs) => [...pubs, pub.data]);
  //       }
  //     };
  //     getPubsInLoop();
  //     return "done";
  //   };

  //   console.log("normal code");
  //     const getPubsOneGo = async () => {
  //     for (let id in await axios
  //       .get("https://hacker-news.firebaseio.com/v0/topstories.json")
  //       .then((response) => response.data)) {
  //       console.log(id);
  //     }
  //   };
  //   const p = getPubsOneGo().then((r) => r);
  //   const getPubs = async () => {
  //     const IDs = await axios.get(
  //       `https://hacker-news.firebaseio.com/v0/topstories.json`
  //     );
  //     return IDs.data;
  //   };
  //   console.log(async () => {
  //     await getPubs();
  //   });

  //   getPubs().then((res) => console.log(res));
  return <div></div>;
}
