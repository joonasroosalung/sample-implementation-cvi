import React, { FC, MouseEvent } from "react";
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MenuItem } from "../../types/menuItem";
import { useTranslation } from "react-i18next";
import { menuData } from './menuData';
import Icon from "../icons/icon/icon";
import { isSameRoot } from "./isSameRoot";
import clsx from 'clsx';
import '../../main-navigation.scss';

interface MenuTreeProps {
  menuItems: MenuItem[];
  serviceId: string[];
  handleNavToggle: (event: MouseEvent) => void;
}

const MenuTree: FC<MenuTreeProps> = ({
  menuItems, 
  serviceId, 
  handleNavToggle,
}) => {
  const currentlySelectedLanguage = useTranslation().i18n.language;

  return menuItems.map((menuItem) => (
      <li key={menuItem.label[currentlySelectedLanguage]}>
        {!!menuItem.children ? (
            <>
              <button
                className={clsx('nav__toggle', { 'nav__toggle--icon': !!menuItem.id })}
                aria-expanded={menuItem.path && (isSameRoot(menuItem, serviceId)) ? 'true' : 'false'}
                onClick={handleNavToggle}
              >
                {menuItem.id && (
                  <Icon icon={menuData.find(dataItem => dataItem.id === menuItem.id)?.icon} size='large' />
                )}
                <span className='menu-item-title'>{menuItem.label[currentlySelectedLanguage]}</span>
                <Icon icon={<MdKeyboardArrowDown />} className='menu-item-arrow' />
              </button>
              <ul className='nav__submenu'>
                <MenuTree
                  menuItems={menuItem.children.map((item)  => ({id: menuItem.id, ...item}))}
                  serviceId={serviceId}
                  handleNavToggle={handleNavToggle}
                />
              </ul>
            </>
        ) : (
          serviceId.includes(menuItem.id!)
            ? <NavLink to={menuItem.path || '#'}>
                {menuItem.label[currentlySelectedLanguage]}
              </NavLink>
            : <a href={(menuData.find(dataItem => dataItem.id === menuItem.id)?.url ?? '') + menuItem.path}>
                {menuItem.label[currentlySelectedLanguage]}
              </a>
        )}
      </li>
    ),
  );
}

export default MenuTree;
