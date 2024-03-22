import { IResizableContext } from '../@types';
export declare const singletonService: {
    getService: (id: string, createService: () => IResizableContext) => IResizableContext;
    clearService: (id: string) => boolean;
};
