import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: localStorage.getItem('authUser') && JSON.parse(localStorage.getItem('authUser')),
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  selectedOrder: null,
  orderDetails: null,
  componentDrawerOpen: true,
  itemCollapsed: false,
  unlockedSteps: [],
  activeStep: -1,
  steps: [
    {
      header: 'Welcome',
      id: 'welcome',
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
      id: 'beginLifestyleProgram',
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
      id: 'resultsAndPersonalizedProtocol',
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

    collapseItem(state, action) {
      state.itemCollapsed = action.payload;
    },

    getUnlockedSteps(state) {
      state.unlockedSteps = state.steps?.filter((step, index) => {
        if (state.orderDetails) {
          if (state.orderDetails[index]?.status === 'Done' || state.orderDetails[index]?.status === 'Active') return step;
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
  getUnlockedSteps
} = menu.actions;
