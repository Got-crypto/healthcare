import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography
} from '../../../../node_modules/@mui/material/index';
import { useSelector } from 'react-redux';
import { Info, Inventory } from '../../../../node_modules/@mui/icons-material/index';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { QuestionsUtils } from 'utils/TestingQuestions';


export function ToggleReplies() {
  const [reply, setReply] = useState('Yes');

  const handleChange = (reply) => {
    setReply(reply.target.value);
  };
  console.log('reply', reply);
  return (
    <ToggleButtonGroup color="info" value={reply} exclusive onChange={handleChange}>
      <ToggleButton value="Yes">Yes</ToggleButton>
      <ToggleButton value="No">No</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default function Testing() {
  const { orderDetails } = useSelector((state) => state.main);
  const testingData = orderDetails ? orderDetails[3]?.data : null;
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const hormoneSampleStatus = testingData?.StandardPackageHormoneSampleCollect__customerConfirmationStatus === 'Y' ? true : false;

  const questions = QuestionsUtils();
  console.log('questions', questions);

  const [marked, setMarked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = marked.indexOf(value);
    const newMarked = [...marked];

    if (currentIndex === -1) {
      newMarked.push(value);
    } else {
      newMarked.splice(currentIndex, 1);
    }

    setMarked(newMarked);
  };

  console.log('testingData', testingData);
  return (
    <Box>
      <List fullWidth dense>
        {questions.map(({ content, condition }, index) => {
          console.log('condition', condition);

          return (
            condition && (
              <ListItem
                key={index}
                sx={{ width: '100%', gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <ListItemIcon>
                  <Info sx={{color: 'info.main'}}/>
                </ListItemIcon>
                <ListItemText primary={content} />
                <ToggleReplies />
              </ListItem>
            )
          );
        })}
      </List>

      {!hormoneSampleStatus && (
        <Box fullWidth>
          <Typography>Will you require any of the kits re-sent to you?</Typography>
          <Typography sx={{ color: 'warning.main' }}>Please note there will be a fee for this.</Typography>
          <FormGroup sx={{ width: 'fit-content' }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} defaultChecked={!1} />}
              label={checked ? 'Enable kits' : "I'd rather not"}
            />
          </FormGroup>
        </Box>
      )}
      {checked && (
        <List elevation={1} fullWidth sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {['Hormone Test', 'Metabolic Test', 'Thyroid Test', 'Immune Test'].map((packadge, index) => {
            const packadgeId = `${packadge}-${index}`;

            return (
              <ListItem
              sx={{mx:'auto'}}
                key={packadgeId}
                secondaryAction={
                  <IconButton edge="end">
                    <Inventory />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton fullWidth onClick={handleToggle(packadge)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={marked.indexOf(packadge) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': packadgeId }}
                    />
                  </ListItemIcon>
                  <ListItemText sx={{mx: 'auto'}} id={packadgeId} primary={packadge} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
