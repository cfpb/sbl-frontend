import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const ToggleStateQueryKey = ['toggleState'];

interface ExampleState {
  clicked: boolean;
}

const initialState: ExampleState = {
  clicked: false
};

const useToggle = () => {
  const queryClient = useQueryClient();

  // Create a query to fetch the initial state
  const { data: toggleStateData } = useQuery<
    ExampleState,
    unknown,
    ExampleState
  >({
    queryKey: ToggleStateQueryKey,
    queryFn: () => Promise.resolve(initialState),
    initialData: initialState
  });

  /**
   * Mutation function to toggle clicked state
   *
   * @param {string} currentClicked current clicked state
   * @returns {void}
   */
  const toggleState = (currentClicked: boolean) => {
    // Toggle function to switch the state
    return !currentClicked;
  };

  // Create a mutation using useMutation with the toggleState function
  const { mutate: toggleMutation } = useMutation(toggleState, {
    onSuccess: (newClicked: boolean) => {
      // Handle any side effects after the mutation is successful
      // In this case, update the global state with the toggled value

      const newState: ExampleState = {
        ...toggleStateData,
        clicked: newClicked
      };

      queryClient.setQueryData(ToggleStateQueryKey, newState);
    }
  });

  /**
   * Wrapper function to pass mutation argument(s)
   * Passes the current clicked state from the query cache
   */
  const toggle = () => {
    toggleMutation(toggleStateData.clicked);
  };

  return {
    data: toggleStateData,
    toggle
  };
};

export default useToggle;
