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
const CreateAddress = lazy(() => import('../pages/Address/Create'));
const CreateCustomer = lazy(() => import('../pages/Customer/Create'));
const CreateDriver = lazy(() => import('../pages/Driver/Create'));
const CreateIssue = lazy(() => import('../pages/Issue/Create'));
const CreateMenu = lazy(() => import('../pages/Menu/Create'));
const CreateMotorcycle = lazy(() => import('../pages/Motorcycle/Create'));
const CreateOrder = lazy(() => import('../pages/Order/Create'));
const CreateRestaurant = lazy(() => import('../pages/Restaurant/Create'));
const CreatePhoto = lazy(() => import('../pages/Photo/Create'));
const CreateProduct = lazy(() => import('../pages/Product/Create'));
const CreateShift = lazy(() => import('../pages/Shift/Create'));
const UpdateAddress = lazy(() => import('../pages/Address/Update'));
const UpdateCustomer = lazy(() => import('../pages/Customer/Update'));
const UpdateDriver = lazy(() => import('../pages/Driver/Update'));
const UpdateIssue = lazy(() => import('../pages/Issue/Update'));
const UpdateMenu = lazy(() => import('../pages/Menu/Update'));
const UpdateMotorcycle = lazy(() => import('../pages/Motorcycle/Update'));
const UpdateOrder = lazy(() => import('../pages/Order/Update'));
const UpdateRestaurant = lazy(() => import('../pages/Restaurant/Update'));
const UpdatePhoto = lazy(() => import('../pages/Photo/Update'));
const UpdateProduct = lazy(() => import('../pages/Product/Update'));
const UpdateShift = lazy(() => import('../pages/Shift/Update'));



const coreRoutes = [
  {
    path: '/list-users',
    title: 'ListUsers',
    component: ListUsers,
  },
  {
    path: '/update-address/:id',
    title: 'UpdateAddress',
    component: UpdateAddress,
  },
  {
    path: '/update-customer/:id',
    title: 'UpdateCustomer',
    component: UpdateCustomer,
  },
  {
    path: '/update-driver/:id',
    title: 'UpdateDriver',
    component: UpdateDriver,
  },
  {
    path: '/update-issue/:id',
    title: 'UpdateIssue',
    component: UpdateIssue,
  },
  {
    path: '/update-menu/:id',
    title: 'UpdateMenu',
    component: UpdateMenu,
  },
  {
    path: '/update-motorcycle/:id',
    title: 'UpdateMotorcycle',
    component: UpdateMotorcycle,
  },
  {
    path: '/update-order/:id',
    title: 'UpdateOrder',
    component: UpdateOrder,
  },
  {
    path: '/update-restaurant/:id',
    title: 'UpdateRestaurant',
    component: UpdateRestaurant,
  },
  {
    path: '/update-photo/:id',
    title: 'UpdatePhoto',
    component: UpdatePhoto,
  },
  {
    path: '/update-product/:id',
    title: 'UpdateProduct',
    component: UpdateProduct,
  },
  {
    path: '/update-shift/:id',
    title: 'UpdateShift',
    component: UpdateShift,
  },
  {
    path: '/create-address',
    title: 'CreateAddress',
    component: CreateAddress,
  },
  {
    path: '/create-customer',
    title: 'CreateCustomer',
    component: CreateCustomer,
  },
  {
    path: '/create-driver',
    title: 'CreateDriver',
    component: CreateDriver,
  },
  {
    path: '/create-issue',
    title: 'CreateIssue',
    component: CreateIssue,
  },
  {
    path: '/create-menu',
    title: 'CreateMenu',
    component: CreateMenu,
  },
  {
    path: '/create-motorcycle',
    title: 'CreateMotorcycle',
    component: CreateMotorcycle,
  },
  {
    path: '/create-order',
    title: 'CreateOrder',
    component: CreateOrder,
  },
  {
    path: '/create-restaurant',
    title: 'CreateRestaurant',
    component: CreateRestaurant,
  },
  {
    path: '/create-photo',
    title: 'CreatePhoto',
    component: CreatePhoto,
  },
  {
    path: '/create-product',
    title: 'CreateProduct',
    component: CreateProduct,
  },
  {
    path: '/create-shift',
    title: 'CreateShift',
    component: CreateShift,
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
