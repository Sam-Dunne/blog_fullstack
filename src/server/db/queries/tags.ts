import { Query } from '../config';
import type { ITagsTable } from '../../../typings/interfaces';

const all = () => Query<ITagsTable>('SELECT * FROM tags')
const insert = (name: string) => Query<ITagsTable>('INSERT INTO tags (name) VALUE (?)', [name]);

export default {
    all,
    insert
}