<<<<<<< HEAD
import { Typography } from '@mui/material';
import SampleButton from '../components/SampleButton';
import React from 'react';
=======
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { getDummyUsers, UsersResponse } from '@/api/sample.api';
import SampleButton from '@/components/SampleButton';
>>>>>>> dev

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
