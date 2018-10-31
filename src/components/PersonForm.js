import React, { Component } from "react"

/**
 * A controlled component allowing for the creation or updating of a person.
 */
class PersonForm extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Returns a person object based on the inputs in the provided form.
   * @param HtmlElement form The form from which to extract the person.
   */
  getPersonObject(form) {
    const person = {
      name: form.elements['name'].value,
      age: form.elements['age'].value,
      gender: form.elements['gender'].value,
      email: form.elements['email'].value
    }

    if (this.props.person != undefined) {
      person.id = this.props.person.id;
    }

    return person;
  }

  /**
   * Notifies the parent that the person being edited has changed.
   * @param Event event The change event.
   */
  onChange(event) {
    this.props.onChange(this.getPersonObject(event.currentTarget));
  }

  /**
   * Notifies the parent that the form was submitted.
   * @param Event event The submit event.
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.props.mode == 'create')
      this.onCreate(event);
    else
      this.onEdit(event);
  }

  /**
   * Notifies the parent that the create form was submitted.
   * 
   * @param Event event The submit event.
   */
  onCreate(event) {
    const person = this.getPersonObject(event.currentTarget);
    this.props.onCreateSubmit(person);
  }

  /**
   * Notifies the parent that the update form was submitted.
   * @param {*} event The submit event.
   */
  onEdit(event) {
    const person = this.getPersonObject(event.currentTarget);
    this.props.onEditSubmit(person);
  }

  render() {

    const id = this.props.person == undefined ? '' : this.props.person.id;
    const name = this.props.person == undefined ? '' : this.props.person.name;
    const age = this.props.person == undefined ? '' : this.props.person.age;
    const email = this.props.person == undefined ? '' : this.props.person.email;
    const gender = this.props.person == undefined ? '' : this.props.person.gender;

    return (
      <div>
        <h3 style={{ 'text-align': 'center', 'margin-bottom': '25px' }}>{this.props.mode === 'edit' ? 'Update person' : 'Create person'}</h3>
        <div>
          <form className="form-horizontal" onChange={this.onChange} onSubmit={this.onSubmit}>
            {this.props.mode === 'edit' && <div className="form-group">
              <label className="control-label col-sm-3">Id:</label>
              <div className="col-sm-9">
                <input className="form-control" readOnly id="id" name="id" value={id} />
              </div>
            </div>}
            <div className="form-group">
              <label className="control-label col-sm-3" htmlFor="name">Name:</label>
              <div className="col-sm-9">
                <input className="form-control" id="name" name="name" placeholder="Enter Name" value={name} />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3" htmlFor="age">Age:</label>
              <div className="col-sm-9">
                <input type="number" className="form-control" name="age" id="age" placeholder="Enter age" value={age} />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3" htmlFor="email">Email:</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={email} />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3" htmlFor="pwd">Gender:</label>
              <div className="col-sm-9">
                <input className="form-control" id="gender" name="gender" placeholder="Enter Gender" value={gender} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <button type="submit" className="btn btn-default">Submit</button>
              </div>
            </div>
            {this.props.mode == 'edit' && <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <button onClick={this.props.onResetForm} className="btn btn-default">Reset</button>
              </div>
            </div>}
          </form>
        </div>
      </div>
    )
  }
}

export default PersonForm;