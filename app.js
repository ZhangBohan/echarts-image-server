const Koa = require('koa');
const Router = require('koa-router');
const node_echarts = require('./node_echarts.js');

const app = new Koa();
const router = new Router();

app
.use(router.routes())
.use(router.allowedMethods());


router.get('/api', async (ctx, next) => {
    console.log('query:', ctx.query);
    let option = JSON.parse(ctx.query.option)
    let buffer = await node_echarts({
        option: option
    })
    ctx.type = 'image/png'
    ctx.body = buffer
})

router.get('/api/line', async (ctx, next) => {
    console.log('line:', ctx.query);
    let title = ctx.query.title || ''
    let data = JSON.parse(ctx.query.data)
    let xData = data[0]
    let yData = data.slice(1)
    let option = {
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: yData.map(lineData => ({type: 'line', data: lineData}))
    }
    ctx.type = 'image/png'
    ctx.body = await node_echarts({
        option: option
    })
})

console.log('server start in localhost:3000')
app.listen(3000);