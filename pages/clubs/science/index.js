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
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl">Science Clubs</h1>
        <div className="flex flex-row flex-wrap py-2 gap-5 z-50 ">
          {data?.map((e) => {
            return (
              e.category === "Science" && (
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
                  className="flex min-w-[24vw] text-black h-[15vw] py-6 px-6 rounded-xl justify-between items-start flex-col space-y-5"
                >
                  <div className="flex">
                    <h1 className="text-2xl text-white">{e.name}</h1>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h1 className="text-xl">Class -{e.grade}</h1>
                    <h1 className="text-xl">Batch - 2023-24</h1>
                    <h1 className="text-xl">Members - {e.members.length}</h1>
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
          })}
        </div>
      </div>
    </div>
  );
}
