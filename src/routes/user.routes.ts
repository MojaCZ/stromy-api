// import express from 'express';
// const router = express.Router();
// import con from '../dbCon'

// router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     con.query('SELECT * FROM test', (err, rows) => {
//         if (err) throw err;

//         console.log('Data received from Db:');
//         console.log(rows);
//         res.status(200).json({
//             message: rows
//         })
//     });
// })

// router.get('/add',(req: express.Request, res: express.Response, next: express.NextFunction) => {
//     con.query('INSERT INTO test (name, birth) VALUES ("PEJSEK", "1.12.2020")', (err, result) => {
//         if (err) throw err;
//         console.log("1 record inserted", result)
//         res.status(200).json({
//             message: result
//         })
//     });
// })



// export = router