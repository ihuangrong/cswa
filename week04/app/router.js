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
    this.route('edit', { path: 'edit/:room_id' });
    this.route('delete', { path: 'delete/:room_id' });
  });
});
