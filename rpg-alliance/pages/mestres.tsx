import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Masters: NextPage = () => {
  const [masters, setMasters] = useState([]);

  const getData = async () => {
    const res = await (await fetch("http://localhost:3000/api/masters")).json();
    setMasters(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Masters</h1>
      <ul>
        {masters.map((master: any) => (
          <li key={master.id}>
            <h2>{master.username}</h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Masters;
