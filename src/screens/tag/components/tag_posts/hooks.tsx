import { useRouter } from "next/router";

export const useBlogPostsHook = () => {
  const router: any = useRouter();

  const handleTagPageChange = (e: any, value: any) => {
    router.push({
      pathname: `/tag/${router.query.tag}/${value === 1 ? "" : value}`,
    });
  };

  return {
    handleTagPageChange,
  };
};
