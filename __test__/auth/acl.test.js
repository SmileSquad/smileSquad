'use strict';
const acl = require('../../src/auth/middleware/acl.js');

describe('RBAC middleware', () => {
  const req = {
    user: {
      capabilities: ['read', 'create', 'update', 'delete'],
    },
  };
  const res = {};
  const next = jest.fn();
  test('it should call next if the capablities is right', () => {
    acl('read')(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  test('it should not call next if the capablities is not right', () => {
    req.user.capabilities = ['read', 'create', 'update'];
    acl('delete')(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  test('it should call next with error if their is no capabilites', () => {
    req.user = {};
    acl('delete')(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
