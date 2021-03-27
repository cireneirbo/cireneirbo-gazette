import React, { Component } from 'react';
import NewsAPI from 'newsapi';

export class FetchNews extends Component {
    static displayName = FetchNews.name;

    constructor(props) {
        super(props);
        this.state = { articles: [], loading: true };
    }

    componentDidMount() {
        this.populateNewsData();
    }

    static renderArticlesTable(articles) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article =>
                        <tr key={article.date}>
                            <td>{article.date}</td>
                            <td>{article.temperatureC}</td>
                            <td>{article.temperatureF}</td>
                            <td>{article.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchNews.renderArticlesTable(this.state.articles);

        return (
            <div>
                <h1 id="tabelLabel" >News articles</h1>
                <p>This component demonstrates fetching news from the server.</p>
                {contents}
            </div>
        );
    }

    async populateNewsData() {
        const newsapi = new NewsAPI('API_KEY');

        //const response = await fetch('newsarticles');

        const response = await newsapi.v2.topHeadlines({
            sources: 'bbc-news,the-verge',
            q: 'bitcoin',
            category: 'business',
            language: 'en',
            country: 'us'
        }).then(response => {
            console.log(response);
        });

        const data = await response.json();
        this.setState({ articles: data, loading: false });
    }
}
/*


/////////////////////////////////


//const NewsAPI = require('newsapi');
//const newsapi = new NewsAPI('API_KEY');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
    sources: 'bbc-news,the-verge',
    q: 'bitcoin',
    category: 'business',
    language: 'en',
    country: 'us'
}).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    *//*
});
// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2017-12-01',
    to: '2017-12-12',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
}).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    *//*
});
// To query sources
// All options are optional
newsapi.v2.sources({
    category: 'technology',
    language: 'en',
    country: 'us'
}).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        sources: [...]
      }
    *//*
});*/