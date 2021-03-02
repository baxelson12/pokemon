import { ControlValueAccessor } from '@angular/forms';

// Basically just the hooks for an angular form control
export abstract class BaseControlValueAccessor implements ControlValueAccessor {
  // tslint:disable-next-line: variable-name
  abstract _value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  get value(): any {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  writeValue(value): void {
    if (value !== this._value) {
      this.value = value;
    }
  }
}
