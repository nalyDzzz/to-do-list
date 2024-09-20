'use client';
import { create } from '@/utils/helpers';
import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';

const initialState = { errors: [] };

export default function AddItem() {
  const [state, formAction] = useFormState(create, initialState);
  const [value, setValue] = useState('');
  return (
    <form
      className="col-start-2 flex flex-row gap-2 md:justify-center"
      action={async (formData) => {
        formAction(formData);
        setValue('')
      }}
    >
      <TextInput
        name="content"
        w={'50%'}
        placeholder="Add item"
        error={state?.errors[0]?.message}
        classNames={{
          error: 'text-primary-5',
        }}
        withErrorStyles={false}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Add to List</Button>
    </form>
  );
}
