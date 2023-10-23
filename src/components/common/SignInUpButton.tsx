import { Box, Button, Typography } from '@mui/material';

export interface SignInUpButtonProps {
  size: number;
  color: any;
  onClick?: any;
  label?: string;
  selected?: boolean;
  variant?: 'filled' | 'outlined';
  children?: any;
}

const SignInUpButton = (props: SignInUpButtonProps) => {
  return (
    <Button
    variant='contained'
    color='primary'
    size='large'
    fullWidth
    disabled={SignInUpButtonProps.isDisabled}
    onClick={SignInUpButtonProps.clickHandler}
    sx={{
        borderRadius: '5px',
        boxShadow: 'none',
        color: 'common.white',
        '&:Mui-disabled': {
        backgroundColor: 'primary.dark',
        },
    }}
  >
    {SignInUpButtonProps.text}
  </Button>
  );
};

export default SignInUpButton;
