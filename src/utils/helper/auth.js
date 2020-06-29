// 做权限处理判断

export function hasAuth(authority) {
  const authorities = [];
  let authorityKeys = authority || [];
  if (typeof authority === 'string') {
    authorityKeys = [authority];
  }
  return authorityKeys.some((item) => authorities.includes(item));
}

// 判断路由的权限
export function hasRouteAuth(route) {
  if (route.meta && route.meta.authorities) {
    return hasAuth(route.meta.authorities);
  }
  return true;
}
