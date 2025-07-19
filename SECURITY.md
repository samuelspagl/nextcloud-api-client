# Security Policy

## Environment Variables

This project uses environment variables for configuration. **Never commit sensitive data to the repository.**

### Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in `.env`

3. Copy `bunfig.toml.example` to `bunfig.toml` if you need custom bun configuration:
   ```bash
   cp bunfig.toml.example bunfig.toml
   ```

### Required Environment Variables

- `NC_SERVER`: Your Nextcloud server URL
- `NC_USER`: Your Nextcloud username  
- `NC_PASSWORD`: Your Nextcloud app password (not your login password!)
- `NC_USER2`: Second test user (for multi-user tests)
- `NC_PASSWORD2`: Second test user's app password

### Creating App Passwords

For security, use Nextcloud app passwords instead of your main password:

1. Go to your Nextcloud Settings → Security
2. Create a new app password for this client
3. Use the generated password in your `.env` file

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainer directly instead of opening a public issue.