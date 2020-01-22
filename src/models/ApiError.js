class ApiError extends Error {
  constructor(args) {
    super(args);
    this.name = "ApiError";
  }
}

module.exports = ApiError;

// constructor(message, code, childProcess, stdout, stderr) {
//   super(message);
//   Error.captureStackTrace(this, this.constructor);
//   this.name = this.constructor.name;
//   this.code = code;
//   this.childProcess = childProcess;
//   this.stdout = stdout;
//   this.stderr = stderr;
// }
