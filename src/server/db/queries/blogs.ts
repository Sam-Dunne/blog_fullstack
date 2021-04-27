import { Query } from '../config';
import type { IAuthorsTable, IBlogsTable } from '../../../typings/interfaces';

const all = () => Query<(IAuthorsTable & IBlogsTable)[]>
    ('SELECT blogs.id, authors.name, authors.email, blogs.created_at, blogs.title, blogs.content, blogs.authorid, blogs.edited_at  FROM authors Right JOIN blogs on authors.id = blogs.authorid ORDER BY blogs.created_at DESC');
const one = (id: number) => Query<(IAuthorsTable & IBlogsTable)[]>
    ('SELECT * FROM authors JOIN blogs on authors.id = blogs.authorid WHERE blogs.id = ?', [id]);
const nuke = (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);
const insert = (newBlog: { title:string, content: string }) => Query('INSERT INTO blogs SET ?', [newBlog]);
const update = (updatedBlog: { authorid?: number, content?: string }, id: number) =>
    Query('UPDATE blogs SET ? WHERE id = ?', [updatedBlog, id]);


export default {
    all,
    one,
    nuke,
    insert,
    update
}