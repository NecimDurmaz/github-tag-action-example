import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { environment } from "./environments/enviroments";

@Component({
  selector: "app-root",
  template: `
    <h1>Hello from {{ name }}! {{ versionNo }}</h1>
<h6>asd</h6>
    <a
      target="_blank"
      href="https://angular.dev/overview"
    >
      Learn more about Angular
    </a>
  `,
})
export class App {
  versionNo: string;
  version = environment.version;
  name = "Angular";
  constructor() {
    this.versionNo = (window as any)?.angusVersion?.tag?.split(":")?.[1];
  }
}

bootstrapApplication(App);
