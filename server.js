import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';
import { request } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Bristlecone Vite dev server — localhost locally; set BRISTLECONE_VITE_HOST=10.22.63.32 on VM
const BRISTLECONE_VITE_HOST = 'localhost';
const BRISTLECONE_VITE_PORT = 5173;
const BRISTLECONE_VITE_TARGET = `http://${BRISTLECONE_VITE_HOST}:${BRISTLECONE_VITE_PORT}`;
const BRISTLECONE_PREFIX = '/bristlecone-dashboard';

// Session configuration
app.use(session({
  secret: 'your-secret-key', // Change this to a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    // No maxAge - session ends when browser is closed
  }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

// Middleware
app.use(compression({
  filter: (req, res) => {
    if (req.headers.upgrade?.toLowerCase() === 'websocket') {
      return false;
    }
    return compression.filter(req, res);
  },
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


// Forward requests to localhost:8001
app.use('/thcm-agentic-poc', (req, res) => {
  const targetUrl = `http://localhost:8001${req.originalUrl}`;

  console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to: ${targetUrl}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Clean headers for forwarding
  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders['content-length'];

  const options = {
    hostname: '10.22.63.32',
    port: 8001,
    path: req.originalUrl,
    method: req.method,
    headers: forwardedHeaders
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to forward request', details: err.message });
  });

  // Stream the request body if it exists
  if (req.body) {
    let bodyData;
    if (typeof req.body === 'object') {
      bodyData = JSON.stringify(req.body);
      proxy.setHeader('Content-Type', 'application/json');
    } else {
      bodyData = req.body.toString();
    }

    if (bodyData) {
      proxy.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxy.write(bodyData);
    }
  }

  proxy.end();
});

// Forward requests to localhost:8000
app.all('/api/invoke_agent', (req, res) => {
  const targetUrl = `http://10.22.63.32:8000${req.originalUrl}`;

  console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to: ${targetUrl}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Clean headers for forwarding
  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders['content-length'];

  const options = {
    hostname: '10.22.63.32',
    port: 8000,
    path: req.originalUrl,
    method: req.method,
    headers: forwardedHeaders
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to forward request', details: err.message });
  });

  // Stream the request body if it exists
  if (req.body) {
    let bodyData;
    if (typeof req.body === 'object') {
      bodyData = JSON.stringify(req.body);
      proxy.setHeader('Content-Type', 'application/json');
    } else {
      bodyData = req.body.toString();
    }

    if (bodyData) {
      proxy.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxy.write(bodyData);
    }
  }

  proxy.end();
});

// Forward requests to localhost:3001
app.use('/fairview', (req, res) => {
  const targetUrl = `http://localhost:3001${req.originalUrl}`;

  console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to: ${targetUrl}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Clean headers for forwarding
  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders['content-length'];

  const options = {
    hostname: '10.22.63.32',
    port: 3001,
    path: req.originalUrl,
    method: req.method,
    headers: forwardedHeaders
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to forward request', details: err.message });
  });

  // Stream the request body if it exists
  if (req.body) {
    let bodyData;
    if (typeof req.body === 'object') {
      bodyData = JSON.stringify(req.body);
      proxy.setHeader('Content-Type', 'application/json');
    } else {
      bodyData = req.body.toString();
    }

    if (bodyData) {
      proxy.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxy.write(bodyData);
    }
  }

  proxy.end();
});

// Forward requests to localhost:3002
app.use('/alo-yoga', (req, res) => {
  const targetUrl = `http://localhost:3002${req.originalUrl}`;

  console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to: ${targetUrl}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Clean headers for forwarding
  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders['content-length'];

  const options = {
    hostname: '10.22.63.32',
    port: 3002,
    path: req.originalUrl,
    method: req.method,
    headers: forwardedHeaders
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to forward request', details: err.message });
  });

  // Stream the request body if it exists
  if (req.body) {
    let bodyData;
    if (typeof req.body === 'object') {
      bodyData = JSON.stringify(req.body);
      proxy.setHeader('Content-Type', 'application/json');
    } else {
      bodyData = req.body.toString();
    }

    if (bodyData) {
      proxy.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxy.write(bodyData);
    }
  }

  proxy.end();
});

// Forward requests to localhost:3003 for aeo-audit-tool/api
app.use('/aeo-audit-tool/api', (req, res) => {
  const targetUrl = `http://localhost:3003${req.originalUrl}`;

  console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to: ${targetUrl}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Clean headers for forwarding
  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders['content-length'];

  const options = {
    hostname: '10.22.63.32',
    port: 3003,
    path: req.originalUrl,
    method: req.method,
    headers: forwardedHeaders
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to forward request', details: err.message });
  });

  // Stream the request body if it exists
  if (req.body) {
    let bodyData;
    if (typeof req.body === 'object') {
      bodyData = JSON.stringify(req.body);
      proxy.setHeader('Content-Type', 'application/json');
    } else {
      bodyData = req.body.toString();
    }

    if (bodyData) {
      proxy.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxy.write(bodyData);
    }
  }

  proxy.end();
});

