import * as express from 'express';
import db from '../../db'


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allAuthors = await db.authors.all();
        res.json(allAuthors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
})
router.post('/author', async (req, res) => {
    const newAuthor = req.body;
    try {
        const result = await db.authors.insert(newAuthor.name, newAuthor.email);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

export default router;