module.exports = {
  listCurriculum: {
    view: 'View',
    delete: 'Delete',
    deleted: 'Curriculum deleted',
    page_title: 'Curriculum Library',
    published: 'Published',
    draft: 'Draft',
    page_description: 'These are the curricula of the programmes this center delivers.',
  },
  addCurriculum: {
    noPrograms: 'All programs for this center used',
    newCurriculum: 'New curriculum',
    description1:
      'Start by defining the structure of the curricular content, later it can be completed by creating the specific content for each section',
    description2: 'Start by choosing the program to create the structure of the curriculum',
    nameLabel: 'Name',
    namePlaceholder: 'Enter name...',
    countryLabel: 'Country',
    countryPlaceholder: 'Select...',
    countryNothingFound: 'No data',
    languageLabel: 'Language',
    languagePlaceholder: 'Select...',
    languageNothingFound: 'No data',
    centerLabel: 'Center',
    centerPlaceholder: 'Select...',
    centerNothingFound: 'No data',
    programLabel: 'Program',
    programPlaceholder: 'Select...',
    programNothingFound: 'No data',
    tagsLabel: 'Tags',
    tagsPlaceholder: 'Add tags',
    tagsDescription: 'Enter tags separated by commas',
    tagsNothingFound: 'No data',
    tagsCreateLabel: '+ Create {{label}}',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Enter description...',
    continueButtonLabel: 'Continue',
    nameRequired: 'Field required',
    countryRequired: 'Field required',
    languageRequired: 'Field required',
    centerRequired: 'Field required',
    programRequired: 'Field required',
  },
  addCurriculumStep1: {
    description1:
      'Start by defining the structure of the curricular content, later it can be completed by creating the specific content for each section',
    description2:
      'It is possible that not all branches of the programs have curriculum content. Select here which levels of the portfolio will be used to manage the curriculum content. (subject level is mandatory)',
    saveButtonLabel: 'Continue',
    program: 'Program',
    courses: 'Course',
    groups: 'Group',
    subjectType: 'Type',
    knowledges: 'Area',
    subject: 'Subject',
    alertTitle: 'Important:',
    alertDescription:
      'In order to link the Curriculum with assessable or gradable activities, <strong>it is necessary to have a subject level</strong> and to nest within it the contents, evaluation criteria or learning standards.<br/> <strong>If the selected program is a single subject</strong>, these items can be nested directly under this level.',
  },
  addCurriculumStep2: {
    description1:
      'Now additional branches can be added to the tree and by clicking on the edit icon, and adding new types of blocks (curricular contents, evaluation criteria, learning standards, objectives...).',
    description2:
      'In the next step these blocks can be filled in for each subject or level of the selected tree.',
    continueButtonLabel: 'Continue',
    addBranchButtonLabel: 'Add branch',
    title: 'Branch configuration',
    nameLabel: 'New Branch Name',
    namePlaceholder: 'Branch name...',
    orderedLabel: 'Ordered:',
    orderedPlaceholder: 'Select...',
    orderedNothingFound: 'No data',
    evaluationCriteriaLabel: 'This block contains evaluation criteria',
    saveButtonLabel: 'Save configuration',
    nameRequired: 'Field required',
    orderedRequired: 'Field required',
    blockNameRequired: 'Field required',
    blockTypeRequired: 'Field required',
    blockOrderedRequired: 'Field required',
    fieldMinRequired: 'Field required',
    fieldMaxRequired: 'Field required',
    codeTypeRequired: 'Field required',
    listTypeRequired: 'Field required',
    listOrderedRequired: 'Field required',
    listOrderedTextRequired: 'Field required',
    listNumberingStyleRequired: 'Field required',
    codeNodeLevelRequired: 'Field required',
    codeNodeLevelFieldRequired: 'Field required',
    groupOrderedRequired: 'Field required',
    groupColumnNameRequired: 'Field required',
    groupColumnTypeRequired: 'Field required',
    groupShowAsRequired: 'Field required',
    orderedOptions: {
      'not-ordered': 'Not ordered',
      bullets: 'Only bullets',
      'style-1': 'Numbering Style 1 (1,2,3,...)',
      'style-2': 'Numbering Style 2 (A,B,C,...)',
      custom: 'Custom numbering',
    },
    blockTypeOptions: {
      field: 'Field',
      code: 'Code',
      textarea: 'Text area',
      list: 'List',
      group: 'Group',
    },
    codeTypeOptions: {
      manual: 'Manual',
      autocomposed: 'Autocomposed',
    },
    codeFieldNumbering: 'Numbering',
    addContent: 'Add new block',
    blockNameLabel: 'Content Block Name',
    blockNamePlaceholder: 'Name...',
    blockTypeLabel: 'Type',
    blockTypePlaceholder: 'Select...',
    blockTypeNothingFound: 'No data',
    blockOrderedLabel: 'Ordered',
    blockOrderedPlaceholder: 'Select...',
    groupTypeOfContentLabel: 'Type of Content',
    groupTypeOfContentPLaceholder: 'Select...',
    groupContentConfigLabel: 'Content configuration',
    groupAddColumnButtonLabel: 'Add Column',
    fieldLimitCharactersLabel: 'Limited characters',
    fieldMinLabel: 'Min',
    fieldMinPlaceholder: 'Min...',
    fieldMaxLabel: 'Max',
    fieldMaxPlaceholder: 'Max...',
    blockSaveConfigButtonLabel: 'Save block',
    numerationLabel: 'Numbering',
    subTypeLabel: 'Sub-type',
    codeTypePlaceholder: 'Select...',
    codeTypeNothingFound: 'No data',
    codeComposerLabel: 'Code composer',
    listTypePlaceholder: 'Select...',
    listOrderedPlaceholder: 'Select...',
    listNumberingDigitsLabel: 'Digits',
    listNumberingContinueFromPrevious: 'Continue from previous parent block',
    cancelCodeAutoComposedField: 'Cancel',
    saveCodeAutoComposedField: 'Save',
    groupOrderedPlaceholder: 'Select...',
    groupColumnTypeLabel: 'Type',
    groupColumnTypePlaceholder: 'Select...',
    groupShowAs: 'Show as',
    groupSaveConfig: 'Save configuration',
    groupAddElement: 'Add element',
    blockCancelConfigButtonLabel: 'Cancel',
  },
  addCurriculumStep3: {
    addNode: 'Add {name}',
    description1:
      'Now content can be added to each block typology, remember that the contents of the block marked with a star can be linked to asessable or gradable activities and travel to the final grading system.',
    publish: 'Publish curriculum',
    back: 'Back',
    published: 'Curriculum published',
    starDescription: 'The blocks marked with a star correspond to evaluation criteria.',
    newBranchValue: {
      nameLabel: 'Name',
      subjectLabel: 'Subject',
      namePlaceholder: 'Name...',
      saveButtonLabel: 'Save',
      nameRequired: 'Field required',
      noSubjectsFound:
        'All available subjects are currently added to the curriculum, if the creation of new subjects is desired, it must be done in the Academic Portfolio section and then they must be added here to complete the curriculum.',
    },
  },
  selectContentModal: {
    title: 'Content',
    saveButtonLabel: 'Add contents',
    selectFromCurriculum: 'Select from curriculum',
    clearAll: 'Clear all',
    clearSelected: 'Clear selected',
    curriculum: 'Curriculum',
    added: 'Added',
    searchContent: 'Search content',
  },
};
