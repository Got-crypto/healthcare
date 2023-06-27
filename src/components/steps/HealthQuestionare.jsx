import { useEffect, useState } from 'react';
import { handlePopulateSchema, handleSubmitQuestions } from 'services/BeOne';
import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';

import { FormTemplate, componentMapper } from '@data-driven-forms/mui-component-mapper';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';

import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function HealthQuestionare() {
  const [schema, setSchema] = useState({
    fields: []
  });
  const [submitSuccess, setSubmitSuccess] = useState();
  const [submitError, setSubmitError] = useState();
  const [formValidation, setFormValidation] = useState();

  const { selectedOrder } = useSelector(({ main }) => main);

  const { handleSubmit } = useForm();

  const submitQuestions = async (value) => {
    const submittedForm = schema.fields.map(({ component, description, title, name, fields }) => {
      const handleFieldValues = () => {
        if (component === 'sub-form') {
          const selectedFields = fields.filter((checkbox) => value[checkbox.name]);

          const finalSelectedAnswers = selectedFields.map((field) => field.label);
        
          return finalSelectedAnswers.length === 0 ? 'none' : finalSelectedAnswers;
        }

        return value[name];
      };

      return {
        question: description || title,
        answer: handleFieldValues()
      };
    });

    const answers = submittedForm.filter(({ answer }) => answer !== null && answer !== undefined);
    console.log('answers', answers);

    if (answers.length === schema.fields.length) {
      setFormValidation();
      try {
        const response = await handleSubmitQuestions(selectedOrder, answers);

        setSubmitSuccess(response.data?.message);
        setSubmitError();
      } catch (error) {
        setSubmitError(error?.data?.status !== 500 ? error?.data?.errors : 'Sorry, This step is not active');
        setSubmitSuccess();
      }
    } else {
      setFormValidation('Please check and answer all questions to proceed');
    }
  };

  const Form = () => (
    <FormRenderer
      schema={schema}
      componentMapper={componentMapper}
      FormTemplate={FormTemplate}
      onSubmit={(value) => handleSubmit(submitQuestions(value))}
    />
  );

  useEffect(() => {
    const getSchema = async () => {
      try {
        const response = await handlePopulateSchema();
        const fields = response?.data?.questionJson?.fields;
        setSchema({ fields });
      } catch (error) {
        console.log('error', error);
      }
    };

    getSchema();
  }, []);
  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap' }}>
          <Typography variant="h2" color="textPrimary">
            Health Questionare
          </Typography>
          <Typography sx={{ mt: 2 }}>
            We have a few questions that we will need you to answer in order for us to be able to analyze the results of the tests.
          </Typography>

          <Box sx={{ mt: 3 }}>{Form()}</Box>

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            {submitSuccess && (
              <Typography variant="body1" sx={{ color: 'success.main' }}>
                {submitSuccess}
              </Typography>
            )}
            {submitError ||
              (formValidation && (
                <Typography variant="body1" sx={{ color: 'error.main' }}>
                  {submitError || formValidation}
                </Typography>
              ))}
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(HealthQuestionare, 'healthQuestionnaire', !1);
