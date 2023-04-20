import { Meter } from '@/types'
import Box from '@mui/material/Box'
import { Field, Formik } from 'formik'
import TextField from '@mui/material/TextField'
import { Button, InputLabel, MenuItem, Select, Stack, Switch } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { metersSchema } from '@/components/MeterForm/schema'
import { useRef } from 'react'

interface Props {
  meter?: Meter
  onSubmit: (meter: Meter) => void
}

export const MeterForm = ({ meter, onSubmit }: Props) => {
  const navigate = useNavigate()

  const isCreate = useRef(!meter?.api_name)

  return (
    <Formik<Meter>
      initialValues={meter as Meter}
      onSubmit={onSubmit}
      validationSchema={metersSchema}
    >
      {({ values, setFieldValue, submitForm, errors }) => (
        <>
          {isCreate.current && (
            <Box>
              <Field as={TextField} name='api_name' id='api_name' label='Api Name' error={errors.api_name} helperText={errors.api_name} />
            </Box>
          )}
          <Box mt='10px'>
            <Field as={TextField} name='display_name' id='display_name' label='Name' error={errors.display_name} helperText={errors.display_name} />
          </Box>
          <Box mt='10px'>
            <InputLabel>Active</InputLabel>
            <Field as={Switch} name='active' id='active' label='Active' />
          </Box>
          <Box mt='10px'>
            <InputLabel>Used for billing</InputLabel>
            <Field as={Switch} name='used_for_billing' id='used_for_billing' label='Used for billing' />
          </Box>
          <Box mt='10px'>
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              value={values.type}
              label="Type"
              onChange={value => setFieldValue('type', value)}
            >
              <MenuItem value='sum'>Sum</MenuItem>
              <MenuItem value='max'>Max</MenuItem>
              <MenuItem value='unique_count'>Unique Count</MenuItem>
            </Select>
          </Box>
          <Stack direction='row' justifyContent='flex-end' spacing='5px'>
            <Button variant='outlined' onClick={() => navigate(meter?.id ? `/details/${meter.id}` : '/')}>Cancel</Button>
            <Button variant='contained' onClick={submitForm}>Save</Button>
          </Stack>
        </>
      )}
    </Formik>
  )
}
