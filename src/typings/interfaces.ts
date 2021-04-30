export interface IAuthorsTable {
    id?: number;
    name?: string;
    email?: string;
    created_at?: Date;
};

export interface IBlogsTable {
    id?: number;
    title?: string;
    content?: string;
    authorid?: number;
    created_at?: Date;
    edited_at?: Date;
};

export interface ITagsTable {
    id?: number;
    name?: string;
    created_at?: Date;
};

export interface IBlogtagsTable {
    blogid?: number;
    tagid?: number;
}

export interface ITagNamesByBlogId {
    name: string,
     id: number
}

export interface IAllBlogs {
    id?: number;
    name?: string;
    email?: string;
    created_at?: Date;
    title?: string;
    content?: string;
    authorid?: number;
    edited_at?: Date;
}

export interface MySQLResponse {
    affectedRows: number;
    insertId: number;
    sqlMessage?: string;
    sql?: string;
}