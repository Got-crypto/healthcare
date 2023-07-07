import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from '../../../../node_modules/@mui/material/index';
// import { useSelector } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Info, Inventory, Send, ThumbUp } from '../../../../node_modules/@mui/icons-material/index';

import { useEffect } from 'react';
import { handleGetCustomerOrderById, handleOverallSampling } from 'services/BeOne';
import { getUnlockedSteps, setOrderDetails } from 'store/reducers/main';
import { QuestionsUtils, additionalQuestions } from 'utils/TestingQuestions';
import { LoadingButton } from '../../../../node_modules/@mui/lab/index';
import { useSelector } from '../../../../node_modules/react-redux/es/exports';

export function ToggleReplies({ response, setAdditionalQuestionsActivated, setKitsPackages, setContactForm }) {
  const [reply, setReply] = useState('');

  const handleChange = (reply) => {
    setReply(reply.target.value);
  };

  return (
    <>
      {response === 'planning' && (
        <ToggleButtonGroup value={reply} exclusive onChange={handleChange}>
          <ToggleButton color="success" component="a" href="#planning" value="Y">
            Yes
          </ToggleButton>
          <ToggleButton color="error" value="N">
            No
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      {response === 'report' && (
        <ToggleButtonGroup value={reply} exclusive onChange={handleChange}>
          <ToggleButton color="success" onClick={() => setAdditionalQuestionsActivated(true)} value="Y">
            Yes
          </ToggleButton>
          <ToggleButton color="error" value="N">
            No
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      {response === 'contact' && (
        <ToggleButtonGroup value={reply} exclusive onChange={handleChange}>
          <ToggleButton color="success" onClick={() => setContactForm(true)} value="Y">
            Yes
          </ToggleButton>
          <ToggleButton color="error" value="N">
            No
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      {response === 'kits' && (
        <ToggleButtonGroup value={reply} exclusive onChange={handleChange}>
          <ToggleButton onClick={() => setKitsPackages(true)} color="success" value="Y">
            Yes
          </ToggleButton>
          <ToggleButton color="error" value="N">
            No
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
}

export default function Testing() {
  const [additionalQuestionsActivated, setAdditionalQuestionsActivated] = useState(false);
  const [kitsPackages, setKitsPackages] = useState(false);
  const [contactForm, setContactForm] = useState(false);
  const { questions, completeStatus } = QuestionsUtils();
  const [marked, setMarked] = useState([0]);
  const { selectedOrder } = useSelector(({ main }) => main);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const getNewOrderDetails = async () => {
    try {
      const response = await handleGetCustomerOrderById(selectedOrder);
      dispatch(setOrderDetails(response?.data));
      dispatch(getUnlockedSteps());
    } catch (error) {
      console.log('error', error);
    }
  };

  const overallCompleteSampling = async () => {
    try {
      setIsLoading(true);
      const response = await handleOverallSampling(selectedOrder, true, true, ['']);
      setIsLoading(false);
      console.log('response', response);
      setSuccessMessage(response?.data?.message);
      setErrorMessage();
      await getNewOrderDetails();
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
      setErrorMessage(error?.data?.status === 500 ? 'Sorry, This step is not active' : error?.data?.errors);
    }
  };

  useEffect(() => {
    setAdditionalQuestionsActivated(false);
    setKitsPackages(false);
    setContactForm(false);
  }, [selectedOrder]);

  return (
    <motion.div layout style={{ width: '100%' }}>
      <List dense>
        {questions.map(({ content, condition, response }, index) => {
          return (
            condition && (
              <ListItem
                key={index}
                sx={{ width: '100%', gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <ListItemIcon>
                  <Info sx={{ color: 'info.main' }} />
                </ListItemIcon>
                <ListItemText primary={content} />
                <ToggleReplies
                  response={response}
                  setAdditionalQuestionsActivated={setAdditionalQuestionsActivated}
                  setKitsPackages={setKitsPackages}
                  setContactForm={setContactForm}
                />
              </ListItem>
            )
          );
        })}
        {additionalQuestionsActivated &&
          additionalQuestions().map(({ content, response }, key) => (
            <ListItem
              key={key}
              sx={{ width: '100%', gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
              <ListItemIcon>
                <Info sx={{ color: 'info.main' }} />
              </ListItemIcon>
              <ListItemText sx={{ color: 'warning.main' }} primary={content} />
              <ToggleReplies
                response={response}
                setAdditionalQuestionsActivated={setAdditionalQuestionsActivated}
                setKitsPackages={setKitsPackages}
                setContactForm={setContactForm}
              />
            </ListItem>
          ))}
        {contactForm && (
          <>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField id="outlined-adornment-amount" label="What's the issue?" multiline maxRows={8} />
              <Button
                sx={{ backgroundColor: '#45d9c9', mt: 2, width: '20%', ':hover': { backgroundColor: '#45c0d9' } }}
                variant="contained"
                endIcon={<Send />}
                size="small"
              >
                Send
              </Button>
            </FormControl>
          </>
        )}
      </List>

      {kitsPackages && (
        <>
          <List elevation={1} sx={{ mt: 4, width: '100%', bgcolor: 'background.paper' }}>
            {['Hormone Test', 'Metabolic Test', 'Thyroid Test', 'Immune Test'].map((kitPackage, index) => {
              const kitPackageId = `${kitPackage}-${index}`;

              return (
                <ListItem
                  sx={{ mx: 'auto' }}
                  key={kitPackageId}
                  secondaryAction={
                    <IconButton edge="end">
                      <Inventory />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton onClick={handleToggle(kitPackage)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={marked.indexOf(kitPackage) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': kitPackageId }}
                      />
                    </ListItemIcon>
                    <ListItemText sx={{ mx: 'auto' }} id={kitPackageId} primary={kitPackage} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Button
            sx={{ backgroundColor: '#45d9c9', mt: 2, width: '20%', ':hover': { backgroundColor: '#45c0d9' } }}
            variant="contained"
            endIcon={<ThumbUp />}
            size="small"
          >
            Confirm
          </Button>
        </>
      )}

      {!completeStatus && (
        <LoadingButton
          loading={isLoading}
          variant="contained"
          sx={{ backgroundColor: '#45d9c9', mt: 2, ':hover': { backgroundColor: '#45c0d9' } }}
          startIcon={<ThumbUp />}
          onClick={overallCompleteSampling}
        >
          Confirm Complete
        </LoadingButton>
      )}
      {successMessage && (
        <Typography variant="body1" sx={{ color: 'success.main', mt: 1 }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" sx={{ color: 'error.main', mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </motion.div>
  );
}
