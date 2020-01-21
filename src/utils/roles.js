/**
 *
 */

const roles = {
  master: {
    can: ["read", "write", "manage"]
  },
  admin: {
    can: ["read", "write"]
  },
  member: {
    can: ["read", "write"]
  },
  guest: {
    can: ["read"]
  }
};

function can(role, operation) {
  return roles[role] && roles[role].can.indexOf(operation) !== -1;
}
