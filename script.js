async function fetchRepositories() {
    const username = document.getElementById('username').value;
    const repositoriesElement = document.getElementById('repositories');
    const errorMessageElement = document.getElementById('error-message');

    try {
      const response = await fetch(`https://docs.github.com/en/rest/reference`);
      
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status} ${response.statusText}`);
      }

      const repositories = await response.json();

      repositories.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.className = 'repository';
        listItem.innerHTML = `<strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>: ${repo.description || 'No description available'}`;
        repositoriesElement.appendChild(listItem);
      });

      errorMessageElement.textContent = ''; // Clear previous error message
    } catch (error) {
      console.error('Error fetching repositories:', error);
      repositoriesElement.innerHTML = ''; // Clear previous results
      errorMessageElement.textContent = `Error: ${error.message}`;
    }
  }