import ProRadio, { ProRadioProps } from './radio';
import ProRadioGroup, { ProRadioGroupProps } from './group';

const ProRadioComponent = ProRadio as typeof ProRadio & {
  Group: typeof ProRadioGroup;
};

ProRadioComponent.displayName = 'ProRadio';

ProRadioComponent.Group = ProRadioGroup;

export default ProRadioComponent;
export { ProRadioProps, ProRadioGroupProps };
