import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CustomLoader from "./CustomLoader";
import { fetchData } from "./fetchData";

export default function navbar({ setLoading }) {
  const [data, setData] = useState([]);
  const [showbtn, setShowbtn] = useState(false);
  const initialTodos = [
    {
      title: "Complete Webinar Revision",
      assigned: "Prof. John",
    },
    {
      title: "English Literature Activity Analysis",
      assigned: "English Club",
    },
    {
      title: "Board Meeting Today",
      assigned: "President",
    },
  ];
  const [tasks, setTasks] = useState(initialTodos);
  const [completedTasks, setCompletedTasks] = useState([]);
  const app = useRouter();
  const [showai, setShowai] = useState(false);
  useEffect(() => {
    Promise.all([fetchData("notifications")])
      .then(([data]) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [temp, setTemp] = useState({
    title: "",
    assigned: "You",
  });

  const [shownotif, setShownotif] = useState("");

  const addTodo = () => {
    if (temp.title.trim() === "") {
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        title: temp.title,
        assigned: temp.assigned,
      },
    ]);

    setTemp({
      title: "",
      assigned: "You",
    });

    setShowbtn(false);
  };
  const addaiTodo = () => {
    setLoading(true);
    const newTasks = [
      {
        title: "Start Skimming through trignometry notes",
        assigned: "EduMon",
      },
      {
        title: "Note Down Important Formulas",
        assigned: "EduMon",
      },
      {
        title: "Review Past Exam Patterns",
        assigned: "EduMon",
      },
      {
        title: "Practice Questions",
        assigned: "EduMon",
      },
    ];

    setTasks((prevTasks) => [...prevTasks, ...newTasks]);

    setTemp({
      title: "",
      assigned: "You",
    });

    setShowbtn(false);

    setShowai(false);
    setShowbtn(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };
  const [fake, setFake] = useState("");
  const toggleTaskCompletion = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks((prevCompletedTasks) =>
        prevCompletedTasks.filter((item) => item !== index)
      );
    } else {
      setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, index]);
    }
  };
  const handleai = (event) => {
    if (event.key === "Enter") {
      addaiTodo();
    }
  };

  return (
    <>
      <div className="flex z-100 h-[76.8px] backdrop-blur-xl  justify-between   text-white items-start  border-b-gray-600 border-b-2  top-0 flex-row py-5 px-5 ml-0 w-full font-semibold">
        <div className="flex flex-col text-white text-3xl ">
          <h1>
            {app.pathname === "/" ? (
              "Home"
            ) : app.pathname === "/explore" ? (
              "Explore"
            ) : app.pathname === "/clubs" ? (
              "Clubs"
            ) : app.pathname === "/events" ? (
              "Events"
            ) : (
              <Image
                src="/back.svg"
                className="cursor-pointer"
                onClick={() => app.back()}
                width={30}
                height={30}
              />
            )}
          </h1>
        </div>
        <div className="flex flex-row  space-x-4">
          <Image
            onClick={() => {
              shownotif === ""
                ? setShownotif("notification")
                : setShownotif("");
            }}
            src="/notifications.svg"
            className="cursor-pointer"
            width={30}
            height={30}
          />
          <Image
            src="/todo.svg"
            onClick={() => {
              shownotif === "" ? setShownotif("todo") : setShownotif("");
            }}
            width={30}
            className="cursor-pointer"
            height={30}
          />
          <UserButton />
        </div>
      </div>
      <div
        className={`w-[384px] flex flex-col transition-all ${
          shownotif === "notification"
            ? "translate-y-0"
            : "translate-y-[-1094.4px]"
        } z-20 space-y-4 right-0 top-20 fixed items-center p-5 text-white bg-[#040a0f] backdrop-blur-3xl h-full`}
      >
        <h1 className="text-3xl">Notifications</h1>
        <div className="flex flex-col w-full space-y-3">
          {!data ? (
            <CustomLoader />
          ) : (
            data?.map((e, index) => (
              <Link
                key={index}
                href={e.link}
                className="flex rounded-xl flex-row cursor-pointer space-x-3 p-2 border border-gray-600"
              >
                <Image src="/todo.svg" width={30} height={30} />
                <div className="flex flex-col">
                  <h1 className="text-xl">{e.title}</h1>
                  <h1 className="text-md text-gray-600">{e.description}</h1>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div
        className={`w-[384px] flex flex-col transition-all ${
          shownotif === "todo" ? "translate-y-0" : "translate-y-[-1094.4px]"
        } z-20 space-y-4 right-0 top-20 fixed items-center p-5 text-white bg-[#040a0f] backdrop-blur-3xl h-full`}
      >
        <h1 className="text-3xl">Tasks</h1>
        <div className="flex flex-col w-full space-y-3">
          {tasks?.length === 0 ? (
            <div className="flex flex-col h-[10vw] w-full text-center items-center justify-center text-3xl text-white">
              No Tasks Yet!
            </div>
          ) : (
            tasks?.map((e, index) => {
              const isCompleted = completedTasks.includes(index);

              return (
                <div
                  key={index}
                  className={`flex ${
                    e.assigned === "EduMon" ? " fade" : ""
                  } rounded-xl flex-row cursor-pointer space-x-3 p-2 border border-gray-600 ${
                    isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  <Image
                    src="/todo.svg"
                    onClick={() => toggleTaskCompletion(index)}
                    width={30}
                    height={30}
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xl">{e.title}</h1>
                    <h1 className="text-md text-gray-600">{e.assigned}</h1>
                  </div>
                </div>
              );
            })
          )}
          <div className="flex flex-col w-full border border-gray-600 p-4">
            {showbtn && (
              <div>
                <input
                  type="text"
                  value={temp.title}
                  name="task"
                  aria-multiline={false}
                  id="task"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setTemp({ ...temp, title: e.target.value })}
                  placeholder="Title..."
                  className="h-[38.24px] w-[284px] border border-gray-600 rounded-2xl text-xl text-white bg-transparent backdrop-blur-3xl font-poppins pageentry p-2"
                ></input>
              </div>
            )}
            {!showbtn && !showai && (
              <button
                onClick={() => setShowbtn(true)}
                className="px-12 z-100 mb-4 z-50 cursor-pointer text-xl py-2 rounded-xl bg-white text-black justify-center items-center"
              >
                ADD
              </button>
            )}
            {!showbtn && !showai && (
              <button
                onClick={() => setShowai(true)}
                className="px-12 z-100 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center"
              >
                ASK EDUMON
              </button>
            )}
            {showai && (
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={fake}
                  name="task"
                  aria-multiline={true}
                  id="task"
                  onKeyDown={handleai}
                  onChange={(e) => setFake(e.target.value)}
                  placeholder="What do you want to get done?"
                  className="h-full w-[284px] border border-gray-600 rounded-2xl text-xl text-white bg-transparent backdrop-blur-3xl font-poppins pageentry p-2"
                ></input>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
