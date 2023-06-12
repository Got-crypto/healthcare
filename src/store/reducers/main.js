import { createSlice } from '@reduxjs/toolkit';

import { userDetailsStorage, userOrderStorage } from 'store/sessionstorage';

const initialState = {
  authUser: userDetailsStorage
    ? JSON.parse(userDetailsStorage)
    : {
        ageInYears: null,
        title: null,
        firstName: null,
        lastName: null,
        username: null,
        middleName: null,
        gender: null,
        email: null,
        mobileNumber: null,
        base64Url: null,
        dob: null,
        height: null,
        heightUnit: null,
        weight: null,
        weightUnit: null,
        shopifyCustomerId: null
      },
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  selectedOrder: JSON.parse(userOrderStorage) || null,
  orderDetails: null,
  componentDrawerOpen: true,
  itemCollapsed: false,
  unlockedSteps: [],
  activeStep: -1,
  steps: [
    {
      header: 'Welcome',
      id: 'welcome',
      short: 'Welcome',
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
      header: 'Kit Arrival',
      id: 'kitarrival',
      short: 'Kit Arrival',
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
      id: 'planning',
      reached: false,
      isActive: false,
      header: 'Planning',
      short: 'Planning',
      collapse: true,
      children: [
        {
          reached: false,
          isActive: false,
          header: 'Hormone Test',
          collapse: false
        },
        {
          reached: false,
          isActive: false,
          header: 'Metabollic, Immune and Thyroid Test',
          collapse: false
        }
      ]
    },
    {
      id: 'testingInstructions',
      reached: false,
      isActive: false,
      header: 'Testing instructions',
      collapse: false,
      short: 'Testing',
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
      id: 'immuneTestPictureUpload',
      reached: false,
      short: 'Immune Test',
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
      id: 'healthQuestionnaire',
      reached: false,
      isActive: false,
      header: 'Health Questionnaire',
      short: 'Questionnaire',
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
      id: 'beginLifestyleProgram',
      reached: false,
      isActive: false,
      header: 'Begin your Lifestyle Program',
      short: 'Lifestyle',
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
      id: 'resultsAndPersonalizedProtocol',
      reached: false,
      isActive: false,
      header: 'Results and personalized protocol',
      short: 'Results',
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
  name: 'main',
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

    setAuthUserDetails(state, action) {
      state.authUser = action.payload;
    },

    collapseItem(state, action) {
      state.itemCollapsed = action.payload;
    },

    getUnlockedSteps(state) {
      state.unlockedSteps = state.steps?.filter((step, index) => {
        if (state.orderDetails) {
          if (state.orderDetails[index]?.status?.toLowerCase() === 'done' || state.orderDetails[index]?.status?.toLowerCase() === 'active')
            return step;
        }
      });
    },

    setActiveStep(state, action) {
      if (action.payload < state.steps.length) {
        state.activeStep = action.payload;
      }
      state.steps.forEach((step, index) => {
        if (index === state.activeStep) {
          step.isActive = true;
        } else {
          step.isActive = false;
        }
      });
    },
    selectOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    }
  }
});

export default menu.reducer;

export const {
  activeItem,
  activeComponent,
  openDrawer,
  openComponentDrawer,
  collapseItem,
  setActiveStep,
  selectOrder,
  setOrderDetails,
  getUnlockedSteps,
  setAuthUserDetails
} = menu.actions;
