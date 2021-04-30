import { Query } from '../config';
import type { IAuthorsTable } from '../../../typings/interfaces';


const all = () => Query<IAuthorsTable>("SELECT * FROM authors")
const insert = (name: string, email: string) =>
    Query('INSERT INTO authors (name, email) VALUES (?, ?)', [name, email]);

export default {
    all,
    insert
}