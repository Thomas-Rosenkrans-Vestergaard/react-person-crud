import React from "react"
import PersonTableRow from "./PersonTableRow";

/**
 * A component that presents a table containing the provided persons.
 */
class PersonTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.persons.map((person, index) =>
            <PersonTableRow key = {person.id} person = {person} onEdit = {this.props.onEdit} onDelete = {this.props.onDelete}/>
          )}
        </tbody>
      </table>
    </div>
  }
}

export default PersonTable;
