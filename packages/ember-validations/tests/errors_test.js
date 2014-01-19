var user, User;

module('clientErrors test', {
  setup: function() {
    User = Ember.Object.extend(Ember.Validations.Mixin, {
      validations: {
        name: {
          presence: true
        },
        age: {
          presence: true,
          numericality: true
        }
      }
    });
  }
});

test('validations are run on instantiation', function() {
  Ember.run(function() {
    user = User.create();
  });
  equal(user.get('isValid'), false);
  deepEqual(user.get('clientErrors.name'), ["can't be blank"]);
  deepEqual(user.get('clientErrors.age'), ["can't be blank", 'is not a number']);
  Ember.run(function() {
    user = User.create({name: 'Brian', age: 33});
  });
  ok(user.get('isValid'));
  deepEqual(user.get('clientErrors.name'), []);
  deepEqual(user.get('clientErrors.age'), []);
});

test('when clientErrors are resolved', function() {
  Ember.run(function() {
    user = User.create();
  });
  equal(user.get('isValid'), false);
  deepEqual(user.get('clientErrors.name'), ["can't be blank"]);
  deepEqual(user.get('clientErrors.age'), ["can't be blank", 'is not a number']);
  Ember.run(function() {
    user.set('name', 'Brian');
  });
  equal(user.get('isValid'), false);
  deepEqual(user.get('clientErrors.name'), []);
  deepEqual(user.get('clientErrors.age'), ["can't be blank", 'is not a number']);
  Ember.run(function() {
    user.set('age', 'thirty three');
  });
  equal(user.get('isValid'), false);
  deepEqual(user.get('clientErrors.name'), []);
  deepEqual(user.get('clientErrors.age'), ['is not a number']);
  Ember.run(function() {
    user.set('age', 33);
  });
  ok(user.get('isValid'));
  deepEqual(user.get('clientErrors.name'), []);
  deepEqual(user.get('clientErrors.age'), []);
});
