import Link from "next/link";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <h1>HOME PAGE</h1> <br />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link href="/page/users">Users</Link>
      </button>
    </>
  );
};

export default Home;
