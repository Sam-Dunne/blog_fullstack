import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allblogtags = await db.blogtags.all();
        res.json(allblogtags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const [result] = await db.blogtags.allTagsForBlog(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

router.post('/blogtag', async (req, res) => {
    const newBlogTagEntry = (req.body);
    try {
        const result = await db.blogtags.insert(newBlogTagEntry.blogid, newBlogTagEntry.tagid)
        res.json({msg: 'added new Tag entry', result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: newBlogTagEntry, error: error.message });
    };
});

export default router;