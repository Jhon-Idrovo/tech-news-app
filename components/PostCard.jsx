import Link from "next/link";

function PostCard({ title, by, descendants, url, time }) {
  const date = new Date(time * 1000).toUTCString();
  const comments = descendants;
  return (
    <div className="bg-secondary dark:bg-secondary-dark mx-8 my-4 p-2">
      <Link href={`${url}`}>
        <a className="font-bold text-txt-secondary dark:text-txt-secondary-dark hover:underline">
          {title}
        </a>
      </Link>
      <p className="dark:text-txt-primary-dark">
        By <span className="highlight">{by}</span> on{" "}
        <span className="highlight">{date}</span> comments{" "}
        <span className="highlight">{comments}</span>
      </p>
    </div>
  );
}

export default PostCard;
