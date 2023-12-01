import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";

import CtaButton from "../cta-button";

type Props = {
  title?: string;
  desc?: string;
  list?: string[];
  imageHref?: string;
  btnName?: string;
  btnClick?: () => void;
  disabled?: boolean;
};
const IntroCard = (props: Props) => {
  const {
    title,
    desc,
    list,
    imageHref = "",
    btnName,
    disabled,
    btnClick,
  } = props;

  return (
    <Box
      component="div"
      sx={{
        background: "#FFF",
        borderRadius: "24px",
        boxSizing: "border-box",
        boxShadow:
          "0px 10px 32px -4px rgba(96, 60, 238, 0.10), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxWidth: "calc(100vw - 40px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: 200,
          position: "relative",
          width: "100%",
        }}
      >
        {imageHref && (
          <Image
            alt={title ? `${title} image` : ""}
            fill
            src={imageHref}
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>
      <Box
        component="div"
        sx={{
          flex: 1,
          padding: "24px",
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "24px",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "590",
              fontSize: "20px",
              marginBottom: "12px",
              color: "#202A43",
            }}
          >
            {title}
          </Typography>

          {typeof desc && (
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "22px",
              }}
            >
              {desc}
            </Typography>
          )}
          <ul style={{ listStyle: "none" }}>
            {list?.map((item, index) => (
              <Typography
                component="li"
                key={index}
                px="10px"
                sx={{
                  "display": "flex",
                  "fontSize": "16px",
                  "lineHeight": "22px",
                  "fontWeight": "400",
                  "color": "#202A43",
                  "&:before": {
                    content: '" "',
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#202A43",
                    borderRadius: "4px",
                    verticalAlign: "middle",
                    marginRight: "10px",
                    marginTop: "10px",
                    flex: "0 0 auto",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </ul>
        </Box>
        <CtaButton
          disabled={disabled}
          onClick={btnClick}
          sx={{
            fontFamily: "590",
            alignSelf: " flex-start",
          }}
        >
          {btnName}
        </CtaButton>
      </Box>
    </Box>
  );
};

export default IntroCard;
