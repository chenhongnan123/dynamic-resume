interface Window {
  enqueueSnackbar: (msg: string, type: any) => void;
  showLoading: () => void;
  hideLoading: () => void;
}