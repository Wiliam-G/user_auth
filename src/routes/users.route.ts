import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router();
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).json(users);
});

usersRoute.get('/users/:id', async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await userRepository.findUserById(id)
    res.status(StatusCodes.OK).send(user);
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const id = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(id);
});

usersRoute.put('/users/:id', async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const modifiedUser = req.body;
    await userRepository.update(id, modifiedUser);

    res.status(StatusCodes.OK).send({ modifiedUser })
});

usersRoute.delete('/users/:id', async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await userRepository.delete(id);
    res.sendStatus(StatusCodes.OK);
})

export default usersRoute;