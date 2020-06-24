import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroups, deleteGroup } from '../../actions/groupAction';
import PropTypes from 'prop-types';

class GroupListing extends Component {

    static propTypes = {
        getGroups: PropTypes.func.isRequired,
        group: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getGroups();
    }

    onDeleteClick = id => {
        this.props.deleteGroup(id);
    }

    render() {

        const { groups } = this.props.group;

        return(
            <section className="GroupListing">
                {groups.map(({ id, name}) => (
                    <div className="group-test">
                        <div className="id"> {id} </div>
                        <div className="name"> {name} </div>
                        <button className="remove-btn" onClick={this.onDeleteClick.bind(this, id)}> &times; </button>
                    </div>
                ))}
            </section>
        )
    };
}

const mapStateToProps = (state) => ({
    group: state.group
});

export default connect(
    mapStateToProps, 
    {getGroups, deleteGroup}
)(GroupListing);