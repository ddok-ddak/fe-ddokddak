import SampleButton from '@/components/SampleButton';

import { Typography } from '@mui/material';

const SamplePage = () => {
  return (
    <>
      <Typography variant="h1">HELLO! </Typography>
      <Typography variant="h2">This is DDOK-DDAK!</Typography>
      <SampleButton title="say hi!" />
    </>
  );
};

export default SamplePage;
