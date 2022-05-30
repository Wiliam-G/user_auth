import express, { Request, Response, NextFunction } from 'express';

const app = express();
// const port = 3000; 


app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send ({teste: "ok sucesso mano"});
});

app.listen(3000, () => {
    console.log('rodando na porta 3000');
})