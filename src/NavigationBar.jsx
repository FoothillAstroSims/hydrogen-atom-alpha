import React from 'react';
import PropTypes from 'prop-types';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="navbar">
                    <h1 id="title"><a href="https://foothill.edu/astronomy/astrosims.html" target="_blank">AstroSims</a> > Hydrogen Atom</h1>
                    <nav>
                        <ul>
                            {/* needs work */}
                            <li>
                                <a href="#" data-toggle="modal" data-target="#helpModal">Help</a>
                            </li>
                            <li>
                                <a href="#" data-toggle="modal" data-target="#aboutModal">About</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        );
    }
}
