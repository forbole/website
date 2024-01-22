import { useEffect, useState } from "react";

export const useMiddleEllipsis = (text: string, chars: number) => {
  const [parsedText, setParsedText] = useState<string>("");

  useEffect(() => {
    const listener = () => {
      const parsed = `${text.substring(0, chars)}...${text.substring(
        text.length - chars,
        text.length,
      )}`;

      setParsedText(parsed);
    };

    // In the future this can be updated to listen to a resize event
    listener();
  }, [text, chars]);

  if (!parsedText) return null;

  return parsedText;
};
