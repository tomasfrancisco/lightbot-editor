import { RouteProps } from "react-router-dom";
import { DashboardView } from "src/modules/Dashboard";
import { DeployView } from "src/modules/DeployView";
import { HomeView } from "src/modules/HomeView";
import { ImproveView } from "src/modules/ImproveView/ImproveView";
import { IntentsView } from "src/modules/IntentsView";
import { KeywordsView } from "src/modules/KeywordsView";
import { LoginView } from "src/modules/LoginView";
import { LogoutView } from "src/modules/LogoutView";
import { SettingsView } from "src/modules/SettingsView";
import { TrapView } from "src/modules/TrapView";
import { RoutesKeysEnum } from "./routeKeys.enum";

export type LightbotRouteProps = {
  protected: boolean;
  routeProps: RouteProps & {
    // Because React Router is dumb and has made path as a two type option
    // We don't care, we only use path as a string anyways.
    path?: string;
  };
};

export type LightbotRoutesProps = { [K in RoutesKeysEnum]: LightbotRouteProps };

export const routes: LightbotRoutesProps = {
  // Non authenticated routes
  [RoutesKeysEnum.HOME]: {
    protected: false,
    routeProps: {
      exact: true,
      path: "/",
      component: HomeView,
    },
  },
  [RoutesKeysEnum.LOGIN]: {
    protected: false,
    routeProps: {
      exact: true,
      path: "/login",
      component: LoginView,
    },
  },
  [RoutesKeysEnum.LOGOUT]: {
    protected: false,
    routeProps: {
      exact: true,
      path: "/logout",
      component: LogoutView,
    },
  },

  // Authenticated routes
  [RoutesKeysEnum.DASHBOARD]: {
    protected: true,
    routeProps: {
      path: "/dashboard",
      component: DashboardView,
    },
  },
  [RoutesKeysEnum.KEYWORDS]: {
    protected: true,
    routeProps: {
      exact: true,
      path: "/agent/:agentId?/keywords",
      component: KeywordsView,
    },
  },
  [RoutesKeysEnum.SETTINGS]: {
    protected: true,
    routeProps: {
      exact: true,
      path: "/agent/:agentId?/settings",
      component: SettingsView,
    },
  },
  [RoutesKeysEnum.CREATE_INTENT]: {
    protected: true,
    routeProps: {
      path: "/agent/:agentId?/create-intent",
      component: IntentsView,
    },
  },
  /**
   * DEFAULT ROUTE
   * Update default route and move it along in case of change
   */
  [RoutesKeysEnum.INTENTS]: {
    protected: true,
    routeProps: {
      path: "/agent/:agentId?/intents/:intentId?",
      component: IntentsView,
    },
  },
  [RoutesKeysEnum.DEFAULT]: {
    protected: true,
    routeProps: {
      path: "/agent/:agentId?/intents/:intentId?",
      component: IntentsView,
    },
  },
  /**
   * // DEFAULT ROUTE
   */
  [RoutesKeysEnum.DEPLOY]: {
    protected: true,
    routeProps: {
      path: "/agent/:agentId?/deploy",
      component: DeployView,
    },
  },
  [RoutesKeysEnum.IMPROVE]: {
    protected: true,
    routeProps: {
      path: "/agent/:agentId?/improve",
      component: ImproveView,
    },
  },

  // 404
  [RoutesKeysEnum.TRAP]: {
    protected: false,
    routeProps: {
      component: TrapView,
    },
  },
};
