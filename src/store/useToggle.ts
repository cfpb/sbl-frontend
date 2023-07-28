import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface NavbarState {
  clicked: boolean;
}

const initialState: NavbarState = {
  clicked: false
}

const toggleState = (currentValue: boolean): boolean => 
  // Toggle function to switch the state
   !currentValue
;

const useToggle = () => {
  const queryClient = useQueryClient();

  // Create a query to fetch the initial state
  const { data: toggleStateData, isLoading, error } = useQuery<boolean>({
  queryKey: ['toggleState'],
  queryFn: () => {},
  initialData: initialState,
});

  // Create a mutation using useMutation with the toggleState function
  const { mutate: toggleMutation } = useMutation<boolean, unknown, boolean>(toggleState, {
    onSuccess: (data) => {
      // Handle any side effects after the mutation is successful
      // In this case, update the global state with the toggled value
      queryClient.setQueryData<boolean>(['toggleState'], data);
    },
  });

  const toggle = () => {
    // Call the toggleMutation to toggle the state
    toggleMutation(toggleStateData);
  };

  return { value: toggleStateData, toggle, isLoading, error };
};

export default useToggle;
