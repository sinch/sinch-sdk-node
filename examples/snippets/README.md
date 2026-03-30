# SDK snippets

This package contains code snippets for the SDK documentation. The snippets are used to demonstrate how to use the SDK to call the supported APIs.

Snippets can be used as a starting point to use Sinch products from your own application.

## Requirements

- Node.js 18 or later
- [Sinch account](https://dashboard.sinch.com)

### Snippets execution settings
When executing a snippet, you will need to provide some information about your Sinch account (credentials, Sinch virtual phone number, ...)

This setting can be placed directly in the snippet source, or you can use an [environment file](.env), in which case the settings will be shared and used automatically by every snippet.

```shell
# Copy the .env.example file to .env
cp .env.example .env
```

### Running snippets

To run a snippet, you can use the `npm run` command followed by the name of the snippet. For example:

```shell
# Run the snippets to get the details about a Sinch number you own
npm run numbers:get
#Run the snippets to list the available regions where to rent a Sinch number from
npm run numbers:regions:list
```

You can find all the available snippets in the `package.json` file under the `scripts` section.
