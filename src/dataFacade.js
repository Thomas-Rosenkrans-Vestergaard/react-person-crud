const URL = "http://localhost:3456/api";

class DataFacade {

  getFetch(url, cb) {
    let status = -1;
    fetch(url)
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(body => cb(status, body));
  }

  getPersons(callback) {
    const results = this.getFetch(URL, callback);
  }

  createPerson(person, callback) {
    const url = "http://localhost:3456/api"
    let status = -1;
    fetch(url, {
        method: 'post',
        body: JSON.stringify(person),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
        .then(response => {
            status = response.status;
            return response.json();
        })
        .then(body => callback(status, body));
}

  updatePerson(person, callback) {
    const url = "http://localhost:3456/api/" + person.id;
    let status = -1;
    fetch(url, {
      method: 'put',
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(body => callback(status, body));
  }

  deletePerson(personId, callback) {
    let status = -1;
    const url = "http://localhost:3456/api/" + personId;
    fetch(url, {
        method: 'delete',
    })
        .then(response => {
            status = response.status;
            return response.json();
        })
        .then(body => callback(status, body));
}
}

export default new DataFacade();