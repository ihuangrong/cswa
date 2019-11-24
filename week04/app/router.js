import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('rooms', function() {
    this.route('create');
    this.route('display');
    this.route('view', { path: 'view/:room_id' });
    this.route('edit', { path: ':room_id/edit' });
    this.route('delete', { path: ':room_id' });
  });
  this.route('login');
  this.route('modules', function() {
    this.route('view', {path: ':mid'});
    this.route('new');
    this.route('edit', {path: ':mid/edit'});
  });

  this.route('users', function() {
    this.route('register');
  });
});
