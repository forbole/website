import { getPageByTag } from "@api/whatsnew";
import HomePage from "@src/screens/home";
import type { GetStaticProps, NextPage } from "next";

type Props = {
  pages: {
    title: string;
    list: string[];
    imageHref: string;
    btnName: string;
    btnClick: string;
    id: string;
  }[];
};
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const pages = await getPageByTag(`${locale}_whatsnew`);
  console.log("pages", pages);
  return {
    props: { pages },
  };
};
const Home: NextPage<Props> = ({ pages }) => <HomePage pages={pages} />;

export default Home;
