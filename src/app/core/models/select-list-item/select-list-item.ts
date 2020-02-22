export class SelectListItem {
  disabled = false;
  selected = false;
  text: string;
  subtext?: string;
  value: any;

  public constructor(selectListItem?: Partial<SelectListItem>) {
    Object.assign(this, selectListItem);
  }
}
