export interface IPlanejaResponse {
  id: number;
  title: string;
  content: string;
  choices: string;
  position: number;
}

export interface IChoices {
  option_label: string;
  justify_answer_label: string;
}
