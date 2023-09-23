import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "../components/fetchData";

export default function events({ setLoading }) {
  const [wdata, setWdata] = useState([{}]);
  const [cdata, setCdata] = useState([{}]);
  const [widata, setWidata] = useState([{}]);
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchData("workshops"),
      fetchData("competetions"),
      fetchData("webinars"),
    ])
      .then(([wdata, cdata, widata]) => {
        setWdata(wdata);
        setCdata(cdata);
        setWidata(widata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setLoading(false);
  }, []);
  function formatDate(inputDate) {
    if (!inputDate) {
      return "Invalid date format";
    }
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
        <Link
          href={"/events/competetions"}
          className="text-4xl z-100 cursor-pointer"
        >
          Competitions
        </Link>
        <div className="flex flex-row py-2 space-x-3 z-50 overflow-x-auto overflow-y-hidden">
          {cdata?.map((e) => {
            return (
              <div
                style={{
                  backgroundImage: `url("illustrationcompetetion.png")`,
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
                  <h1 className="text-xl">
                    Members - {e.members ? e.members.length : 0}
                  </h1>
                </div>
                <div className="flex flex-col space-y-1">
                  <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/events/competetions/${
                        e.title && e.title.replace(/\s/g, "").toLowerCase()
                      }`}
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
      <div className="flex flex-col space-y-2">
        <Link
          href={"/events/workshops"}
          className="text-4xl z-100 cursor-pointer"
        >
          {" "}
          Workshops
        </Link>
        <div className="flex flex-row py-2 space-x-3 z-50 overflow-x-auto overflow-y-hidden">
          {wdata?.map((e) => {
            return (
              <div
                style={{
                  backgroundImage: `url("codingcompetetion.png")`,
                  backgroundSize: "100%",
                }}
                className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
              >
                <div className="flex">
                  <h1 className="text-2xl ">
                    {e.title ? e.title : "Untitled"}
                  </h1>
                </div>
                <div className="flex flex-col  space-y-1">
                  <h1 className="text-xl">Date - {formatDate(e.date)}</h1>
                  <h1 className="text-xl">Location - {e.mode}</h1>
                  <h1 className="text-xl">
                    Participants - {e.members ? e.members.length : 0}
                  </h1>
                </div>
                <div className="flex flex-col space-y-1">
                  <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/events/workshops/${
                        e.title && e.title.replace(/\s/g, "").toLowerCase()
                      }`}
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
      <div className="flex flex-col space-y-2">
        <Link
          href={"/events/webinars"}
          className="text-4xl z-100 cursor-pointer"
        >
          {" "}
          Webinars
        </Link>
        <div className="flex flex-row py-2 space-x-3 z-50 overflow-x-auto overflow-y-hidden">
          {widata?.map((e) => {
            return (
              <div
                style={{
                  backgroundImage: `url("aiwebinar.png")`,
                  backgroundSize: "100%",
                }}
                className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
              >
                <div className="flex">
                  <h1 className="text-2xl ">
                    {e.title ? e.title : "Untitled"}
                  </h1>
                </div>
                <div className="flex flex-col  space-y-1">
                  <h1 className="text-xl">Date - {formatDate(e.date)}</h1>
                  <h1 className="text-xl">Location - {e.mode}</h1>
                  <h1 className="text-xl">
                    Members - {e.members ? e.members.length : 0}
                  </h1>
                </div>
                <div className="flex flex-col space-y-1">
                  <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/events/webinars/${
                        e.title && e.title.replace(/\s/g, "").toLowerCase()
                      }`}
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
