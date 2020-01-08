
const models = {};

class User {
  constructor() {
    this.id = '';
    this.email = '';
    this.username = '';
    this.firstName = '';
    this.secondName = '';
    this.location = {
      lat: '',
      lng: ''
    };
    this.verified = false;
    this.website = '';
    this.bio = '';
    this.role = '';
    this.createdAt = new Date().toISOString();
    this.lastLogin = new Date().toISOString();
    this.lastLogin = '';
  }
}

/**
 * ------------------------------------------------
 */

class Task {
  constructor() {
    this.id = '';
    this.projectId = '';
    this.title = '';
    this.desc = '';
    this.state = '';
    this.status = '';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();   
  }
}

/**
 * ------------------------------------------------
 */

class Project {
  constructor() {
    this.id = '';
    this.title = '';
    this.status = '';
    this.state = '';
    this.desc = '';    
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

/**
 * ------------------------------------------------
 */

class Team {
  constructor() {
    this.id = '';
    this.title = '';
    this.members = '';
    this.desc = '';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

/**
 * ------------------------------------------------
 */

class Address {
  constructor() {
    this.id = '';
    this.country = '';
    this.city = '';
    this.zip = '';
    this.address1 = '';
    this.address2 = '';
  }
}


models.User = User;
models.Team = Team;
models.Project = Project;
models.Task = Task;
models.Address = Address;

exports.models = models;