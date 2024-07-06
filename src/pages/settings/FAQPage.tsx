/* eslint-disable import/order */
import {
  Box, Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';

import { bottomNavigation, stepIndex } from '@/store/common';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '@/store/modal';
import Wrapper from '../auth/common/Wrapper';
import CommonHeader from '@/components/layout/CommonHeader';

const FAQPage = () => {
  const navigation = useNavigate();
  const setNavPage = useSetRecoilState(bottomNavigation);

  const setStepIndex = useSetRecoilState(stepIndex);

  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const faqTexts = [
    {
      title: '모드가 무엇인가요?',
      content:
        '현재 모드는 일반인, 직장인, 학생 3가지 모드가 있습니다.<br/><br/>일반인을 제외한 모드별 특정 카테고리가 있으며, 아래와 같습니다. 직장인 : 직장 - 업무, 야근, 출장, 회식 학생 : 학생 - 00, 00, 00',
    },
    {
      title: '시작하는 시간을 변경할 수 있나요?',
      content:
        '현재 모드는 일반인, 직장인, 학생 3가지 모드가 있습니다.<br/><br/>일반인을 제외한 모드별 특정 카테고리가 있으며, 아래와 같습니다. 직장인 : 직장 - 업무, 야근, 출장, 회식 학생 : 학생 - 00, 00, 00',
    },
  ];

  /**
   * get faq accordion item
   * @param param
   * @returns accordion item
   */
  const getAccordionItem = ({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) => {
    return (
      <Accordion
        id={`panel${id}-header`}
      >
        <AccordionSummary
          
          expandIcon={<ExpandMoreIcon/>}
          // sx={{
          //   '.MuiExpanded': 'color: red'
          // }}
        >
          <Typography sx={{
            color: '#FF7184',
            fontSize: '16px',
            fontWeight: '800'
          }}>Q. {title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{content}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  /**
   * get faq accordion
   */
  const getAccordion = () => {
    return (
      <Box sx={{
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // outline: '1px solid red',
        // paddingTop: 0,
        height: '100vh'
      }}>
        {faqTexts.map((faq, idx) => 
          getAccordionItem({ id: idx, title: faq.title, content: faq.content })
        )}
      </Box>
    );
  };

  useEffect(() => {
    setNavPage(2);
    setStepIndex(0);
  });

  return (
    <Wrapper
      headerComp={<CommonHeader title={'FAQ'} isShowPrevButton={true} />}
      handlePrevBtn={() => navigation('/settings')}
    >
      {getAccordion()}
    </Wrapper>
  );
};

export default FAQPage;
