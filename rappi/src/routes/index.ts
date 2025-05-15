import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const ListUsers= lazy(() => import('../pages/Users/page'))
const ListAddress = lazy(() => import('../pages/Address/ListAddress'));
const ListCustomer = lazy(() => import('../pages/Customer/ListCustomer'));
const ListDriver = lazy(() => import('../pages/Driver/listDriver'));
const ListIssue = lazy(() => import('../pages/Issue/listIssue'));
const ListMenu = lazy(() => import('../pages/Menu/listMenu'));
const ListMotorcycle = lazy(() => import('../pages/Motorcycle/listMotorcycle'));
const ListOrder = lazy(() => import('../pages/Order/listOrder'));
const ListRestaurant = lazy(() => import('../pages/Restaurant/listRestaurant'));
const ListPhoto = lazy(() => import('../pages/Photo/listPhoto'));
const ListProduct = lazy(() => import('../pages/Product/listProduct'));
const ListShift = lazy(() => import('../pages/Shift/listShift'));

const coreRoutes = [
  {
    path: '/list-users',
    title: 'ListUsers',
    component: ListUsers,
  },
  {
    path: '/list-address',
    title: 'ListAddress',
    component: ListAddress,
  },
  {
    path: '/list-customer',
    title: 'ListCustomer',
    component: ListCustomer,
  },
  {
    path: '/list-driver',
    title: 'ListDriver',
    component: ListDriver,
  },
  {
    path: '/list-issue',
    title: 'ListIssue',
    component: ListIssue,
  },
  {
    path: '/list-menu',
    title: 'ListMenu',
    component: ListMenu,
  },
  {
    path: '/list-motorcycle',
    title: 'ListMotorcycle',
    component: ListMotorcycle,
  },
  {
    path: '/list-order',
    title: 'ListOrder',
    component: ListOrder,
  },
  {
    path: '/list-restaurant',
    title: 'ListRestaurant',
    component: ListRestaurant,
  },
  {
    path: '/list-photo',
    title: 'ListPhoto',
    component: ListPhoto,
  },
  {
    path: '/list-product',
    title: 'ListProduct',
    component: ListProduct,
  },
  {
    path: '/list-shift',
    title: 'ListShift',
    component: ListShift,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
