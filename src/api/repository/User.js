class User {
  constructor() {
    this.id = ""; // primary
    this.email = "humoyun@gmail.com";
    this.username = "humoyun_ahmad";
    this.firstName = "Humoyun";
    this.secondName = "Ahmad";
    this.location = "USA";
    this.geolocation = { lat: 123.32, lng: 34.3 };
    this.verified = false;
    this.role = "admin";
    this.info = {
      website: "",
      bio: "",
      company: ""
    };
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.lastLogin = new Date().toISOString();
  }
}

module.exports = User;
