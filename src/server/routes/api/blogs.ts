import * as express from 'express';
import db from '../../db'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allBlogs = await db.blogs.all();
        res.json(allBlogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const [blogDetails] = await db.blogs.one(id);
        res.json(blogDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

router.post('/', async (req, res) => {
    const newBlogEntry = req.body;
    try {
        const result = await db.blogs.insert(newBlogEntry)
        res.json({msg: 'added new blog entry', result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

router.put('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid)
    const editedBlog = req.body;
    try {
        const result = await db.blogs.update(editedBlog, blogid)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

router.delete('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid);
    try {
        const result = await db.blogs.nuke(blogid)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

export default router;