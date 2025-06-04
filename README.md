# Headless WordPress with Ninja Forms

This project is a Next.js application that integrates with WordPress and Ninja Forms to create a headless form submission system.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm
- A WordPress installation (v6.0 or higher)
- PHP 7.4 or higher (for WordPress)

## WordPress Setup

1. Install and activate the following WordPress plugins:

   - [Ninja Forms](https://wordpress.org/plugins/ninja-forms/) (v3.7.0 or higher)

   - [WPGraphQL](https://github.com/wp-graphql/wp-graphql)

   - [WPGraphQL for Ninja Forms](https://github.com/toriphes/wp-graphql-ninja-forms)

2. Configure Ninja Forms:

   - This project uses the default Ninja Forms fields. No custom fields are required

## Project Setup

1. Clone the repository:

   ```bash
   git clone [https://github.com/Fran-A-Dev/ninja-forms-headlesswp]
   cd headless-wp-ninja-forms
   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_GRAPHQL_ENDPOINT="https://your-wpsite.com/graphql"
   WP_AUTH_TOKEN="your-auth-token"
   NEXT_PUBLIC_SITE_URL=http://localhost:3000


   ```

4. Generate an auth token with the openssl command and add it to your environment variables:
   openssl rand -base64 32

## Development

1. Start the development server:

   ```bash
   npm run dev

   ```

2. Open [http://localhost:3000/contact-us](http://localhost:3000/contact-us) in your browser and test the form submission
