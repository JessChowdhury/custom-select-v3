'use client';

import * as React from 'react';
import { SelectField, useField, useFieldProps } from '@payloadcms/ui';
import { Option } from 'payload';

export const CustomSelectComponent = () => {
  const { path } = useFieldProps()
  const { setValue, value } = useField<string>({ path })
  const [options, setOptions] = React.useState<{ label: string; value: string }[]>([])


  // Fetch options on component mount
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

  const onChange = (option: Option | Option[]) => {
    setValue(option);
  }

  return (
    <div>
      <label className='field-label'>
        Custom Select
      </label>
      <SelectField
        field={{
          name: path,
          hasMany: false,
          options,
        }}
        value={value}
        onChange={onChange}
      />
    </div>
  )
};