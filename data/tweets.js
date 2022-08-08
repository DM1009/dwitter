import * as Users from './sign.js'

let tweets = [
    {
      id: '1',
      text: '드림코더분들 화이팅!',
      createdAt: new Date().toString(),
      userId: '1',
    },
    {
      id: '2',
      text: '안뇽!',
      createdAt: new Date().toString(),
      userId: '1',
    },
  ];



  export async function getAll() {
    return Promise.all(
      tweets.map(async (tweet) => {
        const { username, name, url } = await Users.findId(
          tweet.userId
        );
        return { ...tweet, username, name, url };
      })
    );
  }
  
  export async function getUsername(username) {
    return getAll().then((tweets) =>
      tweets.filter((tweet) => tweet.username === username)
    );
  }
  
  export async function getId(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if (!found) {
      return null;
    }
    const { username, name, url } = await Users.findById(found.userId);
    return { ...found, username, name, url };
  }
  
  export async function create(text, userId) {
    const tweet = {
      id: new Date().toString(),
      text,
      createdAt: new Date(),
      userId,
    };
    tweets = [tweet, ...tweets];
    return getId(tweet.id);
  }
  
  export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
      tweet.text = text;
    }
    return getId(tweet.id);
  }
  
  export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
  }