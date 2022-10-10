export interface FAQProps {
  question: string;
  para1?: string;
  para2?: string;
  trans?: string;
  para3?: string;
  desc?: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  expanded?: boolean;
  setExpanded?: () => void;
}

export const faq: FAQProps[] = [
  {
    question: 'staking q',
    para1: 'staking para 1',
    para2: 'staking para 2',
  },
  {
    question: 'difference q',
    para1: 'difference para 1',
  },
  {
    question: 'unstaking q',
    para1: 'unstaking para 1',
    para2: 'unstaking para 2',
    para3: 'unstaking para 3',
  },
  {
    question: 'risks q',
    para1: 'risks para 1',
  },
  {
    question: 'benefits q',
    desc: 'benefits desc',
    bullet1: 'benefits bullet 1',
    bullet2: 'benefits bullet 2',
  },
  {
    question: 'reward q',
    para1: 'reward para 1',
    trans: 'reward para 2',
    para3: 'reward para 3',
  },
  {
    question: 'receiving q',
    bullet1: 'receiving bullet 1',
    bullet2: 'receiving bullet 2',
  },
  {
    question: 'drop q',
    desc: 'drop desc',
    bullet1: 'drop bullet 1',
    bullet2: 'drop bullet 2',
  },
  {
    question: 'claim q',
    para1: 'claim para 1',
  },
];
