/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import PostList from "views/PostList.js";
import PostForm from "views/PostForm.js";
import FieldList from "views/FieldList.js";
import UnitList from "views/UnitList.js";
import UnitForm from "views/UnitForm.js";
import UnitFormUpdate from "views/UnitFormUpdate.js";
import RfcList from "views/RfcList.js";
import RfcForm from "views/RfcForm.js";
import RfcFormUpdate from "views/RfcFormUpdate.js";

var routes = [
  {
    pro: true,
    path: "/rfc-form-update/:id",
    component: RfcFormUpdate,
    layout: "/admin",
  },
  {
    pro: true,
    path: "/unit-form-update/:id",
    component: UnitFormUpdate,
    layout: "/admin",
  },
  {
    path: "/rfc-form",
    name: "RfcForm",
    icon: "nc-icon nc-bank",
    component: RfcForm,
    layout: "/admin",
  },
  {
    path: "/rfc-list",
    name: "RfcList",
    icon: "nc-icon nc-bank",
    component: RfcList,
    layout: "/admin",
  },
  {
    path: "/unit-form",
    name: "UnitForm",
    icon: "nc-icon nc-bank",
    component: UnitForm,
    layout: "/admin",
  },
  {
    path: "/unit-list",
    name: "UnitList",
    icon: "nc-icon nc-bank",
    component: UnitList,
    layout: "/admin",
  },
  {
    path: "/field-fields",
    name: "FieldList",
    icon: "nc-icon nc-bank",
    component: FieldList,
    layout: "/admin",
  },
  {
    path: "/post-form",
    name: "PostForm",
    icon: "nc-icon nc-bank",
    component: PostForm,
    layout: "/admin",
  },
  {
    path: "/post-list",
    name: "PostList",
    icon: "nc-icon nc-bank",
    component: PostList,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/admin",
  },
];
export default routes;
