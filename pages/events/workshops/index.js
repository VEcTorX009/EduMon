import Link from "next/link";

import { useEffect, useState } from "react";
import {fetchData} from "../../../components/fetchData"

export default function Home() {
  const [wdata, setData] = useState([])
  useEffect(() => {
    Promise.all([
      fetchData("workshops"),
    ]).then(([wdata]) => {
      setData(wdata);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
    (wdata)
  

  }, [])
  function formatDate(inputDate) {
  // Split the input date using slashes and convert it to an array [day, month, year]
  const dateParts = inputDate.split('/').map(part => parseInt(part, 10));

  if (dateParts.length !== 3) {
    return 'Invalid date format'; // Handle invalid input format
  }

  // Extract day, month, and year from the array
  const [day, month, year] = dateParts;

  // Define an array of month names for formatting
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Create an array of suffixes for days (st, nd, rd, th)
  const daySuffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                    (day === 2 || day === 22) ? 'nd' :
                    (day === 3 || day === 23) ? 'rd' : 'th';

  // Format the date string
  const formattedDate = `${day}${daySuffix} ${monthNames[month - 1]} ${year}`;

  return formattedDate;
}
  return (
    <div className="flex   flex-col w-full space-y-3 h-full justify-center p-7 text-white">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl"> Workshops</h1>
        <div className="flex flex-row flex-wrap py-2 gap-5 z-50 ">
          {wdata?.map((e) => {
            return (
              <div
                style={{
                  backgroundImage: `url("/codingcompetetion.png")`,
                  backgroundSize: "100%",
                }}
                className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
              >
                <div className="flex">
                  <h1 className="text-2xl ">{e.title}</h1>
                </div>
                <div className="flex flex-col  space-y-1">
                  <h1 className="text-xl">Date - {formatDate(e.date)}</h1>
                  <h1 className="text-xl">Location - {e.mode}</h1>
                  <h1 className="text-xl">Participants - {e.members.length}</h1>
                </div>
                <div className="flex flex-col space-y-1">
                  <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/events/workshops/${e.title
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >
                      Explore
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
