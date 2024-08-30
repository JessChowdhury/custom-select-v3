'use client';

import * as React from 'react';
import { SelectField, useField, useFieldProps } from '@payloadcms/ui';
import { Option } from 'payload';

export const CustomHasManySelectComponent = () => {
  const { path } = useFieldProps()
  const { setValue, value } = useField<string>({ path })
  const [options, setOptions] = React.useState<{ label: string; value: string }[]>([])

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const countryOptions = data.map((country: { name: { common: string; }; flag: string; }) => {
          return {
            label: `${country.name.common + ' ' + country.flag}`,
            value: country.name.common,
          };
        });

        setOptions(countryOptions.sort(
          (a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label)
        ));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

  React.useEffect(() => {
    if (value && !Array.isArray(value)) {
      // convert saved stringified array back to an array
      const newValue = JSON.parse(value);
      setValue(newValue)
    }
  }, [value]);

  const onChange = (selected: Option | Option[]) => {
    const options = Array.isArray(selected) ? selected : [selected]
    setValue(options.map((option) => (typeof option === 'string' ? option : option.value)))
  }
  return (
    <div>
      <label className='field-label'>
        Custom Select - Has Many
      </label>
      <SelectField
        field={{
          name: path,
          hasMany: true,
          options,
        }}
        value={value}
        onChange={onChange}
      />
    </div>
  )
};

