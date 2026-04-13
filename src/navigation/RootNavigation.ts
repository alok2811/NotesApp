import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

type RouteName = keyof RootStackParamList;
type RouteParams<T extends RouteName> = RootStackParamList[T];
type NavigationArgs<T extends RouteName> = undefined extends RouteParams<T>
  ? [name: T, params?: RouteParams<T>]
  : [name: T, params: RouteParams<T>];

type RouteConfig = {
  [T in RouteName]: { name: T; params?: RouteParams<T> };
}[RouteName];

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function isNavigationReady() {
  return navigationRef.isReady();
}

export function canGoBack() {
  return navigationRef.isReady() && navigationRef.canGoBack();
}

export function getCurrentRouteName() {
  return navigationRef.getCurrentRoute()?.name;
}

export function navigate<T extends RouteName>(...args: NavigationArgs<T>) {
  const [name, params] = args;

  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name,
        params: params as object | undefined,
      }),
    );
  }
}

export function push<T extends RouteName>(...args: NavigationArgs<T>) {
  const [name, params] = args;

  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

export function replace<T extends RouteName>(...args: NavigationArgs<T>) {
  const [name, params] = args;

  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function pushReplacement<T extends RouteName>(...args: NavigationArgs<T>) {
  const [name, params] = args;

  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function goBack() {
  if (canGoBack()) {
    navigationRef.goBack();
  }
}

export function pop(count = 1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

export function popTo<T extends RouteName>(...args: NavigationArgs<T>) {
  const [name, params] = args;

  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popTo(name, params));
  }
}

export function reset<T extends RouteName>(...args: NavigationArgs<T>) {
  const [name, params] = args;

  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      }),
    );
  }
}

export function resetToRoutes(routes: RouteConfig[], index = routes.length - 1) {
  if (navigationRef.isReady() && routes.length > 0) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
}
