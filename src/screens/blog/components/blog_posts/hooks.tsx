import { useRouter } from "next/router";

export const useBlogPostsHook = () => {
  const router = useRouter();

  const handlePageChange = (_e: any, value: any) => {
    router.push({
      pathname: router.pathname,
      query: { page: value },
    });
  };

  return {
    handlePageChange,
  };
};
