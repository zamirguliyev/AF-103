const news_router = require("./news.router");
const publisher_router = require("./publisher.router");
const subscription_router = require("./subscription.router");
const tag_router = require("./tag.router");
const user_router = require("./user.router");

const router = {
  news: news_router,
  publisher: publisher_router,
  subscription: subscription_router,
  tag: tag_router,
  user: user_router,
};

module.exports = router;
