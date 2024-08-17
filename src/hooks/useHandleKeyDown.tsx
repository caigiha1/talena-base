import { useCallback } from 'react';

function useHandleKeyDown(_selected: any, setSelected: any) {
  return useCallback(
    (e: { target: any; key: string; }) => {
      const input = e.target;
      if (input && (e.key === 'Delete' || e.key === 'Backspace')) {
        if (input.value === '') {
          setSelected((prev: string) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      } else if (e.key === 'Escape') {
        input.blur();
      }
    },
    [setSelected]
  );
}

export default useHandleKeyDown;
