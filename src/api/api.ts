import fetch from "cross-fetch";
import { isEmpty } from "lodash";

class API {
  static uri = process.env.REACT_APP_API_URL;

  constructor() {
    if (isEmpty(API.uri)) {
      throw new Error("REACT_APP_API_URL is not defined in the env variables.");
    }
  }

  public async signup({ email }: { email: string }): Promise<boolean> {
    try {
      const result = await this.post("/v1/user/register", {
        email,
      });

      return result.status === 200;
    } catch (err) {
      return false;
    }
  }

  public async login({ email, password }: { email: string; password: string }): Promise<boolean> {
    try {
      const result = await this.post("/v1/user/login", {
        email,
        password,
      });

      return result.status === 200;
    } catch (err) {
      return false;
    }
  }

  public async resetPassword({ email }: { email: string }): Promise<boolean> {
    try {
      await this.post("/v1/user/reset-password", {
        email,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  public async changePassword({
    password,
    token,
  }: {
    password: string;
    token: string;
  }): Promise<boolean> {
    try {
      const result = await this.post("/v1/user/reset", {
        token,
        password,
      });

      return result.status === 200;
    } catch (err) {
      return false;
    }
  }

  public async logout(): Promise<boolean> {
    try {
      const result = await this.post("/v1/user/logout");
      return true;
    } catch (err) {
      return false;
    }
  }

  public get googleSignupURL(): string {
    return `${API.uri}/v1/user/auth/google`;
  }

  private post = async (endpoint: string, body: object = {}) => {
    return await fetch(`${API.uri}${endpoint}`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
    });
  };

  private async get(endpoint: string) {
    return await fetch(`${API.uri}${endpoint}`);
  }
}

export const api = new API();
