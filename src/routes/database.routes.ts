import express from 'express';

const router = express.Router();
// import con from '../dbCon';
import { GetTreeCSV } from '../controllers/database-export/export-csv'

router.get('/getTreeCSV.csv', GetTreeCSV);

export = router

