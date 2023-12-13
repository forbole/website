import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";

import { ExpandIcon } from "@src/components/icons";

import type { FAQProps } from "../../config";
import * as styles from "./index.module.scss";

const Card = (props: FAQProps) => {
  const theme = useTheme();
  const {
    question,
    para1,
    para2,
    trans,
    para3,
    desc,
    bullet1,
    bullet2,
    bullet3,
    expanded,
    setExpanded,
  } = props;

  return (
    <Box className={styles.wrapper}>
      <Accordion
        className={styles.accordion}
        expanded={expanded}
        onChange={setExpanded}
      >
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          sx={{
            "width": "100%",
            "padding": expanded
              ? theme.spacing(3, 5, 2, 3)
              : theme.spacing(3, 5, 3, 3),
            "> .MuiAccordionSummary-expandIconWrapper": {
              svg: {
                fill: "#878787",
              },
            },
            "& .Mui-expanded": {
              h3: {
                background:
                  "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                backgroundClip: "text",
                textFillColor: "transparent",
              },
            },
          }}
        >
          <Typography className={styles.question} variant="h3">
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            p: {
              "letterSpacing": "-0.012em",
              "color": theme.palette.custom.forbole.blue,
              "padding": theme.spacing(0, 3, 3, 3),
              "> p": {
                "paddingBottom": theme.spacing(2),
                "&:last-child": {
                  paddingBottom: theme.spacing(1),
                },
              },
              "> li": {
                padding: theme.spacing(0, 0, 1, 0),
              },
            },
          }}
        >
          {para1 && <Typography variant="body1">{para1}</Typography>}
          {para2 && <Typography variant="body1">{para2}</Typography>}
          {trans || null}
          {para3 && <Typography variant="body1">{para3}</Typography>}
          {desc && <Typography variant="body1">{desc}</Typography>}
          {bullet1 && (
            <ListItem sx={{ display: "list-item" }}>{bullet1}</ListItem>
          )}
          {bullet2 && (
            <ListItem sx={{ display: "list-item" }}>{bullet2}</ListItem>
          )}
          {bullet3 && (
            <ListItem sx={{ display: "list-item" }}>{bullet3}</ListItem>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Card;
