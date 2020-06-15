import express from 'express';
const router = express.Router();
// import con from '../dbCon';
import { GetTreeById } from '../controllers/get-trees/get-by-id.controller'
import { AddTreeUser } from '../controllers/add-trees/add-tree-user';
import { DeleteTreeId } from '../controllers/delete-tree-id';
import { GetNTrees } from '../controllers/get-trees/get-n-trees.controller'
import { CountTrees } from '../controllers/countTrees';

router.get('/countTrees', CountTrees);
router.post('/getById', GetTreeById);
router.post('/getNTrees', GetNTrees);
router.post('/deleteId', DeleteTreeId);
router.post('/addTreeUser', AddTreeUser);

export = router

