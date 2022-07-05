const Koa = require('koa');
const app = new Koa();
const routes = require('./routes/routes');
var views = require('koa-views');

const render = views(__dirname + '/views');
app.use(render);
app.use(async function (ctx) {
  await ctx.render('index.html', { title: 'home' });
});
app.use(routes.routes());

app.listen(5000);
