"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import app from "@/app/firebase/config";

interface Users {
  id: string;
  name: string;
}

type Props = {};

const Users = (props: Props) => {
  const [usersData, setUsersData] = useState<Users[]>([]);

  const getData = async () => {
    const db = getFirestore(app);

    const querySnapshot = await getDocs(collection(db, "users"));

    let users: Users[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      let obj: Users = {
        id: doc.id,
        name: doc.data().name,
      };

      users.push(obj);
      setUsersData(users);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5">
        <Link href="/page/home">Home</Link>
      </button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-5">
        <Link href="/page/addUser">Add User</Link>
      </button>
      <br />
      <h1>USERS PAGE</h1> <br />
      <ul>
        {usersData &&
          usersData.map((user) => {
            return (
              <li key={user.id}>
                {user.name}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => {
                    const deleteUserData = async () => {
                      const db = getFirestore(app);

                      await deleteDoc(doc(db, "users", user.id));
                    };
                    deleteUserData();
                    setUsersData(
                      usersData.filter((elem) => elem.id != user.id)
                    );
                  }}
                >
                  DELETE
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Users;
