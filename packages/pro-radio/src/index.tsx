import ProRadio from './radio';
import ProRadioGroup from './group';
import { ProRadioProps, ProRadioGroupProps } from './interface';

const ProRadioComponent = ProRadio as typeof ProRadio & {
  Group: typeof ProRadioGroup;
};

ProRadioComponent.displayName = 'ProRadio';

ProRadioComponent.Group = ProRadioGroup;

export default ProRadioComponent;

export type { ProRadioProps, ProRadioGroupProps };
