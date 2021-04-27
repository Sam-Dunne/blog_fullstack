import * as express from 'express';
import db from '../../db'


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const alltags = await db.tags.all();
        res.json(alltags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

router.post('/tag', async (req, res) => {
    const newTagEntry = req.body;
    try {
        const result = await db.tags.insert(newTagEntry.name)
        res.json({msg: 'added new Tag entry', result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'goof', error: error.message });
    };
});

export default router;