/* tslint:disable:no-console */
import * as chalk from "chalk";
import { Logger, Colors } from "reg-suit-interface";

export type LogLevel = "verbose" | "info" | "silent";

export class RegLogger implements Logger {

  _level: LogLevel;

  constructor(private _category = "reg-suit") {
    this._level = "info";
  }

  fork(newCategory: string) {
    const l = new RegLogger(newCategory);
    l.setLevel(this._level);
    return l;
  }

  setLevel(v: LogLevel) {
    this._level = v;
  }

  get colors(): Colors {
    return (<any>chalk) as Colors;
  }

  set colors(v: Colors) {
    return;
  }

  info(msg: string) {
    if (this._level !== "silent") {
      console.log(this._prefix + this.colors.green("info ") + msg);
    }
  }

  warn(msg: string) {
    if (this._level !== "silent") {
      console.warn(this._prefix + this.colors.yellow("warn ") + msg);
    }
  }

  error(obj: string | Error) {
    if (this._level !== "silent") {
      if (typeof obj === "string") {
        console.error(this._prefix + this.colors.red("error ") + obj);
      } else {
        console.error(this._prefix + this.colors.red("error "), obj);
      }
    }
  }

  verbose(msg: string, ...objects: any[]) {
    if (this._level === "verbose") {
      console.log(this._prefix + this.colors.green("debug ") + msg);
      if (objects && objects.length) {
        objects.forEach(obj => {
          console.log(this.colors.gray(JSON.stringify(obj, null, 2)));
        });
      }
    }
  }

  get _prefix() {
    return `[${this._category}] `;
  }
}

export function createLogger(category?: string) {
  return new RegLogger(category);
}