

type TextError = {
  errorType: "TEXT";
  errorCode: string;
  errorMessage: string;
};

type ToastError = {
  errorType: "TOAST";
  errorCode: string;
  errorMessage: string;
  toastShowDuration: number;
};

type AlertError = {
  errorType: "ALERT";
  errorCode: string;
  errorMessage: string;
  onConfirm: () => void;
};
type ErrorFeedbackType = TextError | ToastError | AlertError;
const errorArr: ErrorFeedbackType[] = [
  { errorType:'TEXT', errorCode: "100", errorMessage: "텍스트 에러" },
  { errorType:'TOAST', errorCode: "200", errorMessage: "토스트 에러", toastShowDuration: 300 },
  { errorType:'ALERT',errorCode: "300", errorMessage: "알러트 에러", onConfirm: () => {} }
  { errorType:'ALERT',errorCode: "310", errorMessage: "알러트 에러", onConfirm: () => {},
  toastShowDuration:5000, // Object literal 어쩌구저쩌구
}]