export default {
  name: 'BasicLayoutRender',
  functional: true,
  props: {
    render: [Object, Function],
  },
  render: (h, ctx) => {
    if (typeof ctx.props.render === 'object') {
      return ctx.props.render;
    }
    const renderResult = ctx.props.render(h);
    if (typeof renderResult !== 'object') {
      return h('span', renderResult);
    }
    return renderResult;
  },
};
