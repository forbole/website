import { Link, Typography } from "@mui/material";
import ReactMarkdown from "markdown-to-jsx";

const options = {
  disableParsingRawHTML: true,
  forceBlock: true,
  overrides: {
    h1: {
      component: Typography,
      props: {
        variant: "h1",
      },
    },
    h2: {
      component: Typography,
      props: {
        variant: "h2",
      },
    },
    h3: {
      component: Typography,
      props: {
        variant: "h3",
      },
    },
    h4: {
      component: Typography,
      props: {
        variant: "h4",
      },
    },
    h5: {
      component: Typography,
      props: {
        variant: "h5",
      },
    },
    h6: {
      component: Typography,
      props: {
        variant: "h6",
      },
    },
    default: {
      component: Typography,
      props: {
        variant: "h6",
      },
    },
    p: {
      component: Typography,
      props: {
        variant: "body1",
      },
    },
    span: {
      component: Typography,
      props: {
        variant: "body1",
      },
    },
    a: {
      component: Link,
      props: {
        target: "_blank",
        onClick: (e: any) => e.stopPropagation(),
      },
    },
  },
};

const Markdown = (props: any) => <ReactMarkdown options={options} {...props} />;

export default Markdown;
