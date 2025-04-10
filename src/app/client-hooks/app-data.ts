'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getShippingAppData, setShippingAppData } from '@/app/actions/app-data';

const queryKey = ['shipping-app-data']; 

export const useShippingAppData = () => {
return useQuery<any>({ 
    queryKey,
    queryFn: async () => {
    return getShippingAppData(); 
  },
 });
};

export const useSetShippingAppData = () => {
const queryClient = useQueryClient();
const { mutateAsync } = useMutation({ 
  mutationFn: async (newData: any) => {
    return setShippingAppData(newData); 
  },
  onSuccess: (data) => {
    void queryClient.invalidateQueries({ queryKey }); 
  },
 });
 return mutateAsync;
};
