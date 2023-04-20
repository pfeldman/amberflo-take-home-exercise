import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Title from '../Title';
import { useMeters } from '@/hooks/useMeters'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import CheckIcon from '@mui/icons-material/Check';
import FalseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { Meter } from '@/types'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: string
  sort: string
  isAsc: boolean
  onClick: (sort: Columns, isAsc: boolean) => void
}

const TableHeader = ({ children, sort, isAsc, onClick }: Props) => {
  return (
    <TableCell style={{ cursor: 'pointer' }} onClick={() => onClick(children as Columns, children === sort ? !isAsc : true)}>
      <Grid display='flex' alignItems='center'>
        <Typography>{children}</Typography>
        <Grid display='flex' direction='column' ml='10px'>
          <Box
            mt='5px'
            sx={theme => ({ svg: { fill: sort === children && !isAsc ? 'black' : theme.palette.grey[400]}})}
          >
            <ArrowDropUpIcon />
          </Box>
          <Box
            mt='-20px'
            sx={theme => ({ svg: { fill: sort === children && isAsc ? 'black' : theme.palette.grey[400]}})}
          >
            <ArrowDropDownIcon />
          </Box>
        </Grid>
      </Grid>
    </TableCell>
  )
}

type Columns =
  | 'Meter'
  | 'Type'
  | 'Last Update'
  | 'For Billing'
  | 'Active'

type ValidSortableColumns = 'display_name' | 'type' | 'updated_time' | 'used_for_billing' | 'active'

const sortMap: Record<string, ValidSortableColumns> = {
  Meter: 'display_name',
  Type: 'type',
  'Last Update': 'updated_time',
  'For Billing': 'used_for_billing',
  Active: 'active'
}

const Meters = () => {
  const { data, isFetching } = useMeters()
  const [meters, setMeters] = useState<Meter[] | undefined>(undefined)
  const [sort, setSort] = useState<Columns>('Meter')
  const [isAsc, setIsAsc] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!data) return
    const meters = [...data]
    const sortColumn = sortMap[sort]
    meters.sort((a, b) => (isAsc ? 1 : -1) * (a[sortColumn] > b[sortColumn] ? 1 : -1))

    setMeters(meters)
  }, [data, sort, isAsc])

  if (isFetching) return (
    <Box display='flex' justifyContent='center' width='100%'>
      <CircularProgress />
    </Box>
  )

  const getColor = (status: boolean) => {
    const color = status ? '00bb00' : '#bb0000'

    return { svg: { color }}
  }

  const handleClick = (sort: Columns, isAsc: boolean) => {
    setSort(sort)
    setIsAsc(isAsc)
  }

  return (
    <>
      <Title>All Meters</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableHeader sort={sort} isAsc={isAsc} onClick={handleClick}>Meter</TableHeader>
            <TableHeader sort={sort} isAsc={isAsc} onClick={handleClick}>Type</TableHeader>
            <TableHeader sort={sort} isAsc={isAsc} onClick={handleClick}>Last Update</TableHeader>
            <TableHeader sort={sort} isAsc={isAsc} onClick={handleClick}>For Billing</TableHeader>
            <TableHeader sort={sort} isAsc={isAsc} onClick={handleClick}>Active</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {meters?.map((meter) => (
            <TableRow
              key={meter.id}
              sx={theme => ({
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.grey[300]
                }
              })}
              onClick={() => navigate(`/details/${meter.id}`)}
            >
              <TableCell>
                <Typography>{meter.display_name}</Typography>
                <Typography fontSize='12px' color={theme => theme.palette.grey[600]} fontStyle='italic'>{meter.api_name}</Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: 'white',
                    p: '5px 10px',
                    display: 'inline',
                    borderRadius: '15px'
                  }}
                >
                  {meter.type.toUpperCase()}
                </Box>
              </TableCell>
              <TableCell>{moment(meter.updated_time).format('MM/DD/YYYY hh:mm a')}</TableCell>
              <TableCell sx={getColor(meter.used_for_billing)}>{meter.used_for_billing ? <CheckIcon /> : <FalseIcon />}</TableCell>
              <TableCell sx={getColor(meter.active)}>{meter.active ? <CheckIcon /> : <FalseIcon />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Meters
