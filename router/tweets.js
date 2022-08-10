import express from 'express'
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweets.js';
import { isAuth } from '../middleware/sign.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateTweet = [ 
    body('text')
      .trim()
      .isLength({ min: 3 })
      .withMessage('3글자 이상 입력해주세요'),
    validate,
  ];

router.get('/', isAuth, tweetController.getTweets)

router.get('/:id', isAuth, tweetController.getTweet);

router.post('/', isAuth, validateTweet, tweetController.createTweet);

router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;