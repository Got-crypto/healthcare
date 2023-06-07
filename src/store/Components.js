import {
  HealthQuestionare,
  ImmuneTestPictrure,
  KitArrival,
  LifestyleProgram,
  Planning,
  Results,
  TestingInstructions
} from '../components/steps';

export const Components = [
  {
    component: <KitArrival />,
    id: 'kitarrival'
  },
  {
    component: <Planning />,
    id: 'planning'
  },
  {
    component: <TestingInstructions />,
    id: 'testingInstructions'
  },
  {
    component: <ImmuneTestPictrure />,
    id: 'immuneTestPictureUpload'
  },
  {
    component: <HealthQuestionare />,
    id: 'healthQuestionnaire'
  },
  {
    component: <LifestyleProgram />,
    id: 'beginLifestyleProgram'
  },
  {
    component: <Results />,
    id: 'resultsAndPersonalizedProtocol'
  }
];
