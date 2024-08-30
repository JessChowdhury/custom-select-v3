import { Field } from 'payload'

export const CustomHasManySelectField: Field = {
  name: 'customHasManySelectField',
  type: 'text',
  admin: {
    components: {
      Field: './client#CustomHasManySelectComponent',
    },
  },
  hooks: {
    beforeValidate: [
      async ({ value }) => {
        // convert the array to string since this is a text field
        const stringifiedValue = JSON.stringify(value)
        return stringifiedValue
      },
    ],
  },
}
