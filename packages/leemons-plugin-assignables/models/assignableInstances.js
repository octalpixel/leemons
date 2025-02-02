module.exports = {
  modelName: 'assignableInstances',
  attributes: {
    assignable: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    alwaysAvailable: {
      type: 'boolean',
      options: {
        notNull: true,
      },
    },
    duration: {
      type: 'string',
    },
    gradable: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultValue: 0,
      },
    },
    requiresScoring: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultValue: 0,
      },
    },
    allowFeedback: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultValue: 0,
      },
    },

    messageToAssignees: {
      type: 'richtext',
    },
    curriculum: {
      type: 'json',
    },
    metadata: {
      type: 'json',
    },
    relatedAssignableInstances: {
      type: 'json',
    },
    event: {
      type: 'uuid',
      /*
      references: {
        collection: 'plugins_calendar::events',
      },
       */
    },
  },
  primaryKey: {
    type: 'uuid',
    name: 'id',
  },
};
