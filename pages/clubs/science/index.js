import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "../../../components/fetchData";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Promise.all([fetchData("clubs")])
      .then(([data]) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="flex   flex-col w-full space-y-3 h-full justify-center p-7 text-white">
   
    </div>
  );
}
