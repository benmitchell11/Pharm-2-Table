import React from 'react';
import Navbar from './NavBar.jsx';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar isAdmin={this.props.isAdmin} />
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home