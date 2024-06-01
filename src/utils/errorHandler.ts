export const handleError = (
  error: any,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setError(error.message);
  setLoading(false);
};