// Forward requests to localhost:3004 (Nutella AI Commerce, docker compose; the app is served under /nutella)
app.use('/nutella', (req, res) => {
  const targetUrl = `http://localhost:3004${req.originalUrl}`;

  console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to: ${targetUrl}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Clean headers for forwarding
  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders['content-length'];

  const options = {
    hostname: '10.22.63.32',
    port: 3004,
    path: req.originalUrl,
    method: req.method,
    headers: forwardedHeaders
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to forward request', details: err.message });
  });

  // Stream the request body if it exists
  if (req.body) {
    let bodyData;
    if (typeof req.body === 'object') {
      bodyData = JSON.stringify(req.body);
      proxy.setHeader('Content-Type', 'application/json');
    } else {
      bodyData = req.body.toString();
    }

    if (bodyData) {
      proxy.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxy.write(bodyData);
    }
  }

  proxy.end();
});

// Helper function to set MIME types
const setContentType = (res, path) => {
  if (path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  } else if (path.endsWith('.json')) {
    res.setHeader('Content-Type', 'application/json');
  } else if (path.endsWith('.png')) {
    res.setHeader('Content-Type', 'image/png');
  } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
    res.setHeader('Content-Type', 'image/jpeg');
  } else if (path.endsWith('.svg')) {
    res.setHeader('Content-Type', 'image/svg+xml');
  } else if (path.endsWith('.gif')) {
    res.setHeader('Content-Type', 'image/gif');
  } else if (path.endsWith('.html')) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  }
};

// Serve AeroSole app
app.use('/aerosole', requireAuth, express.static(path.join(__dirname, 'AeroSole/dist'), {
  etag: true,
  lastModified: true,
  maxAge: '1d',
  setHeaders: (res, path) => {
    console.log(`[AeroSole] Serving file: ${path}`);
    setContentType(res, path);
  }
}));

// Serve Express app
app.use('/express', requireAuth, express.static(path.join(__dirname, 'Express/dist'), {
  etag: true,
  lastModified: true,
  maxAge: '1d',
  setHeaders: (res, path) => {
    console.log(`[Express] Serving file: ${path}`);
    setContentType(res, path);
  }
}));

// Handle client-side routing for AeroSole
app.get(['/aerosole', '/aerosole/*'], requireAuth, (req, res, next) => {
  const options = {
    root: path.join(__dirname, 'AeroSole/dist'),
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    }
  };

  res.sendFile('index.html', options, (err) => {
    if (err) {
      console.error('[AeroSole] Error sending file:', err);
      next(err);
    }
  });
});

// Handle client-side routing for Express
app.get(['/express', '/express/*'], requireAuth, (req, res, next) => {
  const options = {
    root: path.join(__dirname, 'Express/dist'),
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    }
  };

  res.sendFile('index.html', options, (err) => {
    if (err) {
      next(err);
    }
  });
});

// Serve AT-T app static files
app.use('/at-t', requireAuth, express.static(path.join(__dirname, 'AT-T/build'), {
  etag: true,
  lastModified: true,
  maxAge: '1d',
  setHeaders: (res, path) => {
    console.log(`[AT-T] Serving file: ${path}`);
    setContentType(res, path);
  }
}));

// Serve Vans app static files
app.use('/vans', requireAuth, express.static(path.join(__dirname, 'Vans/dist'), {
  etag: true,
  lastModified: true,
  maxAge: '1d',
  setHeaders: (res, path) => {
    console.log(`[Vans] Serving file: ${path}`);
    setContentType(res, path);
  }
}));

// Handle client-side routing for AT-T (must be after static file serving)
app.get(['/at-t', '/at-t/*'], requireAuth, (req, res, next) => {
  const options = {
    root: path.join(__dirname, 'AT-T/build'),
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    }
  };

  res.sendFile('index.html', options, (err) => {
    if (err) {
      console.error('[AT-T] Error sending file:', err);
      next(err);
    }
  });
});

// Handle client-side routing for Vans (must be after static file serving)
app.get(['/vans', '/vans/*'], requireAuth, (req, res, next) => {
  const options = {
    root: path.join(__dirname, 'Vans/dist'),
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    }
  };

  res.sendFile('index.html', options, (err) => {
    if (err) {
      console.error('[Vans] Error sending file:', err);
      next(err);
    }
  });
});

