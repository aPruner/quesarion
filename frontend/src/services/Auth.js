export async function sendLoginRequest(username, password) {
  const response = fetch('/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  });
  console.log(response);
  const body = await response.json();
  console.log(body);
}

export async function sendSignupRequest(username, password, email) {
  const response = fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password, email})
  });
  const body = await response.json();
  console.log(body);
}