import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

// eslint-disable-next-line react/jsx-no-useless-fragment
const NoSSRBase = ({ children }: PropsWithChildren) => <>{children}</>;

export const NoSSR = dynamic(() => Promise.resolve(NoSSRBase), {
  ssr: false,
});
