/* 按需引入ant design 组件 */
import Vue from 'vue';
import {
  LocaleProvider,
  Modal,
  notification,
  message,
  Layout,
  Menu,
  Icon,
  Row,
  Col,
  Button,
  Radio,
  Pagination,
  Card,
  Divider,
  Drawer,
  Input,
  Breadcrumb,
  Avatar,
  Tabs,
  Form,
  Select,
  DatePicker,
  Tooltip,
  Cascader,
  Upload,
  Spin,
  Dropdown,
  Checkbox,
  Tag,
  Steps,
  InputNumber,
  Timeline,
  Rate,
  Carousel,
  Alert,
  Popover,
  Tree,
  TreeSelect,
  Table,
  Badge,
} from 'ant-design-vue';

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;

Vue.use(LocaleProvider);
Vue.use(Alert);
Vue.use(Popover);
Vue.use(Badge);
Vue.use(Table);
Vue.use(Tree);
Vue.use(TreeSelect);
Vue.use(Carousel);
Vue.use(Timeline);
Vue.use(InputNumber);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(Layout);
Vue.use(Input);
Vue.use(Modal);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Pagination);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Breadcrumb);
Vue.use(Avatar);
Vue.use(Tabs);
Vue.use(Form);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Tooltip);
Vue.use(Cascader);
Vue.use(Upload);
Vue.use(Spin);
Vue.use(Dropdown);
Vue.use(Steps);
Vue.use(Rate);
