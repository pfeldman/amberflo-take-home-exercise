import { useQuery, useMutation, useQueryClient } from 'react-query'
import { APIKEY } from './constants'
import { Meter } from '@/types'

export const useMeters = () => {
  const queryClient = useQueryClient()

  const response = useQuery<Meter[]>(
    'meters',
    async () => {
      const response = await fetch('https://take-home-exercise-api.herokuapp.com/meters', {
        headers: {
          'API-KEY': APIKEY
        }
      })

      const data = await response.json()

      return data;
    })

  const { mutate: editMeter, isLoading: isEditingMeter, error: errorEditing } = useMutation(
    async ({ id, meter }: { id: string, meter: Meter}) => {
      const response = await fetch(`https://take-home-exercise-api.herokuapp.com/meters/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          display_name: meter.display_name,
          active: meter.active,
          used_for_billing: meter.used_for_billing,
          type: meter.type,
          api_name: meter.api_name
        }),
        headers: {
          'API-KEY': APIKEY,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("meters");
      },
    },
  );

  const { mutate: createMeter, isLoading: isCreatingMeter, error: errorCreating } = useMutation(
    async (meter: Meter) => {
      const response = await fetch(`https://take-home-exercise-api.herokuapp.com/meters`, {
        method: 'POST',
        body: JSON.stringify({
          api_name: meter.api_name,
          display_name: meter.display_name,
          active: meter.active,
          used_for_billing: meter.used_for_billing,
          type: meter.type
        }),
        headers: {
          'API-KEY': APIKEY,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("meters");
      },
    },
  );

  const { mutate: deleteMeter, isLoading, error: errorDeleting } = useMutation(
    async (id: string) => {
      const response = await fetch(`https://take-home-exercise-api.herokuapp.com/meters/${id}`, {
        method: 'DELETE',
        headers: {
          'API-KEY': APIKEY
        }
      });

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("meters");
      },
    },
  );

  return {
    ...response,
    isFetching: response.isFetching || isLoading || isEditingMeter || isCreatingMeter,
    deleteMeter,
    editMeter,
    createMeter,
    errorDeleting,
    errorEditing,
    errorCreating
  }
}
