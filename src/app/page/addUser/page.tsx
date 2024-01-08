"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import app from "@/app/firebase/config";

type Props = {};

const AddUser = (props: Props) => {
  const [name, setName] = useState("");

  const addUser = async () => {
    const db = getFirestore(app);
    let newUser = { name: name };
    // Add a new document with a generated id
    const newCityRef = doc(collection(db, "users"));

    // later...
    await setDoc(newCityRef, newUser);
  };

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5">
        <Link href="/page/home">Home</Link>
      </button>
      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-5">
        <Link href="/page/users">Users</Link>
      </button>
      <br />
      <h1>ADD USER PAGE</h1> <br />
      <form action="">
        <label htmlFor="name" className="mr-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          placeholder="enter your name"
          className="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />{" "}
        <button
          onClick={addUser}
          className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </form>
    </>
  );
};

export default AddUser;
