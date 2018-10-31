import React, { Component } from "react";

class PersonTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = { person: props.person, hide: false };

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    hide() {
        this.setState({ hide: true });
    }

    onEdit() {
        this.props.onEdit(this.state.person, this, (status, updatedPerson) => {
            if (status == 200) {
                this.shouldUpdate = true;
                this.setState({ person: updatedPerson });
            }
        });
    }

    onDelete() {
        this.props.onDelete(this.state.person, this, (status) => {
            if (status == 200){
                this.shouldUpdate = true;
                this.hide();
            }
        });
    }

    shouldComponentUpdate(nextProps) {
        if (this.shouldUpdate) {
            this.shoudUpdate = false;
            return true;
        }

        return false;
    }

    render() {
        const { person, hide } = this.state;

        return !hide && (<tr>
            <td>{person.name}</td>
            <td>{person.age}</td>
            <td>{person.gender}</td>
            <td>{person.email}</td>
            <td>
                <a href="/#" onClick={this.onEdit} id={person.id}>edit</a>
                <br />
                <a href="/#" onClick={this.onDelete} id={person.id}>delete</a>
            </td>
        </tr>)
    }
}

export default PersonTableRow;