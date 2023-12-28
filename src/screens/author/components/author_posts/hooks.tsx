import { useRouter } from "next/router";

export const useBlogPostsHook = () => {
  const router: any = useRouter();

  const handleAuthorPageChange = (_e: any, value: any) => {
    router.push({
      pathname: `/author/${router.query.author}`,
      query: { page: value },
    });
  };

  return {
    handleAuthorPageChange,
  };
};
