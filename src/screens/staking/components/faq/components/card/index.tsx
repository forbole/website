import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItem,
} from "@mui/material";

import ExpandIcon from "@src/components/icons/icon_expand_more.svg";

import type { FAQProps } from "../../config";
import * as styles from "./index.module.scss";

const Card = ({
  bullet1,
  bullet2,
  bullet3,
  desc,
  expanded,
  para1,
  para2,
  para3,
  question,
  setExpanded,
  trans,
}: FAQProps) => (
  <div className={styles.wrapper}>
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
        <h3 className={styles.question}>{question}</h3>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        {para1 && <span>{para1}</span>}
        {para2 && <span>{para2}</span>}
        {trans || null}
        {para3 && <span>{para3}</span>}
        {desc && <span>{desc}</span>}
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
  </div>
);

export default Card;
