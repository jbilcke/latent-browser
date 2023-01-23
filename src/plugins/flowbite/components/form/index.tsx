import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'
import { Label, TextInput } from 'flowbite-react'

import { type Component } from '~/plugins/types'

const getType = (value: string = '') => {
  return {
    text: 'text',
    number: 'number'
  }[value.toLowerCase()] || 'text'
}

const FormField = ({ label, id, type }: { label?: ReactNode; id?: ReactNode; type?: ReactNode }) => 
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor={onlyText(id)}
        value={onlyText(label)}
      />
    </div>
    <TextInput
      id={onlyText(id)}
      name={onlyText(id)}
      type={getType(onlyText(id))}
      placeholder=""
      required={false}
    />
  </div>

const Form = ({ children }: { children?: ReactNode }) =>
  <form className="flex flex-col gap-4">{children}</form>

export const field: Component = {
  component: FormField,
  doc: 'form field',
  params: {
    l: {
      prop: 'label',
      doc: 'label'
    },
    i: {
      prop: 'id',
      doc: 'id'
    },
    t: {
      prop: 'type',
      doc: 'type',
      values: ['number', 'text']
    }
  },
}

export const form: Component = {
  component: Form,
  doc: 'form',
}
