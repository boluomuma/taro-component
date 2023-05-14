import ValidatorSchema, { RuleItem } from 'async-validator';
import { FormModel } from './FormModel';
import { FormValidationTrigger } from '../types';

export interface FormItemProps {
  label?: string;
  prop: string;
  rules?: RuleItem[];
  required?: boolean;
  validateTriggerType?: FormValidationTrigger;
  onChangePropsName?: string;
  children?: React.ReactNode
}

export class FormItemModel {
  form: FormModel;
  validatorState: 'success' | 'error' | string | null = '';
  validatorMessage?: string = '';
  props: FormItemProps;
  mounted: boolean = false;

  constructor(from: FormModel, props: FormItemProps) {
    this.form = from;
    this.props = { ...props };
  }
  private resetState() {
    this.validatorMessage = '';
    this.validatorState = null;
  }
  get prop() {
    return this.props.prop;
  }
  get validateTriggerType() {
    return this.props.validateTriggerType || this.form.validateTriggerType || 'onChange';
  }
  get value() {
    return this.form.getFieldValue(this.prop);
  }
  /**
   * 触发校验
   * @param triggerType
   */
  private validateIfNeeded(triggerType: FormValidationTrigger) {
    if (this.validateTriggerType === triggerType) {
      Promise.resolve().then(() => {
        this.validate();
      });
    }
  }
  /**
   * 直接设置值
   * @param value
   */
  setValue(value: any) {
    this.form.setFieldValue(this.prop, value);
  }
  onChange = (value: any) => {
    console.log('change', value);

    this.setValue(value);
    this.validateIfNeeded('onChange');
  };
  onMount = () => {
    this.mounted = true;
    this.form.addField(this);
  };
  onUnmount = () => {
    this.mounted = false;
    // 移除关联
    this.form.removeField(this);
    this.resetState();
  };
  getRules = () => {
    const { rules } = this.props;
    if (this.props.required) {
      return {
        [this.prop]: rules ? rules.concat({ required: true }) : { required: true },
      };
    }
    if (this.props.rules) {
      return { [this.prop]: this.props.rules };
    }
    if (this.form.rules) {
      return this.form.rules[this.prop];
    }
  };
  validate = () => {
    return new Promise((resolve, reject) => {
      const descriptor = this.getRules();
      if (descriptor) {
        const validatorSchema = new ValidatorSchema(descriptor);
        const model = { [this.prop]: this.value };
        console.log('validate', model, this.form.value);

        validatorSchema.validate(model, errors => {
          if (errors) {
            this.validatorMessage = errors[0].message;
            this.validatorState = 'error';
            reject(this.validatorMessage);
          } else {
            resolve(true);
          }
        });
      }
    });
  };
}
