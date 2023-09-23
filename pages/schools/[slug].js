import data from "../../public/schools.json";
import Details from "@/components/Details";

export default function Workshops({ school }) {
  return <Details type={"school"} temp={school} />;
}

export async function getStaticPaths() {
  const paths = data?.map((school) => ({
    params: { slug: school.name.replace(/\s/g, "").toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const school = data.find(
    (school) => school.name.replace(/\s/g, "").toLowerCase() === params.slug
  );

  return {
    props: {
      school,
    },
  };
}
