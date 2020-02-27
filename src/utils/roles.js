/**
 *
 */

const roles = {
  master: {
    can: ["read", "write", "manage"]
  },
  owner: {
    can: ["read", "write"]
  },
  admin: {
    can: ["read", "write"]
  },
  member: {
    can: ["read", "write"]
  }
};

function can(role, operation) {
  return roles[role] && roles[role].can.indexOf(operation) !== -1;
}
