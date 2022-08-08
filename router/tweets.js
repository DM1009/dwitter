import { express } from 'express'

const router = express.Router()
const validateTweet = [
    body('text')
      .trim()
      .isLength({ min: 3 })
      .withMessage('3글자 이상 입력해주세요'),
    validate,
  ];

router.get('/', isAuth)

router.get('/:id', isAuth, tweetController.getTweet);

router.post('/', isAuth, validateTweet, tweetController.createTweet);

router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;