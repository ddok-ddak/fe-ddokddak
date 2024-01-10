import { Box } from '@mui/material';
import { theme } from '@/styles';

const IconWrapper = (props: {svgIcon: any, theme: any}) => {
  return <Box children={props.svgIcon} />;
};
export default IconWrapper;
