import type { GetStaticProps, NextPage } from "next";

import { getPageByTag } from "@api/whatsnew";
import HomePage, { Page } from "@src/screens/home";

type Props = {
  pages: Page[];
};
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const pages = await getPageByTag(`${locale}_whatsnew`);
  return {
    props: { pages },
  };
};
const Home: NextPage<Props> = ({ pages }: Props) => <HomePage pages={pages} />;

export default Home;
