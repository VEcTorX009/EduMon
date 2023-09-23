import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomLoader from "@/components/CustomLoader";
import Home from "@/components/Home";
import Welcome from "@/components/Welcome";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <SignedIn>
        <InnerApp Component={Component} pageProps={pageProps} />
      </SignedIn>
          <SignedOut>
            <Home />
          </SignedOut>
    </ClerkProvider>
  );
}

function InnerApp({ Component, pageProps }) {
  const [showpopup, setShowpopup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shownotif, setShownotif] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeEnd = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router]);

  useEffect(() => {
    const registeruser = async () => {
      event.preventDefault()
        setLoading(true);
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: user.fullName,
            email: user.emailAddresses,
            imageurl: user.imageUrl,}),
        });
        setLoading(false);
    }
    registeruser()
  }, []);
  
  

  return (
    <>
      <Head>
        <title>EduMon</title>
        <link rel="icon" href="/icon.png" type="image/x-icon"></link>
      </Head>
            <Suspense fallback={<CustomLoader/>}>
              <div className="fadein">
                {loading && <CustomLoader />}
                <div className="flex bg-transparent flex-row fixed w-full  justify-between">
                  <Sidebar />
                  <Navbar setLoading={setLoading}/>
                </div>
                {shownotif && <Welcome name={"Som"} />}
                <div className="flex  pl-[9.2vw] pt-[76.8px]">
                  <Component
                    setLoading={setLoading}
                    setShownotif={setShownotif}
                    setShowpopup={setShowpopup}
                    showpopup={showpopup}
                    {...pageProps}
                  />
                </div>
              </div>
              </Suspense>
    </>
  );
}