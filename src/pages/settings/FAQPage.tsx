/* eslint-disable import/order */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Container
} from '@mui/material';
import { useEffect } from 'react';

import { bottomNavigation, stepIndex } from '@/store/common';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Wrapper from '../auth/common/Wrapper';
import CommonHeader from '@/components/layout/CommonHeader';
import ChevronDown from '@/icons/setting/faq/ChevronDown';
import { theme } from '@/styles';
import BottomButton from '@/components/common/BottomButton';
import Spacer from '@/components/common/Spacer';

const FAQPage = () => {
  const navigation = useNavigate();
  const setNavPage = useSetRecoilState(bottomNavigation);

  const setStepIndex = useSetRecoilState(stepIndex);

  const faqTexts = [
    {
      title: '모드가 무엇인가요?',
      content:
      `현재 모드는 일반인, 직장인, 학생 3가지 모드가 있습니다. 
일반인을 제외한 모드별 특정 카테고리가 있으며, 아래와 같습니다. 
직장인 : 직장 - 업무, 야근, 출장, 회식 
학생 : 학생 - 공부, 강의`
    },
    {
      title: '시작하는 시간을 변경할 수 있나요?',
      content:
      `현재 모드는 일반인, 직장인, 학생 3가지 모드가 있습니다. 
일반인을 제외한 모드별 특정 카테고리가 있으며, 아래와 같습니다. 
직장인 : 직장 - 업무, 야근, 출장, 회식 
학생 : 학생 - 공부, 강의`
    },
  ];

  const getTitle = (title: string) => {
    return (
      <Typography
        sx={{
          color: '#FF7184',
          fontSize: '16px',
          fontWeight: '800',
        }}
      >
        {title}
      </Typography>
    );
  };
  const pink700 = theme.palette.pink!['700'];
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
      <Accordion key={`panel-${id}-header`}>
        <AccordionSummary
          sx={{
            ' .Mui-expanded svg path': {
              fill: pink700,
            },
          }}
          expandIcon={<ChevronDown />}
        >
          {getTitle(title)}
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{whiteSpace: 'pre'}}>{content}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  /**
   * get faq accordion
   */
  const getAccordion = () => {
    return (
      <Container sx={{ height: '70vh', paddingTop: 2 }}>
        {faqTexts.map((faq, idx) =>
          getAccordionItem({ id: idx, title: faq.title, content: faq.content }),
        )}
      </Container>
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
      <Container
        sx={{
          height: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            color: '#7F7F7F',
          }}
        >
          위 FAQ 외에 추가 1:1 질문사항이 있으신 경우
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: '#7F7F7F',
          }}
        >
          아래의 ‘1:1문의’ 버튼을 클릭해 주세요.
        </Typography>
        <Spacer y={13}/>
        <BottomButton
          btnStyleProps={{ flex: '0 0 6vh', width: '166px', borderRadius: '60px' }}
          buttonProps={{isDisabled: false, text: '1:1 문의', clickHandler: () => {}}}
        />
      </Container>
    </Wrapper>
  );
};

export default FAQPage;
