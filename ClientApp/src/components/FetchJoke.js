import React, { Component } from 'react';

export class FetchJoke extends Component {
    static displayName = FetchJoke.name;

    constructor(props) {
        super(props);
        this.state = { jokes: [], loading: true };
    }

    componentDidMount() {
        this.populateJokeData();
    }

    static renderJokesTable(jokes) {
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
                    {jokes.map(joke =>
                        <tr key={joke.date}>
                            <td>{joke.date}</td>
                            <td>{joke.temperatureC}</td>
                            <td>{joke.temperatureF}</td>
                            <td>{joke.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchJoke.renderJokesTable(this.state.jokes);

        return (
            <div>
                <h1 id="tabelLabel" >Joke</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateJokeData() {
        const response = await fetch('joke');
        const data = await response.json();
        this.setState({ jokes: data, loading: false });
    }
}
