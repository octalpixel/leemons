import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContextContainer, PageContainer, InputWrapper } from '@bubbles-ui/components';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import SubjectSelector from './AssignStudents/components/SubjectSelector';
import AssigneeTypeSelector from './AssignStudents/components/AssigneeTypeSelector';
import AssigneeSelector from './AssignStudents/components/AssigneeSelector';

export default function AssignStudents({ labels, profile, onChange, assignable, ...props }) {
  const form = useForm({
    subjects: [],
    type: null,
    assignee: [],
  });
  const { control, watch } = form;

  useEffect(() => {
    const subscription = watch((data) => {
      onChange(data.assignee);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...form}>
      <InputWrapper {...props}>
        <Controller
          control={control}
          name="subjects"
          render={({ field }) => (
            <SubjectSelector {...field} labels={labels} assignable={assignable} />
          )}
        />
        <ContextContainer title={labels.selectStudentsTitle}>
          <Controller
            control={control}
            name="type"
            render={({ field }) => <AssigneeTypeSelector {...field} labels={labels} />}
          />
          <PageContainer>
            <Controller
              control={control}
              name="assignee"
              render={({ field }) => (
                <AssigneeSelector {...field} labels={labels} profile={profile} />
              )}
            />
          </PageContainer>
        </ContextContainer>
      </InputWrapper>
    </FormProvider>
  );
}

AssignStudents.propTypes = {
  labels: PropTypes.object,
  profile: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  assignable: PropTypes.shape({}),
};
