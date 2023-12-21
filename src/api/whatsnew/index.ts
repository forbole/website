import { ghostApi as api } from "../index";

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const parseMd = (html = "") => {
  const dom = new JSDOM(html);
  const { window } = dom;

  // return window
  return window;
};

/** Get pages by tag */
export const getPageByTag = async (tag: string) => {
  try {
    const pages = (await api.pages.browse({
      filter: `tag:${tag}`,
      published_at: "desc",
    })) as { title: string; html: string; id: string }[];
    const data = pages.map((res) => {
      const window = parseMd(res.html);
      const list: string[] = [];

      Array.from(window.document.querySelectorAll("p")).forEach((i: any) =>
        list.push(i.innerHTML),
      );

      return {
        title: res.title,
        list,
        imageHref: window.document.querySelector("img")?.src,
        btnName: window.document.querySelector("a")?.innerHTML,
        btnClick: window.document.querySelector("a")?.href,
      };
    }) as {
      title: string;
      list: string[];
      imageHref: string;
      btnName: string;
      btnClick: string;
      id: string;
    }[];

    return data ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`tag: ${err}`);

    return [];
  }
};
