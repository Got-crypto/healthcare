import { createSlice } from '@reduxjs/toolkit';
import {
  HealthQuestionare,
  ImmuneTestPictrure,
  KitArrival,
  LifestyleProgram,
  Planning,
  Results,
  TestingInstructions
} from '../../components/steps';

const initialState = {
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
  itemCollapsed: false,
  activeStep: -1,
  steps: [
    {
      component: KitArrival,
      header: 'Kit Arrival',
      collapse: false,
      isActive: false,
      reached: false,
      children: [
        {
          header: '',
          reached: false,
          collapse: false,
          isActive: false
        }
      ]
    },
    {
      component: Planning,
      reached: false,
      isActive: false,
      header: 'Planning',
      collapse: false,
      children: [
        {
          reached: false,
          isActive: false,
          header: '',
          collapse: false
        }
      ]
    },
    {
      component: TestingInstructions,
      reached: false,
      isActive: false,
      header: 'Testing instructions',
      collapse: false,
      children: [
        {
          reached: false,
          isActive: false,
          header: '',
          collapse: false
        }
      ]
    },
    {
      component: ImmuneTestPictrure,
      reached: false,
      isActive: false,
      header: 'Immune test picture',
      collapse: false,
      children: [
        {
          reached: false,
          isActive: false,
          header: '',
          collapse: false
        }
      ]
    },
    {
      component: HealthQuestionare,
      reached: false,
      isActive: false,
      header: 'Health Questionare',
      collapse: false,
      children: [
        {
          reached: false,
          isActive: false,
          header: '',
          collapse: false
        }
      ]
    },
    {
      component: LifestyleProgram,
      reached: false,
      isActive: false,
      header: 'Begin your Lifestyle Program',
      collapse: false,
      children: [
        {
          reached: false,
          isActive: false,
          header: '',
          collapse: false
        }
      ]
    },
    {
      component: Results,
      reached: false,
      isActive: false,
      header: 'Results and personalized protocol',
      collapse: false,
      children: [
        {
          reached: false,
          isActive: false,
          header: '',
          collapse: false
        }
      ]
    }
  ]
};

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },

    collapseItem(state, action) {
      state.itemCollapsed = action.payload;
    },

    setActiveStep(state, action) {
      if (action.payload < state.steps.length) {
        state.activeStep = action.payload;
      }

      state.steps.forEach((step, index) => {
        if (index === state.activeStep) {
          step.isActive = true;
          step.reached = true;
        } else {
          step.isActive = false;
        }
      });
    }
  }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, collapseItem, setActiveStep } = menu.actions;