// Serve AI Auditor app static files
app.use('/aeo-audit-tool', requireAuth, express.static(path.join(__dirname, 'AI-Auditor/dist'), {
  etag: true,
  lastModified: true,
  maxAge: '1d',
  setHeaders: (res, path) => {
    console.log(`[AI Auditor] Serving file: ${path}`);
    setContentType(res, path);
  }
}));

// Handle client-side routing for AI Auditor (must be after static file serving)
app.get(['/aeo-audit-tool', '/aeo-audit-tool/*'], requireAuth, (req, res, next) => {
  const options = {
    root: path.join(__dirname, 'AI-Auditor/dist'),
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    }
  };

  res.sendFile('index.html', options, (err) => {
    if (err) {
      console.error('[AI Auditor] Error sending file:', err);
      next(err);
    }
  });
});

// Serve static assets for all apps (protected by auth)
app.use('/aerosole/assets', requireAuth, express.static(path.join(__dirname, 'AeroSole/dist/assets')));
app.use('/express/assets', requireAuth, express.static(path.join(__dirname, 'Express/dist/assets')));
app.use('/vans/assets', requireAuth, express.static(path.join(__dirname, 'Vans/dist/assets')));

// Serve additional static files for apps (protected by auth)
app.use('/express/images', requireAuth, express.static(path.join(__dirname, 'Express/dist/images')));
app.use('/express/videos', requireAuth, express.static(path.join(__dirname, 'Express/dist/videos')));

// Serve static files from root (like favicon.ico, etc.) - no auth needed
app.use(express.static('public'));

// Login page
app.get('/login', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/');
  }

  const error = req.query.error ? 'Invalid credentials' : '';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login - Demo Store</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f5f5f5;
        }
        .login-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
        }
        button:hover {
          background-color: #45a049;
        }
        .error {
          color: #d32f2f;
          text-align: center;
          margin-bottom: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h1>Login</h1>
        ${error ? `<div class="error">${error}</div>` : ''}
        <form action="/login" method="POST">
          <div class="form-group">
            <label for="username">Email</label>
            <input type="email" id="username" name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Handle login form submission (must be before the catch-all route)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials (in production, use a database)
  if (username === 'demo@1digitals.com' && password === '1Digitals@123') {
    req.session.authenticated = true;
    const returnTo = req.session.returnTo;
    delete req.session.returnTo;
    return res.redirect(returnTo || '/');
  }

  res.redirect('/login?error=1');
});

// Bristlecone Dashboard → Vite (HTTP after login; WebSocket only for HMR paths)
const bristleconeProxy = createProxyMiddleware({
  target: BRISTLECONE_VITE_TARGET,
  changeOrigin: true,
  ws: true,
  on: {
    proxyReq: (_proxyReq, req) => {
      console.log(
        `[${new Date().toISOString()}] Bristlecone proxy ${req.method} → ${BRISTLECONE_VITE_TARGET}${req.originalUrl}`,
      );
    },
    error: (err, req, res) => {
      console.error('Bristlecone proxy error:', err);
      if (res.writeHead) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to forward request', details: err.message }));
      }
    },
  },
});

// Only redirect when URL has no trailing slash (app.get would loop on .../ with strict routing off)
const bristleconeTrailingSlash = (req, res, next) => {
  const pathOnly = req.originalUrl.split('?')[0];
  if (pathOnly === BRISTLECONE_PREFIX) {
    const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    return res.redirect(301, `${BRISTLECONE_PREFIX}/${query}`);
  }
  next();
};

app.use(BRISTLECONE_PREFIX, requireAuth, bristleconeTrailingSlash, (req, res, next) => {
  // Express strips the /bristlecone-dashboard prefix from req.url; Vite expects the full path
  req.url = req.originalUrl;
  bristleconeProxy(req, res, next);
});

