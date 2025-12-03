import type { ComponentType, LazyExoticComponent } from 'react';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  title?: string;
  showInNav?: boolean;
}

export interface RouteGroups {
  protected: RouteConfig[];
  public: RouteConfig[];
}