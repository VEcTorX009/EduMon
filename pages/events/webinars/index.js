import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "../../../components/fetchData";

export default function Home() {
  const [widata, setData] = useState([]);
  useEffect(() => {
    Promise.all([fetchData("webinars")])
      .then(([widata]) => {
        setData(widata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    widata;
  }, []);
  function formatDate(inputDate) {
    const dateParts = inputDate.split("/").map((part) => parseInt(part, 10));

    if (dateParts.length !== 3) {
      return "Invalid date format";
    }

    const [day, month, year] = dateParts;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const formattedDate = `${day}${daySuffix} ${monthNames[month - 1]} ${year}`;

    return formattedDate;
  }
  return (
    <div className="flex   flex-col w-full space-y-3 h-full justify-center p-7 text-white">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl"> Webinars</h1>
        <div className="flex flex-row flex-wrap py-2 gap-5 z-50 ">
          {widata?.map((e) => {
            return (
              <div
                style={{
                  backgroundImage: `url("/aiwebinar.png")`,
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
                  <h1 className="text-xl">Members - {e.members.length}</h1>
                </div>
                <div className="flex flex-col space-y-1">
                  <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/events/webinars/${e.title
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
