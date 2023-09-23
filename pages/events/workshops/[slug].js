import data from "../../../public/workshops.json";
import Details from "@/components/Details";

export default function Workshops({ workshop }) {
  return <Details type={"workshop"} temp={workshop} />;
}

export async function getStaticPaths() {
  const paths = data?.map((workshop) => ({
    params: { slug: workshop.title.replace(/\s/g, "").toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const workshop = data.find(
    (workshop) =>
      workshop.title.replace(/\s/g, "").toLowerCase() === params.slug
  );

  return {
    props: {
      workshop,
    },
  };
}
