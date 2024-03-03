import React from 'react';
import { withMenuContext } from 'react-native-popup-menu';
import type { MenuTriggerProps } from './MenuTrigger';
import { CustomMenu } from './Menu';

export interface PotentialMenuTriggerProps extends MenuTriggerProps {
  button: (args?: any) => any;
}

export function PotentialMenuTrigger(props: PotentialMenuTriggerProps) {
  const { button, menu } = props;
  const MenuOpener = withMenuContext(button);

  return (
    <>
      {menu?.items && menu.inplace ? (
        <>
          <CustomMenu items={menu.items} name={menu.name} />
          <MenuOpener />
        </>
      ) : (
        button()
      )}
    </>
  );
}
