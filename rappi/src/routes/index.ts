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
const viewAddress = lazy(() => import('../pages/Address/View'));
const viewCustomer = lazy(() => import('../pages/Customer/View'));
const viewDriver = lazy(() => import('../pages/Driver/View'));
const viewIssue = lazy(() => import('../pages/Issue/View'));
const viewMenu = lazy(() => import('../pages/Menu/View'));
const viewMotorcycle = lazy(() => import('../pages/Motorcycle/View'));
const viewOrder = lazy(() => import('../pages/Order/View'));
const viewRestaurant = lazy(() => import('../pages/Restaurant/View'));
const viewPhoto = lazy(() => import('../pages/Photo/View'));
const viewProduct = lazy(() => import('../pages/Product/View'));
const viewShift = lazy(() => import('../pages/Shift/View'));
const Mapa = lazy(() => import('../pages/map/TrackingPage'));
const infraccionMotorcicle = lazy(() => import('../pages/MotorcileInfraingement/create'));




const coreRoutes = [
  {
  path: '/infraccionMotorcicle',
  title: 'InfraccionMotorcicle',
  component: infraccionMotorcicle, 
},
  {
  path: '/tracking',
  title: 'Tracking',
  component: Mapa, 
},

  {
    path: '/list-users',
    title: 'ListUsers',
    component: ListUsers,
  },
  {
    path: '/address/update/:id',
    title: 'UpdateAddress',
    component: UpdateAddress,
  },
  {
    path: '/customer/update/:id',
    title: 'UpdateCustomer',
    component: UpdateCustomer,
  },
  {
    path: '/driver/update/:id',
    title: 'UpdateDriver',
    component: UpdateDriver,
  },
  {
    path: '/issue/update/:id',
    title: 'UpdateIssue',
    component: UpdateIssue,
  },
  {
    path: '/menu/update/:id',
    title: 'UpdateMenu',
    component: UpdateMenu,
  },
  {
    path: '/motorcycle/update/:id',
    title: 'UpdateMotorcycle',
    component: UpdateMotorcycle,
  },
  {
    path: '/order/update/:id',
    title: 'UpdateOrder',
    component: UpdateOrder,
  },
  {
    path: '/restaurant/update/:id',
    title: 'UpdateRestaurant',
    component: UpdateRestaurant,
  },
  {
    path: '/photo/update/:id',
    title: 'UpdatePhoto',
    component: UpdatePhoto,
  },
  {
    path: '/product/update/:id',
    title: 'UpdateProduct',
    component: UpdateProduct,
  },
  {
    path: '/shift/update/:id',
    title: 'UpdateShift',
    component: UpdateShift,
  },
  {
    path: '/address/create',
    title: 'CreateAddress',
    component: CreateAddress,
  },
  {
    path: '/customer/create',
    title: 'CreateCustomer',
    component: CreateCustomer,
  },
  {
    path: '/driver/create',
    title: 'CreateDriver',
    component: CreateDriver,
  },
  {
    path: '/issue/create',
    title: 'CreateIssue',
    component: CreateIssue,
  },
  {
    path: '/menu/create',
    title: 'CreateMenu',
    component: CreateMenu,
  },
  {
    path: '/motorcycle/create',
    title: 'CreateMotorcycle',
    component: CreateMotorcycle,
  },
  {
    path: '/order/create',
    title: 'CreateOrder',
    component: CreateOrder,
  },
  {
    path: '/restaurant/create',
    title: 'CreateRestaurant',
    component: CreateRestaurant,
  },
  {
    path: '/photo/create',
    title: 'CreatePhoto',
    component: CreatePhoto,
  },
  {
    path: '/product/create',
    title: 'CreateProduct',
    component: CreateProduct,
  },
  {
    path: '/shift/create',
    title: 'CreateShift',
    component: CreateShift,
  },
  {
    path: '/address/list',
    title: 'ListAddress',
    component: ListAddress,
  },
  {
    path: '/customer/list',
    title: 'ListCustomer',
    component: ListCustomer,
  },
  {
    path: '/driver/list',
    title: 'ListDriver',
    component: ListDriver,
  },
  {
    path: '/issue/list',
    title: 'ListIssue',
    component: ListIssue,
  },
  {
    path: '/menu/list',
    title: 'ListMenu',
    component: ListMenu,
  },
  {
    path: '/motorcycle/list',
    title: 'ListMotorcycle',
    component: ListMotorcycle,
  },
  {
    path: '/order/list',
    title: 'ListOrder',
    component: ListOrder,
  },
  {
    path: '/restaurant/list',
    title: 'ListRestaurant',
    component: ListRestaurant,
  },
  {
    path: '/photo/list',
    title: 'ListPhoto',
    component: ListPhoto,
  },
  {
    path: '/product/list',
    title: 'ListProduct',
    component: ListProduct,
  },
  {
    path: '/shift/list',
    title: 'ListShift',
    component: ListShift,
  },
  {
    path: 'address/view/:id',
    title: 'viewAddress',
    component: viewAddress,
  },
  {
    path: 'customer/view/:id',
    title: 'viewCustomer',
    component: viewCustomer,
  },
  {
    path: 'driver/view/:id',
    title: 'viewDriver',
    component: viewDriver,
  },
  {
    path: 'issue/view/:id',
    title: 'viewIssue',
    component: viewIssue,
  },
  {
    path: 'menu/view/:id',
    title: 'viewMenu',
    component: viewMenu,
  },
  {
    path: 'motorcycle/view/:id',
    title: 'viewMotorcycle',
    component: viewMotorcycle,
  },
  {
    path: 'order/view/:id',
    title: 'viewOrder',
    component: viewOrder,
  },
  {
    path: 'restaurant/view/:id',
    title: 'viewRestaurant',
    component: viewRestaurant,
  },
  {
    path: 'photo/view/:id',
    title: 'viewPhoto',
    component: viewPhoto,
  },
  {
    path: 'product/view/:id',
    title: 'viewProduct',
    component: viewProduct,
  },
  {
    path: 'shift/view/:id',
    title: 'viewShift',
    component: viewShift,
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
