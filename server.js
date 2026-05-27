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
app.use(compression());
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

// Forward requests to localhost:5050 (strip /bristlecone-dashboard — backend has no app context)
const BRISTLECONE_DASHBOARD_PREFIX = '/bristlecone-dashboard';
app.use(BRISTLECONE_DASHBOARD_PREFIX, (req, res) => {
  const forwardPath = req.url || '/';
  const targetUrl = `http://localhost:5050${forwardPath}`;

  console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to: ${targetUrl}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Clean headers for forwarding
  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders['content-length'];

  const options = {
    hostname: '10.22.63.32',
    port: 5050,
    path: forwardPath,
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
    // Always redirect to root after login
    return res.redirect('/');
  }

  res.redirect('/login?error=1');
});

// Catch-all route for any other GET requests (must be after all other routes)
app.get('*', (req, res, next) => {
  // Skip authentication for login page and static files
  if (req.path.startsWith('/thcm-agentic-poc') ||
    req.path.startsWith('/bristlecone-dashboard') ||
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
          height: 100vh;
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

          <a href="/bristlecone-dashboard" class="app-card">
            <svg class="logo" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="8" y="44" width="18" height="28" rx="3" fill="#2e7d32"/>
              <rect x="31" y="28" width="18" height="44" rx="3" fill="#388e3c"/>
              <rect x="54" y="12" width="18" height="60" rx="3" fill="#43a047"/>
              <path d="M12 38 L28 22 L44 30 L68 8" stroke="#1b5e20" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="68" cy="8" r="5" fill="#1b5e20"/>
            </svg>
            <h2>Bristlecone Dashboard</h2>
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log(`- AeroSole App: http://localhost:${PORT}/aerosole`);
  console.log(`- Express App:  http://localhost:${PORT}/express`);
  console.log(`- AT&T App:     http://localhost:${PORT}/at-t`);
  console.log(`- Vans App:     http://localhost:${PORT}/vans`);
  console.log(`- AI Auditor:   http://localhost:${PORT}/aeo-audit-tool`);
  console.log(`- Bristlecone:  http://localhost:${PORT}/bristlecone-dashboard`);
});
