import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const dialogPaddingMargin = '16px';

export const myOrgPreset = definePreset(Aura, {
  components: {
    divider: {
      horizontal: {
        margin: '0',
      },
    },
    dialog: {
      height: '100%',
      maxHeight: '95%',
      border: {
        radius: '12px',
      },
      content: {
        padding: '0',
      },
      header: {
        padding: dialogPaddingMargin,
      },
      body: {
        // my custom body padding
        padding: dialogPaddingMargin,
      },
      footer: {
        padding: dialogPaddingMargin,
      },
      rightSide: {
        width: '650px',
      },
    },
  },
  semantic: {
    primary: {
      50: '{cyan.50}',
      100: '{cyan.100}',
      200: '{cyan.200}',
      300: '{cyan.300}',
      400: '{cyan.400}',
      500: '{cyan.500}',
      600: '{cyan.600}',
      700: '{cyan.700}',
      800: '{cyan.800}',
      900: '{cyan.900}',
      950: '{cyan.950}',
    },
  },
});