// Catch-all route for any other GET requests (must be after all other routes)
app.get('*', (req, res, next) => {
  // Skip authentication for login page and static files
  if (req.path.startsWith('/thcm-agentic-poc') ||
    req.path === '/login' ||
    req.path.startsWith('/public/') ||
    req.path.endsWith('.css') ||
    req.path.endsWith('.js') ||
    req.path.endsWith('.svg') ||
    req.path.endsWith('.png') ||
    req.path.endsWith('.jpg') ||
    req.path.endsWith('.jpeg') ||
    req.path.endsWith('.gif') ||
    req.path.endsWith('.webp') ||
    req.path.endsWith('.webm') ||
    req.path.endsWith('.mp4')) {
    return next();
  }

  // Require authentication for all other routes
  if (!req.session.authenticated) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/login');
  }

  next();
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

// Serve landing page at root
app.get('/', requireAuth, (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Demo Store</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          box-sizing: border-box;
          margin: 0;
          background-color: #f5f5f5;
        }
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 40px auto;
          padding: 2.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        h1 {
          color: #333;
          margin-bottom: 2rem;
        }
        .apps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .app-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 12px;
          text-decoration: none;
          color: #333;
          background: #fafafa;
          transition: all 0.25s ease;
          border: 1px solid #eee;
        }

        .app-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          background: white;
        }
        .app-card h2 {
          margin-top: 1rem;
          color: #2c3e50;
        }
        .logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <h1 style="margin: 0; font-size: 1.8rem;">Welcome to 1Digitals Demo Store</h1>
            <a href="/logout" style="background-color: #f44336; color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; white-space: nowrap; margin-left: 1rem;">
              Logout
            </a>
          </div>
          <div style="border-bottom: 1px solid #eee; width: 100%;"></div>
        </div>
        <p>Please select an application to continue:</p>
        
        <div class="apps">
          <a href="/at-t" class="app-card">
            <img src="/at-t/images/ATT_logo_2016.svg" alt="AT&T Logo" class="logo">
            <h2>AT&T</h2>
          </a>
          
          <a href="/aerosole" class="app-card">
            <img src="/aerosole/vite.svg" alt="AeroSole Logo" class="logo">
            <h2>AeroSole</h2>
          </a>
          
          <a href="/express" class="app-card">
            <img src="/express/images/express-logo.svg" alt="Express Logo" class="logo">
            <h2>Express</h2>
          </a>
          
          <a href="/vans" class="app-card">
            <img src="/vans/images/vans-logo.svg" alt="Vans Logo" class="logo">
            <h2>Vans (Beta) </h2>
          </a>

          <a href="/fairview/chatgpt" class="app-card">
            <img class="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAAcElEQVR4AWOQwQMYICQGQEhybEcHGxhgktIM/9HBJyTJv9ST/IsuaYfsWmk0SS8RaQSQwZBEDgA8OjElGfhgQALVWFTQxEEnye0bYGB7jIgM7hACyuEJhEEtCfa5D1ZJGY7lQLDBTAJPopbAkuLxAADmYhrZZIx6lQAAAABJRU5ErkJggg==" alt="Fairview Logo" data-csiid="COmbabGtB92N4-EPxL3V4Q4_2" data-atf="1">
            <h2>Fairview </h2>
          </a>

          <a href="/alo-yoga" class="app-card">
            <img class="logo" src="https://assets.cadillacfairview.com/transform/49cd9a77-9be3-488c-9ddf-4008f576ce79/MKT-Alo-Yoga?io=transform:fill,width:1600&amp;quality=100" alt="Alo-Yoga Logo">
            <h2>Alo Yoga </h2>
          </a>

          <a href="/aeo-audit-tool" class="app-card">
            <div style="font-size: 5rem; line-height: 80px; margin-bottom: 1rem;">🤖</div>
            <h2>AI Auditor</h2>
          </a>

          <a href="/bristlecone-dashboard/" class="app-card">
            <svg class="logo" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="8" y="44" width="18" height="28" rx="3" fill="#2e7d32"/>
              <rect x="31" y="28" width="18" height="44" rx="3" fill="#388e3c"/>
              <rect x="54" y="12" width="18" height="60" rx="3" fill="#43a047"/>
              <path d="M12 38 L28 22 L44 30 L68 8" stroke="#1b5e20" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="68" cy="8" r="5" fill="#1b5e20"/>
            </svg>
            <h2>Bristlecone Dashboard</h2>
          </a>

          <a href="/nutella/" class="app-card">
            <img class="logo" style="width: 100%; max-width: 180px;" src="data:image/png;base64,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" alt="Nutella Logo">
            <h2>Nutella AI Commerce</h2>
          </a>
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send(`
    <h1>Something broke!</h1>
    <p>${err.message}</p>
    <p>Available routes:</p>
    <ul>
      <li><a href="/aerosole">AeroSole App</a></li>
      <li><a href="/express">Express App</a></li>
    </ul>
  `);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log(`- AeroSole App: http://localhost:${PORT}/aerosole`);
  console.log(`- Express App:  http://localhost:${PORT}/express`);
  console.log(`- AT&T App:     http://localhost:${PORT}/at-t`);
  console.log(`- Vans App:     http://localhost:${PORT}/vans`);
  console.log(`- AI Auditor:   http://localhost:${PORT}/aeo-audit-tool`);
  console.log(`- Bristlecone:  http://localhost:${PORT}/bristlecone-dashboard/`);
  console.log(`- Nutella:      http://localhost:${PORT}/nutella/`);
  console.log(`  (Vite proxy target: ${BRISTLECONE_VITE_TARGET})`);
});

server.on('upgrade', (req, socket, head) => {
  if (req.url?.startsWith(BRISTLECONE_PREFIX)) {
    bristleconeProxy.upgrade(req, socket, head);
  } else {
    socket.destroy();
  }
});
