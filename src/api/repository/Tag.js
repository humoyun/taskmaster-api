class Tag {
  constructor() {
    this.id = "unique-tag-id"; // primary
    this.title = "tag-1";
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Tag;
