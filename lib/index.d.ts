/// <reference types="react" />
import React = require('react');
import { Props, State, Params, Query, Size } from './interfaces';
/**
 * <ContainerQuery query={query} initialSize={{width: 123, height: 456}}>
 *   {(params) => {
 *     <div className={classname(params)}></div>
 *   }}
 * </ContainerQuery>
 */
export declare class ContainerQuery extends React.Component<Props, State> {
    private cqCore;
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
}
/**
 * applyContainerQuery(BoxComponent, query, initialSize);
 */
export declare type Component<T> = React.ComponentClass<T> | React.StatelessComponent<T>;
export interface QueryProps {
    containerQuery: Params;
}
export declare function applyContainerQuery<T>(Component: Component<T & QueryProps>, query: Query, initialSize?: Size): React.ComponentClass<T>;
