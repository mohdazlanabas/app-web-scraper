const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://www.thestar.com.my/news/nation/'
app.get('/', function (req, res) {
    res.json('This is my webscraper')})
app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

// change between ( '....../ ,
// results is 3000/results

            $('.desc', html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))})
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))