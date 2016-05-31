import React from 'react'
import ReactTestUtils from 'react-addons-test-utils';
import reactStamp from 'react-stamp'
import store from '../src'
import test from 'tape'
var jsdom = require('jsdom');
// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = doc.defaultView;
global.document = doc;

test("Single property", assert => {
    const comp = React.createClass({
        render() {
            return <div>{this.props.valueA}</div>
        }
    });
    const wrapper = store.connect(comp)({
        valueA: "valueA"
    })();
    const renderer = ReactTestUtils.renderIntoDocument(
        React.createElement(wrapper)
    );

    var output = renderer.render();

    assert.equal(output.props.valueA, null);
    assert.equal(output.props.valueB, undefined);

    store.setState({
        valueA: "abc"
    });
    output = renderer.render();
    assert.equal(output.props.valueA, "abc");

    assert.end();
});

test("Multiple properties", assert => {
    store.setState({
        valueA: "abc"
    });

    const comp = React.createClass({
        render() {
            return <div>{this.props.valueA}</div>
        }
    });
    const wrapper = store.connect(comp)({
        valueA: "valueA",
        valueB: "valueB"
    })();
    const renderer = ReactTestUtils.renderIntoDocument(
        React.createElement(wrapper)
    );

    var output = renderer.render();

    assert.equal(output.props.valueA, "abc");
    assert.equal(output.props.valueB, null);
    assert.equal(output.props.valueC, undefined);

    store.setState({
        valueA: "abcd",
        valueB: "def"
    });
    output = renderer.render();
    assert.equal(output.props.valueA, "abcd");
    assert.equal(output.props.valueB, "def");

    assert.end();
});

test("Different property name", assert => {
    store.setState({
        valueA: "abc"
    });

    const comp = React.createClass({
        render() {
            return <div>{this.props.valueA}</div>
        }
    });
    const wrapper = store.connect(comp)({
        myValueA: "valueA"
    })();
    const renderer = ReactTestUtils.renderIntoDocument(
        React.createElement(wrapper)
    );

    var output = renderer.render();
    
    assert.equal(output.props.myValueA, "abc");
    assert.equal(output.props.valueA, undefined);

    store.setState({
        valueA: "abcd"
    });
    output = renderer.render();
    assert.equal(output.props.myValueA, "abcd");
    assert.equal(output.props.valueA, undefined);

    assert.end();
});

test("Other properties", assert => {
    const comp = React.createClass({
        render() {
            return <div>{this.props.valueA}</div>
        }
    });
    const wrapper = store.connect(comp)()({
        valueA: "abcd",
        valueB: "defg"
    });
    const renderer = ReactTestUtils.renderIntoDocument(
        React.createElement(wrapper)
    );

    var output = renderer.render();

    assert.equal(output.props.valueA, "abcd");
    assert.equal(output.props.valueB, "defg");

    assert.end();
});