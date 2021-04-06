interface IResolveOptions {
    headers: Record<string, any>;
    status: number;
    data: any;
    response?: any;
}
export default function requestSuccess(res: any): IResolveOptions;
export {};
