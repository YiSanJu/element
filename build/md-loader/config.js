const Config = require('markdown-it-chain');
// 给每个markdown 生成锚点

const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence');

const config = new Config();

config
  .options.html(true).end()

  .plugin('anchor').use(anchorPlugin, [
    {
      level: 2, // 标题的限制，此处为二级标题
      slugify: slugify,
      permalink: true,
      permalinkBefore: true
    }
  ]).end()

  .plugin('containers').use(containers).end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
