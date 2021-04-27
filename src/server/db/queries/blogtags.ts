import { Query } from '../config';
import type { IBlogtagsTable, MySQLResponse } from '../../../typings/interfaces';

const all = () => Query<IBlogtagsTable>('SELECT * FROM blogtags')
const allTagsForBlog = (blogid:number) => Query<any>('CALL spBlogTags (?)', [blogid])
const insert = (blogid: number, tagid: number) => Query<MySQLResponse>('INSERT INTO blogtags (blogid, tagid) VALUES (?,?)', [blogid, tagid]);
const one = (id: number) => Query<(IBlogtagsTable)>
    ('SELECT * FROM authors JOIN blogs on authors.id = blogs.authorid WHERE blogs.id = ?', [id]);
const nuke = (tagid: number) => Query('DELETE FROM blogtags WHERE tagid = ?', [tagid]);

// ***Not in use... Saving for later
// const update = (updatedBlog: { blogid?: number, tagid?: number }) =>
//     Query('UPDATE blogs SET ? WHERE id = ?', [updatedBlog]);

export default {
    all,
    allTagsForBlog,
    insert,
    one,
    nuke,
    // update
}