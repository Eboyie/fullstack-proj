import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import { User, UserModel } from '../models/userModel';
import { generateToken, isAuth } from '../utils';

export const userRouter = express.Router();

//api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

//create/register new user
userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!password || !name || !email) {
      res.status(400).send({ message: 'Please provide all fields' });
      return;
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }

    const user = new UserModel({
      name,
      email,
      password: bcrypt.hashSync(password),
    } as User);

    const createdUser = await user.save();
    res.json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      return;
    }

    res.status(404).json({ message: 'User not found' });
  })
);

userRouter.post(
  '/logout',
  asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('jwt', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
  })
);

userRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      const deletedUser = await user.deleteOne();
      res.send(deletedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);

userRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);

userRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).json(users);
  })
);

userRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);
