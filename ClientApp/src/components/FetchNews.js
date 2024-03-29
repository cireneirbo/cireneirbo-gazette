﻿import React, { Component } from 'react';

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

        const response = await fetch('newsarticles');

        const data = await response.json();
        this.setState({ articles: data, loading: false });
    }
}