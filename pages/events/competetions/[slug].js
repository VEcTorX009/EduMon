import data from "../../../public/competetions.json";
import Details from "@/components/Details";

export default function Competetions({ competetion }) {
  return <Details type={"competetion"} temp={competetion} />;
}

export async function getStaticPaths() {
  const paths = data?.map((competetion) => ({
    params: { slug: competetion.title.replace(/\s/g, "").toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const competetion = data.find(
    (competetion) =>
      competetion.title.replace(/\s/g, "").toLowerCase() === params.slug
  );

  return {
    props: {
      competetion,
    },
  };
}
