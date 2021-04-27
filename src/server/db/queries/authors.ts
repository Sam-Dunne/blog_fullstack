import { Query } from '../config';
import type { IAuthorsTable, MySQLResponse } from '../../../typings/interfaces';


const all = () => Query<IAuthorsTable>("SELECT * FROM authors")
const insert = (name: string, email: string) =>
    Query<MySQLResponse>('INSERT INTO authors (name, email) VALUES (?, ?)', [name, email]);

export default {
    all,
    insert
}