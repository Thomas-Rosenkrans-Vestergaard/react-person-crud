import React, { Component } from "react";
import PersonForm from './PersonForm';
import PersonTable from './PersonTable';
import dataFacade from '../dataFacade';

/**
 * A component that provided full crud functionality for a person entity.
 * 
 * Controls the controlled component PersonForm.
 * Contains the component PersonTable.
 */
class PersonCrud extends Component {

    constructor(props) {
        super(props);
        this.state = { persons: [], formPerson: undefined, formMode: 'create' }
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);

        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
    }

    componentDidMount() {
        dataFacade.getPersons((status, persons) => this.setState({ persons }));
    }

    onEdit(person, tableRow, onComplete) {
        this.setState({
            formPerson: person,
            formMode: 'edit',
            onUpdateComplete: onComplete
        });
    }

    onDelete(person, tableRow, onComplete) {
        dataFacade.deletePerson(person.id, (status, body) => {
            onComplete(status);
        });
    }

    onChange(person) {
        this.setState({ 
            formPerson: person 
        });
    }

    onCreateSubmit(person) {
        dataFacade.createPerson(person, (status, result) => {
            if (status == 201) {
                this.setState(prev => ({
                    persons: [...prev.persons, result],
                    formMode: 'create',
                    formPerson: undefined
                }));
            } else {
                alert(JSON.stringify(result));
            }
        });
    }

    onEditSubmit(person) {
        dataFacade.updatePerson(person, (status, body) => {
            if (status == 200) {
                this.state.onUpdateComplete(status, body);
                this.setState({
                    formMode: 'create',
                    formPerson: undefined
                })
            } else {
                alert(JSON.stringify(body));
            }
        });
    }

    onResetForm(event) {
        event.preventDefault();
        this.setState({ formPerson: undefined, formMode: 'create' });
    }

    render() {
        return (
            <div style={{ margin: 20 }}>
                <h2>Person CRUD </h2>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Persons</h3>
                        <PersonTable persons={this.state.persons} onEdit={this.onEdit} onDelete={this.onDelete} />
                    </div>
                    <div className="col-md-6" >
                        <PersonForm
                            onChange={this.onChange}
                            person={this.state.formPerson}
                            mode={this.state.formMode}
                            onEditSubmit={this.onEditSubmit}
                            onCreateSubmit={this.onCreateSubmit}
                            onResetForm={(e) => this.onResetForm(e)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonCrud;