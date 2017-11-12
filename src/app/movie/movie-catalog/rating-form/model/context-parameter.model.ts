import {AllowedValue} from "./allowed-value.model";

export class ContextParameter {
  fieldName: string;
  readableFieldName: string;
  allowedValues: Array<AllowedValue>;
}
