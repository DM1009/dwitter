import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/sign.js';
import { isAuth } from '../middleware/sign.js';

const router = express.Router();

const validateUsername = [
  body('username')
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('ID는 3글자 이상 적어주셔야 합니다'),
  body('password')
    .trim()
    .isLength({ min: 3 })
    .withMessage('비밀번호는 3글자 이상 적어주셔야 합니다'),
  validate,
];

const validateSignup = [
  ...validateUsername,
  body('name').notEmpty().withMessage('이름을 입력하세요'),
  body('email').isEmail().normalizeEmail().withMessage('이메일 형식이 올바르지 않습니다'),
  body('url')
    .isURL()
    .withMessage('URL형식이 올바르지 않습니다')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];
router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateUsername, authController.login);

router.get('/me', isAuth, authController.me);

export default router;