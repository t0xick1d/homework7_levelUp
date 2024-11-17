export interface Filter {
  label: string;
  name: string;
  type: string;
  optionsn?: [
    {
      name: string;
      value: string;
    }
  ];
}
