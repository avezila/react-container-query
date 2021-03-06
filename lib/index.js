"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var matchQueries_1 = require("container-query-toolkit/lib/matchQueries");
var ContainerQueryCore_1 = require("./ContainerQueryCore");
/**
 * <ContainerQuery query={query} initialSize={{width: 123, height: 456}}>
 *   {(params) => {
 *     <div className={classname(params)}></div>
 *   }}
 * </ContainerQuery>
 */
var ContainerQuery = (function (_super) {
    __extends(ContainerQuery, _super);
    function ContainerQuery(props) {
        var _this = _super.call(this, props) || this;
        _this.cqCore = null;
        _this.state = {
            params: props.initialSize
                ? matchQueries_1.default(props.query)(props.initialSize)
                : {},
        };
        return _this;
    }
    ContainerQuery.prototype.componentDidMount = function () {
        var _this = this;
        this.cqCore = new ContainerQueryCore_1.default(this.props.query, function (params, size) {
            _this.setState({ params: params });
            if (_this.props.onResize)
                _this.props.onResize(size);
        });
        this.cqCore.observe(ReactDOM.findDOMNode(this));
    };
    ContainerQuery.prototype.componentDidUpdate = function () {
        this.cqCore.observe(ReactDOM.findDOMNode(this));
    };
    ContainerQuery.prototype.componentWillUnmount = function () {
        this.cqCore.disconnect();
        this.cqCore = null;
    };
    ContainerQuery.prototype.render = function () {
        return this.props.children(this.state.params);
    };
    return ContainerQuery;
}(React.Component));
exports.ContainerQuery = ContainerQuery;
;
function applyContainerQuery(Component, query, initialSize) {
    return _a = (function (_super) {
            __extends(ContainerQuery, _super);
            function ContainerQuery(props) {
                var _this = _super.call(this, props) || this;
                _this.cqCore = null;
                _this.state = {
                    params: initialSize
                        ? matchQueries_1.default(query)(initialSize)
                        : {},
                };
                return _this;
            }
            ContainerQuery.prototype.componentDidMount = function () {
                var _this = this;
                this.cqCore = new ContainerQueryCore_1.default(query, function (params) {
                    _this.setState({ params: params });
                });
                this.cqCore.observe(ReactDOM.findDOMNode(this));
            };
            ContainerQuery.prototype.componentDidUpdate = function () {
                this.cqCore.observe(ReactDOM.findDOMNode(this));
            };
            ContainerQuery.prototype.componentWillUnmount = function () {
                this.cqCore.disconnect();
                this.cqCore = null;
            };
            ContainerQuery.prototype.render = function () {
                return (React.createElement(Component, __assign({}, this.props, { containerQuery: this.state.params })));
            };
            return ContainerQuery;
        }(React.Component)),
        _a.displayName = Component.displayName
            ? "ContainerQuery(" + Component.displayName + ")"
            : 'ContainerQuery',
        _a;
    var _a;
}
exports.applyContainerQuery = applyContainerQuery;
//# sourceMappingURL=index.js.map