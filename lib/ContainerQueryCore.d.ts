import { Params, Query } from './interfaces';
export default class ContainerQueryCore {
    private rol;
    private result;
    constructor(query: Query, callback: (params: Params, size: any) => void);
    observe(element: Element): void;
    disconnect(): void;
}
