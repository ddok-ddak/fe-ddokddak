import {
  LinearProgress,
  LinearProgressProps,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
} from '@mui/material';

import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { processList } from '../../store/signUpProcess';
export interface ProcessItem {
  required: boolean;
  desc: string;
}
export interface Process {
  processId: number;
  title: string;
  instruction: string;
  items: {
    [key: string]: ProcessItem | null;
  };
  placeholder: string[];
  name: string[] | null;
  //   placeholder: string[] | null;
  //   validButton: string | null;
  helper: object | null;
  nextButton: string;
}

const SignUp = () => {
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [process, setProcess] = useState<Process>(processList[0]);
  const [disableNextButton, setDisabledNextButton] = useState(true);

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ minWidth: 35, marginBottom: '5px' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: '#B7B7B7',
              fontSize: '13px',
            }}
          >{`${process.processId} / ${processList.length}`}</Typography>
        </Box>
        <Box sx={{ width: '100vw', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            {...props}
            sx={{ width: '100%', backgroundColor: '#DDDDDD !important' }}
          />
        </Box>
      </Box>
    );
  }

  const handleCheckboxToggle = (idx: number) => () => {
    const currentIndex = idx;
    const newChecked: boolean[] = [...checked];
    let newValue = !newChecked[idx];
    if (currentIndex === 0) {
      // 모두 동의
      newChecked.fill(newValue);
    } else {
      newChecked[idx] = newValue;
    }
    setChecked(newChecked);
    setDisabledNextButton(!(newChecked[1] && newChecked[2] && newChecked[3]));
  };

  const handleNextButton = () => {
    let currId = process.processId;
    if (currId < 5) {
      setProcess(processList[currId++]);
    } else {
      // TODO: alert complete msg
      setProcess(processList[0]);
    }
  };

  const handlePrevButton = () => {
    let currId = process.processId;
    if (currId > 1) {
      setProcess(processList[currId - 2]);
    } else {
      // TODO: go to init page
      setProcess(processList[4]);
    }
  };

  const CheckboxItem = (idx: number, process: ProcessItem) => {
    const labelId = `checkbox-list-label-${idx}`;
    return (
      <div>
        {idx === 2 && (
          <Divider
            variant="middle"
            sx={{
              backgroundColor: '#DDDDDD',
              height: '3px',
              border: 'none',
              margin: '10px 0 10px 5px',
              width: '85%',
            }}
          />
        )}
        <ListItem key={idx} disablePadding>
          <ListItemButton
            role={undefined}
            onClick={handleCheckboxToggle(idx)}
            dense
          >
            <ListItemIcon>
              <Checkbox
                required={process.required}
                edge="start"
                sx={{ width: '21px', height: '21px' }}
                checked={checked[idx]}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={process.desc} />
          </ListItemButton>
        </ListItem>
      </div>
    );
  };

  const InputItem = (idx: number, process: Process) => {
    return (
      <FormControl
        variant="standard"
        fullWidth
        //sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Typography>{process.name[idx]}</Typography>
        <Input
          id="input"
          placeholder={process.placeholder[idx]}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
          ) => {
            let mail = event.target.value;
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
              console.log('failc');
            }
          }}
        />
        <FormHelperText>{process.helper.valid[idx]}</FormHelperText>
      </FormControl>
    );
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          sx={{
            fontWeight: '400',
            fontSize: '13px',
            color: '#949494',
            justifyContent: 'flex-start',
          }}
          onClick={handlePrevButton}
        >
          뒤로
        </Button>
        <Container
          sx={{
            fontWeight: '700',
            fontSize: '18px',
            color: '#222222',
            marginTop: '5px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              color: '#222222',
              fontWeight: '700',
              fontSize: '18px',
            }}
          >
            약관동의
          </Typography>
        </Container>
        <LinearProgressWithLabel
          value={Math.round((process.processId / processList.length) * 100)}
        />
      </Box>
      <Container sx={{ marginTop: '58px', height: '350px' }}>
        <Typography
          sx={{
            color: '#222222',
            fontWeight: '700',
            fontSize: '18px',
            marginBottom: '41px',
          }}
        >
          {process.instruction}
        </Typography>
        {process.processId === 1 && (
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            {Object.entries(process.items).map((value: object, idx: number) => {
              return CheckboxItem(idx + 1, value[1]);
            })}
          </List>
        )}
        {process.processId === 2 && (
          <div>
            {/* {Object.entries(process.items).map((value: object, idx: number) => {
              return CheckboxItem(idx + 1, value[1]);
            })} */}

            {process.name.map((value: object, idx: number) => {
              console.log(process);
              return InputItem(idx, process);
            })}
          </div>
        )}
      </Container>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        //disabled={disableNextButton}
        onClick={handleNextButton}
        sx={{
          borderRadius: '5px',
          boxShadow: 'none',
          color: '#ffffff',
          '&:Mui-disabled': {
            backgroundColor: '#DDDDDD',
          },
        }}
      >
        {process.nextButton}
      </Button>
    </Container>
  );
};

export default SignUp;
