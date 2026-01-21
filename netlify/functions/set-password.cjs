exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Check for admin secret (set this in Netlify env vars)
  const adminSecret = process.env.ADMIN_SECRET;
  const providedSecret = event.headers['x-admin-secret'];

  if (!adminSecret || providedSecret !== adminSecret) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return { statusCode: 400, body: 'Email and password required' };
  }

  // Get the identity context from Netlify
  const { identity } = context.clientContext;

  if (!identity || !identity.url || !identity.token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Identity not configured', identity: !!identity })
    };
  }

  try {
    // First, get all users to find the user ID
    const usersResponse = await fetch(`${identity.url}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${identity.token}`
      }
    });

    if (!usersResponse.ok) {
      const error = await usersResponse.text();
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch users', details: error }) };
    }

    const usersData = await usersResponse.json();
    const user = usersData.users.find(u => u.email === email);

    if (!user) {
      return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) };
    }

    // Update the user's password
    const updateResponse = await fetch(`${identity.url}/admin/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${identity.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to update password', details: error }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: `Password updated for ${email}` })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
