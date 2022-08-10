import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validate = [
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
  ...validate,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];
router.post('/signup', validateSignup, authController.signup);

router.post('/login', validate, authController.login);

router.get('/me', isAuth, authController.me);

export default router;