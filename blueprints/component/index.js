var ancestralBlueprint = require('../../lib/utilities/ancestral-blueprint');

module.exports = {
  description: 'Generates a component. Name must contain a hyphen.',

  availableOptions: [
    {
      name: 'path',
      type: String,
      default: 'components',
      aliases: [
        { 'no-path': '' }
      ]
    }
  ],

  fileMapTokens: function() {
    var blueprint = ancestralBlueprint('component', this.project);
    return blueprint.fileMapTokens.apply(blueprint, arguments);
  },

  normalizeEntityName: function() {
    var blueprint = ancestralBlueprint('component', this.project);
    return blueprint.normalizeEntityName.apply(blueprint, arguments);
  },

  locals: function() {
    var blueprint = ancestralBlueprint('component', this.project);
    var locals = blueprint.locals.apply(blueprint, arguments);

    // This is here to work around this bug in ember-cli:
    // https://github.com/ember-cli/ember-cli/issues/4001
    if (!this.project) {
      return locals;
    }

    var newContents = '';
    if (locals.contents) {
      newContents = locals.contents + '\n';
    }

    locals.contents = newContents;

    return locals;
  }
};
