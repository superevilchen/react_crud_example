import { Author } from "./Author";

export class Book{

    constructor(public id: number, public name: string, public year: number, public author?: Author){}
}