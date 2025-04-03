import { Injectable, inject, signal } from '@angular/core';
import {
  AuthClient,
  AuthTokenResponsePassword,
  GoTrueClient,
  Session,
  User,
  AuthChangeEvent,
  AuthResponse,
} from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';

import { AUTH_URL, AUTH_KEY } from './auth.tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthSharedService {
  #authClient = signal<GoTrueClient | null>(null);
  #currentUser = signal<User | null>(null);

  readonly #AUTH_URL = inject(AUTH_URL);
  readonly #AUTH_KEY = inject(AUTH_KEY);

  constructor() {
    this.initializeAuthClient();
  }

  public handleClientAuthStateChanges(
    cb: (event: AuthChangeEvent, session: Session) => void
  ) {
    this.#authClient()!.onAuthStateChange((event, session) => {
      if (!session) return;

      cb(event, session);
      if (session?.access_token) {
        this.#currentUser.set(session.user);
      }
      if (event === 'SIGNED_OUT') {
        this.#currentUser.set(null);
      }
    });
  }

  public signIn(
    email: string,
    password: string
  ): Observable<AuthTokenResponsePassword> {
    return from(
      this.#authClient()!
        .signInWithPassword({ email, password })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error.message);
          }
          return res;
        })
    );
  }

  public async signOut(): Promise<void> {
    await this.#authClient()!.signOut();
    localStorage.clear();
  }

  public async signUp(email: string, password?: string): Promise<AuthResponse> {
    const passw = password ?? Math.random().toString(36).slice(-8);

    return await this.#authClient()!.signUp({
      email,
      password: 'sxtvttio',
    });
  }

  public async getSession() {
    return await this.#authClient()!.getSession();
  }

  public async getUser(): Promise<User | null> {
    const userResponse = await this.#authClient()!.getUser();

    if (userResponse.error) {
      throw userResponse.error;
    }

    if (!userResponse.data?.user) {
      return null;
    }

    this.#currentUser.set(userResponse.data?.user);

    return this.#currentUser();
  }

  private initializeAuthClient(): void {
    const headers = {
      Authorization: `Bearer ${this.#AUTH_KEY}`,
      apikey: `${this.#AUTH_KEY}`,
    };

    this.#authClient.set(
      new AuthClient({
        headers,
        url: this.#AUTH_URL,
        fetch: fetch,
      })
    );
  }
}
