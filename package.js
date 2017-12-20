Package.describe({
  name: 'jamgold:bootstrap3tabs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Easy interface to create a bootstrap-3 tabs',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.export(['Bootstrap3Tab','Bootstrap3Tabs'], 'client');
  api.use(['underscore','ecmascript']);
  api.use(['templating','handlebars'], 'client');
  // add .html before .js or Templates won't have been defined
  api.addFiles(['bootstrap3tabs.html','bootstrap3tabs.js'],'client');
});

Package.onTest(function(api) {
  // api.use('ecmascript');
  api.use('tinytest');
  api.use('bootstrap3tabs');
  api.addFiles('bootstrap3tabs-tests.js');
});
