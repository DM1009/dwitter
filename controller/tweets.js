import * as Tweets from '../data/tweets.js'

export async function getTweets (req, res, next) {
    const username = req.query.username;
    const data = await (username ? Tweets.getUsername(username) : Tweets.getAll())
    res.status(200).json(data)
}


export async function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await Tweets.getById(id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `찾으신 아이디(${id})가 없습니다.` });
    }
  }
  
  export async function createTweet(req, res, next) {
    const { text } = req.body;
    const tweet = await Tweets.create(text, req.userId);
    res.status(201).json(tweet);
  }
  
  export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await Tweets.getById(id);
    if (!tweet) {
      return res.status(404).json({ message: `찾을 수 없습니다: ${id}` });
    }
    if (tweet.userId !== req.userId) {
      return res.sendStatus(403);
    }
    const updated = await Tweets.update(id, text);
    res.status(200).json(updated);
  }
  
  export async function deleteTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await Tweets.getById(id);
    if (!tweet) {
      return res.status(404).json({ message: `트윗을 찾을 수 없습니다 : ${id}` });
    }
    if (tweet.userId !== req.userId) {
      return res.sendStatus(403);
    }
    await Tweets.remove(id);
    res.sendStatus(204);
  }
  