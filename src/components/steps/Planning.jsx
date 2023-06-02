import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography
} from '../../../node_modules/@mui/material/index';
import { ExpandMore, ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Planning({ step }) {
  const [isClicked, setIsClicked] = useState(false);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  console.log('three', three);
  const handleClick = () => [setIsClicked(true)];

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleResize = () => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
    } else setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12}>
          <Box sx={{ flex: 'wrap' }}>
            <Typography variant="h2" color="textPrimary">
              Planning
            </Typography>
            <Typography>
              Click{' '}
              <Typography component="span" onClick={handleClick} sx={{ color: 'primary.main', cursor: 'pointer' }}>
                here
              </Typography>{' '}
              to start Planning your testing steps
            </Typography>
            {isClicked && (
              <Box sx={{ mt: 2 }}>
                <Typography>
                  This package contains a battery of tests. Each test has specific timelines and procedures. Here we will guide you through
                  the process of planning for each one in the right order and so that they can be delivered while still viable to the
                  laboratories.
                </Typography>

                <Box sx={{ mt: 2, width: 'full' }}>
                  <>
                    <Accordion sx={{ width: 'auto', p: 2 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h3">Hormone Test</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body1">Instructions</Typography>
                            <Typography variant="body2">
                              There are{' '}
                              <Typography component="span" sx={{ color: 'primary.main' }}>
                                three
                              </Typography>{' '}
                              main criteria that dictate when the test can be done
                            </Typography>
                            <Typography
                              onClick={() => {
                                setTwo(false);
                                setThree(false);
                                setOne((current) => !current);
                              }}
                              sx={{ ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                              variant="body2"
                            >
                              1. Length of your cycle (the test needs to be done 5 days post ovulation)
                            </Typography>
                            <Collapse in={one} timeout="auto" unmountOnExit>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                If you have a regular cycle: For women with a 28 day cycle the test should be done between day 19-22 (day 1
                                is the 1st day of your menstruation) If the cycle is longer, e.g. 29 days add one day – test between day
                                20-23 If the cycle is shorter, e.g. 27 days remove one day – test between day 18-21 Adjust according to your
                                cycle length
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                If you have an irregular cycle You will need to use ovulation strips to ensure that you test at the right
                                time. Ovulation strips can be purchased in most pharmacies as well as online Use 1 ovulation test each
                                morning starting on day 7 of your cycle (counting from the first day of flow) until you get the first faint
                                positive result on an ovulation strip. This is considered day one and you will aim to test between days 5 &
                                7.
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                If you are not menstruating Testing can happen at any time of the month
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 1, color: 'warning.main' }}>
                                Enter when your testing window starts
                              </Typography>
                            </Collapse>
                            <Typography
                              onClick={() => {
                                setOne(false);
                                setThree(false);
                                setTwo((current) => !current);
                              }}
                              sx={{ ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                              variant="body2"
                            >
                              2. Preparation time prior to taking the samples (two days prior to the test there are foods and supplements)
                              to avoid
                            </Typography>
                            <Collapse in={two} timeout="auto" unmountOnExit>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                                  Note that:
                                </Typography>
                                It is best to postpone testing if you have had an unusually bad night of sleep. Therefore, avoid planning to
                                test on the last day in the testing window as you may then need to wait a whole month. We suggest to aim for
                                the 1st or 2nd day of your testing window
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                If bad sleep is the norm for you, then contact us to add the insomnia sample to your test (the insomnia test
                                incurs an extra cost)
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                For 48 hours prior to testing you will{' '}
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                  need to avoid:
                                </Typography>
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Foods: Avocado, banana, fava beans or too much of any one particular food
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Supplements: Tryrosine, l-Dopa, DLPA, Mucuna, Quercetin
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                For 24 hours prior to testing you will{' '}
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                  also need to avoid
                                </Typography>
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Drinks: No caffeine or alcohol day before and day of collection Exercise – no vigorous on day of collection
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 1, color: 'warning.main' }}>
                                Will you be able to prepare for two days prior the 1st of or maximum the 2nd day of your testing window?
                              </Typography>
                              <FormGroup sx={{ width: 'fit-content' }}>
                                <FormControlLabel
                                  control={<Switch checked={checked} onChange={handleChange} defaultUnChecked />}
                                  label={checked ? 'Yes' : 'No'}
                                />
                              </FormGroup>
                            </Collapse>
                            <Typography
                              onClick={() => {
                                setOne(false);
                                setTwo(false);
                                setThree((current) => !current);
                              }}
                              sx={{ ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                              variant="body2"
                            >
                              3. Your availability to take the samples at the specific times required throughout the day
                            </Typography>
                            <Collapse in={three} timeout="auto" unmountOnExit>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Urine and saliva samples will need to be taken throughout the day. See below the collection times so that
                                you can ensure you have the time to take the samples
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Upon waking -1st sample: saliva and urine
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                30 mins after waking- 2nd sample: saliva only
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                60 mins after waking- 3rd sample: saliva
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                2-3hrs after waking -4th sample: urine only
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                16:00-17:00 -5th sample: urine only
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                22:00-24:00- 6th sample: saliva and urine
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 1, color: 'warning.main' }}>
                                Confirm sampling date
                              </Typography>
                            </Collapse>
                            <Button startIcon={<ThumbUp />} sx={{ mx: 'auto', mt: 5 }} variant="contained">
                              Proceed
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">Select a Date</Typography>
                            <Box sx={{ width: 'full', height: 'full', position: 'relative' }}>
                              {isMobile ? (
                                <DatePicker />
                              ) : (
                                <DateCalendar sx={{ positions: 'relative' }} dayOfWeekFormatter={(day) => day} />
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    <Typography variant="body1" sx={{ ml: 1, mt: 1, color: 'success.main' }}>
                      Great now lets plan the next tests
                    </Typography>
                  </>
                </Box>
                <Box sx={{ mt: 2, width: 'full' }}>
                  <>
                    <Accordion sx={{ width: 'auto', p: 2 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h3">Metabollic, Immune and Thyroid Test</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Typography variant="subtitle" sx={{ ml: 1, mt: 5, color: 'warning.main' }}>
                            Aim to schedule this test as close as possible to the previous one – ideally within the same week. Please note
                            that the sampling process will take two days and testing cannot happen during mensuration
                          </Typography>
                          <Grid item xs={6}>
                            <Typography variant="body1">Instructions</Typography>
                            <Typography variant="body2">
                              There are{' '}
                              <Typography component="span" sx={{ color: 'primary.main' }}>
                                three
                              </Typography>{' '}
                              main criteria that dictate when the test can be done
                            </Typography>
                            <Typography
                              onClick={() => {
                                setTwo(false);
                                setThree(false);
                                setOne((current) => !current);
                              }}
                              sx={{ ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                              variant="body2"
                            >
                              1. Testing cannot happen while menstruating
                            </Typography>
                            <Collapse in={one} timeout="auto" unmountOnExit>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                If you have a regular cycle: For women with a 28 day cycle the test should be done between day 19-22 (day 1
                                is the 1st day of your menstruation) If the cycle is longer, e.g. 29 days add one day – test between day
                                20-23 If the cycle is shorter, e.g. 27 days remove one day – test between day 18-21 Adjust according to your
                                cycle length
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                If you have an irregular cycle You will need to use ovulation strips to ensure that you test at the right
                                time. Ovulation strips can be purchased in most pharmacies as well as online Use 1 ovulation test each
                                morning starting on day 7 of your cycle (counting from the first day of flow) until you get the first faint
                                positive result on an ovulation strip. This is considered day one and you will aim to test between days 5 &
                                7.
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                If you are not menstruating Testing can happen at any time of the month
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 1, color: 'warning.main' }}>
                                Enter when your testing window starts
                              </Typography>
                            </Collapse>
                            <Typography
                              onClick={() => {
                                setOne(false);
                                setThree(false);
                                setTwo((current) => !current);
                              }}
                              sx={{ ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                              variant="body2"
                            >
                              2. Preparation time prior to taking the samples (two days prior to the test there are foods and supplements)
                            </Typography>
                            <Collapse in={two} timeout="auto" unmountOnExit>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                For 48 hours prior to testing you will need to:
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - Discontinue all non-essential medication and supplements, including fortified food and drinks or meal
                                replacement.{' '}
                                <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                                  Do not stop essential medications{' '}
                                </Typography>
                                such as heart medication, thyroid hormones etc
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - Avoid Seafood
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - Continue with these food + supplement restrictions until all your samples are completely collected
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, color: 'warning.main' }}>
                                If in any way unsure, please contact us.
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 2 }}>
                                24 hours before the test
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                Eat your usual diet, with the exception of any fortified foods/drinks and meal replacements
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                Also avoid over consuming any single food.
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                Limit fluid intake to 2 litres of fluids for the 24 hours period before urine collection
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 2 }}>
                                The night before the bloodspot sample collection
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                Fast starting at least 8 hours prior to the morning collection
                              </Typography>
                              <FormGroup sx={{ width: 'fit-content' }}>
                                <FormControlLabel
                                  control={<Switch checked={checked} onChange={handleChange} defaultUnChecked />}
                                  label={checked ? 'Yes' : 'No'}
                                />
                              </FormGroup>
                            </Collapse>
                            <Typography
                              onClick={() => {
                                setOne(false);
                                setTwo(false);
                                setThree((current) => !current);
                              }}
                              sx={{ ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                              variant="body2"
                            >
                              3. Timings and requirements for day one and day two of testing
                            </Typography>
                            <Collapse in={three} timeout="auto" unmountOnExit>
                              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                                Day 1
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Total time required: 30-45 minutes
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Need to collect first morning urine and some drops of blood before eating or drinking anything
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Also, will need to collect each urination for the entire day (some patients prefer to do this when they can
                                be at home)
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                You will need access to:
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - A timer/clock and a camera (your phone will work for both)
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - Warm water
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - A freezer to prepare the freeze block needed on day
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 2, fontWeight: 'bold' }}>
                                Day 2
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Total time required: 30-45 minutes
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Need to collect mouth swabs before eating, drinking or brushing teeth and urine before eating or drinking
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                Ensure that DHL has been booked to pick up the samples
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                You will need access to:
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - a glass or a container to allow the swabs to dry without touching anythin
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                - A freezer for at least 2 hours to ensure the samples are frozen before sending
                              </Typography>
                              <Typography variant="body2" sx={{ ml: 1, mt: 1, color: 'warning.main' }}>
                                Taking into account your menstruation, preparation and sampling requirements, Confirm the first day of the
                                two consecutive sampling dates n.2
                              </Typography>
                            </Collapse>
                            <Button startIcon={<ThumbUp />} sx={{ mx: 'auto', mt: 5 }} variant="contained">
                              Proceed
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">Select a Date</Typography>
                            <Box sx={{ width: 'full', height: 'full', position: 'relative' }}>
                              {isMobile ? (
                                <DatePicker />
                              ) : (
                                <DateCalendar sx={{ positions: 'relative' }} dayOfWeekFormatter={(day) => day} />
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      )}
    </>
  );
}

export default Planning;
