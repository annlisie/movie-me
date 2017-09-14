import {FilterField} from "./filter-field.model";
export class Filter {
  label: string;
  img: string;
  fields: FilterField[];

  public static create(label: string, img: string, allowedValues: any[], onActiveFrom: Function, onActiveTo: Function): Filter {
    return  {
      label: label,
      img: img,
      fields: [
        {
          label: 'od',
          type: 'number',
          allowedValues: allowedValues,
          action: onActiveFrom,
          value: null
        },
        {
          label: 'do',
          type: 'number',
          allowedValues: allowedValues,
          action: onActiveTo,
          value: null
        }
      ]
    };
  }
}
