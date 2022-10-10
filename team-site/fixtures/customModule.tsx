import React, { useContext } from 'react';
import { Menu as ArcoMenu } from '@arco-design/web-react';
import { ArcoSiteGlobalContext, ArcoSiteRouteType } from 'arco-material-doc-site';

const { SubMenu, Item: MenuItem } = ArcoMenu;

export const Navbar = () => {
  return <h1 style={{ margin: 0, padding: 20, borderBottom: '1px solid grey' }}>Navbar</h1>;
};

export const Footer = () => {
  return <h1 style={{ marginTop: 100, paddingTop: 20, borderTop: '1px solid grey' }}>Footer</h1>;
};

export const Sider = () => {
  return <div style={{ width: 200, padding: '100px 20px', borderLeft: '1px solid grey' }}>
    <h1>Sider</h1>
  </div>
};

export const DocHeader = ({ elements }) => {
  const { title, tags } = elements || {};
  return <>
    <h1 style={{ marginBottom: 12 }}>DocHeader</h1>
    {title}
    {tags}
  </>;
};

export const Affix = () => {
  // Get globalContext by window.arcoSiteGlobalContext
  const { user } = useContext<ArcoSiteGlobalContext>((window as any).arcoSiteGlobalContext);
  return (
    <div>
      <h1>Hello {user?.name}!</h1>
    </div>
  );
}

export const Menu = () => {
  // Get globalContext by window.arcoSiteGlobalContext
  const {
    history,
    location,
    routes: [docRoutes, componentRoutes],
  } = useContext<ArcoSiteGlobalContext>((window as any).arcoSiteGlobalContext);

  const renderMenuItems = ({ name, path, children }: ArcoSiteRouteType) => {
    if (children) {
      return (
        <SubMenu key={name} title={name}>
          {children.map(({ name, path }) => (
            <MenuItem key={path}>{name}</MenuItem>
          ))}
        </SubMenu>
      );
    }

    return path ? <MenuItem key={path}>{name}</MenuItem> : null;
  };

  return (
    <ArcoMenu
      autoOpen
      defaultSelectedKeys={[location.pathname.replace(/\/$/, '')]}
      onClickMenuItem={(key) => {
        history.push(`${key}${location.search}`);
      }}
      style={{ paddingTop: 80 }}
    >
      <h1 style={{ marginLeft: 12 }}>Menu</h1>
      <SubMenu key={docRoutes.key} title={docRoutes.name}>
        {docRoutes.children?.map(renderMenuItems)}
      </SubMenu>
      {componentRoutes.children?.map(renderMenuItems)}
    </ArcoMenu>
  );
}
