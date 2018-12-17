import React from 'react';
import {Redirect} from 'react-router-dom' ;
import {connect} from 'react-redux';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        render() {
            if (!this.props.isAdmin) {
               return <Redirect
                    to={{
                        pathname: "/",
                        state: {from: this.props.location}
                    }}
                />
            } else {
                return (
                    <ComposedComponent {...this.props} />
                );
            }

        }
    }


    function mapStateToProps(state) {
        return {
            isAdmin: state.auth.isAdmin
        };
    }

    return connect(mapStateToProps, {})(Authenticate);
}