import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ListItem,
  Typography,
} from "@mui/material";

import { ExpandIcon } from "@src/components/icons";

import type { FAQProps } from "../../config";
import * as styles from "./index.module.scss";

const Card = ({
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
}: FAQProps) => (
  <Box className={styles.wrapper}>
    <Accordion
      className={styles.accordion}
      expanded={expanded}
      onChange={setExpanded}
    >
      <AccordionSummary
        className={[
          styles.accordionSummary,
          expanded ? styles.expanded : "",
        ].join(" ")}
        expandIcon={<ExpandIcon />}
      >
        <Typography className={styles.question} variant="h3">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        {para1 && <Typography variant="body1">{para1}</Typography>}
        {para2 && <Typography variant="body1">{para2}</Typography>}
        {trans || null}
        {para3 && <Typography variant="body1">{para3}</Typography>}
        {desc && <Typography variant="body1">{desc}</Typography>}
        {bullet1 && (
          <ListItem className={styles.bulletItem}>{bullet1}</ListItem>
        )}
        {bullet2 && (
          <ListItem className={styles.bulletItem}>{bullet2}</ListItem>
        )}
        {bullet3 && (
          <ListItem className={styles.bulletItem}>{bullet3}</ListItem>
        )}
      </AccordionDetails>
    </Accordion>
  </Box>
);

export default Card;
