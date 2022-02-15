import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor() { }
}

export class BrowserStorage  {

  private readonly _keyPrefix = 'alfred-';
  private readonly _storage: Storage;

  constructor(
      session: boolean
  ) {
      this._storage = session ? sessionStorage : localStorage;
  }

  set<T>(key: string, value: T) {
      const json = JSON.stringify(value);

      this._storage.setItem(`${this._keyPrefix}${key}`, json);
  }

  get<T>(key: string, reviver?: (item: T) => T) {
      const json = this._storage.getItem(`${this._keyPrefix}${key}`);

      if (json == null || json === '') {
          return null;
      }

      const item = JSON.parse(json) as T;

      return reviver
          ? reviver(item)
          : item;
  }

  exists(key: string) {
      const json = this._storage.getItem(`${this._keyPrefix}${key}`);

      return json != null;
  }

  remove(key: string) {
      this._storage.removeItem(`${this._keyPrefix}${key}`);
  }

}