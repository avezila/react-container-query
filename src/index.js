import ResizeObserverLite from 'resize-observer-lite';
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import React from 'react';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';

/**
 * <ContainerQuery tagName='div' query={query}>
 *   {(params) => {
 *     <div className={classname(params.class)}></div>
 *   }}
 * </ContainerQuery>
 */
export default class ContainerQuery extends React.Component {
    constructor(props) {
        super(props);
        this.rol = null;
        this.state = {
            params: {}
        };
    }
    componentDidMount() {
        this.rol = new ResizeObserverLite((size) => {
            const params = matchQueries(this.props.query)(size);
            if (!isEqual(this.state.params, params)) {
                this.setState({ params });
            }
            if (this.props.onResize) {
                this.props.onResize(size);
            }
        });
        this.rol.observe(this.refs.container);
    }
    render() {
        let children = null;
        if (this.props.children) {
            if (typeof this.props.children === 'function') {
                children = this.props.children(this.state.params);
            }
            else {
                children = this.props.children;
            }
        }
        const props = omit(this.props, ['children', 'tagName', 'query', 'onResize']);
        props.ref = 'container';
        props.className = classnames(this.props.className, this.state.params);
        if (children) {
            if (Array.isArray(children)) {
                return React.createElement(this.props.tagName || 'div', props, ...children);
            }
            else {
                return React.createElement(this.props.tagName || 'div', props, children);
            }
        }
        else {
            return React.createElement(this.props.tagName || 'div', props);
        }
    }
    componentWillUnmount() {
        this.rol.disconnect();
        this.rol = null;
    }
}
