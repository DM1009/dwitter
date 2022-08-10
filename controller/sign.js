import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as Users from '../data/auth.js';
import { config } from '../config.js';

export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;
    const found = await Users.findUsername(username);
    if (found) {
      return res.status(409).json({ message: `${username} 이미 있는 아이디 입니다` });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await Users.createUser({
      username,
      password: hashed,
      name,
      email,
      url,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
  }
  
  export async function login(req, res) {
    const { username, password } = req.body;
    const user = await Users.findUsername(username);
    if (!user) {
      return res.status(401).json({ message: '아이디와 비밀번호를 확인하세요' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '아이디와 비밀번호를 확인하세요' });
    }
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });
  }
  
  function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
      expiresIn: config.jwt.expiresInSec,
    });
  }
  
  export async function me(req, res, next) {
    const user = await Users.findId(req.userId);
    if (!user) {
      return res.status(404).json({ message: '유저가 없습니다.' });
    }
    res.status(200).json({ token: req.token, username: user.username });
  }
  