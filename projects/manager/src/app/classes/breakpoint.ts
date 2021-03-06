import { BreakpointObject } from './breakpoint-object';
import { BreakpointData } from 'classes/breakpoint-data';
import { BreakpointType } from 'classes/breakpoint-type';

export class Breakpoint implements BreakpointData {
    constructor(public breakpointObject: BreakpointObject, public breakpointType: BreakpointType, public screenSize: string, public value: any) {}
}

export enum BreakpointScreenSize {
    Z = '0',
    MICRO = '240',
    XXS = '320',
    XS = '480',
    SM = '600',
    MD = '768',
    LG = '1024',
    XL = '1280',
    XXL = '1440',
    HD = '1600'
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