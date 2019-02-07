import { isEmpty } from "lodash";

class AuthenticationHelper {
  private isAuthenticatedKey: string = "isAuthenticated";
  private verifyTokenKey: string = "verifyToken";

  constructor() {
    if (!localStorage) {
      console.warn("localStorage is not available. Lightbot will not function correctly");
    }
  }

  public get verifyToken(): string | null {
    return localStorage.getItem(this.verifyTokenKey);
  }

  public set verifyToken(token: string | null) {
    if (!token) {
      localStorage.removeItem(this.verifyTokenKey);
    } else {
      localStorage.setItem(this.verifyTokenKey, token);
    }
  }

  public get isAuthenticated() {
    const isAuthenticatedItem = localStorage.getItem(this.isAuthenticatedKey);
    return !isEmpty(isAuthenticatedItem);
  }

  public set isAuthenticated(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      localStorage.removeItem(this.isAuthenticatedKey);
    } else {
      localStorage.setItem(this.isAuthenticatedKey, isAuthenticated.toString());
    }
  }
}

export const authenticationHelper = new AuthenticationHelper();
