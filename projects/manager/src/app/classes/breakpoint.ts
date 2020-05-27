import { BreakpointObject } from './breakpoint-object';

export class Breakpoint {
    constructor(public breakpointObject: BreakpointObject, public screenSize: string, public value: any) {}
}

export enum BreakpointScreenSize {
    Z = '0',
    XXS = '320',
    XS = '480',
    SM = '600',
    MD = '768',
    LG = '1024',
    XL = '1280',
    XXL = '1440',
    HD = '1600'
}

export enum BreakpointVisibility {
    Visible = 'block',
    Hidden = 'none',
}

export enum BreakpointSpacing {
    _0px = '0px',
    _4px = '4px',
    _8px = '8px',
    _12px = '12px',
    _16px = '16px',
    _20px = '20px',
    _24px = '24px',
    _28px = '28px',
    _32px = '32px',
    _36px = '36px',
    _40px = '40px',
    _44px = '44px',
    _48px = '48px',
}

export enum BreakpointHorizontalAlignment {
    Left = '0',
    Center = '0 auto',
    Right = '0 0 0 auto'
}

export enum BreakpointVerticalAlignment {
    Top = 'flex-start',
    Middle = 'center',
    Bottom = 'flex-end'
}

export enum BreakpointType {
    PaddingTop,
    PaddingRight,
    PaddingBottom,
    PaddingLeft,
    VerticalAlignment
}