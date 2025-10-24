import {Component} from "@angular/core";
import {bootstrapApplication} from "@angular/platform-browser";
import {environment} from "./environments/enviroments";

@Component({
    selector: "app-root",


    template: `
        123        <h1>Hello from {{ name }}! {{ versionNo }}</h1>
        <H2>123asd</H2>
        h3>Version: {{ version }}123

        h3>Version: {{ version }}
        h3>Version: {{ version }}
        h3>Versi123on: {{ version }}
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
    name = "Angular Test12";

    constructor() {
        this.versionNo = (window as any)?.angusVersion?.tag?.split(":")?.[1];
    }
}

bootstrapApplication(App);
