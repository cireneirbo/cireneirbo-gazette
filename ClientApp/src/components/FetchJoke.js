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
                        <th>Setup</th>
                        <th>Punchline</th>
                    </tr>
                </thead>
                <tbody>
                    {jokes.map(joke =>
                        <tr key={joke.setup}>
                            <td>{joke.setup}</td>
                            <td>{joke.punchline}</td>
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
                <p>This component demonstrates fetching data from https://official-joke-api.appspot.com/random_joke.</p>
                {contents}
            </div>
        );/*
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.username}>
                            {item.username}: {item.name}
                        </li>
                    ))}
                </ul>
            );
        }*/
    }

    async populateJokeData() {
        
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        this.setState({ jokes: [data], loading: false });
        /*axios.get("https://jsonplaceholder.typicode.com/users").then(
            result => {
                this.setState({
                    isLoaded: true,
                    jokes: result.data
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );*/
    }
}
