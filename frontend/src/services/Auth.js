export async function sendLoginRequest(username, password) {
  const response = fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  });
  const body = await response.json();
  console.log(body);
}

export async function sendSignupRequest(username, password, email) {
  const response = fetch('http://localhost:3001/signup', {
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