'use strict';

const { HttpIncoming } = require('@podium/utils');
const Podlet = require('@podium/podlet');

const podlet = new Podlet({
  name: 'serverless-podlet',
  version: '1.0.0',
  pathname: '/',
  fallback: '/fallback',
  content: '/content',
});

module.exports.manifest = async (event, context) => {
  return {
      statusCode: 200,
      headers: {

      },
      body: JSON.stringify(podlet),
  };
};

module.exports.content = async (event, context) => {
  const incoming = new HttpIncoming(event);
  const inc = await podlet.process(incoming);

  const html = '<section>content</section>';

  return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'podlet-version': podlet.version,
      },
      body: podlet.render(inc, html),
  };
};

module.exports.fallback = async (event, context) => {
  const incoming = new HttpIncoming(event);

  const html = '<section>fallback</section>';

  return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'podlet-version': podlet.version,
      },
      body: podlet.render(incoming, html),
  };
};
