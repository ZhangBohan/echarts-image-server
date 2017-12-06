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

router.get('/api/pie', async (ctx, next) => {
    console.log('pie:', ctx.query);
    let title = ctx.query.title || ''
    let data = JSON.parse(ctx.query.data)
    let sum = 0
    data.forEach(item => sum += item.value)
    data.map(item => item.name = `${item.name}(${new Number(item.value / sum).toFixed(2) * 100} %)`)
    let names = []
    data.forEach(item => names.push(item.name))
    console.log("names:", names, sum)

    let option = {
        title : {
            text: title,
            x: 'center'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: names
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: data
            }
        ]
    }

    ctx.type = 'image/png'
    ctx.body = await node_echarts({
        option: option
    })
})

console.log('server start in localhost:3000')
app.listen(3000);