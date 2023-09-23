import data from "../../../public/webinars.json";
import Details from "@/components/Details";

export default function Webinars({ webinar }) {
  webinar;
  return <Details type={"webinar"} temp={webinar} />;
}

export async function getStaticPaths() {
  const paths = data?.map((webinar) => ({
    params: { slug: webinar.title.replace(/\s/g, "").toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const webinar = data.find(
    (webinar) => webinar.title.replace(/\s/g, "").toLowerCase() === params.slug
  );

  return {
    props: {
      webinar,
    },
  };
}
