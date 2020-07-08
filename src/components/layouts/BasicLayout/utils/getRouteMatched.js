let routeMatched = [];
let formattedRoutes = [];

// 格式化路由（设置parent属性）
function formatRoutes(routes) {
  if (routes && routes.length) {
    return routes.map((item) => {
      const parent = item;
      let children = null;
      if (item.children) {
        children = formatRoutes(item.children).map((child) => ({
          ...child,
          parent,
        }));
      }
      return {
        ...item,
        children,
      };
    });
  }
  return [];
}

// 设置路由匹配
function setRouteMatched(routes, route) {
  if (routes && routes.length) {
    routes.forEach((value) => {
      if (route === value.path) {
        if (value.parent) {
          setRouteMatched(
            formattedRoutes,
            value.parent.path,
          );
        }
        routeMatched.push(value);
      } else {
        setRouteMatched(value.children, route);
      }
    });
  }
  return routeMatched;
}

// 获取路由匹配
export default function getRouteMatched(routes, route) {
  routeMatched = [];
  formattedRoutes = formatRoutes(routes);
  return setRouteMatched(formattedRoutes, route);
}
