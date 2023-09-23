import Details from "@/components/Details";
import data from "../../public/clubs.json";
export default function Club({ club }) {
  return <Details type={"club"} temp={club} />;
}

export async function getStaticPaths() {
  const paths = data?.map((club) => ({
    params: { slug: club.name.replace(/\s/g, "").toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const club = data.find(
    (club) => club.name.replace(/\s/g, "").toLowerCase() === params.slug
  );

  return {
    props: {
      club,
    },
  };
}
