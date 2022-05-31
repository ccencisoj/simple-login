class EmptyError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = "EmptyError";
  }

  toJSON = ()=> ({
    status: this.status,
    name: this.name,
    message: this.message
  })
}

module.exports = EmptyError;