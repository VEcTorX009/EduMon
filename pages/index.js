import CustomLoader from "@/components/CustomLoader";
import Link from "next/link";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { fetchData } from "../components/fetchData";

export default function Home({ setLoading }) {
  const [data, setData] = useState([]);
  const [wdata, setWdata] = useState([]);
  const [cdata, setCdata] = useState([]);
  const [widata, setWidata] = useState([]);
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchData("workshops"),
      fetchData("competetions"),
      fetchData("clubs"),
      fetchData("webinars"),
    ])
      .then(([wdata, cdata, data, widata]) => {
        setWdata(wdata);
        setCdata(cdata);
        setWidata(widata);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  function formatDate(inputDate) {
    // Split the input date using slashes and convert it to an array [day, month, year]
    const dateParts = inputDate.split("/").map((part) => parseInt(part, 10));

    if (dateParts.length !== 3) {
      return "Invalid date format"; // Handle invalid input format
    }

    // Extract day, month, and year from the array
    const [day, month, year] = dateParts;

    // Define an array of month names for formatting
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

    // Create an array of suffixes for days (st, nd, rd, th)
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    // Format the date string
    const formattedDate = `${day}${daySuffix} ${monthNames[month - 1]} ${year}`;

    return formattedDate;
  }
  return (
    <Suspense fallback={<CustomLoader />}>
      <div className="flex   flex-col w-full space-y-3 h-full justify-center p-7 text-white">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl">Your Clubs</h1>
          <div className="flex flex-row py-2 space-x-3 z-50 overflow-x-auto">
            {data?.length === 0 || data?.every((e) => e.hasOwnProperty('registered') && !e.registered)  ? (
              <div className="flex flex-col items-center justify-center bg-[#1B354A] text-center text-3xl text-white space-y-2 h-[228px] w-full ">
                <h1>You are not part of any clubs yet!</h1>
                <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#6BBFFF] text-black justify-center items-center">
                  <Link href={"/clubs"}>Explore</Link>
                </button>
              </div>
            ) : (
              data?.map((e) => {
                return (
                  e.registered && (
                    <div
                      key={e.name}
                      style={{
                        backgroundImage: `url("/${
                          e.category === "Science"
                            ? "scienceclub"
                            : e.category === "Technology"
                            ? "roboticsclub"
                            : e.category === "Arts"
                            ? "artclub"
                            : e.category === "Games"
                            ? "chesswebinar"
                            : e.category === "Environment"
                            ? "environmentclub"
                            : e.category === "Communication"
                            ? "communicationclub"
                            : e.name.replace(/\s/g, "").toLowerCase()
                        }.png")`,
                        backgroundSize: "100%",
                      }}
                      className="flex min-w-[366px] text-black h-[228px] py-6 px-6 rounded-xl justify-between items-start flex-col space-y-5"
                    >
                      <div className="flex">
                        <h1 className="text-2xl text-white">{e.name}</h1>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <h1 className="text-xl">Class -{e.grade}</h1>
                        <h1 className="text-xl">Batch - 2023-24</h1>
                        <h1 className="text-xl">
                          Members - {e.members.length}
                        </h1>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                          <Link
                            href={`/clubs/${e.name
                              .replace(/\s/g, "")
                              .toLowerCase()}`}
                          >
                            Explore
                          </Link>
                        </button>
                      </div>
                    </div>
                  )
                );
              })
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl">Your Competitions</h1>
          <div className="flex flex-row overflow-hidden py-2 overflow-x-visible space-x-3">
            {cdata?.length === 0 || cdata?.every((e) => e.hasOwnProperty('registered') && !e.registered) ? (
              <div className="flex flex-col items-center justify-center bg-[#1B354A] text-center text-3xl text-white space-y-2 h-[228px] w-full ">
                <h1>You are not part of any competitions yet!</h1>
                <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#6BBFFF] text-black justify-center items-center">
                  <Link href={"/events/competetions"}>Explore</Link>
                </button>
              </div>
            ) : (
              cdata?.map((e) => {
                return e.registered ? (
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
                      <h1 className="text-xl">Members - {e.members.length}</h1>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                        <Link
                          href={`/events/competetions/${e.title
                            .replace(/\s/g, "")
                            .toLowerCase()}`}
                        >
                          Explore
                        </Link>
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl">Your Workshops</h1>
          <div className="flex flex-row overflow-hidden py-2 overflow-x-visible space-x-3">
            {wdata?.length === 0 || wdata?.every((e) => e.hasOwnProperty('registered') && !e.registered)  ? (
              <div className="flex flex-col items-center justify-center bg-[#1B354A] text-center text-3xl text-white space-y-2 h-[228px] w-full ">
                <h1>You are not part of any workshops yet!</h1>
                <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#6BBFFF] text-black justify-center items-center">
                  <Link href={"/events/workshops"}>Explore</Link>
                </button>
              </div>
            ) : (
              wdata?.map((e) => {
                return e.registered ? (
                  <div
                    style={{
                      backgroundImage: `url("codingcompetetion.png")`,
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
                          href={`/events/workshops/${e.title
                            .replace(/\s/g, "")
                            .toLowerCase()}`}
                        >
                          Explore
                        </Link>
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl">Your Webinars</h1>
          <div className="flex flex-row overflow-hidden py-2 overflow-x-visible space-x-3">
            {widata?.length === 0 || widata?.every((e) => e.hasOwnProperty('registered') && !e.registered)  ? (
              <div className="flex flex-col items-center justify-center bg-[#1B354A] text-center text-3xl text-white space-y-2 h-[228px] w-full ">
                <h1>You are not part of any webinars yet!</h1>
                <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#6BBFFF] text-black justify-center items-center">
                  <Link href={"/events/webinars"}>Explore</Link>
                </button>
              </div>
            ) : (
              widata?.map((e) => {
                return e.registered ? (
                  <div
                    style={{
                      backgroundImage: `url("aiwebinar.png")`,
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
                ) : (
                  ""
                );
              })
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
